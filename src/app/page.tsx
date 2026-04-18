'use client'

import { useState } from 'react'
import { 
  ShoppingCart, Menu, X, Search, Heart, Star, Truck, RotateCcw, 
  Shield, Check, Globe, ChevronDown, Plus, Minus,
  Mail, Phone, MapPin, Lock
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

// Categories
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

// Temporary products with placeholder images
const products: Product[] = [
  // TOYS
  { id: 1, name: 'LEGO Sockor', category: 'toys', price: 49, originalPrice: 79, image: '/products/lego-socks.jpg', rating: 4.8, reviews: 124, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 20}, {size: '40-42', stock: 18}, {size: '43-45', stock: 12}] },
  { id: 2, name: 'Playmobil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/playmobil-socks.jpg', rating: 4.6, reviews: 89, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 12}, {size: '40-42', stock: 10}] },
  { id: 3, name: 'Bil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/car-socks.jpg', rating: 4.7, reviews: 156, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 15}] },
  
  // ANIMALS
  { id: 4, name: 'Dinosaurie Sockor', category: 'animals', price: 49, originalPrice: 79, image: '/products/dino-socks.jpg', rating: 4.9, reviews: 234, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isNew: true },
  { id: 5, name: 'Enhörning Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/unicorn-socks.jpg', rating: 4.8, reviews: 189, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}] },
  { id: 6, name: 'Hundvalp Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/puppy-socks.jpg', rating: 4.7, reviews: 145, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 7, name: 'Katt Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/cat-socks.jpg', rating: 4.6, reviews: 98, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 10}, {size: '40-42', stock: 9}] },
  
  // CARTOONS
  { id: 8, name: 'Harry Potter Sockor', category: 'cartoons', price: 59, originalPrice: 99, image: '/products/harry-socks.jpg', rating: 4.9, reviews: 312, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}], isSale: true },
  { id: 9, name: 'Mickey Mouse Sockor', category: 'cartoons', price: 49, originalPrice: 49, image: '/products/mickey-socks.jpg', rating: 4.7, reviews: 167, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}] },
  { id: 10, name: 'Spider-Man Sockor', category: 'cartoons', price: 49, originalPrice: 79, image: '/products/spiderman-socks.jpg', rating: 4.8, reviews: 203, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true },
  
  // MOVIES
  { id: 11, name: 'Star Wars Sockor', category: 'movies', price: 59, originalPrice: 99, image: '/products/starwars-socks.jpg', rating: 4.9, reviews: 278, variants: [{size: '34-36', stock: 22}, {size: '37-39', stock: 28}, {size: '40-42', stock: 25}, {size: '43-45', stock: 20}], isNew: true },
  { id: 12, name: 'Marvel Sockor', category: 'movies', price: 49, originalPrice: 79, image: '/products/marvel-socks.jpg', rating: 4.8, reviews: 198, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isSale: true },
  
  // GAMING
  { id: 13, name: 'Gaming Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/gaming-socks.jpg', rating: 4.6, reviews: 134, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 22}] },
  { id: 14, name: 'Nintendo Sockor', category: 'gaming', price: 49, originalPrice: 79, image: '/products/nintendo-socks.jpg', rating: 4.8, reviews: 156, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}], isNew: true },
  
  // SPORTS
  { id: 15, name: 'Fotboll Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/football-socks.jpg', rating: 4.7, reviews: 89, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}] },
  { id: 16, name: 'Basket Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/basketball-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 10}] },
  
  // NATURE
  { id: 17, name: 'Regnbåge Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/rainbow-socks.jpg', rating: 4.8, reviews: 145, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}] },
  { id: 18, name: 'Skog Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/forest-socks.jpg', rating: 4.6, reviews: 112, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}] },
]

// Cart type
interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
}

// Translations
const t = {
  sv: {
    freeShipping: 'Gratis frakt',
    over249: 'över 249 kr',
    openPurchase: '30 dagars öppet köp',
    heroTitle: 'Vilda mönster, perfekt passform',
    heroSubtitle: 'Unika strumpor för alla stilar. Från dinosaurier till Harry Potter – hitta din favorit!',
    shopNow: 'Handla nu',
    categories: 'Kategorier',
    singlePrice: '49 kr',
    bundlePrice: '99 kr',
    bundle: '3-pack',
    size: 'Storlek',
    addToCart: 'Lägg i varukorgen',
    new: 'Nyhet',
    sale: 'REA',
    reviews: 'recensioner',
    bundleTitle: 'Spara med 3-pack',
    bundleSubtitle: 'Köp 3 par och spara 48 kr!',
    buy3Pack: 'Köp 3-pack för 99 kr',
    trustTitle: 'Varför välja oss?',
    freeShipping2: 'Gratis frakt över 249 kr',
    freeShippingText: 'Snabb leverans med PostNord',
    returns: '30 dagars retur',
    returnsText: 'Inga frågor, pengarna tillbaka',
    quality: 'Premium kvalitet',
    qualityText: 'Strumpor som håller länge',
    secure: 'Säker betalning',
    secureText: 'Klarna, kort, Apple Pay',
    footerTitle: 'Rock\'N Socks',
    footerDesc: 'Vilda mönster för vilda själar. Strumpor som gör dig glad!',
    contact: 'Kontakt',
    email: 'info@rocknsocks.se',
    phone: '+46 70 123 45 67',
    address: 'Rock\'N Socks AB, 111 22 Stockholm',
    about: 'Om oss',
    aboutText: 'Vi på Rock\'N Socks tror att livet är för kort för tråkiga strumpor. Vi letar över hela världen efter de mest unika och roliga mönstren!',
    followUs: 'Följ oss',
    legal: 'Legal',
    terms: 'Köpvillkor',
    privacy: 'Integritetspolicy',
    cookies: 'Cookiepolicy',
    copyright: '© 2024 Rock\'N Socks AB. Alla rättigheter förbehållna.',
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
  },
  en: {
    freeShipping: 'Free shipping',
    over249: 'over 249 kr',
    openPurchase: '30 day open purchase',
    heroTitle: 'Wild patterns, perfect fit',
    heroSubtitle: 'Unique socks for all styles. From dinosaurs to Harry Potter – find your favorite!',
    shopNow: 'Shop now',
    categories: 'Categories',
    singlePrice: '49 kr',
    bundlePrice: '99 kr',
    bundle: '3-pack',
    size: 'Size',
    addToCart: 'Add to cart',
    new: 'New',
    sale: 'SALE',
    reviews: 'reviews',
    bundleTitle: 'Save with 3-pack',
    bundleSubtitle: 'Buy 3 pairs and save 48 kr!',
    buy3Pack: 'Buy 3-pack for 99 kr',
    trustTitle: 'Why choose us?',
    freeShipping2: 'Free shipping over 249 kr',
    freeShippingText: 'Fast delivery with PostNord',
    returns: '30 day returns',
    returnsText: 'No questions, money back',
    quality: 'Premium quality',
    qualityText: 'Socks that last',
    secure: 'Secure payment',
    secureText: 'Klarna, card, Apple Pay',
    footerTitle: 'Rock\'N Socks',
    footerDesc: 'Wild patterns for wild souls. Socks that make you happy!',
    contact: 'Contact',
    email: 'info@rocknsocks.se',
    phone: '+46 70 123 45 67',
    address: 'Rock\'N Socks AB, 111 22 Stockholm',
    about: 'About us',
    aboutText: 'At Rock\'N Socks we believe life is too short for boring socks. We search the world for the most unique and fun patterns!',
    followUs: 'Follow us',
    legal: 'Legal',
    terms: 'Terms',
    privacy: 'Privacy',
    cookies: 'Cookies',
    copyright: '© 2024 Rock\'N Socks AB. All rights reserved.',
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
  }
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
      <Globe className="w-4 h-4 text-white" />
      <button 
        onClick={() => setLanguage('sv')} 
        className={`text-xs font-semibold px-2 py-0.5 rounded transition-all ${language === 'sv' ? "bg-white text-pink-600" : "text-white/80 hover:text-white"}`}
      >
        SV
      </button>
      <span className="text-white/40">|</span>
      <button 
        onClick={() => setLanguage('en')} 
        className={`text-xs font-semibold px-2 py-0.5 rounded transition-all ${language === 'en' ? "bg-white text-pink-600" : "text-white/80 hover:text-white"}`}
      >
        EN
      </button>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

function ProductCard({ product, onAddToCart, txt }: { product: Product; onAddToCart: (product: Product) => void; txt: any }) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '')
  const [showSizes, setShowSizes] = useState(false)
  
  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      toys: '🧸', animals: '🦁', cartoons: '📺', movies: '🎬',
      gaming: '🎮', sports: '⚽', nature: '🌿'
    }
    return emojis[cat] || '🧦'
  }
  
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-pink-200 transition-all duration-300">
      <div className="relative aspect-square bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-8xl">
          {getCategoryEmoji(product.category)}
        </div>
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {txt.new}
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {txt.sale}
          </span>
        )}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 left-3 right-3 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          + {txt.addToCart}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="mb-3">
          <button 
            onClick={() => setShowSizes(!showSizes)}
            className="w-full flex items-center justify-between text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:border-pink-300 transition-colors"
          >
            <span>{txt.size}: {selectedSize}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSizes ? 'rotate-180' : ''}`} />
          </button>
          {showSizes && (
            <div className="mt-2 grid grid-cols-2 gap-1">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => { setSelectedSize(variant.size); setShowSizes(false) }}
                  className={`text-xs py-2 rounded-lg border transition-all ${
                    selectedSize === variant.size 
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold' 
                      : 'border-gray-200 hover:border-pink-300'
                  } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={variant.stock === 0}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">{product.price} kr</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice} kr</span>
          )}
        </div>
      </div>
    </div>
  )
}

function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, txt }: { 
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (productId: number, size: string, delta: number) => void
  onRemove: (productId: number, size: string) => void
  txt: any 
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
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
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">{txt.cart}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧦</div>
                <p className="text-gray-500">{txt.emptyCart}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                    <div className="w-20 h-20 bg-rose-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      {getCategoryEmoji(item.product.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <p className="text-xs text-gray-500">{txt.size}: {item.selectedSize}</p>
                      <p className="font-bold text-pink-600 mt-1">{item.product.price} kr</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button 
                        onClick={() => onRemove(item.product.id, item.selectedSize)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-white rounded-lg border">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)} className="p-1 hover:bg-gray-100">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)} className="p-1 hover:bg-gray-100">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{txt.total}</span>
                <span className="font-bold text-xl text-pink-600">{total} kr</span>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
                {txt.checkout} →
              </button>
              <button onClick={onClose} className="w-full text-center text-sm text-gray-500 mt-3 hover:text-pink-600 transition-colors">
                {txt.continueShopping}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function CategoryCard({ category, isActive, onClick }: { category: typeof categories[0]; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
        isActive 
          ? 'bg-pink-500 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-gray-100'
      }`}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className="font-semibold text-sm">{category.name}</span>
    </button>
  )
}

function MainContent() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
  
  const addToCart = (product: Product) => {
    const size = product.variants[0]?.size || ''
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedSize === size)
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size }]
    })
    setIsCartOpen(true)
  }
  
  const updateQuantity = (productId: number, size: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQuantity = item.quantity + delta
          if (newQuantity <= 0) return null
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }
  
  const removeFromCart = (productId: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)))
  }
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 text-center text-sm font-medium">
        🎉 {txt.freeShipping} {txt.over249}! {txt.openPurchase}
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🧦</span>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Rock'N Socks
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Heart className="w-5 h-5" />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-100 via-white to-rose-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🎸 Rocka sockorna!
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {txt.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {txt.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105">
                  {txt.shopNow}
                </a>
                <a href="#bundle" className="bg-white hover:bg-gray-50 text-gray-800 py-4 px-8 rounded-xl font-bold text-lg border border-gray-200 transition-all">
                  🧦 {txt.bundle}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="text-[200px] lg:text-[300px] text-center">🧦</div>
              <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🧸</div>
              <div className="absolute -bottom-4 -left-4 text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🦁</div>
              <div className="absolute top-1/2 -right-8 text-5xl animate-bounce" style={{animationDelay: '1s'}}>📺</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bundle Banner */}
      <section id="bundle" className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{txt.bundleTitle}</h2>
              <p className="text-pink-100 text-lg">{txt.bundleSubtitle}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center text-2xl border-4 border-white shadow-lg">🧸</div>
                <div className="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center text-2xl border-4 border-white shadow-lg">🦁</div>
                <div className="w-16 h-16 bg-purple-400 rounded-xl flex items-center justify-center text-2xl border-4 border-white shadow-lg">📺</div>
              </div>
              <div className="text-center">
                <div className="text-white">
                  <span className="text-3xl font-bold">99 kr</span>
                  <span className="text-lg line-through ml-2 opacity-70">147 kr</span>
                </div>
                <button className="mt-2 bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg">
                  {txt.buy3Pack}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">{txt.categories}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
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
      <section id="products" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {categories.find(c => c.id === selectedCategory)?.name || txt.categories}
            </h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="popular">{txt.popular}</option>
              <option value="newest">{txt.newest}</option>
              <option value="priceLow">{txt.priceLow}</option>
              <option value="priceHigh">{txt.priceHigh}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
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
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">{txt.trustTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold mb-2">{txt.freeShipping2}</h3>
              <p className="text-sm text-gray-500">{txt.freeShippingText}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-bold mb-2">{txt.returns}</h3>
              <p className="text-sm text-gray-500">{txt.returnsText}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-bold mb-2">{txt.quality}</h3>
              <p className="text-sm text-gray-500">{txt.qualityText}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">{txt.secure}</h3>
              <p className="text-sm text-gray-500">{txt.secureText}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🧦</span>
                <span className="text-xl font-bold">Rock'N Socks</span>
              </div>
              <p className="text-gray-400">{txt.footerDesc}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{txt.contact}</h4>
              <div className="space-y-2 text-gray-400">
                <a href={`mailto:${txt.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" /> {txt.email}
                </a>
                <a href={`tel:${txt.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" /> {txt.phone}
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {txt.address}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">{txt.about}</h4>
              <p className="text-gray-400 text-sm">{txt.aboutText}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{txt.followUs}</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-lg">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-lg">👍</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">{txt.copyright}</p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white">{txt.terms}</a>
                <a href="#" className="hover:text-white">{txt.privacy}</a>
                <a href="#" className="hover:text-white">{txt.cookies}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
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
