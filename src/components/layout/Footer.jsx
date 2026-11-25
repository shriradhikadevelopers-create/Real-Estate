import { company, socialLinks, contact, footer, propertyTypes, notableProjects } from '../../data/siteData'
import logoIcon from '../../assets/logo-icon.png'
import { useTranslation } from '../../hooks/useTranslation'

function Footer() {
  const { t, language } = useTranslation()

  const handleBackToTop = (e) => {
    e.preventDefault()
    const element = document.getElementById('home')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProjectLink = (e, targetHash) => {
    // If the target project article exists, scroll with header offset
    const match = targetHash.match(/^#project-([0-9a-zA-Z]+)/)
    if (match) {
      const el = document.getElementById(`project-${match[1]}`)
      if (el) {
        e.preventDefault()
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash
        }
        const headerOffset = 100
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <footer id="footer" className="bg-black text-ivory section-padding-x py-12 md:py-20 lg:py-24 relative border-t border-ivory/10">
      <div className="section-focus-wrapper w-full">
        <div className="container-base">
          {/* Top Brand & Overview */}
          <div className="mb-12 md:mb-16 pb-8 md:pb-12 border-b border-ivory/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <img
                src={logoIcon}
                alt="Shri Radhika Developers logo emblem"
                className="h-10 sm:h-12 w-auto object-contain block brightness-0 invert opacity-90 shrink-0"
              />
              <span className="h-6 w-px bg-ivory/20 inline-block shrink-0" aria-hidden="true" />
              <div>
                <p className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ivory">
                  {company.name}
                </p>
                <p className="font-body text-[11px] sm:text-xs tracking-[0.16em] uppercase text-neutral/70">
                  {company.tagline}
                </p>
              </div>
            </div>

            {/* Quick Badge */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ivory/70 font-mono tracking-wider">
              <span>25+ Years Experience</span>
              <span className="text-ivory/30">•</span>
              <span>Operating Since 2001</span>
              <span className="text-ivory/30">•</span>
              <span>Based in Deoband</span>
            </div>
          </div>

          {/* Info Grid: 4 Clean Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-16">
            {/* Column 1: Company Overview */}
            <div>
              <p className="eyebrow text-neutral/60 mb-4 tracking-[0.18em]">
                {t('footer.columnOverview')}
              </p>
              <div className="space-y-2 text-sm text-ivory/80 font-body leading-relaxed">
                <p className="font-medium text-ivory">{company.name}</p>
                <p>25+ years of experience</p>
                <p>Operating since 2001</p>
                <p>Based in Deoband</p>
              </div>
            </div>

            {/* Column 2: Property Types */}
            <div>
              <p className="eyebrow text-neutral/60 mb-4 tracking-[0.18em]">
                {t('footer.columnPropertyTypes')}
              </p>
              <ul className="space-y-2 text-sm text-ivory/80 font-body">
                {(propertyTypes || []).map((type, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/70 shrink-0" aria-hidden="true" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Notable Projects */}
            <div>
              <p className="eyebrow text-neutral/60 mb-4 tracking-[0.18em]">
                {t('footer.columnNotableProjects')}
              </p>
              <ul className="space-y-2 text-sm font-body">
                {(notableProjects || []).map((proj) => (
                  <li key={proj.id}>
                    <a
                      href={proj.href}
                      onClick={(e) => handleProjectLink(e, proj.href)}
                      className="text-ivory/80 hover:text-ivory hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span>{proj.name}</span>
                      <span
                        aria-hidden="true"
                        className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <p className="eyebrow text-neutral/60 mb-4 tracking-[0.18em]">
                {t('footer.columnContact')}
              </p>

              {/* Office Address */}
              <div className="mb-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral/50 mb-1">
                  {t('footer.columnLocation')}
                </p>
                <p className="font-body text-sm text-ivory/80 leading-snug">
                  {contact.address}
                </p>
              </div>

              {/* Email */}
              <div className="mb-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral/50 mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-body text-sm text-ivory/85 hover:text-ivory transition-colors break-all underline decoration-ivory/30 underline-offset-4"
                >
                  {contact.email}
                </a>
              </div>

              {/* Phones */}
              <div className="mb-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral/50 mb-1">
                  Phone Contacts
                </p>
                <div className="space-y-1">
                  <div>
                    <a
                      href={`tel:${contact.primaryPhone.replace(/\s+/g, '')}`}
                      className="font-mono text-sm text-ivory hover:text-accent transition-colors font-medium inline-flex items-center gap-2"
                    >
                      <span>{contact.primaryPhone}</span>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs bg-ivory/15 text-ivory/80">
                        Primary
                      </span>
                    </a>
                  </div>
                  {(contact.additionalPhones || []).map((ph) => (
                    <div key={ph}>
                      <a
                        href={`tel:${ph.replace(/\s+/g, '')}`}
                        className="font-mono text-xs sm:text-sm text-ivory/75 hover:text-ivory transition-colors block"
                      >
                        {ph}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral/50 mb-2">
                  {t('footer.columnSocial')}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      className="font-body text-xs tracking-wider uppercase text-ivory/80 hover:text-ivory transition-colors inline-flex items-center gap-1 group py-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.label}</span>
                      <span aria-hidden="true" className="text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-ivory/10">
            <p className="font-body text-xs text-neutral/60">
              {footer.copyright}
            </p>
            <button
              onClick={handleBackToTop}
              className="font-body text-xs tracking-[0.15em] uppercase text-neutral/60 hover:text-ivory focus-visible:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/50 rounded-sm p-1 -mr-1 transition-colors duration-300 mt-4 md:mt-0 cursor-pointer"
            >
              {t('footer.backToTop')} ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
