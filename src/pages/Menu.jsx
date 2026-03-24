import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { FLAVORS, WHATSAPP_URL } from '../lib/constants'

export default function Menu() {
  return (
    <PageTransition>
      {/* Page Header */}
      <section className="py-32 pt-40 px-6 bg-cream text-center">
        <FadeIn>
          <h1 className="font-heading text-5xl md:text-6xl text-charcoal">
            Our Menu
          </h1>
          <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          <p className="text-charcoal-light text-lg mt-4">
            Handcrafted cake jars in four irresistible flavors
          </p>
        </FadeIn>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          {FLAVORS.map((flavor, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={flavor.id}
                className={`flex flex-col md:flex-row items-center gap-12 py-16 ${
                  index < FLAVORS.length - 1 ? 'border-b border-cream' : ''
                } ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="md:w-1/2">
                  <FadeIn direction={isEven ? 'right' : 'left'}>
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                    />
                  </FadeIn>
                </div>

                {/* Text Side */}
                <div className="md:w-1/2">
                  <FadeIn direction={isEven ? 'left' : 'right'}>
                    <span className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-3 block">
                      Signature Flavor
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold">
                      {flavor.name}
                    </h2>
                    <p className="text-charcoal-light text-lg leading-relaxed mt-4">
                      {flavor.description}
                    </p>
                    <p className="text-sm text-charcoal-light mt-4 italic">
                      Pricing available upon request
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/order"
                        className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition inline-block"
                      >
                        Order This Flavor
                      </Link>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-charcoal/20 text-charcoal px-6 py-3 rounded-full font-medium hover:border-terracotta hover:text-terracotta transition inline-block mt-6 ml-3"
                      >
                        Ask About Pricing
                      </a>
                    </div>
                  </FadeIn>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-cream text-center">
        <FadeIn>
          <h2 className="font-heading text-2xl text-charcoal">
            Can't decide? Try them all!
          </h2>
          <Link
            to="/order"
            className="bg-terracotta text-white px-8 py-4 rounded-full font-semibold mt-6 inline-block hover:bg-terracotta-dark transition-colors"
          >
            Order a Variety Pack
          </Link>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
