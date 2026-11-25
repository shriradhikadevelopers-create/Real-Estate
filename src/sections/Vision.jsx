import { useState, useEffect, useRef, useCallback } from 'react'
import { projects } from '../data/siteData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { getPostPhilosophyStart } from '../utils/animations'
import { useTranslation } from '../hooks/useTranslation'

// Carousel images
import raghavpuramCarouselImg from '../assets/carousel/RAGHAVPURAM.webp'
import vrindavanCarouselImg from '../assets/carousel/VRINDA_IMG4.webp'
import suvidhaCarouselImg from '../assets/carousel/SUVIDHA_IMG4.webp'
import signatureCarouselImg from '../assets/carousel/SIGNATURE_IMG2.webp'
import cityComplexCarouselImg from '../assets/carousel/CITY_COMPLEX_IMG3.webp'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('premiumReveal', '0.22, 1, 0.36, 1')

const AUTOPLAY_INTERVAL = 5000 // 5.0 seconds per slide

// Exact website project sequence:
// 1. Raghavpuram (01)
// 2. Vrindavan Vihar (03)
// 3. Suvidha Plaza (04)
// 4. Signature Tower (05)
// 5. City Complex (02)
const CAROUSEL_PROJECT_ORDER = [
  { id: '01', image: raghavpuramCarouselImg },
  { id: '03', image: vrindavanCarouselImg },
  { id: '04', image: suvidhaCarouselImg },
  { id: '05', image: signatureCarouselImg },
  { id: '02', image: cityComplexCarouselImg },
]

function Vision() {
  const containerRef = useRef(null)
  const { t, tArray } = useTranslation()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const activeBarRef = useRef(null)
  const startTimeRef = useRef(performance.now())
  const pausedAtRef = useRef(null)
  const lastStepRef = useRef(0)
  const animationFrameRef = useRef(null)

  // Preload and decode all five carousel images on mount
  useEffect(() => {
    CAROUSEL_PROJECT_ORDER.forEach((item) => {
      const img = new Image()
      img.src = item.image
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {})
      }
    })
  }, [])

  // Helper for per-project translations
  const tp = useCallback((projectId, field) => {
    const key = `projects.p${projectId}.${field}`
    const val = t(key)
    return val !== key ? val : undefined
  }, [t])

  // Build projects data in exact carousel sequence with respective Google Maps links
  const carouselProjects = CAROUSEL_PROJECT_ORDER.map((item) => {
    const proj = projects.find((p) => p.id === item.id) || {}
    const name = tp(item.id, 'name') || proj.name || ''
    const category = tp(item.id, 'category') || proj.category || ''
    const location = tp(item.id, 'location') || proj.location || ''
    const description = tp(item.id, 'description') || proj.description || ''
    const number = proj.number || `0${item.id}`

    return {
      ...item,
      number,
      name,
      category,
      location,
      description,
    }
  })

  const currentProject = carouselProjects[currentIndex] || carouselProjects[0]

  // Slide navigation
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PROJECT_ORDER.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_PROJECT_ORDER.length) % CAROUSEL_PROJECT_ORDER.length)
  }, [])

  const handleSelectSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  // Keyboard navigation for progress tabs
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'Home') {
      e.preventDefault()
      handleSelectSlide(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      handleSelectSlide(CAROUSEL_PROJECT_ORDER.length - 1)
    }
  }, [handleNext, handlePrev, handleSelectSlide])

  // Navigate to project detail view in page
  const handleNavigate = useCallback((projectId, e) => {
    if (e) e.preventDefault()
    const targetHash = `#project-${projectId}`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      window.dispatchEvent(new Event('hashchange'))
    }

    const target =
      document.getElementById(`project-${projectId}`) ||
      document.querySelector(`[data-project-id="${projectId}"]`)
    if (target) {
      const headerOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Navigate to project location section in page
  const handleNavigateLocation = useCallback((projectId, e) => {
    if (e) e.preventDefault()
    const targetHash = `#project-${projectId}-location`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      window.dispatchEvent(new Event('hashchange'))
    }

    const target =
      document.getElementById(`project-${projectId}-location`) ||
      document.getElementById(`project-${projectId}`)
    if (target) {
      const headerOffset = 100
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener?.('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleMotionChange)
    }
  }, [])

  // Continuous independent autoplay clock
  useEffect(() => {
    if (prefersReducedMotion) {
      if (activeBarRef.current) {
        activeBarRef.current.style.width = '100%'
      }
      return
    }

    const loop = () => {
      const now = performance.now()
      const totalElapsed = now - startTimeRef.current
      const currentStep = Math.floor(totalElapsed / AUTOPLAY_INTERVAL)
      const elapsedInCycle = totalElapsed % AUTOPLAY_INTERVAL
      const progressRatio = Math.min(elapsedInCycle / AUTOPLAY_INTERVAL, 1)

      // Silky 60fps width update on the active progress bar directly without React re-render
      if (activeBarRef.current) {
        activeBarRef.current.style.width = `${progressRatio * 100}%`
      }

      // When cycle completes, advance slide
      if (currentStep !== lastStepRef.current) {
        lastStepRef.current = currentStep
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PROJECT_ORDER.length)
      }

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pausedAtRef.current = performance.now()
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      } else {
        if (pausedAtRef.current != null) {
          const pauseDuration = performance.now() - pausedAtRef.current
          startTimeRef.current += pauseDuration
          pausedAtRef.current = null
        }
        animationFrameRef.current = requestAnimationFrame(loop)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [prefersReducedMotion])

  // GSAP Entrance animations
  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Desktop entrance
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from('.vision-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'vision-desktop-eyebrow',
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      })

      gsap.utils.toArray('.vision-headline').forEach((line, i) => {
        gsap.from(line, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            id: `vision-desktop-headline-${i}`,
            trigger: line.parentElement || line,
            start: 'top 86%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          }
        })
      })

      gsap.from('.vision-showcase-container', {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'vision-desktop-showcase',
          trigger: '.vision-showcase-container',
          start: getPostPhilosophyStart('top 85%'),
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      })
    })

    // Mobile entrance
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from('.vision-eyebrow', {
        opacity: 0,
        y: 15,
        duration: 0.8,
        scrollTrigger: {
          id: 'vision-mobile-eyebrow',
          trigger: containerRef.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      })

      gsap.utils.toArray('.vision-headline').forEach((line, i) => {
        gsap.from(line, {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          delay: i * 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            id: `vision-mobile-headline-${i}`,
            trigger: line.parentElement || line,
            start: 'top 88%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          }
        })
      })

      gsap.from('.vision-showcase-container', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        scrollTrigger: {
          id: 'vision-mobile-showcase',
          trigger: '.vision-showcase-container',
          start: getPostPhilosophyStart('top 90%'),
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      })
    })
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding-x py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-ivory overflow-hidden relative"
    >
      <div id="vision" className="absolute top-0 left-0 scroll-mt-28 pointer-events-none" />
      <div className="section-focus-wrapper w-full">
        <div className="container-base">
          {/* Eyebrow */}
          <p className="vision-eyebrow eyebrow mb-6 md:mb-16">
            {t('vision.eyebrow')}
          </p>

          {/* Headline */}
          <div className="max-w-5xl mb-8 md:mb-16">
            {tArray('vision.headlineLines').map((line, index) => (
              <div key={index} className="vision-headline-wrapper overflow-hidden pb-1 md:pb-2">
                <h2 className="vision-headline display-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  {line}
                </h2>
              </div>
            ))}
          </div>

          {/* Interactive Editorial Showcase */}
          <div
            className="vision-showcase-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
            role="region"
            aria-roledescription="carousel"
            aria-label="Editorial project showcase"
          >
            {/* Left Panel: Project Image + Navigation */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-4 sm:gap-5">
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral/10 overflow-hidden rounded-[2px] shadow-sm">
                {carouselProjects.map((item, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                      aria-hidden={!isActive}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ease-out origin-center ${
                          isActive ? 'scale-100' : 'scale-105'
                        }`}
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  )
                })}

                {/* Restrained Project Number Overlay */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-ivory/90 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-ivory/15 select-none rounded-[2px]">
                    Project {currentProject.number || `0${currentIndex + 1}`}
                  </span>
                </div>

                {/* Clickable Image Overlay to Project Details */}
                <a
                  href={`#project-${currentProject.id}`}
                  onClick={(e) => handleNavigate(currentProject.id, e)}
                  className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label={`View ${currentProject.name} project details`}
                >
                  <span className="sr-only">View {currentProject.name} details</span>
                </a>
              </div>

              {/* Navigation & Progress segments */}
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="flex items-center gap-3">
                  {/* Small 01 / 05 Counter */}
                  <span className="font-mono text-xs tracking-widest text-neutral shrink-0 select-none font-medium">
                    0{currentIndex + 1} <span className="opacity-40">/</span> 0{carouselProjects.length}
                  </span>

                  {/* Five Thin Horizontal Progress Segments */}
                  <div
                    role="tablist"
                    aria-label="Project showcase slides"
                    onKeyDown={handleKeyDown}
                    className="flex-1 flex items-center gap-1.5 sm:gap-2"
                  >
                    {carouselProjects.map((proj, idx) => {
                      const isActive = idx === currentIndex
                      const isPast = idx < currentIndex
                      return (
                        <button
                          key={proj.id}
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Slide ${idx + 1}: ${proj.name}`}
                          type="button"
                          onClick={() => handleSelectSlide(idx)}
                          className="group relative flex-1 h-6 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-[2px]"
                        >
                          <div className="w-full h-[2px] bg-neutral/25 rounded-full overflow-hidden relative transition-colors duration-200 group-hover:bg-neutral/50">
                            <div
                              ref={isActive ? activeBarRef : null}
                              className={`h-full bg-black ${
                                isActive ? '' : isPast ? 'w-full' : 'w-0'
                              }`}
                              style={isActive ? { width: '0%' } : undefined}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Understated Project Names Navigation */}
                <div className="hidden sm:flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-neutral/70 pt-0.5">
                  {carouselProjects.map((proj, idx) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => handleSelectSlide(idx)}
                      className={`transition-colors duration-200 hover:text-black cursor-pointer truncate max-w-[19%] text-left ${
                        idx === currentIndex ? 'text-black font-semibold' : 'text-neutral/70'
                      }`}
                    >
                      0{idx + 1} {proj.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Dynamic Project Information */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between py-1 min-h-[220px] sm:min-h-[260px]">
              <div key={currentProject.id} className="space-y-3 sm:space-y-4 transition-opacity duration-300">
                {/* Category */}
                <p className="font-body text-xs tracking-[0.18em] uppercase text-accent font-medium">
                  {currentProject.category}
                </p>

                {/* Project Name (Clickable link to project details) */}
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-black font-medium tracking-tight leading-tight">
                  <a
                    href={`#project-${currentProject.id}`}
                    onClick={(e) => handleNavigate(currentProject.id, e)}
                    className="hover:text-accent focus-visible:text-accent transition-colors duration-200 outline-none focus-visible:underline decoration-1 underline-offset-4 cursor-pointer inline-block"
                    aria-label={`View ${currentProject.name} project details`}
                  >
                    {currentProject.name}
                  </a>
                </h3>

                {/* Location (Internal link to project's Location section) */}
                <div className="font-body text-xs tracking-[0.14em] uppercase text-neutral flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-accent/80 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <a
                    href={`#project-${currentProject.id}-location`}
                    onClick={(e) => handleNavigateLocation(currentProject.id, e)}
                    className="hover:text-black focus-visible:text-black transition-colors duration-200 outline-none group/loc inline-flex items-center gap-1 cursor-pointer"
                    aria-label={`View ${currentProject.name} location section`}
                    title={`View ${currentProject.name} location section`}
                  >
                    <span className="border-b border-neutral/40 group-hover/loc:border-black transition-colors">
                      {currentProject.location}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] text-accent opacity-80 group-hover/loc:opacity-100 group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5 transition-all"
                    >
                      →
                    </span>
                  </a>
                </div>

                {/* Description */}
                <p className="body-copy text-sm sm:text-base text-black/80 leading-relaxed pt-1">
                  {currentProject.description}
                </p>
              </div>

              {/* Explore Project CTA Link */}
              <div className="pt-6 mt-6 border-t border-neutral/20">
                <a
                  href={`#project-${currentProject.id}`}
                  onClick={(e) => handleNavigate(currentProject.id, e)}
                  className="inline-flex items-center gap-2 font-body text-xs sm:text-sm tracking-[0.16em] uppercase text-black hover:text-accent font-medium transition-colors group cursor-pointer"
                >
                  <span>{t('vision.exploreProject') || 'Explore Project'}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
