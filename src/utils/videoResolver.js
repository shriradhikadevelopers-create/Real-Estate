/**
 * Centralized Video URL Resolver & Playback Audio State
 * 
 * Manages video streaming source resolution between environments:
 * - Both Development & Production:
 *   Prioritizes verified public Vercel Blob URLs for all projects so developers test
 *   the exact same media delivery as production.
 * - Development fallback (import.meta.env.DEV):
 *   Falls back to local video assets (localSrc) only when no valid Blob URL is configured,
 *   allowing local testing during offline work or pre-upload development.
 * - Production (!import.meta.env.DEV):
 *   Strictly uses verified Blob URLs only. Does NOT fall back to local video assets,
 *   preventing gigabytes of video binaries from being bundled into dist/ or uploaded
 *   in deployment payloads.
 */

/**
 * Global audio playback state and preference.
 * Defaults to sound enabled (true) per project specification.
 */
let userAudioEnabled = true

export function getAudioEnabled() {
  return userAudioEnabled
}

export function setAudioEnabled(enabled) {
  userAudioEnabled = Boolean(enabled)
}

/**
 * Resolves the appropriate playable video URL for a given video entry.
 *
 * Resolution Priority:
 * 1. Verified public Vercel Blob URLs are preferred in BOTH development and production.
 * 2. In local development (import.meta.env.DEV): falls back to local video assets (localSrc)
 *    only when no valid Blob URL is configured.
 * 3. In production (!import.meta.env.DEV): strictly rejects local filesystem paths or
 *    unverified remote URLs.
 *
 * @param {Object|string|null} video - Video entry from project data or string URL
 * @returns {string|null} - Playable URL for the current environment, or null
 */
export function resolveVideoUrl(video) {
  if (!video) return null

  // 1. Preferred in BOTH development and production: valid public Vercel Blob URL
  const remoteUrl =
    typeof video === 'string'
      ? video
      : (video.blobUrl || (typeof video.src === 'string' && video.src.startsWith('http') ? video.src : null))

  if (
    remoteUrl &&
    typeof remoteUrl === 'string' &&
    remoteUrl.startsWith('https://') &&
    remoteUrl.includes('.public.blob.vercel-storage.com/')
  ) {
    return remoteUrl
  }

  // 2. Development-only fallback: local video asset path when no valid Blob URL is configured
  if (import.meta.env.DEV) {
    const local =
      (typeof video === 'object' && video.localSrc) ||
      (typeof video === 'string' && !video.startsWith('http') ? video : null)
    if (local) {
      return encodeURI(decodeURI(local))
    }
  }

  // 3. Strictly reject local filesystem paths and unverified remote URLs in production
  return null
}

/**
 * Derives a clean, human-readable title for a video entry.
 *
 * @param {Object|string|null} video - Video entry or URL
 * @param {string} fallback - Fallback title if none can be derived
 * @returns {string} - Formatted title
 */
export function deriveCleanVideoTitle(video, fallback = 'Project Film') {
  if (!video) return fallback

  // 1. Check title property
  if (video.title && typeof video.title === 'string' && video.title.trim()) {
    return video.title.trim()
  }

  // 2. Check label property
  if (video.label && typeof video.label === 'string' && video.label.trim()) {
    return video.label.trim()
  }

  // 3. Derive from localSrc, blobUrl, or src filename
  const rawPath =
    typeof video === 'string'
      ? video
      : video.localSrc || video.blobUrl || video.src || ''

  if (typeof rawPath === 'string' && rawPath.trim()) {
    const filename = rawPath.split('/').pop().split('?')[0]
    const baseName = filename.replace(/\.[^/.]+$/, '')

    const cleaned = baseName
      .replace(/[_-]+/g, ' ')
      .replace(/VID(\d+)/gi, 'Video $1')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ')

    if (cleaned) return cleaned
  }

  return fallback
}

