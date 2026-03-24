import { Package, Sparkles, Heart } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'

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
      {/* Page Header */}
      <section className="py-32 pt-40 px-6 bg-cream text-center">
        <h1 className="font-heading text-5xl text-charcoal">Our Story</h1>
        <div className="w-20 h-1 bg-gold mx-auto mt-4" />
        <p className="text-charcoal-light mt-4">A family tradition of sweetness</p>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="md:flex gap-12 items-center">
          {/* Image */}
          <FadeIn className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="/images/menu-composite.png"
              alt="Andy's Bakery cake jar selection"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.2} className="md:w-1/2">
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              From Venezuela to Katy, Texas
            </h2>
            <div className="space-y-4">
              <p className="text-charcoal-light leading-relaxed mt-4">
                Andy's Bakery was born from a deep love for Venezuelan repostería and the desire
                to share it with our community in Katy, Texas.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Founded by Andrea, with the support of her father Ignacio, every recipe carries
                the warmth of family gatherings and the bold flavors of Latin America.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Our cake jars are more than desserts — they're a bridge between cultures, crafted
                one small batch at a time with ingredients we'd serve to our own family.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Cake Jars Section */}
      <section className="py-16 px-6 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-center text-charcoal">Why Cake Jars?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {whyCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-charcoal mb-3">{title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-charcoal">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <span className="bg-terracotta/10 text-terracotta px-6 py-3 rounded-full font-medium">
              Family First
            </span>
            <span className="bg-plum/10 text-plum px-6 py-3 rounded-full font-medium">
              Quality Without Compromise
            </span>
            <span className="bg-gold/10 text-charcoal px-6 py-3 rounded-full font-medium">
              Proudly Latin
            </span>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
