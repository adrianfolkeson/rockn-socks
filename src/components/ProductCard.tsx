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
          <svg className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
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

// Product Card - Premium Design
export default function ProductCard({ product, onAddToCart, txt, onToggleFavorite, isFavorite }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '')
  const [showSizes, setShowSizes] = useState(false)
  
  const hasDiscount = product.originalPrice > product.price
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const isLowStock = product.variants.every(v => v.stock < 15)
  const isOutOfStock = product.variants.every(v => v.stock === 0)
  
  const handleAddToCart = () => {
    onAddToCart(product, false)
  }
  
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
            {txt.new || 'Nyhet'}
          </span>
        )}
        {product.isSale && (
          <span className="bg-rose-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
            -{discountPercent}%
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
            {txt.lowStock || 'Lågt lager'}
          </span>
        )}
      </div>
      
      {/* Favorite button */}
      {onToggleFavorite && (
        <button 
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all touch-manipulation"
        >
          {isFavorite ? (
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          ) : (
            <Heart className="w-4 h-4 text-slate-400 hover:text-rose-500 transition-colors" />
          )}
        </button>
      )}
      
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full font-bold text-sm text-slate-700">
              {txt.outOfStock || 'Slutsåld'}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm mb-2 leading-tight">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviews})</span>
        </div>
        
        {/* Size selector */}
        <div className="mb-3">
          <button 
            onClick={() => setShowSizes(!showSizes)}
            className="w-full flex items-center justify-between text-sm font-medium text-slate-600 bg-slate-50 rounded-lg px-3 py-2.5 hover:bg-slate-100 transition-colors touch-manipulation"
          >
            <span>{txt.size || 'Storlek'}: {selectedSize}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSizes ? 'rotate-180' : ''}`} />
          </button>
          
          {showSizes && (
            <div className="mt-2 grid grid-cols-2 gap-1.5 p-2 bg-slate-50 rounded-lg">
              {product.variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => { setSelectedSize(variant.size); setShowSizes(false) }}
                  className={`text-xs py-2 rounded-md font-medium transition-all touch-manipulation ${
                    selectedSize === variant.size 
                      ? 'bg-pink-500 text-white' 
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
            <span className="text-lg font-bold text-slate-900">{product.price} kr</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through ml-1.5">{product.originalPrice} kr</span>
            )}
          </div>
          
          {!isOutOfStock && (
            <button 
              onClick={handleAddToCart}
              className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Bundle option */}
        {!isOutOfStock && (
          <button 
            onClick={() => onAddToCart(product, true)}
            className="w-full mt-3 py-2.5 rounded-lg font-semibold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors touch-manipulation"
          >
            Köp 2 par
          </button>
        )}
      </div>
    </div>
  )
}
