import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext'
import App from './App.jsx'
import './index.css'

// Enforce manual scroll restoration so reload starts at top before coordinated restoration
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  window.scrollTo(0, 0)

  // Capture current scroll position prior to page unload for reload restoration
  const captureScrollPosition = () => {
    try {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0
      if (currentY > 50) {
        sessionStorage.setItem(
          'shri_radhika_reload_pos',
          JSON.stringify({ y: Math.round(currentY), time: Date.now() })
        )
      } else {
        sessionStorage.removeItem('shri_radhika_reload_pos')
      }
    } catch (_) {}
  }

  window.addEventListener('beforeunload', captureScrollPosition)
  window.addEventListener('pagehide', captureScrollPosition)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
