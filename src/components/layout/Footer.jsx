import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

function InstagramIcon({ size = 16, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
import { NAV_LINKS, WHATSAPP_URL, BUSINESS_EMAIL, BUSINESS_INSTAGRAM, BUSINESS_LOCATION } from '../../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="Andy's Bakery — Home" className="inline-block w-fit">
              <img
                src="/images/logo.png"
                alt="Andy's Bakery"
                style={{ height: '40px', width: 'auto' }}
                className="object-contain"
              />
            </Link>
            <p className="font-heading text-lg text-warm-white leading-snug">
              Homemade Delicacies
            </p>
            <p className="font-body text-sm text-cream/80 leading-relaxed">
              Artisan cake jars crafted with Venezuelan soul in Katy, Texas.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-warm-white text-base font-semibold tracking-wide">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2" role="list">
                {NAV_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="font-body text-sm text-cream/80 hover:text-gold transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-warm-white text-base font-semibold tracking-wide">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {/* WhatsApp */}
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="flex items-center gap-2.5 font-body text-sm text-cream/80 hover:text-gold transition-colors duration-200 group"
                >
                  <Phone
                    size={16}
                    className="text-gold flex-shrink-0 group-hover:text-gold"
                    aria-hidden="true"
                  />
                  <span>WhatsApp Us</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="flex items-center gap-2.5 font-body text-sm text-cream/80 hover:text-gold transition-colors duration-200 group"
                >
                  <Mail
                    size={16}
                    className="text-gold flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS_EMAIL}</span>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href={`https://instagram.com/${BUSINESS_INSTAGRAM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow @${BUSINESS_INSTAGRAM} on Instagram`}
                  className="flex items-center gap-2.5 font-body text-sm text-cream/80 hover:text-gold transition-colors duration-200 group"
                >
                  <InstagramIcon
                    size={16}
                    className="text-gold flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>@{BUSINESS_INSTAGRAM}</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <span className="flex items-center gap-2.5 font-body text-sm text-cream/80">
                  <MapPin
                    size={16}
                    className="text-gold flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS_LOCATION}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-cream/50 text-center sm:text-left">
            &copy; 2026 Andy&apos;s Bakery. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/40 text-center sm:text-right">
            Built by IR Virtual Solution Group
          </p>
        </div>
      </div>
    </footer>
  )
}
