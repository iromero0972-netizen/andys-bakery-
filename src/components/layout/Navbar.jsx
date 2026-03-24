import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../lib/constants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On non-home pages, always show solid navbar
  const showSolid = scrolled || !isHome

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolid
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Andy's Bakery — Home"
            className="flex-shrink-0 flex items-center min-w-[44px] min-h-[44px]"
          >
            <img
              src="/images/logo.png"
              alt="Andy's Bakery"
              style={{ height: '48px', width: 'auto' }}
              className="object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = pathname === path
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={`
                      font-body font-medium text-sm tracking-wide uppercase px-4 py-2 rounded
                      transition-colors duration-200 min-h-[44px] inline-flex items-center
                      ${isActive
                        ? 'text-terracotta underline underline-offset-4'
                        : showSolid
                          ? 'text-charcoal hover:text-terracotta'
                          : 'text-cream hover:text-terracotta'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/order"
              className="
                bg-terracotta hover:bg-terracotta-dark text-white
                font-body font-medium text-sm tracking-wide uppercase
                px-6 py-2.5 rounded-full transition-colors duration-200
                min-h-[44px] inline-flex items-center
              "
            >
              Order Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded
              transition-colors duration-200
              text-charcoal
            "
            style={{ color: showSolid ? undefined : 'var(--color-cream)' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
                <Link
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Andy's Bakery — Home"
                >
                  <img
                    src="/images/logo.png"
                    alt="Andy's Bakery"
                    style={{ height: '40px', width: 'auto' }}
                    className="object-contain"
                  />
                </Link>
                <button
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded text-charcoal hover:text-terracotta transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Drawer nav links */}
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_LINKS.map(({ label, path }) => {
                    const isActive = pathname === path
                    return (
                      <li key={path}>
                        <Link
                          to={path}
                          className={`
                            font-body font-medium text-sm tracking-wide uppercase
                            flex items-center min-h-[44px] px-3 rounded transition-colors duration-200
                            ${isActive
                              ? 'text-terracotta bg-terracotta/10'
                              : 'text-charcoal hover:text-terracotta hover:bg-terracotta/5'
                            }
                          `}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Drawer CTA */}
              <div className="px-6 pb-8 pt-2">
                <Link
                  to="/order"
                  className="
                    bg-terracotta hover:bg-terracotta-dark text-white
                    font-body font-medium text-sm tracking-wide uppercase
                    w-full flex items-center justify-center min-h-[44px] px-6 rounded-full
                    transition-colors duration-200
                  "
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
