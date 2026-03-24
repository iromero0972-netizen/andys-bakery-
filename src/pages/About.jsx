import { Package, Sparkles, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { ORDER_APP_URL } from '../lib/constants'

const whyCards = [
  {
    icon: Package,
    title: 'Perfectly Portable',
    description:
      'Easy to carry, share, and enjoy anywhere — from office parties to family gatherings.',
  },
  {
    icon: Sparkles,
    title: 'Always Fresh',
    description:
      'Sealed jars keep every layer moist and flavorful, just like it was made moments ago.',
  },
  {
    icon: Heart,
    title: 'Perfect Portions',
    description:
      'Individual servings mean no cutting, no mess, just pure enjoyment.',
  },
]

export default function About() {
  return (
    <PageTransition>
      {/* Page Header — Storefront con rosas */}
      <section className="relative py-32 pt-40 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/andys_bakery_foto_5_sign_closeup_web.png')" }}
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10">
          <h1 className="font-heading text-5xl md:text-6xl text-white drop-shadow-lg">Our Story</h1>
          <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          <p className="text-white/80 mt-4 text-lg">A family tradition of sweetness</p>
        </div>
      </section>

      {/* Story Section — Andrea */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <div className="md:flex gap-12 items-center">
          <FadeIn className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="/images/andrea-ceo.png"
              alt="Andrea Romero — CEO & Founder, Andy's Bakery"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="md:w-1/2">
            <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-3">The Founder</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              From Venezuela to Katy, Texas
            </h2>
            <div className="space-y-4 mt-6">
              <p className="text-charcoal-light leading-relaxed">
                Andy's Bakery was born from a deep love for Venezuelan reposteria and the desire
                to share it with our community in Katy, Texas.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Founded by Andrea, with the support of her father Ignacio, every recipe carries
                the warmth of family gatherings and the bold flavors of Latin America.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Our creations are more than desserts — they're a bridge between cultures, crafted
                one small batch at a time with ingredients we'd serve to our own family.
              </p>
            </div>
            <p className="text-charcoal-light mt-4 italic border-l-4 border-terracotta pl-4">
              "Every bite should feel like coming home. That's the promise behind Andy's Bakery."
              — Andrea Romero
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Visual break — Interior del bakery */}
      <section className="py-0 bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src="/images/image (5).jpg"
              alt="Hands placing a delicate petal on a petit four — artisan craftsmanship"
              className="w-full h-full min-h-[350px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-16">
            <FadeIn>
              <div className="text-center md:text-left max-w-md">
                <p className="text-gold uppercase tracking-widest text-sm font-medium mb-3">Our Philosophy</p>
                <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight">
                  Quality Without
                  <br />
                  <span className="text-gold italic">Compromise</span>
                </h2>
                <p className="text-white/70 mt-6 leading-relaxed">
                  We believe desserts should be made the way our abuela made them — with patience,
                  premium ingredients, and love. No shortcuts, no preservatives, no compromises.
                  Every item leaves our kitchen only when it's perfect.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bakery Experience Gallery */}
      <section className="py-20 px-6 bg-cream">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal">Inside Andy's Bakery</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: '/images/image (7).jpg', alt: 'Display case with cakes and pastries' },
            { src: '/images/image (4).jpg', alt: 'Bakery shelves with cookies and pastries' },
            { src: '/images/image (3).jpg', alt: 'Elegant petit fours on marble' },
            { src: '/images/image (8).jpg', alt: 'Coffee and macarons' },
            { src: '/images/andys_bakery_foto_4_corner_view_web.png', alt: 'Storefront corner view' },
            { src: '/images/image (2).jpg', alt: 'Kitchen counter with ingredients' },
            { src: '/images/P8260112-1024x768.jpg', alt: 'Peggy Porschen inspiration bakery' },
            { src: '/images/andys_bakery_foto_3_logo_closeup_web.png', alt: 'Andy\'s Bakery logo closeup' },
          ].map((img, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-xl overflow-hidden shadow-sm group aspect-square">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Cake Jars Section */}
      <section className="py-20 px-6 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl text-center text-charcoal">Why Cake Jars?</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {whyCards.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl text-charcoal mb-3">{title}</h3>
                  <p className="text-charcoal-light text-sm leading-relaxed">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl text-charcoal">Our Values</h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4 mb-8" />
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Family First', color: 'bg-terracotta/10 text-terracotta' },
              { label: 'Quality Without Compromise', color: 'bg-plum/10 text-plum' },
              { label: 'Proudly Latin', color: 'bg-gold/10 text-charcoal' },
              { label: 'Small Batch, Big Flavor', color: 'bg-terracotta/10 text-terracotta' },
              { label: 'No Preservatives', color: 'bg-plum/10 text-plum' },
              { label: 'Made with Love', color: 'bg-gold/10 text-charcoal' },
            ].map((v) => (
              <FadeIn key={v.label}>
                <span className={`${v.color} px-6 py-3 rounded-full font-medium text-sm`}>
                  {v.label}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-terracotta text-white text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl">Ready to try Andy's Bakery?</h2>
          <p className="text-white/80 mt-3">Order your favorites and taste the Venezuelan difference</p>
          <a
            href={ORDER_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-terracotta px-8 py-4 rounded-full font-semibold mt-8 inline-block hover:bg-cream transition-colors"
          >
            Order Now
          </a>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
