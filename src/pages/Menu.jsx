import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { FLAVORS, WHATSAPP_URL, ORDER_APP_URL } from '../lib/constants'

const extraProducts = [
  {
    name: 'Brigadeiros Artesanales',
    description: 'Handrolled Brazilian truffles in chocolate sprinkles, dulce de leche, and cinnamon sugar. Perfect for parties and gifts.',
    image: '/images/andys_brigadeiros_premium.webp',
  },
  {
    name: 'Mini Tartaletas de Frutas',
    description: 'Crispy butter shells filled with pastry cream and topped with fresh strawberries, blueberries, and kiwi.',
    image: '/images/andys_mini_tartaletas_premium.webp',
  },
  {
    name: 'Merengues con Fresas',
    description: 'Light, crispy meringue nests layered with chocolate ganache, whipped cream, and fresh strawberries.',
    image: '/images/andys_merengues_fresa_premium.webp',
  },
]

export default function Menu() {
  return (
    <PageTransition>
      {/* Page Header — con display case */}
      <section className="relative py-32 pt-40 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/image (7).jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10">
          <FadeIn>
            <h1 className="font-heading text-5xl md:text-6xl text-white drop-shadow-lg">
              Our Menu
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-white/80 text-lg mt-4">
              Handcrafted desserts in irresistible flavors
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SIGNATURE CAKE JARS ═══ */}
      <section className="py-20 px-6 bg-warm-white">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-2">Signature Collection</p>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal">Cake Jars</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          </FadeIn>
        </div>

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
                <div className="md:w-1/2">
                  <FadeIn direction={isEven ? 'right' : 'left'}>
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                    />
                  </FadeIn>
                </div>

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
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={ORDER_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition inline-block"
                      >
                        Order This Flavor
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-charcoal/20 text-charcoal px-6 py-3 rounded-full font-medium hover:border-terracotta hover:text-terracotta transition inline-block"
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

      {/* ═══ VIDEOS DE CAKE JARS ═══ */}
      <section className="py-20 px-6 bg-cream">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="font-heading text-3xl text-charcoal">See Them Up Close</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { src: '/videos/Chocolate.mp4', label: 'Marquesa Chocolate' },
            { src: '/videos/DulcedeLeche.mp4', label: 'Vanilla Dulce de Leche' },
            { src: '/videos/parchita.mp4', label: 'Delicia Maracuya' },
          ].map((video, i) => (
            <FadeIn key={video.src} delay={i * 0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-sm bg-white">
                <div className="aspect-[9/16]">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay muted loop playsInline preload="metadata"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                  <p className="text-white text-sm font-heading">{video.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ EXTRA PRODUCTS ═══ */}
      <section className="py-20 px-6 bg-warm-white">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-2">Beyond the Jars</p>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal">More Delicacies</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4 max-w-xl mx-auto">
              Our full selection of artisan pastries — perfect for events, gifts, or treating yourself
            </p>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {extraProducts.map((product, i) => (
            <FadeIn key={product.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-charcoal">{product.name}</h3>
                  <p className="text-charcoal-light text-sm mt-2 leading-relaxed">{product.description}</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta text-sm font-medium mt-3 inline-block hover:text-terracotta-dark"
                  >
                    Ask About Pricing →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Catálogo visual */}
        <FadeIn delay={0.2}>
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/Productos.jpg"
              alt="Complete Andy's Bakery product catalog"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-terracotta text-white text-center">
        <FadeIn>
          <h2 className="font-heading text-2xl md:text-3xl">
            Can't decide? Ask us for a recommendation!
          </h2>
          <p className="text-white/80 mt-3">We'll help you pick the perfect selection for any occasion</p>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <a
              href={ORDER_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-terracotta px-8 py-4 rounded-full font-semibold hover:bg-cream transition-colors"
            >
              Order Now
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-terracotta transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
