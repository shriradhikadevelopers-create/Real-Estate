import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return '00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ProjectVideoPlayer({
  src,
  poster = null,
  title = 'Project Film',
  isActiveTab = false,
  className = '',
}) {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const scrubBarRef = useRef(null)
  const hideControlsTimerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPiPAvailable, setIsPiPAvailable] = useState(false)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isDraggingScrub, setIsDraggingScrub] = useState(false)
  const [isHoveringVolume, setIsHoveringVolume] = useState(false)

  // Check Picture-in-Picture capability
  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setIsPiPAvailable(Boolean(document.pictureInPictureEnabled))
    }
  }, [])

  // Auto-pause whenever the Video tab is no longer active
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!isActiveTab && !video.paused) {
      video.pause()
      setIsPlaying(false)
    }
  }, [isActiveTab])

  // Pause on unmount
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

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      const fsEl =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      setIsFullscreen(Boolean(fsEl && fsEl === containerRef.current))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
    }
  }, [])

  // Auto-hide controls during playback
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true)
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    if (isPlaying && !isDraggingScrub) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }, [isPlaying, isDraggingScrub])

  useEffect(() => {
    resetControlsTimeout()
  }, [isPlaying, resetControlsTimeout])

  // Video Event Handlers
  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    setDuration(video.duration || 0)
    setHasError(false)
    setIsLoading(false)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || isDraggingScrub) return
    setCurrentTime(video.currentTime)

    // Calculate buffered percentage
    if (video.buffered.length > 0 && video.duration > 0) {
      const end = video.buffered.end(video.buffered.length - 1)
      setBuffered(Math.min(1, end / video.duration))
    }
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleWaiting = () => setIsLoading(true)
  const handleCanPlay = () => setIsLoading(false)
  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    setIsPlaying(false)
  }
  const handleEnded = () => {
    setIsPlaying(false)
    setShowControls(true)
  }

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused || video.ended) {
      video.play().catch((err) => {
        console.warn('[ProjectVideoPlayer] Play interrupted or denied:', err)
      })
    } else {
      video.pause()
    }
  }, [])

  // Mute / Unmute Toggle
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted && volume === 0) {
      video.volume = 0.5
      setVolume(0.5)
    }
  }

  // Volume Change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return
    video.volume = newVol
    setVolume(newVol)
    if (newVol === 0) {
      video.muted = true
      setIsMuted(true)
    } else if (isMuted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  // Playback Speed Cycle
  const cycleSpeed = () => {
    const video = videoRef.current
    if (!video) return
    const currentIdx = SPEEDS.indexOf(playbackSpeed)
    const nextIdx = (currentIdx + 1) % SPEEDS.length
    const nextSpeed = SPEEDS[nextIdx]
    video.playbackRate = nextSpeed
    setPlaybackSpeed(nextSpeed)
  }

  // Fullscreen Toggle
  const toggleFullscreen = async () => {
    const container = containerRef.current
    if (!container) return

    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen()
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen()
        }
        // Gracefully attempt landscape lock on supported devices
        try {
          if (screen.orientation?.lock) {
            await screen.orientation.lock('landscape').catch(() => {})
          }
        } catch {
          // Ignore orientation lock failures
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        }
      }
    } catch (err) {
      console.warn('[ProjectVideoPlayer] Fullscreen toggle error:', err)
    }
  }

  // Picture-in-Picture Toggle
  const togglePiP = async () => {
    const video = videoRef.current
    if (!video || !isPiPAvailable) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setIsPiPActive(false)
      } else {
        await video.requestPictureInPicture()
        setIsPiPActive(true)
      }
    } catch (err) {
      console.warn('[ProjectVideoPlayer] PiP toggle error:', err)
    }
  }

  // Seek Handling
  const seekToPosition = (clientX) => {
    const bar = scrubBarRef.current
    const video = videoRef.current
    if (!bar || !video || duration === 0) return

    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const targetTime = ratio * duration
    video.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  const handleScrubPointerDown = (e) => {
    setIsDraggingScrub(true)
    seekToPosition(e.clientX)

    const onPointerMove = (moveEvent) => {
      seekToPosition(moveEvent.clientX)
    }

    const onPointerUp = () => {
      setIsDraggingScrub(false)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  // Keyboard Accessibility
  const handleKeyDown = (e) => {
    const video = videoRef.current
    if (!video) return

    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault()
        togglePlay()
        break
      case 'ArrowLeft':
      case 'j':
        e.preventDefault()
        video.currentTime = Math.max(0, video.currentTime - 5)
        break
      case 'ArrowRight':
      case 'l':
        e.preventDefault()
        video.currentTime = Math.min(duration, video.currentTime + 5)
        break
      case 'm':
      case 'M':
        e.preventDefault()
        toggleMute()
        break
      case 'f':
      case 'F':
        e.preventDefault()
        toggleFullscreen()
        break
      default:
        break
    }
    resetControlsTimeout()
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferedPercent = buffered * 100

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={title}
      onKeyDown={handleKeyDown}
      onMouseMove={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false)
      }}
      className={`project-video-container relative w-full h-full bg-black overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-ivory/50 ${className}`}
    >
      {/* Native HTML5 Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster || undefined}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onEnded={handleEnded}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-12 h-12 border-2 border-ivory/20 border-t-ivory rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 px-6 text-center z-20">
          <p className="eyebrow text-neutral/50 mb-2">{title}</p>
          <p className="font-display text-xl text-ivory/90 mb-1">{t('projects.videoUnavailable')}</p>
        </div>
      )}

      {/* Center Big Play Button (when paused and not error) */}
      {!isPlaying && !hasError && !isLoading && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={t('projects.videoPlay')}
          className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/55 backdrop-blur-md border border-ivory/30 text-ivory flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 z-10"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8 translate-x-0.5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Top Overlay Badge */}
      <div
        className={`absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none transition-opacity duration-300 z-10 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/80 font-medium">
          {title}
        </span>
      </div>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 pt-8 pb-3 px-3 sm:px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-10 ${
          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber / Progress Bar */}
        <div
          ref={scrubBarRef}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={currentTime}
          onPointerDown={handleScrubPointerDown}
          className="relative w-full h-4 sm:h-5 flex items-center cursor-pointer group"
        >
          {/* Background Track */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative transition-all duration-200 group-hover:h-1.5">
            {/* Buffered Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-150"
              style={{ width: `${bufferedPercent}%` }}
            />
            {/* Played Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Scrubber Thumb */}
          <div
            className="absolute w-3 h-3 bg-ivory rounded-full shadow-md -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2 mt-1 sm:mt-2 text-ivory/90">
          {/* Left Controls: Play/Pause, Volume, Time */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? t('projects.videoPause') : t('projects.videoPlay')}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsHoveringVolume(true)}
              onMouseLeave={() => setIsHoveringVolume(false)}
            >
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? t('projects.videoUnmute') : t('projects.videoMute')}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              {/* Desktop Slider on Hover */}
              <div
                className={`hidden md:flex items-center overflow-hidden transition-all duration-200 ${
                  isHoveringVolume ? 'w-20 opacity-100 ml-1' : 'w-0 opacity-0 pointer-events-none'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label={t('projects.videoVolume')}
                  className="w-18 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>

            {/* Time Display */}
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-ivory/70 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls: Speed, PiP, Fullscreen */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Playback Speed Button */}
            <button
              type="button"
              onClick={cycleSpeed}
              aria-label={`${t('projects.videoSpeed')} (${playbackSpeed}x)`}
              className="px-2 py-1 rounded text-[11px] font-mono font-medium tracking-wider text-ivory/80 hover:text-ivory hover:bg-white/10 transition-colors"
            >
              {playbackSpeed}×
            </button>

            {/* Picture-in-Picture Button */}
            {isPiPAvailable && (
              <button
                type="button"
                onClick={togglePiP}
                aria-label={t('projects.videoPip')}
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors ${
                  isPiPActive ? 'text-accent' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z" />
                </svg>
              </button>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('projects.videoExitFullscreen') : t('projects.videoFullscreen')}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-ivory/80 hover:text-ivory hover:bg-white/10 transition-colors"
            >
              {isFullscreen ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
