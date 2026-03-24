export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '13468207669'
export const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || ''
export const WHATSAPP_MESSAGE = 'Hola! Me interesa ordenar cake jars de Andy\'s Bakery. Quisiera información sobre...'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const ORDER_APP_URL = import.meta.env.VITE_ORDER_APP_URL || 'http://localhost:4173'

export const BUSINESS_EMAIL = 'andyclawbot@gmail.com'
export const BUSINESS_INSTAGRAM = 'andysbakeryusa'
export const BUSINESS_LOCATION = 'Katy, Texas'

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Order', path: ORDER_APP_URL, external: true },
  { label: 'Contact', path: '/contact' },
]

export const FLAVORS = [
  {
    id: 'delicia-maracuya',
    name: 'Delicia Maracuyá',
    shortName: 'Maracuyá',
    description: 'Tangy passion fruit mousse layered with vanilla cake and tropical cream. A true taste of Venezuela.',
    image: '/images/products/delicia-maracuya.png',
    color: '#F5D547',
    accent: 'bg-yellow-100',
  },
  {
    id: 'marquesa-chocolate',
    name: 'Marquesa Chocolate',
    shortName: 'Chocolate',
    description: 'Rich Belgian chocolate ganache with moist cocoa cake layers. Decadent and unforgettable.',
    image: '/images/products/marquesa-chocolate.png',
    color: '#4A2C2A',
    accent: 'bg-amber-100',
  },
  {
    id: 'pie-de-limon',
    name: 'Pie de Limón',
    shortName: 'Limón',
    description: 'Zesty lemon curd with buttery graham crust and torched meringue. Bright and refreshing.',
    image: '/images/products/pie-de-limon.png',
    color: '#E8E06E',
    accent: 'bg-lime-50',
  },
  {
    id: 'vanilla-dulce-de-leche',
    name: 'Vanilla Dulce de Leche',
    shortName: 'Dulce de Leche',
    description: 'Creamy caramel perfection with buttery cake and toasted pecans. Pure Latin comfort.',
    image: '/images/products/vanilla-dulce-de-leche.png',
    color: '#D4893F',
    accent: 'bg-orange-50',
  },
]
