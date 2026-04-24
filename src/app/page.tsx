'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingCart, Menu, X, Search, Heart, Star, Truck, RotateCcw, 
  Shield, ChevronDown, ChevronUp, Plus, Minus,
  Mail, MapPin, Lock, ArrowRight, Sparkles, Package
} from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext'

// Product types
interface ProductVariant {
  size: string
  stock: number
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  variants: ProductVariant[]
  isNew?: boolean
  isSale?: boolean
}

// Newsletter subscribers type
interface NewsletterSubscriber {
  email: string
  date: Date
}

// Categories with icons
const categories = [
  { id: 'all', name: 'Alla', icon: '🎨' },
  { id: 'toys', name: 'Leksaker', icon: '🧸' },
  { id: 'animals', name: 'Djur', icon: '🦁' },
  { id: 'cartoons', name: 'Serier', icon: '📺' },
  { id: 'movies', name: 'Film', icon: '🎬' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'sports', name: 'Sport', icon: '⚽' },
  { id: 'nature', name: 'Natur', icon: '🌿' },
]

// Products
const products: Product[] = [
  { id: 1, name: 'LEGO Sockor', category: 'toys', price: 49, originalPrice: 79, image: '/products/lego-socks.jpg', rating: 4.8, reviews: 124, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 20}, {size: '40-42', stock: 18}, {size: '43-45', stock: 12}] },
  { id: 2, name: 'Playmobil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/playmobil-socks.jpg', rating: 4.6, reviews: 89, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 12}, {size: '40-42', stock: 10}] },
  { id: 3, name: 'Bil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/car-socks.jpg', rating: 4.7, reviews: 156, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 15}] },
  { id: 4, name: 'Dinosaurie Sockor', category: 'animals', price: 49, originalPrice: 79, image: '/products/dino-socks.jpg', rating: 4.9, reviews: 234, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isNew: true },
  { id: 5, name: 'Enhörning Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/unicorn-socks.jpg', rating: 4.8, reviews: 189, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}] },
  { id: 6, name: 'Hundvalp Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/puppy-socks.jpg', rating: 4.7, reviews: 145, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 7, name: 'Katt Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/cat-socks.jpg', rating: 4.6, reviews: 98, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 10}, {size: '40-42', stock: 9}] },
  { id: 8, name: 'Harry Potter Sockor', category: 'cartoons', price: 59, originalPrice: 99, image: '/products/harry-socks.jpg', rating: 4.9, reviews: 312, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}], isSale: true },
  { id: 9, name: 'Mickey Mouse Sockor', category: 'cartoons', price: 49, originalPrice: 49, image: '/products/mickey-socks.jpg', rating: 4.7, reviews: 167, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}] },
  { id: 10, name: 'Spider-Man Sockor', category: 'cartoons', price: 49, originalPrice: 79, image: '/products/spiderman-socks.jpg', rating: 4.8, reviews: 203, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true },
  { id: 11, name: 'Star Wars Sockor', category: 'movies', price: 59, originalPrice: 99, image: '/products/starwars-socks.jpg', rating: 4.9, reviews: 278, variants: [{size: '34-36', stock: 22}, {size: '37-39', stock: 28}, {size: '40-42', stock: 25}, {size: '43-45', stock: 20}], isNew: true },
  { id: 12, name: 'Marvel Sockor', category: 'movies', price: 49, originalPrice: 79, image: '/products/marvel-socks.jpg', rating: 4.8, reviews: 198, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isSale: true },
  { id: 13, name: 'Gaming Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/gaming-socks.jpg', rating: 4.6, reviews: 134, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 22}] },
  { id: 14, name: 'Nintendo Sockor', category: 'gaming', price: 49, originalPrice: 79, image: '/products/nintendo-socks.jpg', rating: 4.8, reviews: 156, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}], isNew: true },
  { id: 15, name: 'Fotboll Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/football-socks.jpg', rating: 4.7, reviews: 89, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}] },
  { id: 16, name: 'Basket Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/basketball-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 10}] },
  { id: 17, name: 'Regnbåge Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/rainbow-socks.jpg', rating: 4.8, reviews: 145, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}] },
  { id: 18, name: 'Skog Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/forest-socks.jpg', rating: 4.6, reviews: 112, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}] },
]

// Return FAQ items
const returnFAQs = [
  { q: 'Hur returnerar jag?', a: 'Kontakta oss via e-post så hjälper vi dig. Du har 30 dagars öppet köp.' },
  { q: 'Hur lång tid tar en retur?', a: 'Upp till 14 arbetsdagar från att vi mottagit returen.' },
  { q: 'Måste jag betala för returfrakt?', a: 'Strumpor omfattas av begränsad returrätt av hygieniska skäl och kan endast returneras om de är oanvända samt har kvar originalförpackning och obruten försegling. Vid reklamation (t.ex. fabriksfel eller felaktig leverans) står vi för returfrakten. Support@strumpmix.se' },
  { q: 'Kan jag byta storlek?', a: 'Av hygieniska skäl tar vi tyvärr inte emot returer eller byten av strumpor vid storleksfel. Vi rekommenderar att du noggrant kontrollerar storleksguiden innan köp.' },
]

// Cart type
interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  isBundle: boolean
}

// Translations
const t = {
  sv: {
    freeShipping: 'Fri frakt i hela Sverige',
    openPurchase: '30 dagars öppet köp',
    secure: 'Säker betalning',
    heroTitle: 'Vilda mönster,',
    heroTitle2: 'perfekt passform',
    heroSubtitle: 'Unika strumpor för alla stilar. Från dinosaurier till Harry Potter – hitta din favorit!',
    shopNow: 'Handla nu',
    categories: 'Kategorier',
    size: 'Storlek',
    addToCart: 'Lägg i varukorgen',
    addBundle: 'Köp 3-pack',
    new: 'Nyhet',
    sale: 'REA',
    reviews: 'recensioner',
    bundle: '3-pack',
    trustTitle: 'Varför Strumpmix?',
    freeShipping2: 'Fri frakt i hela Sverige',
    freeShippingText: 'Snabb leverans med PostNord, 2-4 vardagar',
    returns: '30 dagars retur',
    returnsText: 'Inga frågor, pengarna tillbaka',
    quality: 'Premium kvalitet',
    qualityText: 'Strumpor som håller – testade för komfort',
    secure2: 'Säker betalning',
    secureText: 'Klarna, kort, Apple Pay & Google Pay',
    footerDesc: 'Vilda mönster för vilda själar.',
    contact: 'Kontakt',
    email: 'info@auroraecom.se',
    address: 'Stockholm, Sverige',
    about: 'Om oss',
    aboutText: 'Vi på Strumpmix letar världen över efter de mest unika och roliga mönstren.',
    legal: 'Legal',
    terms: 'Köpvillkor',
    privacy: 'Integritetspolicy',
    cookies: 'Cookiepolicy',
    copyright: '© 2024 Rock\'N Socks AB',
    cart: 'Varukorg',
    emptyCart: 'Din varukorg är tom',
    total: 'Totalt',
    checkout: 'Till kassan',
    continueShopping: 'Fortsätt handla',
    popular: 'Populärast',
    newest: 'Nyast',
    priceLow: 'Pris: Lågt till högt',
    priceHigh: 'Pris: Högt till lågt',
    featured: 'Utvalda produkter',
    newsletter: 'Håll dig uppdaterad!',
    newsletterText: 'Prenumerera på vårt nyhetsbrev för exklusiva erbjudanden!',
    emailPlaceholder: 'Din e-postadress',
    subscribe: 'Prenumerera',
    thanksSubscribe: 'Tack! Du prenumererar nu! 🎉',
    returnFAQ: 'Returfrågor',
    faqTitle: 'Vanliga frågor om returer',
    instagram: 'Följ oss på Instagram',
    outOfStock: 'Slut i lager',
    lowStock: 'Få kvar',
  },
  en: {
    freeShipping: 'Free shipping Sweden',
    openPurchase: '30 day open purchase',
    secure: 'Secure payment',
    heroTitle: 'Wild patterns,',
    heroTitle2: 'perfect fit',
    heroSubtitle: 'Unique socks for all styles. From dinosaurs to Harry Potter – find your favorite!',
    shopNow: 'Shop now',
    categories: 'Categories',
    size: 'Size',
    addToCart: 'Add to cart',
    addBundle: 'Buy 3-pack',
    new: 'New',
    sale: 'SALE',
    reviews: 'reviews',
    bundle: '3-pack',
    trustTitle: 'Why Strumpmix?',
    freeShipping2: 'Free shipping Sweden',
    freeShippingText: 'Fast delivery with PostNord, 2-4 business days',
    returns: '30 day returns',
    returnsText: 'No questions, money back',
    quality: 'Premium quality',
    qualityText: 'Socks that last – tested for comfort',
    secure2: 'Secure payment',
    secureText: 'Klarna, card, Apple Pay & Google Pay',
    footerDesc: 'Wild patterns for wild souls.',
    contact: 'Contact',
    email: 'info@auroraecom.se',
    address: 'Stockholm, Sweden',
    about: 'About us',
    aboutText: 'At Strumpmix we search the world for the most unique and fun patterns.',
    legal: 'Legal',
    terms: 'Terms',
    privacy: 'Privacy',
    cookies: 'Cookies',
    copyright: '© 2024 Rock\'N Socks AB',
    cart: 'Cart',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue shopping',
    popular: 'Most Popular',
    newest: 'Newest',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    featured: 'Featured products',
    newsletter: 'Stay updated!',
    newsletterText: 'Subscribe to our newsletter for exclusive offers!',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    thanksSubscribe: 'Thanks! You\'re subscribed! 🎉',
    returnFAQ: 'Return questions',
    faqTitle: 'Common questions about returns',
    instagram: 'Follow us on Instagram',
    outOfStock: 'Out of stock',
    lowStock: 'Low stock',
  }
}

// Language Switcher
function LanguageSwitcher({ isDark = false }: { isDark?: boolean }) {
  const { language, setLanguage } = useLanguage()
  return (
    <div className={`flex items-center rounded-full p-1 ${isDark ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-slate-100'}`}>
      <button 
        onClick={() => setLanguage('sv')} 
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'sv' 
            ? isDark ? "bg-white text-pink-600 shadow-lg" : "bg-pink-500 text-white shadow-lg"
            : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span>🇸🇪</span>
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'en' 
            ? isDark ? "bg-white text-pink-600 shadow-lg" : "bg-pink-500 text-white shadow-lg"
            : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span>🇬🇧</span>
      </button>
    </div>
  )
}

// Star Rating
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </div>
  )
}

// FAQ Accordion
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

// Newsletter Section
function NewsletterSection({ txt }: { txt: any }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  
  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }
  
  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4">
          {txt.newsletter}
        </h2>
        <p className="text-white/90 text-lg mb-8">
          {txt.newsletterText}
        </p>
        {subscribed ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 inline-block">
            <p className="text-white font-bold text-xl">🎉 {txt.thanksSubscribe}</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={txt.emailPlaceholder}
              className="flex-1 px-6 py-4 rounded-full bg-white text-slate-900 focus:ring-4 focus:ring-white/30 outline-none"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg"
            >
              {txt.subscribe}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// Product Card
function ProductCard({ product, onAddToCart, txt, index }: { product: Product; onAddToCart: (product: Product, isBundle: boolean) => void; txt: any; index: number }) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '')
  const [showSizes, setShowSizes] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      toys: '🧸', animals: '🦁', cartoons: '📺', movies: '🎬',
      gaming: '🎮', sports: '⚽', nature: '🌿'
    }
    return emojis[cat] || '🧦'
  }
  
  const hasDiscount = product.originalPrice > product.price
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const isLowStock = product.variants.every(v => v.stock < 15)
  const isOutOfStock = product.variants.every(v => v.stock === 0)
  
  return (
    <div 
      className={`group relative bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 ${
        index < 4 ? 'animate-fade-in-up' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {txt.new}
          </span>
        )}
        {product.isSale && (
          <span className="bg-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            -{discountPercent}%
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {txt.lowStock}
          </span>
        )}
      </div>
      
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[100px] sm:text-[120px] transition-transform duration-700 group-hover:scale-110">
          {getCategoryEmoji(product.category)}
        </div>
        
        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white/90 text-slate-700 px-4 py-2 rounded-full font-bold">
              {txt.outOfStock}
            </span>
          </div>
        )}
        
        {/* Quick add overlay */}
        {!isOutOfStock && (
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={() => onAddToCart(product, false)}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              + {txt.addToCart}
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-sm text-slate-500">({product.reviews})</span>
        </div>
        
        {/* Size selector */}
        <div className="mb-4">
          <button 
            onClick={() => setShowSizes(!showSizes)}
            className="w-full flex items-center justify-between text-sm font-medium text-slate-600 bg-slate-50 rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors"
          >
            <span>{txt.size}: {selectedSize}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSizes ? 'rotate-180' : ''}`} />
          </button>
          
          {showSizes && (
            <div className="mt-2 grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded-xl">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => { setSelectedSize(variant.size); setShowSizes(false) }}
                  className={`text-sm py-2.5 rounded-lg font-medium transition-all ${
                    selectedSize === variant.size 
                      ? 'bg-pink-500 text-white shadow-lg' 
                      : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-pink-600 border border-slate-200'
                  } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                  disabled={variant.stock === 0}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-slate-900">{product.price} kr</span>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through ml-2">{product.originalPrice} kr</span>
            )}
          </div>
          
          {!isOutOfStock && (
            <button 
              onClick={() => onAddToCart(product, false)}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Bundle option */}
        {!isOutOfStock && (
          <button 
            onClick={() => onAddToCart(product, true)}
            className="w-full mt-3 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🧦 {txt.addBundle} – 99 kr
          </button>
        )}
      </div>
    </div>
  )
}

// Cart Drawer
function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, txt }: { 
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (productId: number, size: string, isBundle: boolean, delta: number) => void
  onRemove: (productId: number, size: string, isBundle: boolean) => void
  txt: any 
}) {
  const total = cart.reduce((sum, item) => {
    const price = item.isBundle ? 99 : item.product.price
    return sum + price * item.quantity
  }, 0)
  
  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      toys: '🧸', animals: '🦁', cartoons: '📺', movies: '🎬',
      gaming: '🎮', sports: '⚽', nature: '🌿'
    }
    return emojis[cat] || '🧦'
  }
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">{txt.cart}</h2>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-7xl mb-4">🧦</div>
                <p className="text-slate-500 text-lg">{txt.emptyCart}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.isBundle}`} className="flex gap-4 bg-slate-50 rounded-2xl p-4">
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-slate-200">
                      {item.isBundle ? '🧦🧦🧦' : getCategoryEmoji(item.product.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{item.product.name}</h3>
                      <p className="text-sm text-slate-500">
                        {item.isBundle ? `🧦 ${txt.bundle}` : `${txt.size}: ${item.selectedSize}`}
                      </p>
                      <p className="font-bold text-pink-600 mt-1">
                        {item.isBundle ? '99 kr' : `${item.product.price} kr`}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => onRemove(item.product.id, item.selectedSize, item.isBundle)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-white rounded-full border border-slate-200 p-1">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.isBundle, -1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.isBundle, 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-slate-900">{txt.total}</span>
                <span className="text-2xl font-bold text-pink-600">{total} kr</span>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                {txt.checkout} <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="w-full text-center text-sm text-slate-500 mt-4 hover:text-pink-600 transition-colors">
                {txt.continueShopping}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Category Card
function CategoryCard({ category, isActive, onClick }: { category: typeof categories[0]; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105' 
          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-pink-300 hover:text-pink-600'
      }`}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className="font-semibold text-sm whitespace-nowrap">{category.name}</span>
    </button>
  )
}

// Mobile Menu
function MobileMenu({ isOpen, onClose, txt }: { isOpen: boolean; onClose: () => void; txt: any }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src="/logo.svg" alt="Strumpmix" className="h-10" />
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-4">
            <a href="#" className="block py-3 px-4 rounded-xl font-semibold text-slate-900 hover:bg-pink-50 transition-colors" onClick={onClose}>Hem</a>
            <a href="#products" className="block py-3 px-4 rounded-xl font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors" onClick={onClose}>Shoppa</a>
            <a href="#about" className="block py-3 px-4 rounded-xl font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors" onClick={onClose}>Om oss</a>
          </nav>
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-500 mb-3">Språk</p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}

// Main Component
function MainContent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFullAbout, setShowFullAbout] = useState(false)
  const { language } = useLanguage()
  
  const txt = t[language]
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price
      if (sortBy === 'priceHigh') return b.price - a.price
      if (sortBy === 'newest') return b.isNew ? 1 : -1
      return b.reviews - a.reviews
    })
  
  const addToCart = (product: Product, isBundle: boolean) => {
    const size = product.variants[0]?.size || ''
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size && item.isBundle === isBundle)
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedSize === size && item.isBundle === isBundle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size, isBundle }]
    })
    setIsCartOpen(true)
  }
  
  const updateQuantity = (productId: number, size: string, isBundle: boolean, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size && item.isBundle === isBundle) {
          const newQuantity = item.quantity + delta
          if (newQuantity <= 0) return null
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }
  
  const removeFromCart = (productId: number, size: string, isBundle: boolean) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size && item.isBundle === isBundle)))
  }
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-600 to-slate-900 py-3 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3].map((i) => (
            <span key={i} className="mx-8 flex items-center gap-8 text-white text-sm font-medium">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" /> {txt.freeShipping}
              </span>
              <span className="text-pink-300">•</span>
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> {txt.openPurchase}
              </span>
              <span className="text-pink-300">•</span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> {txt.secure}
              </span>
            </span>
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
          <LanguageSwitcher isDark />
        </div>
      </div>
      
      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Strumpmix" className="h-10" />
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="font-semibold text-slate-900 hover:text-pink-600 transition-colors">Hem</a>
              <a href="#products" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Shoppa</a>
              <a href="#about" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Om oss</a>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex p-3 hover:bg-slate-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-slate-600" />
              </button>
              <button className="hidden sm:flex p-3 hover:bg-slate-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" /> 60+ mönster för alla stilar!
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                {txt.heroTitle}<br/>
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {txt.heroTitle2}
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {txt.heroSubtitle}
              </p>
              <p className="text-lg text-pink-600 font-bold mb-8">
                ❤️ 5% av vinsten går till Rocka Sockorna
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#products" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300">
                  {txt.shopNow} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/gruppbild.png" 
                alt="Rocka Sockorna gruppbild" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="py-16 lg:py-24 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl lg:text-5xl font-black mb-2">
                  VI ROCKAR FÖR ALLA
                </h2>
                <p className="text-lg text-pink-400 font-semibold">
                  ❤️ 5% av vinsten går till Rocka Sockorna
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl p-8">
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                  <strong className="text-white">Vår historia</strong>
                </p>
                
                {/* Short version - always shown */}
                {!showFullAbout ? (
                  <>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                      Visste du att den 21 mars är det internationella Rocksockdagen? En dag då vi uppmärksammar och stödjer personer med Downs syndrom och andra funktionsnedsättningar över hela världen.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                      Strumpmix föddes ur en enkel idé: att kombinera moderiktiga strumpor med ett viktigt budskap. Varje par strumpor du köper bidrar direkt till att stödja organisationer som arbetar för ett mer inkluderande samhälle.
                    </p>
                  </>
                ) : (
                  <>
                    {/* Full version */}
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                      Visste du att den 21 mars är det internationella Rocksockdagen? En dag då vi uppmärksammar och stödjer personer med Downs syndrom och andra funktionsnedsättningar över hela världen.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                      Strumpmix föddes ur en enkel idé: att kombinera moderiktiga strumpor med ett viktigt budskap. Varje par strumpor du köper bidrar direkt till att stödja organisationer som arbetar för ett mer inkluderande samhälle.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                      Vi tror att alla förtjänar att känna sig inkluderade och sedda. Genom att 'rocka' udda och vilda strumpor visar vi att vi står upp för mångfald och acceptans. Det handlar inte om hur vi ser ut – det handlar om vilka vi är på insidan.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4 italic">
                      "Våra strumpor är mer än bara ett plagg. De är ett statement. En möjlighet att visa ditt stöd och sprida glädje. Så nästa gång du ser någon med ett par udda strumpor – fråga dem varför. De kanske är en del av Rörelsen."
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      <strong className="text-pink-400">21 mars</strong> – World Down Syndrome Day
                    </p>
                  </>
                )}
              </div>
              
              <div className="text-center lg:text-left mt-6">
                <button 
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="inline-flex items-center gap-2 text-white hover:text-pink-400 font-semibold transition-colors"
                >
                  {showFullAbout ? (
                    <>
                      Visa mindre <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Läs mer <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/downbild.png" 
                alt="Rocka Sockorna" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{txt.categories}</h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-medium text-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 cursor-pointer"
            >
              <option value="popular">{txt.popular}</option>
              <option value="newest">{txt.newest}</option>
              <option value="priceLow">{txt.priceLow}</option>
              <option value="priceHigh">{txt.priceHigh}</option>
            </select>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <CategoryCard 
                key={cat.id}
                category={cat}
                isActive={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section id="products" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{txt.featured}</h2>
              <p className="text-slate-500 mt-2">{filteredProducts.length} {txt.categories.toLowerCase()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                txt={txt}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">{txt.trustTitle}</h2>
          <p className="text-center text-slate-500 mb-12">Allt du behöver veta innan du handlar</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-pink-50/50 border border-slate-100 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Truck className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.freeShipping2}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.freeShippingText}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <RotateCcw className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.returns}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.returnsText}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-violet-50/50 border border-slate-100 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.secure2}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.secureText}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Return FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">
              {txt.returnFAQ}
            </h2>
            <p className="text-lg text-slate-600">{txt.faqTitle}</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            {returnFAQs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterSection txt={txt} />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src="/logo.svg" alt="Strumpmix" className="h-10 mb-6" />
              <p className="text-slate-400 leading-relaxed mb-4">{txt.footerDesc}</p>
              <a 
                href="https://instagram.com/rocknsocks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span className="text-sm font-medium">{txt.instagram}</span>
              </a>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{txt.contact}</h4>
              <div className="space-y-3 text-slate-400">
                <a href={`mailto:${txt.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> {txt.email}
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {txt.address}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{txt.about}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{txt.aboutText}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{txt.legal}</h4>
              <div className="space-y-3 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">{txt.terms}</a>
                <a href="#" className="block hover:text-white transition-colors">{txt.privacy}</a>
                <a href="#" className="block hover:text-white transition-colors">{txt.cookies}</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">{txt.copyright}</p>
            <div className="flex items-center gap-4">
              <Lock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-500">Säker & krypterad betalning</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} txt={txt} />
      
      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        txt={txt}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
