'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingCart, Menu, X, Heart, User, Star, Truck, RotateCcw, Settings, 
  Shield, ChevronDown, ChevronUp, Plus, Minus,
  Mail, MapPin, Lock, ArrowRight, Sparkles, Package, HeartOff, LogOut, PackageOpen, MessageCircle
} from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext'
import { supabase } from '@/lib/supabase'

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
  { q: 'Reklamation', a: 'Fyll i vårt supportformulär ' },
  { q: 'Hur lång tid tar en retur?', a: 'Upp till 14 arbetsdagar från att vi mottagit returen.' },
  { q: 'Måste jag betala för returfrakt?', a: 'Vid reklamation (fabriksfel eller felaktig leverans) står vi för returfrakten. mail: Support@strumpmix.se' },
  { q: 'Kan jag byta storlek?', a: 'Av hygieniska skäl tar vi tyvärr inte emot returer eller byten av strumpor vid storleksfel.' },
]

// Cart type
interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  isBundle: boolean
}

// Order type (matches Supabase schema)
interface Order {
  id: string
  email: string
  name: string
  address: string
  city: string
  zip_code: string
  phone: string
  total: number
  stripe_payment_id: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  items?: { name: string; quantity: number; price: number }[]
}

// Map order status to Swedish
const statusMap: Record<string, string> = {
  pending: 'Behandlas',
  paid: 'Betald',
  shipped: 'Skickad',
  delivered: 'Levererad',
  cancelled: 'Avbruten'
}

// Translations
const t = {
  sv: {
    freeShipping: 'Fri frakt i hela Sverige',
    secure: 'Säker betalning',
    heroTitle: 'Vilda mönster,',
    heroTitle2: 'perfekt passform',
    heroSubtitle: 'Unika strumpor för alla stilar. Från dinosaurier till Harry Potter – hitta din favorit!',
    shopNow: 'Handla nu',
    categories: 'Kategorier',
    size: 'Storlek',
    addToCart: 'Lägg i varukorgen',
    addBundle: 'Köp 3-pack – 99 kr',
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
    copyright: '© 2024 Strumpmix AB',
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
    newsletterText: 'Prenumerera för exklusiva erbjudanden!',
    emailPlaceholder: 'Din e-postadress',
    subscribe: 'Prenumerera',
    thanksSubscribe: 'Tack! Du prenumererar nu! 🎉',
    returnFAQ: 'Retur & Reklamation',
    faqTitle: 'Vanliga frågor',
    instagram: 'Följ oss på Instagram',
    outOfStock: 'Slut i lager',
    lowStock: 'Få kvar',
    menu: 'Meny',
    login: 'Logga in',
    signup: 'Skapa konto',
    logout: 'Logga ut',
    favorites: 'Favoriter',
    myOrders: 'Mina beställningar',
    settings: 'Inställningar',
    changePassword: 'Byta lösenord',
    support: 'Support',
    returnsLink: 'Returer',
    deleteAccount: 'Avsluta konto',
    back: 'Tillbaka',
    save: 'Spara',
    send: 'Skicka',
    writeHere: 'Skriv här...',
    typeToDelete: 'Skriv RADERA för att bekräfta',
  },
  en: {
    freeShipping: 'Free shipping Sweden',
    secure: 'Secure payment',
    heroTitle: 'Wild patterns,',
    heroTitle2: 'perfect fit',
    heroSubtitle: 'Unique socks for all styles. From dinosaurs to Harry Potter – find your favorite!',
    shopNow: 'Shop now',
    categories: 'Categories',
    size: 'Size',
    addToCart: 'Add to cart',
    addBundle: 'Buy 3-pack – 99 kr',
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
    copyright: '© 2024 Strumpmix AB',
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
    newsletterText: 'Subscribe for exclusive offers!',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    thanksSubscribe: 'Thanks! You\'re subscribed! 🎉',
    returnFAQ: 'Returns & Complaints',
    faqTitle: 'Common questions',
    instagram: 'Follow us on Instagram',
    outOfStock: 'Out of stock',
    lowStock: 'Low stock',
    menu: 'Menu',
    login: 'Log in',
    signup: 'Create account',
    logout: 'Log out',
    favorites: 'Favorites',
    myOrders: 'My orders',
    settings: 'Settings',
    changePassword: 'Change password',
    support: 'Support',
    returnsLink: 'Returns',
    deleteAccount: 'Delete account',
    back: 'Back',
    save: 'Save',
    send: 'Send',
    writeHere: 'Write here...',
    typeToDelete: 'Type DELETE to confirm',
  }
}

// Language Switcher
function LanguageSwitcher({ isDark = false, compact = false }: { isDark?: boolean; compact?: boolean }) {
  const { language, setLanguage } = useLanguage()
  return (
    <div className={`flex items-center rounded-full p-1 ${isDark ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-slate-100'}`}>
      <button 
        onClick={() => setLanguage('sv')} 
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'sv' 
            ? isDark ? "bg-white text-pink-600 shadow-lg" : "bg-pink-500 text-white shadow-lg"
            : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span className={compact ? 'text-base' : 'text-lg'}>🇸🇪</span>
        {!compact && <span className="hidden sm:inline">SE</span>}
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'en' 
            ? isDark ? "bg-white text-pink-600 shadow-lg" : "bg-pink-500 text-white shadow-lg"
            : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span className={compact ? 'text-base' : 'text-lg'}>🇬🇧</span>
        {!compact && <span className="hidden sm:inline">EN</span>}
      </button>
    </div>
  )
}

// Star Rating
function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`${s} ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
      ))}
    </div>
  )
}

// FAQ Accordion
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left active:bg-slate-50 transition-colors touch-manipulation min-h-[56px]"
      >
        <span className="font-semibold text-slate-900 pr-4 text-base">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-slate-600 leading-relaxed text-base px-1">
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
  const [error, setError] = useState('')
  
  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setError('Ange en giltig e-postadress')
      return
    }
    setError('')
    
    try {
      const { error: dbError } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed: true }])
      
      if (dbError && dbError.code !== '23505') { // Ignore duplicate email error
        console.error('Newsletter error:', dbError)
      }
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      // Still show success even if DB fails
      setSubscribed(true)
      setEmail('')
    }
  }
  
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
          {txt.newsletter}
        </h2>
        <p className="text-white/90 text-base sm:text-lg mb-6 px-4">
          {txt.newsletterText}
        </p>
        {subscribed ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 sm:p-6 inline-block mx-4">
            <p className="text-white font-bold text-lg sm:text-xl">🎉 {txt.thanksSubscribe}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={txt.emailPlaceholder}
                className="flex-1 min-h-[52px] px-5 sm:px-6 py-3 sm:py-4 rounded-full bg-white text-slate-900 text-base focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button 
                onClick={handleSubscribe}
                className="min-h-[52px] bg-slate-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base hover:bg-slate-800 transition-colors shadow-lg"
              >
                {txt.subscribe}
              </button>
            </div>
            {error && <p className="text-white/90 text-sm mt-3">{error}</p>}
          </>
        )}
      </div>
    </section>
  )
}

// Product Card - Optimized for touch
function ProductCard({ product, onAddToCart, txt, onToggleFavorite, isFavorite }: { product: Product; onAddToCart: (product: Product, isBundle: boolean) => void; txt: any; onToggleFavorite?: (id: number) => void; isFavorite?: boolean }) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '')
  const [showSizes, setShowSizes] = useState(false)
  
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
  
  const handleAddToCart = () => {
    onAddToCart(product, false)
  }
  
  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 sm:gap-2">
        {product.isNew && (
          <span className="bg-emerald-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow">
            {txt.new}
          </span>
        )}
        {product.isSale && (
          <span className="bg-rose-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow">
            -{discountPercent}%
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="bg-amber-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow">
            {txt.lowStock}
          </span>
        )}
      </div>
      
      {/* Favorite button */}
      {onToggleFavorite && (
        <button 
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all touch-manipulation"
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          ) : (
            <Heart className="w-5 h-5 text-slate-400" />
          )}
        </button>
      )}
      
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0 flex items-center justify-center text-[80px] sm:text-[100px] md:text-[120px] transition-transform duration-500 group-hover:scale-105">
          {getCategoryEmoji(product.category)}
        </div>
        
        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white/95 text-slate-700 px-4 py-2 rounded-full font-bold text-sm sm:text-base">
              {txt.outOfStock}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5 sm:mb-2 leading-tight">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs sm:text-sm text-slate-500">({product.reviews})</span>
        </div>
        
        {/* Size selector - collapsible on mobile */}
        <div className="mb-3 sm:mb-4">
          <button 
            onClick={() => setShowSizes(!showSizes)}
            className="w-full flex items-center justify-between text-sm font-medium text-slate-600 bg-slate-50 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-slate-100 transition-colors touch-manipulation min-h-[44px]"
          >
            <span>{txt.size}: {selectedSize}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSizes ? 'rotate-180' : ''}`} />
          </button>
          
          {showSizes && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 p-2 bg-slate-50 rounded-xl">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => { setSelectedSize(variant.size); setShowSizes(false) }}
                  className={`text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg font-medium transition-all touch-manipulation min-h-[40px] sm:min-h-[44px] ${
                    selectedSize === variant.size 
                      ? 'bg-pink-500 text-white shadow' 
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
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900">{product.price} kr</span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-slate-400 line-through ml-1.5">{product.originalPrice} kr</span>
            )}
          </div>
          
          {!isOutOfStock && (
            <button 
              onClick={handleAddToCart}
              className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
        
        {/* Bundle option */}
        {!isOutOfStock && (
          <button 
            onClick={() => onAddToCart(product, true)}
            className="w-full mt-3 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-slate-900 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow touch-manipulation min-h-[44px]"
          >
            🧦 {txt.addBundle}
          </button>
        )}
      </div>
    </div>
  )
}

// Cart Drawer - Full mobile optimization
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
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">{txt.cart}</h2>
          <button 
            onClick={onClose} 
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="text-6xl sm:text-7xl mb-4">🧦</div>
              <p className="text-slate-500 text-base sm:text-lg">{txt.emptyCart}</p>
              <button 
                onClick={onClose}
                className="mt-6 text-pink-500 font-semibold"
              >
                {txt.continueShopping}
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.isBundle}`} className="flex gap-3 sm:gap-4 bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 border border-slate-200">
                    {item.isBundle ? '🧦🧦🧦' : getCategoryEmoji(item.product.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{item.product.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {item.isBundle ? `🧦 ${txt.bundle}` : `${txt.size}: ${item.selectedSize}`}
                    </p>
                    <p className="font-bold text-pink-600 text-sm sm:text-base mt-1">
                      {item.isBundle ? '99 kr' : `${item.product.price} kr`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => onRemove(item.product.id, item.selectedSize, item.isBundle)} 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors touch-manipulation"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-full border border-slate-200 p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.isBundle, -1)} 
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 sm:w-7 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.isBundle, 1)} 
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-base sm:text-lg text-slate-900">{txt.total}</span>
              <span className="text-xl sm:text-2xl font-bold text-pink-600">{total} kr</span>
            </div>
            <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation min-h-[52px]">
              {txt.checkout} <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose} 
              className="w-full text-center text-sm text-slate-500 mt-3 hover:text-pink-600 transition-colors py-2 touch-manipulation"
            >
              {txt.continueShopping}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Login Modal - Mobile optimized
function LoginModal({ isOpen, onClose, onLogin, isSignUp, setIsSignUp, email, setEmail, password, setPassword, error, txt, isLoading }: { 
  isOpen: boolean; onClose: () => void; onLogin: () => void; isSignUp: boolean; setIsSignUp: (v: boolean) => void; 
  email: string; setEmail: (v: string) => void; password: string; setPassword: (v: string) => void; error: string; txt: any; isLoading?: boolean 
}) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl sm:mt-0 mt-auto sm:mb-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{isSignUp ? txt.signup : txt.login}</h3>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-post"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none min-h-[48px]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none min-h-[48px]"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            onClick={onLogin} 
            disabled={isLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3.5 rounded-xl font-bold text-base shadow-lg transition-colors touch-manipulation min-h-[48px] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              isSignUp ? txt.signup : txt.login
            )}
          </button>
          <p className="text-center text-sm text-slate-500 py-2">
            {isSignUp ? 'Har du redan ett konto?' : 'Inget konto?'}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-pink-500 font-semibold ml-1">
              {isSignUp ? txt.login : txt.signup}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// Profile Modal - Full mobile optimization with bottom sheet on mobile
function ProfileModal({ isOpen, onClose, activeSection, setActiveSection, favorites, orders, onLogout, user, txt }: { 
  isOpen: boolean; onClose: () => void; activeSection: string; setActiveSection: (s: string) => void; 
  favorites: number[]; orders: Order[]; onLogout: () => void; user: any; txt: any 
}) {
  const [newPassword, setNewPassword] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [supportSuccess, setSupportSuccess] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [returnOrderId, setReturnOrderId] = useState('')
  const [returnReason, setReturnReason] = useState('')
  const [returnSuccess, setReturnSuccess] = useState(false)
  
  const handlePasswordChange = async () => {
    setPasswordError('')
    setPasswordSuccess('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordError(error.message)
    } else {
      setPasswordSuccess('Lösenord ändrat!')
      setNewPassword('')
      setTimeout(() => setPasswordSuccess(''), 3000)
    }
  }
  
  const handleSupportSubmit = async () => {
    if (!user) return
    await supabase.from('support_tickets').insert([{
      user_id: user.id,
      subject: supportSubject,
      message: supportMessage
    }])
    setSupportSuccess(true)
    setSupportSubject('')
    setSupportMessage('')
    setTimeout(() => setSupportSuccess(false), 3000)
  }
  
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'RADERA') return
    await supabase.from('wishlists').delete().eq('user_id', user.id)
    await supabase.from('profiles').delete().eq('id', user.id)
    onLogout()
  }
  
  const handleReturnRequest = async () => {
    if (!user || !returnOrderId || !returnReason) return
    await supabase.from('returns').insert([{
      user_id: user.id,
      order_id: returnOrderId,
      reason: returnReason
    }])
    setReturnSuccess(true)
    setReturnOrderId('')
    setReturnReason('')
    setTimeout(() => setReturnSuccess(false), 3000)
  }
  
  if (!isOpen) return null
  
  const isSubSection = ['password', 'support', 'returns', 'delete'].includes(activeSection)
  
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 top-auto sm:inset-0 sm:top-0 sm:bottom-auto sm:flex sm:items-center sm:justify-center z-50">
        <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md sm:shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isSubSection && (
                <button 
                  onClick={() => setActiveSection('settings')} 
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
              )}
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {isSubSection ? '' : txt.settings}
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          {/* Navigation Tabs - hide on sub-sections */}
          {!isSubSection && (
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveSection('favorites')} 
                className={`flex-1 py-3 text-sm font-medium transition-colors touch-manipulation min-h-[48px] ${
                  activeSection === 'favorites' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
                }`}
              >
                <Heart className="w-4 h-4 mx-auto mb-1" />
                {txt.favorites}
              </button>
              <button 
                onClick={() => setActiveSection('orders')} 
                className={`flex-1 py-3 text-sm font-medium transition-colors touch-manipulation min-h-[48px] ${
                  activeSection === 'orders' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
                }`}
              >
                <Package className="w-4 h-4 mx-auto mb-1" />
                {txt.myOrders}
              </button>
              <button 
                onClick={() => setActiveSection('settings')} 
                className={`flex-1 py-3 text-sm font-medium transition-colors touch-manipulation min-h-[48px] ${
                  activeSection === 'settings' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
                }`}
              >
                <Settings className="w-4 h-4 mx-auto mb-1" />
                {txt.settings}
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            
            {/* Favorites */}
            {activeSection === 'favorites' && (
              <div>
                <h3 className="font-bold text-lg mb-4">{txt.favorites} ({favorites.length})</h3>
                {favorites.length === 0 && (
                  <div className="text-center py-8">
                    <HeartOff className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Inga favoriter ännu</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Orders */}
            {activeSection === 'orders' && (
              <div>
                <h3 className="font-bold text-lg mb-4">{txt.myOrders} ({orders.length})</h3>
                {orders.length === 0 && (
                  <div className="text-center py-8">
                    <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Inga beställningar ännu</p>
                  </div>
                )}
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="border-b border-slate-100 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-900">{order.total} kr</p>
                        <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString('sv-SE')}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {statusMap[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Settings */}
            {activeSection === 'settings' && (
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveSection('password')} 
                  className="w-full flex items-center gap-3 py-4 text-slate-700 hover:bg-slate-50 rounded-xl px-4 transition-colors touch-manipulation min-h-[52px]"
                >
                  <Lock className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{txt.changePassword}</span>
                </button>
                <button 
                  onClick={() => setActiveSection('support')} 
                  className="w-full flex items-center gap-3 py-4 text-slate-700 hover:bg-slate-50 rounded-xl px-4 transition-colors touch-manipulation min-h-[52px]"
                >
                  <MessageCircle className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{txt.support}</span>
                </button>
                <button 
                  onClick={() => setActiveSection('returns')} 
                  className="w-full flex items-center gap-3 py-4 text-slate-700 hover:bg-slate-50 rounded-xl px-4 transition-colors touch-manipulation min-h-[52px]"
                >
                  <RotateCcw className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{txt.returnsLink}</span>
                </button>
                <button 
                  onClick={() => setActiveSection('delete')} 
                  className="w-full flex items-center gap-3 py-4 text-red-500 hover:bg-red-50 rounded-xl px-4 transition-colors touch-manipulation min-h-[52px]"
                >
                  <X className="w-5 h-5" />
                  <span className="font-medium">{txt.deleteAccount}</span>
                </button>
                
                <div className="pt-6 mt-6 border-t border-slate-200">
                  <button 
                    onClick={onLogout} 
                    className="w-full flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-red-500 transition-colors touch-manipulation"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">{txt.logout}</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Password Change */}
            {activeSection === 'password' && (
              <div>
                <h3 className="font-bold text-lg mb-4">{txt.changePassword}</h3>
                <div className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="Nytt lösenord" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[48px]"
                  />
                  <button 
                    onClick={handlePasswordChange} 
                    className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-bold text-base touch-manipulation min-h-[48px]"
                  >
                    {txt.save}
                  </button>
                  {passwordSuccess && <p className="text-green-500 text-center py-2">{passwordSuccess}</p>}
                  {passwordError && <p className="text-red-500 text-center py-2">{passwordError}</p>}
                </div>
              </div>
            )}
            
            {/* Support */}
            {activeSection === 'support' && (
              <div>
                <h3 className="font-bold text-lg mb-4">{txt.support}</h3>
                {supportSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">✅</div>
                    <p className="text-green-600 font-medium">Skickat! Vi återkommer snart.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Ämne" 
                      value={supportSubject} 
                      onChange={e => setSupportSubject(e.target.value)} 
                      className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[48px]"
                    />
                    <textarea 
                      placeholder={txt.writeHere} 
                      value={supportMessage} 
                      onChange={e => setSupportMessage(e.target.value)} 
                      className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[120px] resize-none"
                    />
                    <button 
                      onClick={handleSupportSubmit} 
                      className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-bold text-base touch-manipulation min-h-[48px]"
                    >
                      {txt.send}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Returns */}
            {activeSection === 'returns' && (
              <div>
                <h3 className="font-bold text-lg mb-4">{txt.returnsLink}</h3>
                {returnSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">✅</div>
                    <p className="text-green-600 font-medium">Retur begärd! Vi återkommer snart.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Order ID" 
                      value={returnOrderId} 
                      onChange={e => setReturnOrderId(e.target.value)} 
                      className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[48px]"
                    />
                    <textarea 
                      placeholder={txt.writeHere} 
                      value={returnReason} 
                      onChange={e => setReturnReason(e.target.value)} 
                      className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[120px] resize-none"
                    />
                    <button 
                      onClick={handleReturnRequest} 
                      className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-bold text-base touch-manipulation min-h-[48px]"
                    >
                      {txt.send}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Delete Account */}
            {activeSection === 'delete' && (
              <div>
                <h3 className="font-bold text-lg mb-4 text-red-500">{txt.deleteAccount}</h3>
                <p className="text-slate-600 mb-4">Detta raderar all din data permanent.</p>
                <input 
                  type="text" 
                  placeholder={txt.typeToDelete} 
                  value={deleteConfirm} 
                  onChange={e => setDeleteConfirm(e.target.value)} 
                  className="w-full p-4 border border-red-300 rounded-xl text-base mb-4 min-h-[48px]"
                />
                <button 
                  onClick={handleDeleteAccount} 
                  disabled={deleteConfirm !== 'RADERA'} 
                  className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-base disabled:opacity-50 touch-manipulation min-h-[48px]"
                >
                  {txt.deleteAccount}
                </button>
              </div>
            )}
          </div>
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
      className={`flex-shrink-0 flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 touch-manipulation min-w-[80px] sm:min-w-[90px] ${
        isActive 
          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-pink-300 hover:text-pink-600'
      }`}
    >
      <span className="text-2xl sm:text-3xl">{category.icon}</span>
      <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{category.name}</span>
    </button>
  )
}

// Mobile Menu - Improved
function MobileMenu({ isOpen, onClose, txt }: { isOpen: boolean; onClose: () => void; txt: any }) {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed left-0 top-0 bottom-0 h-full w-[85vw] max-w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <img src="/logo.svg?v=2" alt="Strumpmix" className="h-9" />
            <button 
              onClick={onClose} 
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 py-4 px-4 rounded-xl font-semibold text-slate-900 hover:bg-pink-50 transition-colors touch-manipulation min-h-[52px]" onClick={onClose}>
              <span className="text-xl">🏠</span> Hem
            </a>
            <a href="#products" className="flex items-center gap-3 py-4 px-4 rounded-xl font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors touch-manipulation min-h-[52px]" onClick={onClose}>
              <span className="text-xl">🛍️</span> Shoppa
            </a>
            <a href="#about" className="flex items-center gap-3 py-4 px-4 rounded-xl font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors touch-manipulation min-h-[52px]" onClick={onClose}>
              <span className="text-xl">💜</span> Om oss
            </a>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-500 mb-3 px-4">Språk</p>
            <div className="px-4">
              <LanguageSwitcher />
            </div>
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
  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [complaintSent, setComplaintSent] = useState(false)
  const [complaintOrder, setComplaintOrder] = useState('')
  const [complaintName, setComplaintName] = useState('')
  const [complaintReason, setComplaintReason] = useState('')
  
  // Profile state
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileSection, setProfileSection] = useState('favorites')
  const [favorites, setFavorites] = useState<number[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<any>(null)
  
  // Login state
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  
  // Load user data
  const loadUserData = async (userId: string) => {
    try {
      const { data: favData } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId)
      if (favData) setFavorites(favData.map(f => f.product_id))
    } catch (e) {
      // Ignore errors
    }
  }
  
  // Load user on mount
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await loadUserData(session.user.id)
      }
    }
    initAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await loadUserData(session.user.id)
      } else {
        setUser(null)
        setFavorites([])
        setOrders([])
      }
    })
    
    return () => subscription.unsubscribe()
  }, [])
  
  const handleLogin = async () => {
    setLoginError('')
    if (!loginEmail || !loginPassword) {
      setLoginError('Fyll i alla fält')
      return
    }
    
    setIsAuthLoading(true)
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: loginEmail,
          password: loginPassword,
        })
        if (error) throw error
        setShowLoginModal(false)
        setLoginEmail('')
        setLoginPassword('')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword,
        })
        if (error) {
          setLoginError('Fel e-post eller lösenord')
        } else {
          setShowLoginModal(false)
          setLoginEmail('')
          setLoginPassword('')
        }
      }
    } catch (err: any) {
      setLoginError(err.message || 'Ett fel uppstod')
    }
    
    setIsAuthLoading(false)
  }
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowProfileModal(false)
  }
  
  const isLoggedIn = !!user
  
  const { language } = useLanguage()
  const txt = t[language]
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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
  
  const toggleFavorite = async (productId: number) => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    if (favorites.includes(productId)) {
      await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId)
      setFavorites(prev => prev.filter(id => id !== productId))
    } else {
      await supabase.from('wishlists').insert({ user_id: user.id, product_id: productId })
      setFavorites(prev => [...prev, productId])
    }
  }
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors touch-manipulation"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img src="/logo.svg?v=2" alt="Strumpmix" className="h-8 sm:h-10" />
            </a>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="font-semibold text-slate-900 hover:text-pink-600 transition-colors">Hem</a>
              <a href="#products" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Shoppa</a>
              <a href="#about" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Om oss</a>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher - Desktop */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
              {/* Desktop icons */}
              <div className="hidden sm:flex items-center gap-1">
                <button 
                  onClick={() => {
                    if (isLoggedIn) {
                      setProfileSection('favorites')
                      setShowProfileModal(true)
                    } else {
                      setShowLoginModal(true)
                    }
                  }}
                  className="relative p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <Heart className="w-5 h-5 text-slate-600" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => isLoggedIn ? setShowProfileModal(true) : setShowLoginModal(true)}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <User className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              {/* Cart - always visible */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2.5 sm:p-3 hover:bg-slate-100 rounded-full transition-colors touch-manipulation"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile profile */}
              <button 
                onClick={() => isLoggedIn ? setShowProfileModal(true) : setShowLoginModal(true)}
                className="sm:hidden p-2.5 hover:bg-slate-100 rounded-full transition-colors touch-manipulation"
              >
                <User className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        email={loginEmail}
        setEmail={setLoginEmail}
        password={loginPassword}
        setPassword={setLoginPassword}
        error={loginError}
        txt={txt}
        isLoading={isAuthLoading}
      />
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal && isLoggedIn} 
        onClose={() => setShowProfileModal(false)} 
        activeSection={profileSection}
        setActiveSection={setProfileSection}
        favorites={favorites}
        orders={orders}
        onLogout={handleLogout}
        user={user}
        txt={txt}
      />
      
      {/* Hero Section - Mobile optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 60+ mönster för alla stilar!
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4 sm:mb-6">
                {txt.heroTitle}<br/>
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {txt.heroTitle2}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-3 sm:mb-4 max-w-lg mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
                {txt.heroSubtitle}
              </p>
              <p className="text-sm sm:text-base text-pink-600 font-bold mb-6 sm:mb-8">
                ❤️ 5% av vinsten går till Rocka Sockorna
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href="#products" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 touch-manipulation">
                  {txt.shopNow} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <img 
                src="/logo.svg?v=3" 
                alt="Strumpmix" 
                className="w-full max-w-xs sm:max-w-sm mx-auto mb-6 drop-shadow-lg"
              />
              <img 
                src="/gruppbild.png" 
                alt="Rocka Sockorna gruppbild" 
                className="w-full max-w-md sm:max-w-lg mx-auto rounded-2xl sm:rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section - Mobile optimized */}
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="text-center lg:text-left mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-2">
                  VI ROCKAR FÖR ALLA
                </h2>
                <p className="text-base sm:text-lg text-pink-400 font-semibold">
                  ❤️ 5% av vinsten går till Rocka Sockorna
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                {!showFullAbout ? (
                  <>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      <strong className="text-white">Vår historia</strong>
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      Visste du att den 21 mars är det internationella Rocksockdagen? En dag då vi uppmärksammar och stödjer personer med Downs syndrom och andra funktionsnedsättningar.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                      Strumpmix föddes ur en enkel idé: att kombinera moderiktiga strumpor med ett viktigt budskap.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      Visste du att den 21 mars är det internationella Rocksockdagen? En dag då vi uppmärksammar och stödjer personer med Downs syndrom och andra funktionsnedsättningar över hela världen.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      Strumpmix föddes ur en enkel idé: att kombinera moderiktiga strumpor med ett viktigt budskap. Varje par strumpor du köper bidrar direkt till att stödja organisationer som arbetar för ett mer inkluderande samhälle.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      Vi tror att alla förtjänar att känna sig inkluderade och sedda. Genom att 'rocka' udda och vilda strumpor visar vi att vi står upp för mångfald och acceptans.
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic">
                      "Våra strumpor är mer än bara ett plagg. De är ett statement. En möjlighet att visa ditt stöd och sprida glädje."
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-4">
                      <strong className="text-pink-400">21 mars</strong> – World Down Syndrome Day
                    </p>
                  </>
                )}
              </div>
              
              <div className="text-center lg:text-left mt-4 sm:mt-6">
                <button 
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="inline-flex items-center gap-2 text-white hover:text-pink-400 font-semibold transition-colors touch-manipulation py-2"
                >
                  {showFullAbout ? (
                    <>Visa mindre <ChevronUp className="w-5 h-5" /></>
                  ) : (
                    <>Läs mer <ChevronDown className="w-5 h-5" /></>
                  )}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/downbild.png" 
                alt="Rocka Sockorna" 
                className="w-full rounded-2xl sm:rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories - Mobile optimized */}
      <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{txt.categories}</h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 font-medium text-slate-700 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 cursor-pointer touch-manipulation"
            >
              <option value="popular">{txt.popular}</option>
              <option value="newest">{txt.newest}</option>
              <option value="priceLow">{txt.priceLow}</option>
              <option value="priceHigh">{txt.priceHigh}</option>
            </select>
          </div>
          
          {/* Scrollable categories with fade edges */}
          <div className="relative">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap">
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
        </div>
      </section>
      
      {/* Products - Mobile optimized grid */}
      <section id="products" className="py-10 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{txt.featured}</h2>
              <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">{filteredProducts.length} produkter</p>
            </div>
          </div>
          
          {/* Product grid - 1 col mobile, 2 tablet, 3-4 desktop */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                txt={txt}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Return FAQ Section - Mobile optimized */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2">
              {txt.returnFAQ}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{txt.faqTitle}</p>
          </div>
          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
            {returnFAQs.map((faq, i) => (
              <FAQItem 
                key={i} 
                question={faq.q} 
                answer={
                  faq.q === 'Reklamation' ? (
                    <>
                      Fyll i vårt supportformulär{' '}
                      <button 
                        onClick={() => setShowComplaintModal(true)} 
                        className="text-pink-600 underline hover:text-pink-700 font-medium"
                      >
                        HÄR
                      </button>
                    </>
                  ) : faq.a
                } 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowComplaintModal(false)} />
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <button 
              onClick={() => setShowComplaintModal(false)} 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Reklamation</h3>
            {complaintSent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-lg font-semibold text-slate-900">Tack för din anmälan!</p>
                <p className="text-slate-600">Vi återkommer inom kort.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { 
                e.preventDefault()
                setComplaintSent(true)
                setTimeout(() => {
                  setShowComplaintModal(false)
                  setComplaintSent(false)
                  setComplaintOrder('')
                  setComplaintName('')
                  setComplaintReason('')
                }, 2000)
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ordernummer</label>
                  <input
                    type="text"
                    value={complaintOrder}
                    onChange={(e) => setComplaintOrder(e.target.value)}
                    placeholder="t.ex. #12345"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fullständiga namn</label>
                  <input
                    type="text"
                    value={complaintName}
                    onChange={(e) => setComplaintName(e.target.value)}
                    placeholder="Ditt fullständiga namn"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Orsak</label>
                  <textarea
                    rows={4}
                    value={complaintReason}
                    onChange={(e) => setComplaintReason(e.target.value)}
                    placeholder="Beskriv problemet..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-xl font-bold text-base shadow-lg min-h-[48px]"
                >
                  Skicka
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Newsletter Section */}
      <NewsletterSection txt={txt} />
      
      {/* Footer - Mobile optimized */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <img src="/logo-white.svg" alt="Strumpmix" className="h-8 sm:h-10 mb-4 sm:mb-6" />
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{txt.footerDesc}</p>
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
              <h4 className="font-bold mb-4 text-sm sm:text-base">{txt.contact}</h4>
              <div className="space-y-2 sm:space-y-3 text-slate-400 text-sm">
                <a href={`mailto:${txt.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> <span className="hidden xs:inline">{txt.email}</span>
                  <span className="xs:hidden">Email</span>
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {txt.address}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">{txt.about}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{txt.aboutText}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">{txt.legal}</h4>
              <div className="space-y-2 sm:space-y-3 text-slate-400 text-sm">
                <a href="#" className="block hover:text-white transition-colors">{txt.terms}</a>
                <a href="#" className="block hover:text-white transition-colors">{txt.privacy}</a>
                <a href="#" className="block hover:text-white transition-colors">{txt.cookies}</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">{txt.copyright}</p>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-500">Säker & krypterad</span>
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
