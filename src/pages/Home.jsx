import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Heart, Leaf, Award } from 'lucide-react'

function InstagramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { FLAVORS } from '../lib/constants'

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-charcoal/65" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeIn>
            <img
              src="/images/logo.png"
              alt="Andy's Bakery"
              className="w-24 h-24 mx-auto mb-6"
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold leading-tight">
              Artisan Cake Jars
              <br />
              <span className="italic">with Venezuelan Soul</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-cream text-lg md:text-xl mt-4 font-light">
              Four signature flavors. One family recipe. Katy, Texas.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <Link
                to="/menu"
                className="bg-terracotta text-white px-8 py-4 rounded-full font-semibold hover:bg-terracotta-dark transition-colors text-lg"
              >
                View Our Menu
              </Link>
              <Link
                to="/order"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-charcoal transition-colors text-lg"
              >
                Order Now
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="text-white w-8 h-8 opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* Flavors Preview Section */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              Our Signature Flavors
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4">
              Each jar is a handcrafted masterpiece
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto">
          {FLAVORS.map((flavor, index) => (
            <FadeIn key={flavor.id} delay={index * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-square overflow-hidden bg-cream">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-charcoal">
                    {flavor.name}
                  </h3>
                  <p className="text-charcoal-light text-sm mt-2 leading-relaxed line-clamp-2">
                    {flavor.description}
                  </p>
                  <Link
                    to="/menu"
                    className="text-terracotta text-sm font-medium mt-3 inline-block hover:text-terracotta-dark"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Andy's Section */}
      <section className="py-24 px-6 bg-cream">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal text-center">
            Why Andy's Bakery
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {[
            {
              Icon: Heart,
              title: 'Handcrafted with Love',
              desc: 'Every jar is made in small batches with careful attention to detail and family recipes passed through generations.',
            },
            {
              Icon: Leaf,
              title: 'Authentic Latin Flavors',
              desc: 'We bring the bold, vibrant flavors of Venezuela to Katy, Texas using traditional recipes and premium ingredients.',
            },
            {
              Icon: Award,
              title: 'Premium Quality',
              desc: 'Only the finest Belgian chocolate, real passion fruit, and artisan ingredients make it into our jars.',
            },
          ].map(({ Icon, title, desc }, index) => (
            <FadeIn key={title} delay={index * 0.15}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 mx-auto bg-terracotta/10 rounded-full flex items-center justify-center">
                  <Icon className="text-terracotta w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl mt-6 font-semibold text-charcoal">
                  {title}
                </h3>
                <p className="text-charcoal-light mt-3 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-terracotta text-white text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl">
            Ready to Taste the Difference?
          </h2>
          <p className="text-white/80 mt-4 text-lg">
            Order your cake jars today and experience Venezuelan sweetness
          </p>
          <Link
            to="/order"
            className="bg-white text-terracotta px-8 py-4 rounded-full font-semibold mt-8 inline-block hover:bg-cream transition-colors"
          >
            Order Now
          </Link>
        </FadeIn>
      </section>

      {/* Instagram Section */}
      <section className="py-16 px-6 bg-warm-white text-center">
        <FadeIn>
          <h2 className="font-heading text-2xl text-charcoal">
            Follow Our Journey
          </h2>
          <a
            href="https://instagram.com/andysbakeryusa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-terracotta font-medium mt-4 hover:text-terracotta-dark transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
            @andysbakeryusa
          </a>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
