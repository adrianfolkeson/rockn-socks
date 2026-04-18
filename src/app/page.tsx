'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingCart, Menu, X, Search, Heart, Star, Truck, RotateCcw, 
  Shield, Globe, ChevronDown, Plus, Minus,
  Mail, Phone, MapPin, Lock, Package, Check, ArrowRight, Sparkles
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
    freeShipping: 'Gratis frakt',
    over249: 'över 249 kr',
    openPurchase: '30 dagars öppet köp',
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
    save: 'Spara',
    bundle: '3-pack',
    bundleDesc: '3 par för 99 kr',
    trustTitle: 'Varför Rock\'N Socks?',
    freeShipping2: 'Gratis frakt över 249 kr',
    freeShippingText: 'Snabb leverans med PostNord, 2-4 vardagar',
    returns: '30 dagars retur',
    returnsText: 'Inga frågor, pengarna tillbaka',
    quality: 'Premium kvalitet',
    qualityText: 'Strumpor som håller – testade för komfort',
    secure: 'Säker betalning',
    secureText: 'Klarna, kort, Apple Pay & Google Pay',
    footerDesc: 'Vilda mönster för vilda själar.',
    contact: 'Kontakt',
    email: 'info@rocknsocks.se',
    phone: '+46 70 123 45 67',
    address: 'Stockholm, Sverige',
    about: 'Om oss',
    aboutText: 'Vi på Rock\'N Socks letar världen över efter de mest unika och roliga mönstren. Vi tror att livet är för kort för tråkiga strumpor!',
    followUs: 'Följ oss',
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
    remove: 'Ta bort',
    popular: 'Populärast',
    newest: 'Nyast',
    priceLow: 'Pris: Lågt till högt',
    priceHigh: 'Pris: Högt till lågt',
    quickView: 'Snabbvy',
    inStock: 'I lager',
    lowStock: 'Få kvar',
    featured: 'Utvalda produkter',
    shopAll: 'Visa alla',
  },
  en: {
    freeShipping: 'Free shipping',
    over249: 'over 249 kr',
    openPurchase: '30 day open purchase',
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
    save: 'Save',
    bundle: '3-pack',
    bundleDesc: '3 pairs for 99 kr',
    trustTitle: 'Why Rock\'N Socks?',
    freeShipping2: 'Free shipping over 249 kr',
    freeShippingText: 'Fast delivery with PostNord, 2-4 business days',
    returns: '30 day returns',
    returnsText: 'No questions, money back',
    quality: 'Premium quality',
    qualityText: 'Socks that last – tested for comfort',
    secure: 'Secure payment',
    secureText: 'Klarna, card, Apple Pay & Google Pay',
    footerDesc: 'Wild patterns for wild souls.',
    contact: 'Contact',
    email: 'info@rocknsocks.se',
    phone: '+46 70 123 45 67',
    address: 'Stockholm, Sweden',
    about: 'About us',
    aboutText: 'At Rock\'N Socks we search the world for the most unique and fun patterns. We believe life is too short for boring socks!',
    followUs: 'Follow us',
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
    remove: 'Remove',
    popular: 'Most Popular',
    newest: 'Newest',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    quickView: 'Quick view',
    inStock: 'In stock',
    lowStock: 'Low stock',
    featured: 'Featured products',
    shopAll: 'Shop all',
  }
}

// Animation component
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div 
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 1,
        transform: 'translateY(0)'
      }}
    >
      {children}
    </div>
  )
}

// Language Switcher - Premium
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
      <button 
        onClick={() => setLanguage('sv')} 
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'sv' 
            ? "bg-white text-pink-600 shadow-lg ring-2 ring-pink-300" 
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇸🇪</span> <span className="hidden sm:inline">SV</span>
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          language === 'en' 
            ? "bg-white text-pink-600 shadow-lg ring-2 ring-pink-300" 
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇬🇧</span> <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  )
}

// Star Rating
function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`${s} ${star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

// Product Card - Premium
function ProductCard({ product, onAddToCart, txt }: { product: Product; onAddToCart: (product: Product, isBundle: boolean) => void; txt: any }) {
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
  
  return (
    <div 
      className="group relative bg-white rounded-3xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[140px] transition-transform duration-700 group-hover:scale-110">
          {getCategoryEmoji(product.category)}
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
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
        </div>
        
        {/* Quick add overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onAddToCart(product, false)}
            className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            + {txt.addToCart}
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-sm text-slate-500">({product.reviews} {txt.reviews})</span>
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
          
          <button 
            onClick={() => onAddToCart(product, false)}
            className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Bundle option */}
        <button 
          onClick={() => onAddToCart(product, true)}
          className="w-full mt-3 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🧦 {txt.addBundle} – 99 kr
        </button>
      </div>
    </div>
  )
}

// Cart Drawer - Premium
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
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                        {item.isBundle ? `🧦 ${txt.bundle}` : txt.size + ': ' + item.selectedSize}
                      </p>
                      <p className="font-bold text-pink-600 mt-1">
                        {item.isBundle ? '99 kr' : item.product.price + ' kr'}
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
      className={`flex-shrink-0 flex flex-col items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-pink-500 text-white shadow-lg scale-105' 
          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-pink-300 hover:text-pink-600'
      }`}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className="font-semibold text-sm whitespace-nowrap">{category.name}</span>
    </button>
  )
}

// Main Component
function MainContent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const { language } = useLanguage()
  
  const txt = t[language]
  
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
      <div className="bg-gradient-to-r from-slate-900 via-pink-600 to-slate-900 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 text-white text-sm font-medium">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" /> {txt.freeShipping} {txt.over249}
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> {txt.openPurchase}
          </span>
          <div className="absolute right-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-2xl">🧦</span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">Rock'N</span>
                <span className="text-2xl font-black text-pink-500"> Socks</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Hem</a>
              <a href="#products" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Shoppa</a>
              <a href="#" className="font-semibold text-slate-700 hover:text-pink-600 transition-colors">Om oss</a>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="hidden md:block p-3 hover:bg-slate-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-slate-600" />
              </button>
              <button className="hidden md:block p-3 hover:bg-slate-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-slate-600" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative p-3 hover:bg-slate-100 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-pink-50/30 to-rose-50/30 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 text-9xl animate-bounce">🧸</div>
          <div className="absolute bottom-20 right-10 text-9xl animate-bounce" style={{animationDelay: '0.5s'}}>🦁</div>
          <div className="absolute top-1/2 right-1/4 text-7xl animate-bounce" style={{animationDelay: '1s'}}>📺</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" /> Nyheter varje vecka!
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                {txt.heroTitle}<br/>
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {txt.heroTitle2}
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                {txt.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300">
                  {txt.shopNow} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="text-[200px] lg:text-[280px] text-center">🧦</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{txt.categories}</h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-medium text-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                txt={txt}
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
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-pink-50/50 border border-slate-100 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Truck className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.freeShipping2}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.freeShippingText}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <RotateCcw className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.returns}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.returnsText}</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-violet-50/50 border border-slate-100 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{txt.secure}</h3>
              <p className="text-slate-500 leading-relaxed">{txt.secureText}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🧦</span>
                </div>
                <div>
                  <span className="text-xl font-black text-white">Rock'N</span>
                  <span className="text-xl font-black text-pink-400"> Socks</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">{txt.footerDesc}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{txt.contact}</h4>
              <div className="space-y-3 text-slate-400">
                <a href={`mailto:${txt.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> {txt.email}
                </a>
                <a href={`tel:${txt.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> {txt.phone}
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
