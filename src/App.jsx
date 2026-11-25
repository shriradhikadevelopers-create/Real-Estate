import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects } from './data/siteData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/layout/Navigation'
import Hero from './sections/Hero'
import Introduction from './sections/Introduction'
import Philosophy from './sections/Philosophy'
import Projects from './sections/Projects'
import PortfolioImpact from './sections/PortfolioImpact'
import Vision from './sections/Vision'
import ClosingCTA from './sections/ClosingCTA'
import Partners from './sections/Partners'
import Enquiry from './sections/Enquiry'
import Footer from './components/layout/Footer'
import { useEditorialScroll } from './hooks/useEditorialScroll'
import { useSectionFocus } from './hooks/useSectionFocus'

gsap.registerPlugin(ScrollTrigger)

if (typeof window !== 'undefined') {
  ScrollTrigger.clearScrollMemory('manual')
  window.ScrollTrigger = ScrollTrigger
  window.gsap = gsap
  window.inspectTriggers = () => {
    return ScrollTrigger.getAll().map(t => ({
      id: t.vars.id || 'anonymous',
      trigger: t.trigger?.className || t.trigger?.id || 'none',
      start: t.start,
      end: t.end,
      progress: typeof t.progress === 'number' ? Number(t.progress.toFixed(3)) : t.progress,
      isActive: t.isActive,
      animationProgress: typeof t.animation?.progress === 'function' ? Number(t.animation.progress().toFixed(3)) : null,
      animationReversed: typeof t.animation?.reversed === 'function' ? t.animation.reversed() : null,
    }))
  }
}

function App() {
  const progressRef = useRef(null)
  const philosophyRef = useRef(null)
  const projectsRef = useRef(null)
  const { activeSection, activePhilosophyIndex, activeProjectIndex } = useEditorialScroll(
    philosophyRef,
    projectsRef,
  )

  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) || null
    : null

  useSectionFocus()

  // Phase 1: Force initial scroll to top on mount so React, GSAP, and ScrollTrigger initialise from (0, 0)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo(0, 0)
    }
  }, [])

  // Phase 2: Once layout, child effects, and ScrollTrigger are stable, restore pre-reload position
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isReload = false
    try {
      const navEntries = performance.getEntriesByType?.('navigation')
      if (navEntries && navEntries.length > 0) {
        isReload = navEntries[0].type === 'reload'
      } else if (window.performance && window.performance.navigation) {
        isReload = window.performance.navigation.type === 1
      }
    } catch (_) {}

    // If not a reload, ensure session storage is clean and keep top position
    if (!isReload) {
      try {
        sessionStorage.removeItem('shri_radhika_reload_pos')
      } catch (_) {}
      return
    }

    let targetY = null
    try {
      const raw = sessionStorage.getItem('shri_radhika_reload_pos')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (typeof parsed?.y === 'number' && parsed.y > 50 && (!parsed.time || Date.now() - parsed.time < 60000)) {
          targetY = parsed.y
        }
      }
      // Immediately remove to ensure strictly one-time restoration
      sessionStorage.removeItem('shri_radhika_reload_pos')
    } catch (_) {}

    if (targetY === null) return

    let hasRestored = false
    const restoreScroll = () => {
      if (hasRestored) return
      hasRestored = true

      ScrollTrigger.refresh()
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const clampedY = Math.min(targetY, maxScroll)

      window.scrollTo({
        top: clampedY,
        behavior: 'instant',
      })

      ScrollTrigger.update()
    }

    if (document.readyState === 'complete') {
      requestAnimationFrame(() => {
        requestAnimationFrame(restoreScroll)
      })
    } else {
      const onLoad = () => {
        window.removeEventListener('load', onLoad)
        requestAnimationFrame(() => {
          requestAnimationFrame(restoreScroll)
        })
      }
      window.addEventListener('load', onLoad)
      const fallbackTimer = setTimeout(restoreScroll, 350)
      return () => {
        window.removeEventListener('load', onLoad)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !progressRef.current) return

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <>
      {/* Global Scroll Progress */}
      <div ref={progressRef} className="scroll-progress" />

      <Navigation />
      <main>
        <Hero />
        <Introduction />
        <div ref={philosophyRef}>
          <Philosophy
            isActive={activeSection === 'philosophy'}
            activeIndex={activePhilosophyIndex}
          />
        </div>
        <div ref={projectsRef}>
          <Projects
            isActive={activeSection === 'projects'}
            activeIndex={activeProjectIndex}
            onSelectProject={handleSelectProject}
          />
        </div>
        <Partners />
        <PortfolioImpact />
        <Vision />
        <ClosingCTA />
        <Enquiry
          project={selectedProject}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
