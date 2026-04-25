'use client'

import { useState } from 'react'
import { Heart, Plus, ChevronDown } from 'lucide-react'

export interface ProductVariant {
  size: string
  stock: number
}

export interface Product {
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
  isPopular?: boolean
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`}>
          ★
        </span>
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, isBundle: boolean) => void
  txt: { [key: string]: string }
  onToggleFavorite?: (id: number) => void
  isFavorite?: boolean
}

// Product Card - Optimized for touch
export default function ProductCard({ product, onAddToCart, txt, onToggleFavorite, isFavorite }: ProductCardProps) {
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
            {txt.new || 'Nyhet'}
          </span>
        )}
        {product.isSale && (
          <span className="bg-rose-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow">
            -{discountPercent}%
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="bg-amber-500 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow">
            {txt.lowStock || 'Lågt lager'}
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
              {txt.outOfStock || 'Slutsåld'}
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
            <span>{txt.size || 'Storlek'}: {selectedSize}</span>
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
            🧦 {txt.addBundle || 'Köp 2 par'}
          </button>
        )}
      </div>
    </div>
  )
}
