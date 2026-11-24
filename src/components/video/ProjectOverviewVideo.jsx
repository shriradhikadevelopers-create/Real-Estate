import { useState, useRef, useEffect, useCallback } from 'react'
import { resolveVideoUrl, getAudioEnabled, setAudioEnabled } from '../../utils/videoResolver'

/**
 * ProjectOverviewVideo
 *
 * Ambient overview video player with native controls on hover/tap.
 * Requirements:
 * - Autoplays with sound enabled by default when project is in view and Overview tab is active.
 * - If browser autoplay policy blocks unmuted playback, falls back gracefully to muted playback
 *   without console errors and keeps native controls accessible.
 * - When user unmutes or changes volume, remembers the preference for subsequent videos.
 * - Pauses automatically when project is scrolled out of view, tab changes, or user switches projects.
 * - Shows native video controls on desktop hover (auto-hides after 3s of inactivity while playing).
 * - Shows native video controls on click or mobile tap.
 * - No invisible overlay blocking native video controls.
 * - Intrinsic 16:9 aspect ratio, responsive, no unwanted borders or black frames.
 * - Graceful fallback to static overview image if no playable video or on error.
 */
export default function ProjectOverviewVideo({
  video,
  poster,
  alt = 'Project Overview',
  isActive = false,
  isOverviewTab = true,
  className = '',
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const hideControlsTimerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)

  const videoSrc = resolveVideoUrl(video)

  // Track viewport visibility with IntersectionObserver using separate enter/exit hysteresis
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    // Enter threshold: video must be at least 20% visible to begin autoplaying
    // Exit threshold: video stays playing until visibility drops below 10% (or leaves viewport)
    // This 10% hysteresis deadband prevents play/pause flickering during slow vertical scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        const isIntersecting = entry.isIntersecting

        setIsInViewport((prev) => {
          if (!isIntersecting || ratio < 0.10) {
            return false
          }
          if (ratio >= 0.20) {
            return true
          }
          // Inside hysteresis deadband [0.10, 0.20]: retain previous visibility state
          return prev
        })
      },
      {
        threshold: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.35, 0.50, 0.75, 1.0],
        rootMargin: '20px 0px 20px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shouldPlay = Boolean(isActive && isOverviewTab && isInViewport && videoSrc && !hasError)

  // Synchronize playback with active project, viewport & tab state
  useEffect(() => {
    let cancelled = false
    const el = videoRef.current
    if (!el || !videoSrc || hasError) return

    if (shouldPlay) {
      // Sound enabled by default per userAudioEnabled preference
      const wantsSound = getAudioEnabled()
      el.muted = !wantsSound
      el.volume = 1

      if (el.paused) {
        // Enforce strict mutual exclusion: ensure all other videos are paused before playing
        document.querySelectorAll('video').forEach((v) => {
          if (v !== el && !v.paused) {
            v.pause()
          }
        })

        const playPromise = el.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (cancelled) return
              setIsPlaying(true)
            })
            .catch((err) => {
              if (cancelled) return
              if (err.name === 'NotAllowedError') {
                // Retry playback muted when unmuted autoplay is blocked by browser policy
                el.muted = true
                const retryPromise = el.play()
                if (retryPromise !== undefined) {
                  retryPromise
                    .then(() => {
                      if (cancelled) return
                      setIsPlaying(true)
                    })
                    .catch(() => {
                      if (cancelled) return
                      setIsPlaying(false)
                      setShowControls(true)
                    })
                } else {
                  setIsPlaying(true)
                }
              } else if (err.name !== 'AbortError') {
                setIsPlaying(false)
                setShowControls(true)
              }
            })
        }
      } else {
        setIsPlaying(true)
      }
    } else {
      if (!el.paused) {
        el.pause()
      }
      setIsPlaying(false)
      setShowControls(false)
    }

    return () => {
      cancelled = true
    }
  }, [shouldPlay, videoSrc, hasError])

  // Track volume changes to remember user's sound preference
  const handleVolumeChange = useCallback((e) => {
    const v = e.currentTarget
    if (!v.muted && v.volume > 0) {
      setAudioEnabled(true)
    } else if (v.muted) {
      setAudioEnabled(false)
    }
  }, [])

  // Cleanup timers on unmount
  useEffect(() => {
    const el = videoRef.current
    return () => {
      if (el && !el.paused) {
        el.pause()
      }
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current)
      }
    }
  }, [])

  // Auto-hide controls helper
  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    const el = videoRef.current
    if (el && !el.paused) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [])

  // Desktop hover: show controls, auto-hide after inactivity while playing
  const handlePointerEnter = useCallback(() => {
    setShowControls(true)
    scheduleHideControls()
  }, [scheduleHideControls])

  const handlePointerMove = useCallback(() => {
    setShowControls(true)
    scheduleHideControls()
  }, [scheduleHideControls])

  const handlePointerLeave = useCallback(() => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    const el = videoRef.current
    // Only hide if currently playing; if paused, keep controls visible
    if (el && !el.paused) {
      setShowControls(false)
    }
  }, [])

  // Click / Mobile Tap: show controls and schedule auto-hide
  const handleInteraction = useCallback(() => {
    setShowControls(true)
    scheduleHideControls()
  }, [scheduleHideControls])

  // Direct user-gesture play handler with sound enabled
  const handlePlayWithSound = useCallback((e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return

    setAudioEnabled(true)
    el.muted = false
    el.volume = 1

    document.querySelectorAll('video').forEach((v) => {
      if (v !== el && !v.paused) v.pause()
    })

    const playPromise = el.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          scheduleHideControls()
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setIsPlaying(false)
            setShowControls(true)
          }
        })
    }
  }, [scheduleHideControls])

  // If no playable video URL is resolved or an error occurred, render static overview image
  if (!videoSrc || hasError) {
    return (
      <img
        src={poster}
        alt={alt}
        className={`project-image project-active-media w-full h-full object-cover origin-center will-change-transform ${className}`}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className="project-overview-video-wrapper relative w-full h-full overflow-hidden bg-transparent select-none"
    >
      {/* Background Poster (prevents black flash during video buffering) */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
      )}

      {/* Prominent Play Control when overview video is in view but paused (e.g. audible autoplay blocked) */}
      {shouldPlay && !isPlaying && (
        <button
          type="button"
          onClick={handlePlayWithSound}
          aria-label="Play overview film with sound"
          className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-black/85 text-ivory flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl z-20 cursor-pointer border border-ivory/20 backdrop-blur-sm"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Overview Video with Dynamic Native Controls on Hover / Tap */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster || undefined}
        loop
        playsInline
        controls={showControls}
        controlsList="nodownload"
        preload={shouldPlay ? 'metadata' : 'none'}
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        onVolumeChange={handleVolumeChange}
        onPlay={() => {
          document.querySelectorAll('video').forEach((v) => {
            if (v !== videoRef.current && !v.paused) {
              v.pause()
            }
          })
          setIsPlaying(true)
          scheduleHideControls()
        }}
        onPause={() => {
          setIsPlaying(false)
          setShowControls(true)
        }}
        className={`project-image project-active-media w-full h-full object-cover origin-center rounded-none border-0 outline-none ${className}`}
      />
    </div>
  )
}
