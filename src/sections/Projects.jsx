import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects } from '../data/siteData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import { getPostPhilosophyStart } from '../utils/animations'
import { useTranslation } from '../hooks/useTranslation'
import ProjectVideoPlayer from '../components/video/ProjectVideoPlayer'
import ProjectOverviewVideo from '../components/video/ProjectOverviewVideo'
import ProjectLocationMap from '../components/map/ProjectLocationMap'
import { resolveVideoUrl, deriveCleanVideoTitle } from '../utils/videoResolver'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create('premiumReveal', '0.22, 1, 0.36, 1')

const INACTIVE_PROJECT_FILTER = 'grayscale(1) brightness(0.85)'
const ACTIVE_PROJECT_FILTER = 'grayscale(0) brightness(1)'

function restoreInactiveProjectMedia(article) {
  const media = article.querySelectorAll('.project-desktop-image-inner .project-image, .project-mobile-image-inner .project-image')
  const wrappers = article.querySelectorAll('.project-image-wrapper, .project-image-inner, .project-media-layer')

  media.forEach((el) => {
    if (el.closest('.project-placeholder-media, .project-gallery-frame, .project-video-container, .project-location-view')) return
    gsap.killTweensOf(el, 'filter')
    gsap.to(el, {
      filter: INACTIVE_PROJECT_FILTER,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  })

  wrappers.forEach((el) => {
    gsap.set(el, {
      mixBlendMode: 'normal',
      boxShadow: 'none',
      backdropFilter: 'none',
      filter: 'none',
    })
  })
}

const TAB_OUT_DURATION = 0.28
const TAB_IN_DURATION = 0.4
const GALLERY_FADE = 0.38

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getProjectArticle(container, projectId) {
  return container?.querySelector(`[data-project-id="${projectId}"]`)
}

function getMediaLayer(article, layer) {
  return article?.querySelector(
    layer === 'desktop'
      ? '.project-desktop-image-inner .project-media-layer'
      : '.project-mobile-image-inner .project-media-layer'
  )
}

function syncProjectMediaFilter(article, isFocused) {
  if (!article) return

  const media = article.querySelectorAll('.project-desktop-image-inner .project-image, .project-mobile-image-inner .project-image')
  media.forEach((el) => {
    if (el.closest('.project-placeholder-media, .project-gallery-frame, .project-video-container, .project-location-view')) return
    gsap.killTweensOf(el, 'filter')
    gsap.set(el, {
      filter: isFocused ? ACTIVE_PROJECT_FILTER : INACTIVE_PROJECT_FILTER,
    })
  })
}

function applyProjectFocusState(container, activeIndex, isActive) {
  if (!container) return

  const articles = Array.from(container.querySelectorAll('.project-article'))
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  articles.forEach((article, index) => {
    const isFocused = isActive && index === activeIndex
    const media = article.querySelectorAll('.project-desktop-image-inner .project-image, .project-mobile-image-inner .project-image')

    if (!isFocused) {
      restoreInactiveProjectMedia(article)
    } else {
      media.forEach((el) => {
        if (el.closest('.project-placeholder-media, .project-gallery-frame')) return

        gsap.killTweensOf(el, 'filter')

        gsap.to(el, {
          filter: ACTIVE_PROJECT_FILTER,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    if (isMobile) {
      gsap.killTweensOf(article)
      gsap.to(article, {
        opacity: isFocused ? 1 : 0.78,
        y: isFocused ? 0 : index < activeIndex ? -10 : 14,
        duration: 0.38,
        ease: 'power3.out',
        overwrite: true,
      })
    }
  })
}

function Projects({ isActive = false, activeIndex = 0, onSelectProject }) {
  const containerRef = useRef(null)
  const projectProgressWrapRef = useRef(null)
  const projectProgressLineRef = useRef(null)
  const [activeMedia, setActiveMedia] = useState(
    Object.fromEntries(projects.map(p => [p.id, 0]))
  )
  const [activeMobileView, setActiveMobileView] = useState(
    Object.fromEntries(projects.map(p => [p.id, 'overview']))
  )
  const [activeDesktopView, setActiveDesktopView] = useState(
  Object.fromEntries(projects.map(p => [p.id, 'overview']))
)
  const [mediaTransitioning, setMediaTransitioning] = useState(
    Object.fromEntries(projects.map(p => [p.id, false]))
  )
  const [activeGallery, setActiveGallery] = useState(
    Object.fromEntries(projects.map(p => [p.id, 0]))
  )
  const [activeVideo, setActiveVideo] = useState(
    Object.fromEntries(projects.map(p => [p.id, 0]))
  )
  const [openVideoDropdownId, setOpenVideoDropdownId] = useState(null)
  const galleryTouchStartRef = useRef({})
  const previousGalleryRef = useRef({})
  const previousMobileViewRef = useRef(
    Object.fromEntries(projects.map(p => [p.id, 'overview']))
  )
  const galleryTimelineRef = useRef({})
  const pendingLayerEnterRef = useRef({})
  const mediaSwapTweenRef = useRef({})

  const { t, tArray } = useTranslation()

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!openVideoDropdownId) return

    const handlePointerDown = (event) => {
      if (!event.target.closest('.project-mobile-video-dropdown')) {
        setOpenVideoDropdownId(null)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenVideoDropdownId(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openVideoDropdownId])

  useEffect(() => {
    setOpenVideoDropdownId(null)
  }, [activeIndex])

  // Handle URL hash changes (e.g. #project-03 or #project-03-location)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHash = (options = { shouldScroll: true }) => {
      const hash = window.location.hash
      const match = hash.match(/^#project-([0-9a-zA-Z]+)(-location)?$/)
      if (match) {
        const projectId = match[1]
        const isLocation = Boolean(match[2])

        if (isLocation) {
          setActiveDesktopView((prev) => ({ ...prev, [projectId]: 'location' }))
          setActiveMobileView((prev) => ({ ...prev, [projectId]: 'location' }))
        } else {
          setActiveDesktopView((prev) => ({ ...prev, [projectId]: 'overview' }))
          setActiveMobileView((prev) => ({ ...prev, [projectId]: 'overview' }))
        }

        if (options?.shouldScroll) {
          const targetId = isLocation ? `project-${projectId}-location` : `project-${projectId}`
          setTimeout(() => {
            const el = document.getElementById(targetId) || document.getElementById(`project-${projectId}`)
            if (el) {
              const headerOffset = 100
              const elementPosition = el.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              })
            }
          }, 100)
        }
      }
    }

    const isReload =
      performance.getEntriesByType?.('navigation')?.[0]?.type === 'reload' ||
      window.performance?.navigation?.type === 1

    // On mount during reload, activate view state without conflicting with reload scroll restoration.
    // On fresh direct visit with hash, scroll directly to target project anchor.
    const shouldScrollOnMount = !isReload
    const timer = setTimeout(() => handleHash({ shouldScroll: shouldScrollOnMount }), 150)
    const timer2 = setTimeout(() => handleHash({ shouldScroll: shouldScrollOnMount }), 500)

    const onHashChange = () => handleHash({ shouldScroll: true })
    window.addEventListener('hashchange', onHashChange)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  // Resolves translatable text for a specific project using project.id as the key.
  // project.id values are "01", "02", "03", "04" — mapped to p01, p02, p03, p04.
  // Only text fields (name, category, location, status, description) are resolved.
  // All structural data (facts, media, contact, etc.) always comes from siteData directly.
  const tp = (projectId, field) => t(`projects.p${projectId}.${field}`)
  const tpArray = (projectId, field) => tArray(`projects.p${projectId}.${field}`)

  useEffect(() => {
    applyProjectFocusState(containerRef.current, activeIndex, isActive)

    const total = Math.max(1, projects.length)
    if (projectProgressLineRef.current) {
      gsap.to(projectProgressLineRef.current, {
        width: `${((activeIndex + 1) / total) * 100}%`,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    if (projectProgressWrapRef.current) {
      gsap.to(projectProgressWrapRef.current, {
        opacity: isActive ? 1 : 0,
        duration: 0.25,
        overwrite: true,
      })
      projectProgressWrapRef.current.style.visibility = isActive ? 'visible' : 'hidden'
    }
  }, [activeIndex, isActive])

  useLayoutEffect(() => {
    Object.entries(pendingLayerEnterRef.current).forEach(([projectId, layer]) => {
      if (!layer) return
      pendingLayerEnterRef.current[projectId] = null

      const article = getProjectArticle(containerRef.current, projectId)
      const el = getMediaLayer(article, layer)
      const isFocused = isActive && projects[activeIndex]?.id === projectId
      syncProjectMediaFilter(article, isFocused)
      const finish = () => {
        if (el) gsap.set(el, { clearProps: 'transform' })
        setMediaTransitioning((prev) => ({ ...prev, [projectId]: false }))
      }

      if (!el || prefersReducedMotion()) {
        if (el) gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
        finish()
        return
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: TAB_IN_DURATION,
          ease: 'power2.out',
          overwrite: true,
          onComplete: finish,
        },
      )
    })
}, [
  activeMobileView,
  activeDesktopView,
  activeMedia,
  activeGallery,
  activeIndex,
  isActive,
])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    projects.forEach((project) => {
      const isDesktop =
  window.matchMedia('(min-width: 768px)').matches

const view = isDesktop
  ? activeDesktopView[project.id] || 'overview'
  : activeMobileView[project.id] || 'overview'
      const previousView = previousMobileViewRef.current[project.id]
      const enteredGallery = view === 'gallery' && previousView !== 'gallery'
      previousMobileViewRef.current[project.id] = view

      if (view !== 'gallery') {
        galleryTimelineRef.current[project.id]?.kill()
        return
      }

      const nextIndex = activeGallery[project.id] || 0
      if (!enteredGallery && previousGalleryRef.current[project.id] === nextIndex) return

      const stage = containerRef.current?.querySelector(`[data-gallery-project-id="${project.id}"]`)
      if (!stage) return

      const frames = stage.querySelectorAll('.project-gallery-frame')
      const previousIndex = previousGalleryRef.current[project.id]
      const activeFrame = stage.querySelector(`[data-gallery-index="${nextIndex}"]`)
      const previousFrame = typeof previousIndex === 'number'
        ? stage.querySelector(`[data-gallery-index="${previousIndex}"]`)
        : null

      galleryTimelineRef.current[project.id]?.kill()
      if (!activeFrame) return

      const showActiveOnly = () => {
        gsap.set(frames, { autoAlpha: 0, scale: 1, zIndex: 1 })
        gsap.set(activeFrame, { autoAlpha: 1, scale: 1, zIndex: 2 })
        previousGalleryRef.current[project.id] = nextIndex
      }

      if (enteredGallery || previousIndex === undefined || !previousFrame || previousFrame === activeFrame) {
        showActiveOnly()
        return
      }

      gsap.set(frames, { autoAlpha: 0, scale: 1, zIndex: 1 })
      gsap.set(previousFrame, { autoAlpha: 1, scale: 1, zIndex: 1 })
      gsap.set(activeFrame, { autoAlpha: 0, scale: 1.02, zIndex: 2 })

      galleryTimelineRef.current[project.id] = gsap.timeline({
        defaults: { ease: 'power2.inOut', overwrite: true },
      })
        .to(previousFrame, {
          autoAlpha: 0,
          scale: 0.995,
          duration: GALLERY_FADE,
        }, 0)
        .to(activeFrame, {
          autoAlpha: 1,
          scale: 1,
          duration: GALLERY_FADE + 0.04,
          ease: 'power2.out',
        }, 0.04)

      previousGalleryRef.current[project.id] = nextIndex
    })
  }, [
  activeGallery,
  activeMobileView,
  activeDesktopView,
])

  useEffect(() => {
    return () => {
      Object.values(galleryTimelineRef.current).forEach((timeline) => timeline?.kill())
      Object.values(mediaSwapTweenRef.current).forEach((tween) => tween?.kill())
    }
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    const getArticles = () => gsap.utils.toArray('.project-article')

    // ══════════════════════════════════════════════════════════════
    // DESKTOP — Curtain Reveal + Media Selector + Explore Cursor
    // ══════════════════════════════════════════════════════════════
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const cleanupFns = []

      // Section intro text — appears first, leading the reveal
      gsap.from('.projects-intro-text', {
        opacity: 0,
        y: 22,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          id: 'projects-intro',
          trigger: '.projects-intro',
          start: 'top 22%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      })

      const articles = getArticles()
      articles.forEach((article, index) => {
        const imageWrapper = article.querySelector('.project-image-wrapper')
        const image = article.querySelector('.project-desktop-image-inner .project-image')
        const curtain = article.querySelector('.project-curtain')
        const metaEls = article.querySelectorAll('.project-meta')
        const descEl = article.querySelector('.project-desc')
        const numberEl = article.querySelector('.project-chapter-number')

        // Chapter number — rises gently from below, leads the article
        if (numberEl) {
          gsap.from(numberEl, {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              id: `projects-desktop-number-${index}`,
              trigger: article,
              start: getPostPhilosophyStart('top 85%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }

        // Curtain wipe + image scale — the primary cinematic moment
        if (curtain && imageWrapper) {
          const curtainTl = gsap.timeline({
            scrollTrigger: {
              id: `projects-desktop-curtain-${index}`,
              trigger: index === 0 ? article : imageWrapper,
              start: index === 0 ? getPostPhilosophyStart('top 85%') : getPostPhilosophyStart('top 75%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })

          curtainTl
            .to(curtain, {
              yPercent: -100,
              duration: 1.6,           // slower wipe
              ease: 'power2.inOut',    // controlled, no sharp stop
            })
            .fromTo(image, 
              { scale: 0.96, opacity: 0, y: 12 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'premiumReveal',
              },
              '-=1.2'
            )
        }

        if (image) {
          gsap.set(image, { filter: 'grayscale(1) brightness(0.85)' })
        }

        // Meta labels — follow the image, gentle stagger
        if (metaEls.length) {
          gsap.from(metaEls, {
            opacity: 0,
            y: 14,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              id: `projects-desktop-meta-${index}`,
              trigger: article,
              start: getPostPhilosophyStart('top 70%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }

        // Description — settles in last after meta
        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 14,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              id: `projects-desktop-desc-${index}`,
              trigger: descEl,
              start: getPostPhilosophyStart('top 88%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }

        if (imageWrapper) {
          const currentDesktopImage = () =>
            article.querySelector('.project-desktop-image-inner .project-image')
          const onEnter = () => {
            const current = currentDesktopImage()
            if (current) gsap.to(current, { scale: 1.04, duration: 0.6, ease: 'power2.out' })
          }
          const onLeave = () => {
            const current = currentDesktopImage()
            if (current) gsap.to(current, { scale: 1, duration: 0.8, ease: 'power2.out' })
          }
          imageWrapper.addEventListener('mouseenter', onEnter)
          imageWrapper.addEventListener('mouseleave', onLeave)
          cleanupFns.push(() => {
            imageWrapper.removeEventListener('mouseenter', onEnter)
            imageWrapper.removeEventListener('mouseleave', onLeave)
          })
        }
      })

      return () => cleanupFns.forEach((cleanup) => cleanup())
    })

    // ══════════════════════════════════════════════════════════════
    // MOBILE — Chapter Transitions + Curtain + Edge-to-Edge
    // ══════════════════════════════════════════════════════════════
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const articles = getArticles()

      articles.forEach((article, index) => {
        gsap.set(article, {
          opacity: index === 0 ? 1 : 0.78,
          y: index === 0 ? 0 : 14,
        })
      })

      articles.forEach((article, index) => {
        const imageWrapper = article.querySelector('.project-image-wrapper')
        const imageInner = article.querySelector('.project-mobile-image-inner')
        const curtain = article.querySelector('.project-curtain')
        const numberEl = article.querySelector('.project-chapter-number')
        const metaEls = article.querySelectorAll('.project-meta')

        // Chapter number — gentle upward reveal
        if (numberEl) {
          gsap.from(numberEl, {
            yPercent: 80,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              id: `projects-mobile-number-${index}`,
              trigger: article,
              start: index === 0 ? getPostPhilosophyStart('top 65%') : getPostPhilosophyStart('top 92%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }

        // Meta — slightly after number, subtle stagger
        if (metaEls.length) {
          gsap.from(metaEls, {
            opacity: 0,
            y: 12,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              id: `projects-mobile-meta-${index}`,
              trigger: article,
              start: index === 0 ? getPostPhilosophyStart('top 62%') : getPostPhilosophyStart('top 88%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }

        // Curtain wipe — primary cinematic moment on mobile
        if (curtain && imageWrapper) {
          const mobileImage = article.querySelector('.project-mobile-image-inner .project-image')
          const curtainTl = gsap.timeline({
            scrollTrigger: {
              id: `projects-mobile-curtain-${index}`,
              trigger: index === 0 ? article : imageWrapper,
              start: index === 0 ? getPostPhilosophyStart('top 60%') : getPostPhilosophyStart('top 75%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })

          curtainTl.fromTo(curtain,
            { yPercent: 0 },
            {
              yPercent: -100,
              duration: 1.5,           // slower, more deliberate wipe
              ease: 'power2.inOut',    // controlled without sharp stop
            }
          )
          
          if (mobileImage) {
            curtainTl.fromTo(mobileImage,
              { scale: 0.96, opacity: 0, y: 12 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'premiumReveal',
              },
              '-=1.1'
            )
          }
        }

        article.querySelectorAll('.project-image').forEach((imageEl) => {
          if (imageEl.closest('.project-placeholder-media, .project-gallery-frame')) return
          gsap.set(imageEl, { filter: 'grayscale(1) brightness(0.85)' })
        })

        if (imageWrapper && imageInner) {
          const getEdgeScale = () => window.innerWidth / imageWrapper.getBoundingClientRect().width

          gsap.set(imageWrapper, {
            transformOrigin: 'center center',
            willChange: 'transform',
          })
          gsap.set(imageInner, {
            transformOrigin: 'center center',
            willChange: 'transform',
          })

          const edgeTl = gsap.timeline({
            scrollTrigger: {
              id: `projects-mobile-edge-${index}`,
              trigger: imageWrapper,
              start: getPostPhilosophyStart('top 76%'),
              end: 'top 20%',
              scrub: 0.85,
              invalidateOnRefresh: true,
            }
          })

          edgeTl.to(imageWrapper, {
            scaleX: getEdgeScale,
            ease: 'none',
          }, 0).to(imageInner, {
            scaleX: () => 1 / getEdgeScale(),
            ease: 'none',
          }, 0)
        }

        // Description — last to settle in
        const descEl = article.querySelector('.project-mobile-desc')
        if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            y: 14,
            duration: 0.95,
            ease: 'power2.out',
            scrollTrigger: {
              id: `projects-mobile-desc-${index}`,
              trigger: descEl,
              start: getPostPhilosophyStart('top 92%'),
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          })
        }
      })
    })

  }, { scope: containerRef })

  const swapMediaLayer = (projectId, layer, commit) => {
    const article = getProjectArticle(containerRef.current, projectId)
    const el = getMediaLayer(article, layer)

    mediaSwapTweenRef.current[projectId]?.kill()

    const finishSwap = () => {
      pendingLayerEnterRef.current[projectId] = layer
      commit()
    }

    if (!el || prefersReducedMotion()) {
      if (el) gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' })
      finishSwap()
      return
    }

    setMediaTransitioning((prev) => ({ ...prev, [projectId]: true }))
    mediaSwapTweenRef.current[projectId] = gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: TAB_OUT_DURATION,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: finishSwap,
    })
  }

  const handleMediaChange = (projectId, mediaIndex) => {
    if (activeMedia[projectId] === mediaIndex || mediaTransitioning[projectId]) return
    swapMediaLayer(projectId, 'desktop', () => {
      setActiveMedia((prev) => ({ ...prev, [projectId]: mediaIndex }))
    })
  }

  const handleMobileViewChange = (projectId, view) => {
    setOpenVideoDropdownId(null)
    if (activeMobileView[projectId] === view || mediaTransitioning[projectId]) return
    swapMediaLayer(projectId, 'mobile', () => {
      setActiveMobileView((prev) => ({ ...prev, [projectId]: view }))
    })
  }
  const handleDesktopViewChange = (projectId, view) => {
  if (
    activeDesktopView[projectId] === view ||
    mediaTransitioning[projectId]
  ) {
    return
  }

  swapMediaLayer(projectId, 'desktop', () => {
    setActiveDesktopView((prev) => ({
      ...prev,
      [projectId]: view,
    }))
  })
}
  const handleVideoChange = (projectId, videoIndex) => {
    setActiveVideo((prev) => ({ ...prev, [projectId]: videoIndex }))
  }

  const handleGalleryChange = (projectId, total, nextIndex) => {
    const next = (nextIndex + total) % total
    if ((activeGallery[projectId] || 0) === next) return
    setActiveGallery((prev) => ({
      ...prev,
      [projectId]: next,
    }))
  }

  const handleGalleryTouchStart = (projectId, event) => {
    galleryTouchStartRef.current[projectId] = event.touches[0]?.clientX ?? 0
  }

  const handleGalleryTouchEnd = (projectId, total, event) => {
    const startX = galleryTouchStartRef.current[projectId]
    const endX = event.changedTouches[0]?.clientX ?? startX
    const delta = endX - startX
    if (Math.abs(delta) < 36) return
    const currentIndex = activeGallery[projectId] || 0
    handleGalleryChange(projectId, total, currentIndex + (delta < 0 ? 1 : -1))
  }

  // Helper: get active media item for a project
  const getActiveMediaItem = (project) => {
    const idx = activeMedia[project.id] || 0
    if (Array.isArray(project.media?.gallery) && project.media.gallery.length > 0) {
      return project.media.gallery[idx]
    }
    return null
  }

  const getMediaGroupLabel = (item, idx) => {
    if (item.type === 'image') return idx === 0 ? 'Cover' : 'Gallery'
    if (item.type === 'video') return 'Film'
    if (item.type === 'location') return 'Location'
    return item.label
  }

  const getMobileView = (project, view) => {
    const media = project.media || {}
    if (view === 'overview') return media.overview || null
    if (view === 'gallery') return media.gallery || []
    if (view === 'film') {
      const vids = media.videos || []
      const currentIdx = Math.min(activeVideo[project.id] || 0, Math.max(0, vids.length - 1))
      return vids[currentIdx] || null
    }
    if (view === 'location') return media.location || null
    return media[view] || media.overview || null
  }

  const getDesktopMediaItem = (project, view, galleryIndex = 0) => {
    const media = project.media || {}

    if (view === 'gallery') {
      const gallery = media.gallery

      if (Array.isArray(gallery) && gallery.length > 0) {
        const index = Math.min(
          galleryIndex,
          gallery.length - 1
        )

        return gallery[index]
      }
    }

    if (view === 'film') return media.videos?.[0] || null
    if (view === 'location') return media.location || null

    return media[view] || media.overview || null
  }

  const renderMediaItem = (item, project, className = '') => {
    if (!item) {
      return (
        <div className={`project-image w-full h-full flex items-center justify-center bg-neutral/5 ${className}`}>
          <p className="eyebrow">{t('projects.projectMediaLabel')}</p>
        </div>
      )
    }

    if (item.type === 'video' && item.src) {
      return (
        <video
          src={item.src}
          poster={item.poster}
          className={`project-image project-active-media w-full h-full object-cover origin-center ${className}`}
          autoPlay loop playsInline
        />
      )
    }

    if (item.type === 'image' && item.src) {
      return (
        <img
          src={item.src}
          alt={item.alt || project.name}
          className={`project-image project-active-media w-full h-full object-cover origin-center will-change-transform ${className}`}
        />
      )
    }

    return (
      <div className={`project-image w-full h-full flex items-center justify-center bg-neutral/5 ${className}`}>
        <div className="text-center px-8">
          <p className="eyebrow text-neutral/50 mb-2">{item.label}</p>
          <p className="font-body text-xs leading-relaxed text-neutral/45">
            {item.type === 'location'
              ? project.media?.location?.description || 'Location media coming soon'
              : 'Media coming soon'}
          </p>
        </div>
      </div>
    )
  }

  const renderLocationView = (project, content) => {
    const hasRealLocation =
      project.id === '01' ||
      (project.media?.location?.address && project.media.location.address !== 'Location')

    if (hasRealLocation) {
      const locality =
        tp(project.id, 'locality') !== `projects.p${project.id}.locality`
          ? tp(project.id, 'locality')
          : (project.media?.location?.address?.split(',')?.[0]?.trim() || 'Deoband')

      const region =
        tp(project.id, 'region') !== `projects.p${project.id}.region`
          ? tp(project.id, 'region')
          : (project.media?.location?.address?.split(',')?.slice(1)?.join(',')?.trim() || 'Saharanpur, Uttar Pradesh')

      const projectName =
        tp(project.id, 'name') !== `projects.p${project.id}.name`
          ? tp(project.id, 'name')
          : project.name

      const mapsUrl = project.media?.location?.mapsUrl || null

      return (
        <ProjectLocationMap
          coordinates={project.media?.location?.coordinates}
          locality={locality}
          region={region}
          projectName={projectName}
          mapsUrl={mapsUrl}
        />
      )
    }

    // Projects 02–04 fallback placeholder
    return (
      <div className="project-placeholder-media project-location-placeholder">
        <div className="project-placeholder-overlay">
          <p className="eyebrow text-ivory/70">
            {t('projects.locationLabel')}
          </p>
          <p className="font-display text-2xl text-ivory">
            {t('projects.locationMap')}
          </p>
          <p className="eyebrow text-ivory/70">
            {tp(project.id, 'location')}
          </p>
          <p className="font-body text-xs leading-relaxed text-ivory/65 max-w-[15rem]">
            {t('projects.locationComingSoon')}
          </p>
        </div>
      </div>
    )
  }

  const renderMobileView = (project, view, galleryIndex = 0) => {
    const content = getMobileView(project, view)

    if (view === 'overview') {
      if (isDesktop) return null
      const isProjectFocused = isActive && projects[activeIndex]?.id === project.id
      return (
        <ProjectOverviewVideo
          video={project.media?.overviewVideo}
          poster={project.media?.overview?.src}
          alt={project.media?.overview?.alt || project.name}
          isActive={isProjectFocused}
          isOverviewTab={view === 'overview'}
        />
      )
    }

    if (view === 'gallery') {
      if (Array.isArray(content) && content.length > 0) {
        const activeIndex = Math.min(galleryIndex, content.length - 1)

        return (
          <div
            className="project-gallery-stage"
            data-gallery-project-id={project.id}
            onTouchStart={(event) => handleGalleryTouchStart(project.id, event)}
            onTouchEnd={(event) => handleGalleryTouchEnd(project.id, content.length, event)}
          >
            {content.map((item, index) => (
              <figure
                key={`${item.src}-${index}`}
                className={`project-gallery-frame ${index === activeIndex ? 'active' : ''}`}
                data-gallery-index={index}
              >
                {renderMediaItem(item, project)}
                <figcaption>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(content.length).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
            <div className="project-gallery-controls">
              <button
                type="button"
                onClick={() => handleGalleryChange(project.id, content.length, activeIndex - 1)}
                aria-label="Previous gallery image"
              >
                {t('projects.galleryPrev')}
              </button>
              <div className="project-gallery-dots" aria-label="Gallery image selection">
                {content.map((item, index) => (
                  <button
                    key={`${item.src}-dot`}
                    type="button"
                    onClick={() => handleGalleryChange(project.id, content.length, index)}
                    className={index === activeIndex ? 'active' : ''}
                    aria-label={`Show gallery image ${index + 1}`}
                    aria-pressed={index === activeIndex}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleGalleryChange(project.id, content.length, activeIndex + 1)}
                aria-label="Next gallery image"
              >
                {t('projects.galleryNext')}
              </button>
            </div>
          </div>
        )
      }

      const posterSrc = project.media?.overview?.src
      return (
        <div className="project-placeholder-media project-film-placeholder">
          {posterSrc && (
            <img
              src={posterSrc}
              alt={`${project.name} gallery`}
              className="project-image"
            />
          )}
          <div className="project-placeholder-overlay">
            <p className="eyebrow text-ivory/70">{t('projects.mediaGallery')}</p>
            <p className="font-display text-2xl text-ivory">{t('projects.filmComingSoon')}</p>
          </div>
        </div>
      )
    }

    if (view === 'film') {
      if (isDesktop) return null
      const videoSrc = resolveVideoUrl(content)
      const isProjectFocused = isActive && projects[activeIndex]?.id === project.id
      if (videoSrc) {
        const currentIdx = activeVideo[project.id] || 0
        return (
          <ProjectVideoPlayer
            key={`mobile-video-${project.id}-${currentIdx}`}
            src={videoSrc}
            poster={content.poster}
            title={`${tp(project.id, 'name')} — ${deriveCleanVideoTitle(content)}`}
            isActiveTab={view === 'film' && isProjectFocused}
          />
        )
      }

      const posterSrc = content?.poster || project.media?.overview?.src
      return (
        <div className="project-placeholder-media project-film-placeholder">
          {posterSrc && (
            <img
              src={posterSrc}
              alt={`${project.name} film poster`}
              className="project-image"
            />
          )}
          <div className="project-placeholder-overlay">
            <p className="eyebrow text-ivory/70">{t('projects.filmLabel')}</p>
            <span className="project-play-mark" aria-hidden="true" />
            <p className="font-display text-2xl text-ivory">{t('projects.filmComingSoon')}</p>
          </div>
        </div>
      )
    }

    if (view === 'location') {
      return renderLocationView(project, content)
    }

    return renderMediaItem(content, project)
  }

  const renderDesktopView = (project, view, galleryIndex = 0) => {
  const content = getMobileView(project, view)

  // Overview
  if (view === 'overview') {
    if (!isDesktop) return null
    const isProjectFocused = isActive && projects[activeIndex]?.id === project.id
    return (
      <ProjectOverviewVideo
        video={project.media?.overviewVideo}
        poster={project.media?.overview?.src}
        alt={project.media?.overview?.alt || project.name}
        isActive={isProjectFocused}
        isOverviewTab={view === 'overview'}
      />
    )
  }

  // Gallery
  if (view === 'gallery') {
    if (Array.isArray(content) && content.length > 0) {
      const activeIndex = Math.min(
        galleryIndex,
        content.length - 1
      )

      return (
        <div
          className="project-gallery-desktop-shell"
          data-gallery-project-id={project.id}
        >
          <div className="project-gallery-desktop-main">
            <div className="project-gallery-desktop-main-media">
              {renderMediaItem(
                content[activeIndex],
                project,
                'project-gallery-desktop-main-image'
              )}
            </div>

            <div className="project-gallery-desktop-bottom-overlay" aria-hidden="true" />

            <div className="project-gallery-desktop-counter">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(content.length).padStart(2, '0')}
            </div>

            <div
              className="project-gallery-desktop-rail"
              aria-label="Project gallery preview list"
            >
              {content.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    onClick={() =>
                      handleGalleryChange(
                        project.id,
                        content.length,
                        index
                      )
                    }
                    className={`project-gallery-desktop-preview ${
                      isActive ? 'active' : ''
                    }`}
                    aria-label={`Show gallery image ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    <span className="project-gallery-desktop-preview-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="project-gallery-desktop-preview-figure">
                      {renderMediaItem(
                        item,
                        project,
                        'project-gallery-desktop-preview-image'
                      )}
                    </span>

                    {isActive && (
                      <span
                        className="project-gallery-desktop-preview-indicator"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    const posterSrc = project.media?.overview?.src
    return (
      <div className="project-placeholder-media project-film-placeholder">
        {posterSrc && (
          <img
            src={posterSrc}
            alt={`${project.name} gallery`}
            className="project-image"
          />
        )}
        <div className="project-placeholder-overlay">
          <p className="eyebrow text-ivory/70">{t('projects.mediaGallery')}</p>
          <p className="font-display text-2xl text-ivory">{t('projects.filmComingSoon')}</p>
        </div>
      </div>
    )
  }

  // Video
  if (view === 'film') {
    if (!isDesktop) return null
    const videoSrc = resolveVideoUrl(content)
    const isProjectFocused = isActive && projects[activeIndex]?.id === project.id
    if (videoSrc) {
      const currentIdx = activeVideo[project.id] || 0
      return (
        <ProjectVideoPlayer
          key={`desktop-video-${project.id}-${currentIdx}`}
          src={videoSrc}
          poster={content.poster}
          title={`${tp(project.id, 'name')} — ${deriveCleanVideoTitle(content)}`}
          isActiveTab={view === 'film' && isProjectFocused}
        />
      )
    }

    const posterSrc = content?.poster || project.media?.overview?.src
    return (
      <div className="project-placeholder-media project-film-placeholder">
        {posterSrc && (
          <img
            src={posterSrc}
            alt={`${project.name} film poster`}
            className="project-image"
          />
        )}

        <div className="project-placeholder-overlay">
          <p className="eyebrow text-ivory/70">
            {t('projects.filmLabel')}
          </p>

          <span
            className="project-play-mark"
            aria-hidden="true"
          />

          <p className="font-display text-2xl text-ivory">
            {t('projects.filmComingSoon')}
          </p>
        </div>
      </div>
    )
  }

  // Location
  if (view === 'location') {
    return renderLocationView(project, content)
  }

  return renderMediaItem(content, project)
}

  return (
    <>
      <div
        ref={projectProgressWrapRef}
        className="project-progress md:hidden fixed top-20 right-5 z-40 opacity-0 pointer-events-none bg-ivory/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral/30 shadow-sm flex flex-col items-end gap-1"
        aria-hidden={!isActive}
      >
        <span className="font-mono text-[10px] font-medium tracking-widest text-black/80">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <div className="w-10 h-0.5 bg-neutral/20 relative rounded-full overflow-hidden">
          <div ref={projectProgressLineRef} className="absolute top-0 left-0 h-full bg-black/80 transition-all duration-300" style={{ width: '25%' }} />
        </div>
      </div>

      <section id="projects" ref={containerRef} className="section-padding-x py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-ivory">
        <div className="section-focus-wrapper w-full">
        <div className="container-base">

          {/* Section Introduction */}
          <div className="projects-intro mb-10 md:mb-32">
            <p className="projects-intro-text eyebrow mb-4 md:mb-6">
              {t('projects.eyebrow')}
            </p>
            <h2 className="projects-intro-text display-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              {t('projects.heading')}<br />{t('projects.headingAccent')}
            </h2>
          </div>

          {/* Project List */}
          <div className="space-y-16 md:space-y-48">
            {projects.map((project, projectIndex) => {
              const activeIdx = activeMedia[project.id] || 0

              const desktopView =
                activeDesktopView[project.id] || 'overview'

              const mobileView =
                activeMobileView[project.id] || 'overview'

              const galleryIndex =
                activeGallery[project.id] || 0

              const currentVideo =
                project.media?.videos?.[
                  Math.min(
                    activeVideo[project.id] || 0,
                    Math.max(0, (project.media?.videos?.length || 1) - 1)
                  )
                ] || null

              const mediaOptions = [
                ['overview', t('projects.mediaOverview')],
                ['gallery', t('projects.mediaGallery')],
                ['film', t('projects.mediaFilm')],
                ['location', t('projects.mediaLocation')],
              ]

              const mobileOptions = mediaOptions

              // Step 2 Data Integration
              const hasFacts = Boolean(project.facts && project.facts.totalPlots)
              const plotsVal = tp(project.id, 'facts.plotsValue') !== `projects.p${project.id}.facts.plotsValue`
                ? tp(project.id, 'facts.plotsValue')
                : (project.facts?.totalPlots?.split(' ')?.[0] || '57')
              const plotsLabel = tp(project.id, 'facts.plotsLabel') !== `projects.p${project.id}.facts.plotsLabel`
                ? tp(project.id, 'facts.plotsLabel')
                : (project.facts?.totalPlots?.split(' ')?.slice(1)?.join(' ') || 'Commercial Plots')
              const roadsVal = tp(project.id, 'facts.roadsValue') !== `projects.p${project.id}.facts.roadsValue`
                ? tp(project.id, 'facts.roadsValue')
                : (project.facts?.roadWidth?.split(' ')?.slice(0, 2)?.join(' ') || '30 ft')
              const roadsLabel = tp(project.id, 'facts.roadsLabel') !== `projects.p${project.id}.facts.roadsLabel`
                ? tp(project.id, 'facts.roadsLabel')
                : (project.facts?.roadWidth?.split(' ')?.slice(2)?.join(' ') || 'Roads')

              const transFeatures = tpArray(project.id, 'features')
              const features = (Array.isArray(transFeatures) && transFeatures.length > 0)
                ? transFeatures
                : (project.features || [])
              const hasFeatures = features.length > 0

              const brand = tp(project.id, 'brand') !== `projects.p${project.id}.brand`
                ? tp(project.id, 'brand')
                : (project.brand || '')
              const developer = tp(project.id, 'developer') !== `projects.p${project.id}.developer`
                ? tp(project.id, 'developer')
                : (project.developer || '')
              const tagline = tp(project.id, 'tagline') !== `projects.p${project.id}.tagline`
                ? tp(project.id, 'tagline')
                : (project.overview?.tagline || '')
              const promotionalLine = tp(project.id, 'promotionalLine') !== `projects.p${project.id}.promotionalLine`
                ? tp(project.id, 'promotionalLine')
                : (project.overview?.promotionalLine || '')
              const hasOverviewContent = Boolean(tagline || promotionalLine)

              return (
                <article
                  key={project.id}
                  id={`project-${project.id}`}
                  data-project-id={project.id}
                  className="project-article relative scroll-mt-28"
                >
                  {/* Chapter Transition Divider */}
                  <div className="mb-6 md:mb-12 flex items-center gap-4">
                    <div className="overflow-hidden">
                      <span className="project-chapter-number font-display text-4xl md:text-7xl font-medium text-black/10 leading-none block">
                        {project.number || String(projectIndex + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-neutral/20" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 relative">

                    {/* Sticky Metadata Column */}
                    <div className="md:col-span-5 md:sticky md:top-32 self-start">
                      {/* Project Number */}
                      <p className="project-meta eyebrow text-neutral mb-3 md:mb-6">
                        {project.number || String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </p>

                      {/* Project Name */}
                      <h3 className="project-meta font-display text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-3 md:mb-4 tracking-tight">
                        {tp(project.id, 'name')}
                      </h3>

                      {/* Details */}
                      <div className="space-y-1 mb-4 md:mb-6">
                        <p className="project-meta font-body text-xs tracking-[0.15em] uppercase text-neutral">
                          {tp(project.id, 'category')}
                        </p>
                        <p className="project-meta hidden md:block font-body text-xs tracking-[0.15em] uppercase text-neutral">
                          {tp(project.id, 'location')}
                        </p>
                        <p className="project-meta font-body text-xs tracking-[0.15em] uppercase text-accent font-medium">
                          {tp(project.id, 'status')}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="project-desc hidden md:block mb-4 md:mb-0">
                        <p className="body-copy max-w-md">
                          {tp(project.id, 'description')}
                        </p>
                      </div>

                      {/* Facts Block */}
                      {hasFacts && (
                        <div className="project-facts-block mt-6 pt-5 border-t border-neutral/20">
                          <p className="eyebrow text-neutral/60 mb-3">{t('projects.factsLabel')}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-normal text-black block leading-none mb-1">
                                {plotsVal}
                              </span>
                              <span className="font-body text-[11px] tracking-[0.14em] uppercase text-neutral/70 block">
                                {plotsLabel}
                              </span>
                            </div>
                            <div>
                              <span className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-normal text-black block leading-none mb-1">
                                {roadsVal}
                              </span>
                              <span className="font-body text-[11px] tracking-[0.14em] uppercase text-neutral/70 block">
                                {roadsLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Enquire CTA (Desktop) */}
                      <div className="project-enquiry-action hidden md:block mt-6 pt-5 border-t border-neutral/20">
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault()
                            if (onSelectProject) {
                              onSelectProject(project.id)
                            } else {
                              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.16em] uppercase text-accent hover:text-black transition-colors group"
                        >
                          <span>{t('projects.enquireCta')}</span>
                          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </a>
                      </div>

                      {/* Media Selector (Desktop) */}
                      <div className="project-media-nav hidden md:flex flex-wrap gap-4 mt-6 pt-6 border-t border-neutral/20">
                        {mediaOptions.map(([view, label], idx) => (
                          <button
                            key={view}
                            type="button"
                            onClick={() =>
                              handleDesktopViewChange(project.id, view)
                            }
                            className={`media-selector-item ${
                              desktopView === view ? 'active' : ''
                            }`}
                            disabled={mediaTransitioning[project.id]}
                            aria-pressed={desktopView === view}
                          >
                            <span className="text-neutral/60 mr-1.5">
                              0{idx + 1}
                            </span>

                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Video Sub-Selector (Desktop) */}
                      {desktopView === 'film' && Array.isArray(project.media?.videos) && project.media.videos.length > 1 && (
                        <div className="project-video-subnav hidden md:flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral/15">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral/50 mr-1">
                            Videos:
                          </span>
                          {project.media.videos.map((vid, vIdx) => {
                            const isVidActive = (activeVideo[project.id] || 0) === vIdx
                            return (
                              <button
                                key={vid.id || vIdx}
                                type="button"
                                onClick={() => handleVideoChange(project.id, vIdx)}
                                className={`px-2.5 py-1 font-mono text-[11px] tracking-wider uppercase transition-all duration-200 rounded-sm border ${
                                  isVidActive
                                    ? 'bg-black text-ivory border-black shadow-sm'
                                    : 'bg-transparent text-neutral/70 border-neutral/30 hover:border-black hover:text-black'
                                }`}
                                aria-pressed={isVidActive}
                              >
                                <span className="opacity-50 mr-1.5">0{vIdx + 1}</span>
                                {vid.label || `Film ${vIdx + 1}`}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Project Media Column */}
                    <div className="md:col-span-7 flex flex-col">
                      <div className="project-mobile-switcher md:hidden">
                        <p className="project-switcher-label">{t('projects.projectMediaLabel')}</p>
                        <div
                          className="project-mobile-media-nav"
                          style={{ '--active-tab-index': mobileOptions.findIndex(([view]) => view === mobileView) }}
                        >
                          {mobileOptions.map(([view, label], idx) => (
                            <button
                              key={view}
                              type="button"
                              onClick={() => handleMobileViewChange(project.id, view)}
                              className={mobileView === view ? 'active' : ''}
                              aria-pressed={mobileView === view}
                              disabled={mediaTransitioning[project.id]}
                            >
                              <span className="project-mobile-nav-index">0{idx + 1}</span>
                              <span className="project-mobile-nav-label">{label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Compact Video Dropdown Selector (Mobile) */}
                        {mobileView === 'film' && Array.isArray(project.media?.videos) && project.media.videos.length > 1 && (
                          <div
                            className={`project-mobile-video-dropdown relative mt-3 ${
                              openVideoDropdownId === project.id ? 'z-40' : 'z-30'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setOpenVideoDropdownId((prev) =>
                                  prev === project.id ? null : project.id
                                )
                              }
                              aria-haspopup="listbox"
                              aria-expanded={openVideoDropdownId === project.id}
                              aria-label="Select project video"
                              className={`w-full min-h-[44px] flex items-center justify-between gap-3 px-3.5 py-2.5 bg-ivory border rounded-sm transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black cursor-pointer ${
                                openVideoDropdownId === project.id
                                  ? 'border-black ring-1 ring-black/15 shadow-sm'
                                  : 'border-black/20 hover:border-black/50 active:bg-neutral/10'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 bg-black text-ivory rounded-[2px] shrink-0 font-medium">
                                  0{(activeVideo[project.id] || 0) + 1}
                                </span>
                                <span className="font-body text-xs sm:text-[13px] font-medium tracking-tight text-black truncate">
                                  {currentVideo?.label ||
                                    deriveCleanVideoTitle(currentVideo) ||
                                    `Film ${(activeVideo[project.id] || 0) + 1}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral/60">
                                  0{(activeVideo[project.id] || 0) + 1} / 0{project.media.videos.length}
                                </span>
                                <svg
                                  className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${
                                    openVideoDropdownId === project.id ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  aria-hidden="true"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>

                            {/* Dropdown Options */}
                            {openVideoDropdownId === project.id && (
                              <div
                                role="listbox"
                                aria-label="Project video options"
                                className="absolute left-0 right-0 top-full mt-1 bg-ivory border border-black/25 rounded-sm shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto divide-y divide-black/10"
                              >
                                {project.media.videos.map((vid, vIdx) => {
                                  const isVidActive = (activeVideo[project.id] || 0) === vIdx
                                  const vidTitle =
                                    vid.label ||
                                    deriveCleanVideoTitle(vid) ||
                                    `Film ${vIdx + 1}`

                                  return (
                                    <button
                                      key={vid.id || vIdx}
                                      role="option"
                                      aria-selected={isVidActive}
                                      type="button"
                                      onClick={() => {
                                        handleVideoChange(project.id, vIdx)
                                        setOpenVideoDropdownId(null)
                                      }}
                                      className={`w-full min-h-[44px] flex items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors duration-150 cursor-pointer ${
                                        isVidActive
                                          ? 'bg-black text-ivory font-medium'
                                          : 'bg-ivory text-black/90 hover:bg-black/5 active:bg-black/10'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <span
                                          className={`font-mono text-[10px] tracking-wider uppercase shrink-0 ${
                                            isVidActive ? 'text-ivory/60' : 'text-neutral/60'
                                          }`}
                                        >
                                          0{vIdx + 1}
                                        </span>
                                        <span className="font-body text-xs sm:text-[13px] tracking-tight truncate">
                                          {vidTitle}
                                        </span>
                                      </div>
                                      {isVidActive ? (
                                        <span
                                          className="text-accent text-[11px] font-bold shrink-0 flex items-center gap-1.5 font-mono uppercase tracking-wider"
                                          aria-hidden="true"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
                                          Active
                                        </span>
                                      ) : (
                                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral/45 shrink-0">
                                          Select
                                        </span>
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Active Video Title Bar (Desktop & Mobile) */}
                      {((isDesktop && desktopView === 'film') || (!isDesktop && mobileView === 'film')) &&
                        Boolean(currentVideo) && (
                          <div className="project-video-title-bar w-full flex items-center justify-between gap-3 mb-2.5 px-0.5 select-none transition-opacity duration-200">
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 animate-pulse"
                                aria-hidden="true"
                              />
                              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-neutral/60 flex-shrink-0">
                                {project.media?.videos?.length > 1
                                  ? `Film 0${(activeVideo[project.id] || 0) + 1} / 0${project.media.videos.length}`
                                  : 'Project Film'}
                              </span>
                              <span className="text-neutral/30 font-mono text-[10px]" aria-hidden="true">
                                /
                              </span>
                              <h4 className="font-display text-sm sm:text-base text-black font-medium tracking-tight truncate">
                                {deriveCleanVideoTitle(currentVideo)}
                              </h4>
                            </div>
                            <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-neutral/45 flex-shrink-0">
                              {tp(project.id, 'name')}
                            </span>
                          </div>
                        )}

                      {/* Main Image/Media Area */}
                      <div
                        id={`project-${project.id}-location`}
                        className="project-image-wrapper relative w-full aspect-video overflow-hidden scroll-mt-28"
                      >
                        <div className="project-curtain" />

                        <div className="project-image-inner project-desktop-image-inner absolute inset-0 hidden md:block">
                          <div className="project-media-layer h-full">
                            {renderDesktopView(
                              project,
                              desktopView,
                              galleryIndex
                            )}
                          </div>
                        </div>

                        <div className="project-image-inner project-mobile-image-inner absolute inset-0 md:hidden">
                          <div className="project-media-layer h-full">
                            {renderMobileView(project, mobileView, galleryIndex)}
                          </div>
                        </div>
                      </div>

                      {/* Overview Marketing Content Block */}
                      {hasOverviewContent && (
                        <div
                          className={`project-overview-content pt-6 pb-2 transition-opacity duration-300 ${
                            desktopView === 'overview' ? 'md:block' : 'md:hidden'
                          } ${
                            mobileView === 'overview' ? 'block' : 'hidden'
                          }`}
                        >
                          <div className="space-y-3">
                            <div>
                              {brand && (
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/80 font-medium">
                                  {brand}
                                </p>
                              )}
                              {developer && (
                                <p className="font-body text-xs tracking-[0.08em] text-neutral/70 mt-1">
                                  {t('projects.developedBy')} {developer}
                                </p>
                              )}
                            </div>
                            {tagline && (
                              <p className="font-display text-xl sm:text-2xl md:text-2xl lg:text-3xl text-black font-normal leading-snug max-w-xl">
                                {tagline}
                              </p>
                            )}
                            {promotionalLine && (
                              <p className="font-body text-sm sm:text-base text-neutral/80 leading-relaxed max-w-lg">
                                {promotionalLine}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Mobile Description */}
                      <div className="project-mobile-desc md:hidden pt-5">
                        {(!hasOverviewContent || mobileView !== 'overview') && (
                          <p className="body-copy">
                            {tp(project.id, 'description')}
                          </p>
                        )}
                        <div className="project-mobile-facts">
                          <span>{tp(project.id, 'location')}</span>
                          <span>{tp(project.id, 'status')}</span>
                        </div>
                      </div>

                      {/* Enquire CTA (Mobile) */}
                      <div className="project-mobile-enquiry md:hidden pt-4 pb-2">
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault()
                            if (onSelectProject) {
                              onSelectProject(project.id)
                            } else {
                              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.16em] uppercase text-accent hover:text-black transition-colors group"
                        >
                          <span>{t('projects.enquireCta')}</span>
                          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </a>
                      </div>

                      {/* Features Block */}
                      {hasFeatures && (
                        <div className="project-features-block mt-8 md:mt-10 pt-6 border-t border-neutral/20">
                          <p className="eyebrow text-neutral/60 mb-4">{t('projects.featuresLabel')}</p>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
                            {features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-baseline gap-2">
                                <span className="text-accent text-xs select-none" aria-hidden="true">—</span>
                                <span className="font-body text-xs sm:text-[13px] text-neutral/80 leading-snug">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </article>
              )
            })}
          </div>

        </div>
        </div>
      </section>
    </>
  )
}

export default Projects
