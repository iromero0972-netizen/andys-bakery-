import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Heart, Leaf, Award, MapPin, Clock, Truck, Star, Sparkles } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { FLAVORS, ORDER_APP_URL, WHATSAPP_URL } from '../lib/constants'

function InstagramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Home() {
  return (
    <PageTransition>
      {/* ═══════════════════════════════════════════════
          HERO — Interior elegante del bakery
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/image.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/40" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeIn>
            <img
              src="/images/logo.png"
              alt="Andy's Bakery"
              className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 drop-shadow-2xl"
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold leading-tight drop-shadow-lg">
              Artisan Cake Jars
              <br />
              <span className="italic">with Venezuelan Soul</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-cream text-lg md:text-xl mt-4 font-light drop-shadow">
              Handcrafted with love in Katy, Texas. Four signature flavors, one family recipe.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <Link
                to="/menu"
                className="bg-terracotta text-white px-8 py-4 rounded-full font-semibold hover:bg-terracotta-dark transition-colors text-lg shadow-lg"
              >
                View Our Menu
              </Link>
              <a
                href={ORDER_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-charcoal transition-colors text-lg"
              >
                Order Now
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="text-white w-8 h-8 opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SIGNATURE FLAVORS — Cake Jars
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              Our Signature Flavors
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4 max-w-xl mx-auto">
              Each jar is a handcrafted masterpiece — layered, sealed, and ready to enjoy
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

      {/* ═══════════════════════════════════════════════
          THE ART OF BAKING — Foto artesanal + detalle
      ═══════════════════════════════════════════════ */}
      <section className="py-0 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src="/images/image (5).jpg"
              alt="Artisan hands crafting petit fours at Andy's Bakery"
              className="w-full h-full min-h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-16">
            <FadeIn>
              <div className="text-center md:text-left max-w-md">
                <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-3">The Art of Baking</p>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">
                  Every Detail,
                  <br />
                  <span className="italic text-terracotta">Perfected by Hand</span>
                </h2>
                <p className="text-charcoal-light mt-6 leading-relaxed">
                  From the delicate placement of each petal to the final layer of cream,
                  our pastry chef ensures every piece meets the highest standards of artisan quality.
                  No shortcuts, no compromises — just pure dedication to the craft.
                </p>
                <a
                  href={ORDER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors"
                >
                  Taste the Difference →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT SHOWCASE — Fotos reales de productos
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              Beyond Cake Jars
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4 max-w-2xl mx-auto">
              From brigadeiros to tartaletas, our menu is a celebration of Latin sweetness
            </p>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Brigadeiros */}
          <FadeIn delay={0}>
            <div className="relative rounded-2xl overflow-hidden group aspect-square">
              <img
                src="/images/andys_brigadeiros_premium.webp"
                alt="Handmade Brazilian brigadeiros — chocolate and dulce de leche truffles"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-heading text-lg">Brigadeiros</p>
                <p className="text-white/80 text-xs">Brazilian truffles, handrolled daily</p>
              </div>
            </div>
          </FadeIn>

          {/* Merengues con fresa */}
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden group aspect-square">
              <img
                src="/images/andys_merengues_fresa_premium.webp"
                alt="Fresh meringue nests with strawberries and blueberries"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-heading text-lg">Merengues</p>
                <p className="text-white/80 text-xs">Crispy meringue, fresh berries</p>
              </div>
            </div>
          </FadeIn>

          {/* Tartaletas */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden group aspect-square">
              <img
                src="/images/andys_mini_tartaletas_premium.webp"
                alt="Mini tartaletas with cream, kiwi, strawberries, and blueberries"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-heading text-lg">Mini Tartaletas</p>
                <p className="text-white/80 text-xs">Buttery shells, fresh fruit & cream</p>
              </div>
            </div>
          </FadeIn>

          {/* Pavlovas / Merengues chocolate */}
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl overflow-hidden group aspect-square">
              <img
                src="/images/206641fc-a8cd-49af-9a85-4a8cdf4d5965.jpeg"
                alt="Chocolate pavlovas with whipped cream and fresh strawberries"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-heading text-lg">Mini Pavlovas</p>
                <p className="text-white/80 text-xs">Chocolate, cream & strawberries</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Catálogo completo */}
        <FadeIn delay={0.2}>
          <div className="mt-12 max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/Productos.jpg"
              alt="Complete Andy's Bakery product catalog — cake jars, tartaletas, brigadeiros, macarons, red velvet, and more"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-center text-charcoal-light mt-6 text-lg">
            Discover our full collection — from classic cake jars to elegant pastries for every occasion
          </p>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════
          PAN DE MASA MADRE — Nuevo producto
      ═══════════════════════════════════════════════ */}
      <section className="py-0 bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Video */}
          <div className="relative overflow-hidden">
            <video
              src="/videos/pan-masa-madre.mp4"
              className="w-full h-full min-h-[500px] object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute top-6 left-6 bg-gold text-charcoal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Nuevo
            </div>
          </div>

          {/* Contenido */}
          <div className="flex items-center justify-center p-10 md:p-16">
            <FadeIn>
              <div className="max-w-lg">
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">Nuevo en Andy's Bakery</p>
                <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight">
                  Pan de
                  <br />
                  <span className="text-gold italic">Masa Madre</span>
                </h2>

                <p className="text-white/70 mt-6 leading-relaxed">
                  La masa madre es una de las técnicas de panificación más antiguas del mundo, con más de
                  5,000 años de historia. Nace de la fermentación natural de harina y agua, sin levaduras
                  comerciales — solo la magia de las bacterias y levaduras silvestres que transforman los
                  ingredientes más simples en un pan extraordinario.
                </p>

                {/* Componentes */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-gold font-semibold text-sm">Ingredientes</h4>
                    <p className="text-white/50 text-xs mt-1.5 leading-relaxed">
                      Harina de trigo, agua filtrada, sal marina y el cultivo madre — nada más. Sin conservantes, sin aditivos.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-gold font-semibold text-sm">Fermentación</h4>
                    <p className="text-white/50 text-xs mt-1.5 leading-relaxed">
                      Proceso lento de 24-48 horas que desarrolla sabores complejos y una corteza crujiente inigualable.
                    </p>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold text-sm mb-3">Beneficios para la salud</h4>
                  <div className="space-y-2.5">
                    {[
                      'Más fácil de digerir gracias a la fermentación natural',
                      'Índice glucémico más bajo que el pan convencional',
                      'Rico en probióticos que fortalecen la flora intestinal',
                      'Mayor biodisponibilidad de minerales (hierro, zinc, magnesio)',
                      'Libre de conservantes y aditivos artificiales',
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                        <p className="text-white/60 text-sm">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8 flex-wrap">
                  <a
                    href={ORDER_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-charcoal px-6 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors text-sm"
                  >
                    Ordenar Ahora
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:border-white transition-colors text-sm"
                  >
                    Preguntar por WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MEET ANDREA — CEO Section
      ═══════════════════════════════════════════════ */}
      <section className="py-0 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden max-h-[650px]">
            <img
              src="/images/andrea-ceo.png"
              alt="Andrea Romero — CEO & Founder, Andy's Bakery"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-16">
            <FadeIn>
              <div className="text-center md:text-left">
                <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-3">Meet the Founder</p>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">
                  Andrea Romero
                  <br />
                  <span className="text-terracotta italic">CEO & Baker</span>
                </h2>
                <p className="text-charcoal-light mt-6 leading-relaxed max-w-md">
                  Born from Venezuelan family recipes and a passion for creating moments of sweetness.
                  Andrea brings the bold flavors of Latin America to every handcrafted creation —
                  made with love in Katy, Texas.
                </p>
                <p className="text-charcoal-light/70 mt-4 leading-relaxed max-w-md text-sm italic">
                  "Every bite should feel like coming home. That's the promise behind Andy's Bakery."
                </p>
                <Link
                  to="/about"
                  className="inline-block mt-8 border-2 border-terracotta text-terracotta px-6 py-3 rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors"
                >
                  Our Story →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VIDEO GALLERY — Todos los videos
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              See Them in Action
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4">
              Watch how we craft each dessert with care and precision
            </p>
          </FadeIn>
        </div>

        {/* Cake Jar videos — 3 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { src: '/videos/Chocolate.mp4', label: 'Marquesa Chocolate', desc: 'Rich layers of Belgian chocolate ganache' },
            { src: '/videos/DulcedeLeche.mp4', label: 'Vanilla Dulce de Leche', desc: 'Creamy caramel with buttery cake' },
            { src: '/videos/parchita.mp4', label: 'Delicia Maracuya', desc: 'Tropical passion fruit mousse' },
          ].map((video, index) => (
            <FadeIn key={video.src} delay={index * 0.1}>
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group bg-white">
                <div className="aspect-[9/16]">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                  <p className="text-white font-heading text-lg">{video.label}</p>
                  <p className="text-white/70 text-xs mt-1">{video.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Videos adicionales — 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
              <div className="aspect-video">
                <video
                  src="/videos/bakery-motion.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                <p className="text-white font-heading text-lg">Fresh From Our Kitchen</p>
                <p className="text-white/70 text-xs mt-1">Every morning starts with a new batch of sweetness</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
              <div className="aspect-video">
                <video
                  src="/videos/cake-showcase.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                <p className="text-white font-heading text-lg">The Perfect Cake</p>
                <p className="text-white/70 text-xs mt-1">Layers of flavor, crafted to impress</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BAKERY EXPERIENCE — Storefront + Interior Gallery
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-cream">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              Welcome to Andy's Bakery
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4 max-w-2xl mx-auto">
              Step inside a world of handcrafted sweetness where every detail is designed to delight
            </p>
          </FadeIn>
        </div>

        {/* Storefront principal */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/andys_bakery_foto_4_corner_view_web.png"
                alt="Andy's Bakery storefront — corner view with flowers"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl text-white">A Bakery Like No Other</h3>
                <p className="text-white/80 text-sm mt-2">
                  Inspired by the finest European patisseries, designed with Latin warmth
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/image (7).jpg"
                alt="Andy's Bakery display case — cakes, tarts, and pastries"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl text-white">Curated with Care</h3>
                <p className="text-white/80 text-sm mt-2">
                  Every pastry in our display is made fresh that morning — no exceptions
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Grid secundario — 3 imágenes */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group h-64">
              <img
                src="/images/image (4).jpg"
                alt="Bakery shelves with fresh pastries, cookies, and artisan breads"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-heading">Fresh Daily</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group h-64">
              <img
                src="/images/image (3).jpg"
                alt="Elegant petit fours on marble — tart, eclair, pink cake, and brownie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-heading">Artisan Petit Fours</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group h-64">
              <img
                src="/images/image (8).jpg"
                alt="Coffee and macarons at Andy's Bakery — cozy pink atmosphere"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-heading">A Moment of Sweetness</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRAND BANNER — Letrero con flores
      ═══════════════════════════════════════════════ */}
      <section className="relative h-72 md:h-[28rem] overflow-hidden">
        <img
          src="/images/andys_bakery_foto_5_sign_closeup_web.png"
          alt="Andy's Bakery — Homemade Delicacies sign surrounded by flowers"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
          <FadeIn>
            <div className="text-center px-6">
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">Homemade Delicacies</p>
              <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight drop-shadow-lg">
                Where Every Bite<br />
                <span className="italic">Tells a Story</span>
              </h2>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          REAL PRODUCT GALLERY — Fotos reales de cocina
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
              Straight From Our Kitchen
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mt-4" />
            <p className="text-charcoal-light text-lg mt-4 max-w-2xl mx-auto">
              Real photos, real flavors — no filters needed when the product speaks for itself
            </p>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tartaletas grandes */}
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group md:col-span-2 md:row-span-2">
              <img
                src="/images/andys_hero_tartaletas_premium.webp"
                alt="Fresh tartaletas and meringues — chocolate drizzle, strawberries, blueberries, and kiwi"
                className="w-full h-full min-h-[300px] md:min-h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl text-white">Tartaletas & Merengues</h3>
                <p className="text-white/80 text-sm mt-2">
                  Fresh fruit, silky cream, and crisp shells — made to order for your special events
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Brigadeiros */}
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/IMG_0774.jpeg"
                alt="Assorted brigadeiros — chocolate sprinkles, caramel, and dulce de leche truffles"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg text-white">Brigadeiros Artesanales</h3>
                <p className="text-white/70 text-xs mt-1">A Brazilian classic, made with Venezuelan love</p>
              </div>
            </div>
          </FadeIn>

          {/* Merengues fresas */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/IMG_5975.jpeg"
                alt="Meringue nests topped with chocolate, whipped cream, strawberries, and blueberries"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg text-white">Nidos de Merengue</h3>
                <p className="text-white/70 text-xs mt-1">Light, crispy, topped with fresh berries</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW TO ORDER — Con storefront USA
      ═══════════════════════════════════════════════ */}
      <section className="py-0 bg-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center p-12 md:p-16 order-2 md:order-1">
            <FadeIn>
              <div className="text-center md:text-left">
                <p className="text-gold uppercase tracking-widest text-sm font-medium mb-3">Simple & Delicious</p>
                <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight">
                  How to Order
                  <br />
                  <span className="text-gold italic">Your Favorites</span>
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Choose Your Flavors</h4>
                      <p className="text-white/60 text-sm mt-1">Browse our menu and pick from cake jars, brigadeiros, tartaletas, and more.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Place Your Order</h4>
                      <p className="text-white/60 text-sm mt-1">Order online or send us a WhatsApp. We'll confirm within hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Truck className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Enjoy Fresh Delivery</h4>
                      <p className="text-white/60 text-sm mt-1">Freshly made and delivered to your door in the Katy/Houston area.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-10 flex-wrap">
                  <a
                    href={ORDER_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-charcoal px-8 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors"
                  >
                    Start Your Order
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:border-white transition-colors"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="overflow-hidden order-1 md:order-2">
            <img
              src="/images/image (10).jpg"
              alt="Andy's Bakery USA storefront — classic American bakery with pink accents"
              className="w-full h-full min-h-[500px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VISIT US — Letrero con rosas
      ═══════════════════════════════════════════════ */}
      <section className="py-0 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src="/images/image (9).jpg"
              alt="Andy's Bakery door sign — Visit us to pick up your order"
              className="w-full h-full min-h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-center p-12 md:p-16">
            <FadeIn>
              <div className="text-center md:text-left max-w-md">
                <p className="text-terracotta uppercase tracking-widest text-sm font-medium mb-3">Pickup Available</p>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">
                  Order Online,
                  <br />
                  <span className="italic text-terracotta">Pick Up Fresh</span>
                </h2>
                <p className="text-charcoal-light mt-6 leading-relaxed">
                  Place your order through our website or WhatsApp, and pick it up at our location
                  in Katy, Texas. Every order is prepared fresh — never frozen, never rushed.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-terracotta flex-shrink-0" />
                    <p className="text-charcoal">Katy, Texas — Houston Metro Area</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-terracotta flex-shrink-0" />
                    <p className="text-charcoal">Local delivery available</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-terracotta flex-shrink-0" />
                    <p className="text-charcoal">3-day advance orders recommended</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY STRIP — Storefront collage + Cake beauty shot
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/image (1).jpg"
                alt="Elegant celebration cake with pink roses and gold leaf — Andy's Bakery"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl text-white">Custom Celebration Cakes</h3>
                <p className="text-white/80 text-sm mt-2">
                  Make your special moments unforgettable with a bespoke cake
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img
                src="/images/image (6).jpg"
                alt="Fresh artisan bread — sourdough loaves on wooden board"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl text-white">Artisan Breads</h3>
                <p className="text-white/80 text-sm mt-2">
                  Slow-fermented, crusty perfection — baked fresh every morning
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Brand signs */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-lg h-72">
              <img
                src="/images/image (11).jpg"
                alt="Andy's Bakery sign with roses — dark background"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-lg h-72">
              <img
                src="/images/image (12).jpg"
                alt="Andy's Bakery logo surrounded by pink roses"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-lg h-72">
              <img
                src="/images/andys_bakery_foto_2_front_view_web.png"
                alt="Andy's Bakery storefront — front view with elegant pink facade"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          POLÍTICAS DE SERVICIO — Layout asimétrico
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-charcoal overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Imagen decorativa — ocupa 2/5 */}
          <FadeIn className="lg:col-span-2 hidden lg:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-terracotta/10 rounded-full blur-3xl" />
              <img
                src="/images/andys_politicas_servicio_web.webp"
                alt="Políticas de Servicio — Andy's Bakery"
                className="rounded-2xl shadow-2xl w-full object-cover relative z-10 border border-white/10"
                loading="lazy"
              />
            </div>
          </FadeIn>

          {/* Texto de políticas — ocupa 3/5 */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-3">Para tu tranquilidad</p>
              <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight mb-2">
                Políticas de Servicio
              </h2>
              <p className="text-white/50 text-sm mb-8 max-w-lg">
                Queremos que tu experiencia sea perfecta. Estas son las condiciones que nos permiten garantizar la máxima calidad en cada pedido.
              </p>

              <div className="space-y-6">
                {/* Política 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Reserva con pago completo</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      Para apartar la fecha de tu pedido es necesario el pago completo. Hasta no cancelar el pedido, no se encuentra agendado.
                    </p>
                  </div>
                </div>

                {/* Política 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Garantía de calidad</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      En caso de algún problema con el estado del producto (cocción, textura o sabor), debes contactarnos inmediatamente y regresar el producto. Solo así se garantiza la devolución o reposición.
                    </p>
                  </div>
                </div>

                {/* Política 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Servicios adicionales</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      Todo servicio adicional como delivery o ajustes al pedido después del presupuesto final tiene un costo adicional.
                    </p>
                  </div>
                </div>

                {/* Política 4 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Pedidos exprés</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      Los pedidos exprés (24 horas de anticipación) tienen un costo adicional.
                    </p>
                  </div>
                </div>

                {/* Política 5 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Productos artesanales y frescos</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      Nuestros productos son artesanales, orgánicos y libres de conservantes. Deben conservarse adecuadamente y su duración suele ser de hasta 6 días.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cierre */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs italic">
                  Al transferir el depósito o pagar el pedido estás aceptando nuestras políticas.
                </p>
                <p className="text-gold font-heading text-lg mt-3">
                  Gracias por confiar en nosotros — con amor, Andy.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY ANDY'S — Value Props
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-cream">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal text-center">
            Why Andy's Bakery
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mt-4" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {[
            {
              Icon: Heart,
              title: 'Handcrafted with Love',
              desc: 'Every item is made in small batches with careful attention to detail and family recipes passed through generations.',
            },
            {
              Icon: Leaf,
              title: 'Authentic Latin Flavors',
              desc: 'We bring the bold, vibrant flavors of Venezuela to Katy, Texas — passion fruit, dulce de leche, and more.',
            },
            {
              Icon: Award,
              title: 'Premium Ingredients',
              desc: 'Only the finest Belgian chocolate, real fruit, and artisan ingredients make it into our creations. No preservatives, ever.',
            },
          ].map(({ Icon, title, desc }, index) => (
            <FadeIn key={title} delay={index * 0.15}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
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

      {/* ═══════════════════════════════════════════════
          FINAL CTA — Con interior counter
      ═══════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/image (2).jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight">
              Ready to Taste the Difference?
            </h2>
            <p className="text-white/80 mt-4 text-lg">
              Order your favorites today and experience the sweetness of Venezuelan tradition
            </p>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <a
                href={ORDER_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-charcoal px-8 py-4 rounded-full font-semibold hover:bg-gold/90 transition-colors text-lg shadow-lg"
              >
                Order Now
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors text-lg border border-white/30"
              >
                WhatsApp Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INSTAGRAM
      ═══════════════════════════════════════════════ */}
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
