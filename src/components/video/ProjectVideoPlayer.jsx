import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { getAudioEnabled, setAudioEnabled } from '../../utils/videoResolver'

/**
 * ProjectVideoPlayer
 *
 * Clean, responsive video player for the Project Video ("film") section.
 * Features:
 * - Dynamic native controls on desktop hover (auto-hides after 3s inactivity while playing).
 * - Tap to access native controls on mobile.
 * - Unblocked native controls: zero invisible overlays intercepting clicks.
 * - Maintains intrinsic 16:9 widescreen aspect ratio without distortion.
 * - Zero black letterbox bars, zero borders, zero outlines, zero background frames.
 * - Automatically pauses playback when switching tabs or navigating away.
 */
export default function ProjectVideoPlayer({
  src,
  poster = null,
  title = '',
  isActiveTab = false,
  className = '',
}) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const hideControlsTimerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true) // Visible initially so user sees play control
  const [hasError, setHasError] = useState(false)

  // Auto-hide controls helper
  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    const video = videoRef.current
    if (video && !video.paused) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [])

  // Synchronize playback with active tab and selected video source
  useEffect(() => {
    let cancelled = false
    const video = videoRef.current
    if (!video || !src || hasError) return

    if (isActiveTab) {
      // Sound enabled by default per userAudioEnabled preference
      const wantsSound = getAudioEnabled()
      video.muted = !wantsSound
      video.volume = 1

      // Mutual exclusion: pause all other videos before starting
      document.querySelectorAll('video').forEach((v) => {
        if (v !== video && !v.paused) {
          v.pause()
        }
      })

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (cancelled) return
            setIsPlaying(true)
            scheduleHideControls()
          })
          .catch((err) => {
            if (cancelled) return
            if (err.name === 'NotAllowedError') {
              // Retry playback muted when unmuted autoplay is blocked by browser policy
              video.muted = true
              const retryPromise = video.play()
              if (retryPromise !== undefined) {
                retryPromise
                  .then(() => {
                    if (cancelled) return
                    setIsPlaying(true)
                    scheduleHideControls()
                  })
                  .catch(() => {
                    if (cancelled) return
                    setIsPlaying(false)
                    setShowControls(true)
                  })
              } else {
                setIsPlaying(true)
                scheduleHideControls()
              }
            } else if (err.name !== 'AbortError') {
              setIsPlaying(false)
              setShowControls(true)
            }
          })
      }
    } else {
      if (!video.paused) {
        video.pause()
      }
      setIsPlaying(false)
      setShowControls(true)
    }

    return () => {
      cancelled = true
    }
  }, [isActiveTab, src, hasError, scheduleHideControls])

  // Auto-pause when scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const video = videoRef.current
          if (video && !video.paused) {
            video.pause()
            setIsPlaying(false)
            setShowControls(true)
          }
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    const video = videoRef.current
    return () => {
      if (video && !video.paused) {
        video.pause()
      }
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current)
      }
    }
  }, [])

  // Desktop Hover Handlers
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
    const video = videoRef.current
    // Only hide if playing; when paused, leave controls visible
    if (video && !video.paused) {
      setShowControls(false)
    }
  }, [])

  // Click & Mobile Tap Handlers
  const handleInteraction = useCallback(() => {
    setShowControls(true)
    scheduleHideControls()
  }, [scheduleHideControls])

  // Track volume changes to remember user's sound preference
  const handleVolumeChange = useCallback((e) => {
    const v = e.currentTarget
    if (!v.muted && v.volume > 0) {
      setAudioEnabled(true)
    } else if (v.muted) {
      setAudioEnabled(false)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className={`project-video-container relative w-full h-full bg-transparent overflow-hidden select-none border-0 outline-none ${className}`}
    >
      {!hasError ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          playsInline
          preload="metadata"
          controls={showControls}
          controlsList="nodownload"
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
          onError={() => setHasError(true)}
          className="w-full h-full object-contain bg-transparent border-0 outline-none rounded-none"
        />
      ) : (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/90 text-ivory select-none">
          {poster && (
            <img
              src={poster}
              alt={title || 'Project Film'}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] grayscale"
            />
          )}
          <div className="relative z-10 p-6 max-w-md text-center flex flex-col items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mb-3 animate-pulse" aria-hidden="true" />
            <p className="font-display text-lg sm:text-xl text-ivory font-medium tracking-tight mb-2">
              {title || 'Project Film'}
            </p>
            <p className="font-body text-xs text-ivory/70 tracking-wide leading-relaxed mb-1">
              {t('projects.videoUnavailable') || 'Video currently unavailable in browser format'}
            </p>
            <p className="font-mono text-[10px] text-ivory/45 uppercase tracking-widest mt-1">
              Format: HEVC / H.265 (Awaiting Web Encoding)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
