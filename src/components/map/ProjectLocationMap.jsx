import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from '../../hooks/useTranslation'

// Broad geographic viewport center for Deoband municipal region.
// NOTE: This represents map viewport context ONLY, NOT exact project coordinates.
export const BROAD_LOCATION_CENTER = [29.6975, 77.6766]
export const BROAD_ZOOM_LEVEL = 13
export const EXACT_ZOOM_LEVEL = 15

// Centralized tile provider configuration (OpenStreetMap with architectural dark filtering)
export const TILE_PROVIDER = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  options: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 11,
  },
}

function ProjectLocationMap({
  coordinates = null,
  locality = 'Deoband',
  region = 'Saharanpur, Uttar Pradesh',
  projectName = 'Raghavpuram',
  mapsUrl = null,
}) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const { t } = useTranslation()

  // Exact coordinate check — only finite numbers qualify
  const hasExactCoordinates =
    Number.isFinite(coordinates?.lat) &&
    Number.isFinite(coordinates?.lng)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Clean up any stale Leaflet instance before initializing
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const initialCenter = hasExactCoordinates
      ? [coordinates.lat, coordinates.lng]
      : BROAD_LOCATION_CENTER

    const initialZoom = hasExactCoordinates
      ? EXACT_ZOOM_LEVEL
      : BROAD_ZOOM_LEVEL

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      scrollWheelZoom: false, // Strict scroll safety: never intercept page wheel scrolling
      zoomControl: false,     // Replaced with custom minimalist controls
      attributionControl: true,
      dragging: true,
      touchZoom: 'center',    // Pinch/two-finger touch; never trap single-finger page scroll
    })

    L.tileLayer(TILE_PROVIDER.url, TILE_PROVIDER.options).addTo(map)

    // Future Exact Pin: Only render project marker when client supplies exact coordinates
    if (hasExactCoordinates) {
      const pinIcon = L.divIcon({
        className: 'project-exact-pin-wrapper',
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
            <span class="absolute w-6 h-6 rounded-full bg-[#5C493B]/40 animate-ping"></span>
            <span class="relative w-3.5 h-3.5 rounded-full bg-[#5C493B] border-2 border-[#F4F1EB] shadow-lg"></span>
            <span class="absolute top-5 font-mono text-[9px] tracking-[0.14em] uppercase text-[#F4F1EB] bg-[#131312]/90 px-2 py-0.5 rounded border border-[#F4F1EB]/20 whitespace-nowrap shadow-md">
              ${projectName}
            </span>
          </div>
        `,
        iconSize: [0, 0],
      })

      L.marker([coordinates.lat, coordinates.lng], { icon: pinIcon }).addTo(map)
    }

    mapInstanceRef.current = map

    // Ensure map tiles settle properly after container layout
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 120)

    // ResizeObserver detects container dimension changes and tab switches
    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize()
      })
      resizeObserver.observe(mapContainerRef.current)
    }

    return () => {
      clearTimeout(timer)
      if (resizeObserver) resizeObserver.disconnect()
      map.remove()
      mapInstanceRef.current = null
    }
  }, [hasExactCoordinates, coordinates?.lat, coordinates?.lng, projectName])

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn()
  }

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut()
  }

  return (
    <div className="project-location-real-map project-location-view relative w-full h-full bg-[#131312] flex flex-col overflow-hidden text-[#F4F1EB]">
      {/* ── MOBILE HEADER (Order 1 on mobile, hidden on desktop) ── */}
      <div className="shrink-0 w-full px-4 pt-3 pb-2.5 bg-[#131312] border-b border-[#F4F1EB]/10 md:hidden z-10">
        <p className="eyebrow text-[#5C493B] text-[9px] tracking-[0.2em] uppercase font-medium mb-0.5">
          {t('projects.locationLabel')}
        </p>
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-display text-xl text-[#F4F1EB] font-normal tracking-wide uppercase leading-tight">
            {locality}
          </h4>
          <p className="font-body text-[10px] tracking-[0.14em] uppercase text-[#F4F1EB]/60 font-light truncate">
            {region}
          </p>
        </div>
      </div>

      {/* ── MAP CANVAS (Dominant ~70% on desktop, fills available space on mobile) ── */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden">
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          style={{ background: '#131312' }}
        />

        {/* Subtle Broad Area Contextual Pill (Only when exact coordinates are not set) */}
        {!hasExactCoordinates && (
          <div className="absolute top-3 left-3 z-[400] pointer-events-none">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#F4F1EB]/75 bg-[#131312]/85 backdrop-blur-sm px-2.5 py-1 border border-[#F4F1EB]/15 rounded-xs select-none">
              {locality ? `${locality.toUpperCase()} AREA` : 'DEOBAND AREA'}
            </span>
          </div>
        )}

        {/* Minimalist Architectural Zoom Controls */}
        <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1 select-none">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="w-7 h-7 bg-[#131312]/85 hover:bg-[#131312] border border-[#F4F1EB]/20 text-[#F4F1EB] text-xs flex items-center justify-center transition-colors font-mono cursor-pointer"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="w-7 h-7 bg-[#131312]/85 hover:bg-[#131312] border border-[#F4F1EB]/20 text-[#F4F1EB] text-xs flex items-center justify-center transition-colors font-mono cursor-pointer"
          >
            −
          </button>
        </div>
      </div>

      {/* ── DESKTOP BOTTOM BAR (Hidden on mobile, dominant footer on desktop) ── */}
      <div className="hidden md:flex shrink-0 w-full px-6 py-4 bg-[#131312] border-t border-[#F4F1EB]/15 items-center justify-between z-10">
        <div>
          <p className="eyebrow text-[#5C493B] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
            {t('projects.locationLabel')}
          </p>
          <div className="flex items-baseline gap-3">
            <h4 className="font-display text-2xl lg:text-3xl text-[#F4F1EB] font-normal tracking-wide uppercase leading-none">
              {locality}
            </h4>
            <span className="text-[#5C493B] text-xs select-none" aria-hidden="true">—</span>
            <p className="font-body text-xs tracking-[0.16em] uppercase text-[#F4F1EB]/70 font-light">
              {region}
            </p>
          </div>
        </div>

        {/* Open in Maps CTA (Strictly rendered ONLY when verified mapsUrl !== null) */}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-open-maps-link inline-flex items-center gap-2 font-body text-xs tracking-[0.16em] uppercase text-[#5C493B] hover:text-[#F4F1EB] transition-colors group"
          >
            <span>{t('projects.locationOpenMaps')}</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>

      {/* ── MOBILE OPEN IN MAPS (Only when verified mapsUrl !== null) ── */}
      {mapsUrl && (
        <div className="shrink-0 w-full px-4 py-2.5 bg-[#131312] border-t border-[#F4F1EB]/10 md:hidden z-10">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-open-maps-link inline-flex items-center gap-2 font-body text-xs tracking-[0.16em] uppercase text-[#5C493B] hover:text-[#F4F1EB] transition-colors"
          >
            <span>{t('projects.locationOpenMaps')}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default ProjectLocationMap
