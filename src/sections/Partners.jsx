import { useState, useRef, useEffect } from 'react'
import { partners } from '../data/siteData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { getPostPhilosophyStart } from '../utils/animations'
import { useTranslation } from '../hooks/useTranslation'

gsap.registerPlugin(ScrollTrigger)

function Partners({ isActive = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
const [incomingIndex, setIncomingIndex] = useState(null)
const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)
  const transitionTimeoutRef = useRef(null)
  const autoplayTimerRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const { t, tArray } = useTranslation()

  // Helper: resolve a per-partner translation key with fallback
  const tp = (partnerId, key) => t(`partners.p${partnerId}.${key}`)

  // Helper: resolve qualities array for active partner
  const getPartnerQualities = (partnerId) => {
    const qualities = tArray(`partners.p${partnerId}.qualities`)
    if (Array.isArray(qualities) && qualities.length > 0) return qualities
    const p = partners.find(item => item.id === partnerId)
    return p?.qualities || []
  }

  const currentPartner = partners[activeIndex]

  // Handle partner navigation
  const handleSelectPartner = (index) => {
    if (index === activeIndex || isTransitioning) return
    transitionToPartner(index)
  }

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? partners.length - 1 : activeIndex - 1
    handleSelectPartner(newIndex)
  }

  const handleNext = () => {
    const newIndex = activeIndex === partners.length - 1 ? 0 : activeIndex + 1
    handleSelectPartner(newIndex)
  }

  const handlePointerDown = (event) => {
    isDraggingRef.current = true
    touchStartX.current = event.clientX || (event.touches && event.touches[0].clientX)
    touchStartY.current = event.clientY || (event.touches && event.touches[0].clientY)
  }

  const handlePointerUp = (event) => {
    isDraggingRef.current = false
    if (isTransitioning) return

    const touchEndX = event.clientX || (event.changedTouches && event.changedTouches[0].clientX)
    const touchEndY = event.clientY || (event.changedTouches && event.changedTouches[0].clientY)
    
    if (touchEndX === undefined || touchStartX.current === undefined) return

    const deltaX = touchEndX - touchStartX.current
    const deltaY = touchEndY - touchStartY.current

    // Ignore gestures that are primarily vertical.
    if (Math.abs(deltaY) >= Math.abs(deltaX)) return

    const swipeThreshold = 50

    if (Math.abs(deltaX) < swipeThreshold) return

    if (deltaX < 0) {
      handleNext()
    } else {
      handlePrevious()
    }
  }

  const transitionToPartner = (newIndex) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setIncomingIndex(newIndex)

    // Kill any existing transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    const container = containerRef.current
    const oldImages = container?.querySelectorAll('.partner-stage-image')
    const newImages = container?.querySelectorAll('.partner-stage-image-next')
    const contents = container?.querySelectorAll('.partner-content')

    if (!oldImages || oldImages.length === 0 || !newImages || newImages.length === 0) {
      setActiveIndex(newIndex)
      setIncomingIndex(null)
      setIsTransitioning(false)
      return
    }

    // Animate out current content and image
    gsap.to(oldImages, {
      opacity: 0,
      x: 30,
      duration: 0.75,
      ease: 'power2.inOut',
    })

    if (contents && contents.length > 0) {
      gsap.to(contents, {
        opacity: 0,
        y: 16,
        duration: 0.65,
        ease: 'power2.inOut',
      })
    }

    // Animate in new image from left
    gsap.set(newImages, { opacity: 0, x: -30 })
    gsap.to(newImages, {
      opacity: 1,
      x: 0,
      duration: 0.85,
      ease: 'power2.inOut',
      delay: 0.1,
    })

    // Set the new active partner
    transitionTimeoutRef.current = setTimeout(() => {
      setActiveIndex(newIndex)

      // Animate in new content after index changes
      if (contents && contents.length > 0) {
        gsap.set(contents, { opacity: 0, y: 16 })
        gsap.to(contents, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          delay: 0.1,
        })
      }

      // Mark transition as complete
      transitionTimeoutRef.current = setTimeout(() => {
        // Reset primary images to opacity 1, x 0 (they now render the active partner via React)
        // and reset staging images back to opacity 0, x 0
        gsap.set(oldImages, { opacity: 1, x: 0 })
        gsap.set(newImages, { opacity: 0, x: 0 })
        setIncomingIndex(null)
        setIsTransitioning(false)
      }, 850)
    }, 450)
  }

  // Entrance animation on mount
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (context.conditions.reduceMotion) return
        const { isDesktop } = context.conditions

        gsap.from('.partners-section-intro', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'partners-intro',
            trigger: containerRef.current,
            start: isDesktop ? 'top 90%' : 'top 92%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })

        gsap.from('.partners-stage', {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'partners-stage',
            trigger: containerRef.current,
            start: isDesktop ? 'top 82%' : 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })

        gsap.from('.partners-nav-container', {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'partners-nav',
            trigger: containerRef.current,
            start: isDesktop ? 'top 75%' : 'top 78%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })
      }
    )
  }, { scope: containerRef })

  // Autoplay logic
  const startAutoplay = () => {
    clearTimeout(autoplayTimerRef.current)
    autoplayTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current && !isDraggingRef.current && !isTransitioning) {
        handleNext()
      } else {
        startAutoplay() // Retry
      }
    }, 5000)
  }

  useEffect(() => {
    startAutoplay()
    return () => clearTimeout(autoplayTimerRef.current)
  }, [activeIndex, isTransitioning])

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    clearTimeout(autoplayTimerRef.current)
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    startAutoplay()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [])


  return (
    <section
      id="partners"
      ref={containerRef}
      className="section-padding-x bg-ivory relative overflow-hidden"
    >
      <div className="section-focus-wrapper w-full">
      {/* Desktop: ~100vh stage */}
      <div className="hidden md:flex flex-col justify-center md:min-h-screen py-20">
        <div className="container-base">
          {/* Introduction */}
          <div className="partners-section-intro mb-20">
            <p className="eyebrow mb-4">{t('partners.eyebrow')}</p>
            <h2 className="display-heading text-5xl md:text-6xl lg:text-7xl max-w-2xl">
              {t('partners.headline')}
            </h2>
          </div>

          {/* Main presentation stage */}
          <div
            className="partners-stage grid grid-cols-2 gap-16 items-center select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Left: Partner information */}
            <div className="partner-content flex flex-col space-y-5">
              {/* Partner counter */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-neutral/80">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(partners.length).padStart(2, '0')}
                </span>
              </div>

              {/* Partner name */}
              <div>
                <h3 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-black leading-tight tracking-tight mb-2">
                  {tp(currentPartner.id, 'name') !== `partners.p${currentPartner.id}.name`
                    ? tp(currentPartner.id, 'name')
                    : currentPartner.name}
                </h3>

                {/* Designation */}
                <p className="font-body text-xs md:text-sm tracking-[0.16em] uppercase text-accent font-medium mb-1.5">
                  {tp(currentPartner.id, 'designation') !== `partners.p${currentPartner.id}.designation`
                    ? tp(currentPartner.id, 'designation')
                    : currentPartner.designation}
                </p>

                {/* Experience */}
                <p className="font-body text-xs tracking-[0.15em] uppercase text-neutral/80 font-medium pb-2 border-b border-neutral/15">
                  {tp(currentPartner.id, 'experience') !== `partners.p${currentPartner.id}.experience`
                    ? tp(currentPartner.id, 'experience')
                    : currentPartner.experience}
                </p>
              </div>

              {/* Biography */}
              <div className="body-copy max-w-lg text-sm md:text-[15px] leading-relaxed text-black/80 space-y-2.5 pt-1">
                {(tp(currentPartner.id, 'description') !== `partners.p${currentPartner.id}.description`
                  ? tp(currentPartner.id, 'description')
                  : currentPartner.description)
                  .split('\n\n')
                  .map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
              </div>

              {/* Key Qualities */}
              <div className="pt-3 border-t border-neutral/20 space-y-2">
                <p className="eyebrow text-[10px] tracking-widest text-neutral/60 uppercase">
                  {t('partners.qualitiesHeading')}
                </p>
                <div className="space-y-1.5">
                  {getPartnerQualities(currentPartner.id).map((quality, qIdx) => (
                    <div key={qIdx} className="flex items-start gap-2 text-xs leading-snug">
                      <span className="text-accent text-xs select-none shrink-0 mt-0.5" aria-hidden="true">—</span>
                      <div className="space-y-0.5">
                        <span className="font-body font-semibold text-black">{quality.title}: </span>
                        <span className="font-body text-neutral/70">{quality.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-6 pt-6 border-t border-neutral/20">
                <button
                  onClick={handlePrevious}
                  disabled={isTransitioning}
                  className="cta-link disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous partner"
                >
                  {t('partners.previous')}
                </button>
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="cta-link disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next partner"
                >
                  {t('partners.next')}
                </button>
              </div>
            </div>

            {/* Right: Partner image stage */}
            <div className="relative w-full max-w-[420px] h-[520px] mx-auto rounded-2xl overflow-hidden bg-neutral/10 border border-neutral/20 shadow-[0_16px_36px_rgba(23,23,22,0.06)]">
              {/* Current image */}
              <img
                src={currentPartner.image}
                alt={currentPartner.alt || currentPartner.name}
                className="partner-stage-image absolute inset-0 z-10 w-full h-full object-cover object-top"
              />

              <img
                src={
                  partners[
                    incomingIndex !== null
                      ? incomingIndex
                      : activeIndex
                  ].image
                }
                alt=""
                aria-hidden="true"
                className="partner-stage-image-next absolute inset-0 z-0 w-full h-full object-cover object-top opacity-0 pointer-events-none"
              />
            </div>
          </div>

          {/* Partner selector navigation */}
          <div className="partners-nav-container mt-16 flex flex-wrap gap-12 justify-start">
            {partners.map((partner, index) => {
              const partnerShortName = tp(partner.id, 'shortName') !== `partners.p${partner.id}.shortName`
                ? tp(partner.id, 'shortName')
                : partner.name
              return (
                <button
                  key={partner.id}
                  onClick={() => handleSelectPartner(index)}
                  disabled={isTransitioning}
                  className={`flex flex-col gap-1.5 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    index === activeIndex
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  aria-pressed={index === activeIndex}
                  aria-label={`Select ${partnerShortName}`}
                >
                  <span className="font-mono text-xs tracking-[0.18em] uppercase font-bold text-black">
                    {partner.number}
                  </span>
                  <span className="font-body text-xs tracking-[0.12em] uppercase text-black font-medium">
                    {partnerShortName}
                  </span>
                  {index === activeIndex && (
                    <span className="w-8 h-px bg-black mt-0.5" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden py-12 sm:py-16">
        <div className="container-base">
          {/* Introduction */}
          <div className="partners-section-intro mb-8">
            <p className="eyebrow mb-3">{t('partners.eyebrow')}</p>
            <h2 className="display-heading text-3xl sm:text-4xl">
              {t('partners.headline')}
            </h2>
          </div>

          {/* Partner counter */}
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-neutral/80">
              {String(activeIndex + 1).padStart(2, '0')} / {String(partners.length).padStart(2, '0')}
            </span>
          </div>

          {/* Swipeable container for mobile */}
          <div
            className="mobile-swipe-area select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Image stage */}
            <div
              className="partners-stage relative w-full max-w-[320px] h-[340px] sm:h-[380px] mx-auto rounded-xl overflow-hidden bg-neutral/10 border border-neutral/20 mb-6 touch-pan-y shadow-xs"
            >
              <img
                src={currentPartner.image}
                alt={currentPartner.alt || currentPartner.name}
                className="partner-stage-image relative z-10 w-full h-full object-cover object-top"
              />

              <img
                src={
                  partners[
                    incomingIndex !== null
                      ? incomingIndex
                      : activeIndex
                  ].image
                }
                alt=""
                aria-hidden="true"
                className="partner-stage-image-next absolute inset-0 z-0 w-full h-full object-cover object-top opacity-0 pointer-events-none"
              />
            </div>

            {/* Partner content */}
            <div className="partner-content space-y-4 mb-8">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-black leading-tight mb-1">
                  {tp(currentPartner.id, 'name') !== `partners.p${currentPartner.id}.name`
                    ? tp(currentPartner.id, 'name')
                    : currentPartner.name}
                </h3>
                <p className="font-body text-xs tracking-[0.16em] uppercase text-accent font-medium mb-1">
                  {tp(currentPartner.id, 'designation') !== `partners.p${currentPartner.id}.designation`
                    ? tp(currentPartner.id, 'designation')
                    : currentPartner.designation}
                </p>
                <p className="font-body text-[11px] tracking-[0.14em] uppercase text-neutral/80 font-medium pb-2 border-b border-neutral/15">
                  {tp(currentPartner.id, 'experience') !== `partners.p${currentPartner.id}.experience`
                    ? tp(currentPartner.id, 'experience')
                    : currentPartner.experience}
                </p>
              </div>

              <div className="body-copy text-xs sm:text-sm leading-relaxed text-black/80 space-y-2 pt-1">
                {(tp(currentPartner.id, 'description') !== `partners.p${currentPartner.id}.description`
                  ? tp(currentPartner.id, 'description')
                  : currentPartner.description)
                  .split('\n\n')
                  .map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
              </div>

              {/* Qualities */}
              <div className="pt-3 border-t border-neutral/20 space-y-2">
                <p className="eyebrow text-[9px] tracking-widest text-neutral/60 uppercase">
                  {t('partners.qualitiesHeading')}
                </p>
                <div className="space-y-1.5">
                  {getPartnerQualities(currentPartner.id).map((quality, qIdx) => (
                    <div key={qIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs leading-snug">
                      <span className="text-accent text-[11px] select-none shrink-0 mt-0.5" aria-hidden="true">—</span>
                      <div>
                        <span className="font-semibold text-black">{quality.title}: </span>
                        <span className="text-neutral/70">{quality.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between gap-4 mb-8 py-4 border-t border-b border-neutral/20">
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="cta-link disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous partner"
            >
              {t('partners.previous')}
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="cta-link disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next partner"
            >
              {t('partners.next')}
            </button>
          </div>

          {/* Partner selector */}
          <div className="partners-nav-container flex flex-wrap gap-4 justify-center">
            {partners.map((partner, index) => (
              <button
                key={partner.id}
                onClick={() => handleSelectPartner(index)}
                disabled={isTransitioning}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-neutral/30 ${
                  index === activeIndex
                    ? 'bg-black text-ivory border-black'
                    : 'bg-transparent hover:bg-neutral/10'
                }`}
                aria-pressed={index === activeIndex}
                aria-label={`Select ${tp(partner.id, 'name') !== 'partners.p' + partner.id + '.name' ? tp(partner.id, 'name') : partner.name}`}
              >
                <span className="font-mono text-xs font-bold">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Partners
