'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Product } from '@/components/ProductCard'
import ProductCard from '@/components/ProductCard'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

const categories = [
  { id: 'all', name: 'Alla' },
  { id: 'toys', name: '🎉 Leksaker' },
  { id: 'animals', name: '🐾 Djur' },
  { id: 'cartoons', name: '📺 Serier' },
  { id: 'movies', name: '🎬 Film' },
  { id: 'gaming', name: '🎮 Gaming' },
  { id: 'sports', name: '⚽ Sport' },
  { id: 'nature', name: '🌿 Natur' },
]

const txt = {
  search: 'Sök produkter...',
  sort: 'Sortera',
  priceLow: 'Pris: Lågt till högt',
  priceHigh: 'Pris: Högt till lågt',
  newest: 'Nyast',
  popular: 'Populärast',
  filters: 'Filter',
  clearFilters: 'Rensa filter',
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showSearch, setShowSearch] = useState(false)
  
  // Import products from main page (we'll need to pass them or fetch)
  // For now, let's create a placeholder - in real app you'd use context or API
  
  const filteredProducts = products
    .filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price
      if (sortBy === 'priceHigh') return b.price - a.price
      if (sortBy === 'newest') return b.isNew ? 1 : -1
      return b.reviews - a.reviews
    })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Logo className="h-8" />
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={txt.search}
                  className="pl-9 pr-4 py-2 rounded-full bg-slate-100 border-0 focus:ring-2 focus:ring-pink-500 outline-none text-sm w-48 lg:w-64 text-slate-900 placeholder-slate-500"
                />
              </div>
            </div>
            
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={txt.search}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-100 border-0 focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 placeholder-slate-500"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors touch-manipulation ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Sort */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {selectedCategory === 'all' ? 'Alla produkter' : categories.find(c => c.id === selectedCategory)?.name}
            </h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="popular">{txt.popular}</option>
              <option value="newest">{txt.newest}</option>
              <option value="priceLow">{txt.priceLow}</option>
              <option value="priceHigh">{txt.priceHigh}</option>
            </select>
          </div>
          
          <p className="text-slate-500 mb-6">{filteredProducts.length} produkter</p>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={() => {}}
                txt={{}}
                onToggleFavorite={() => {}}
                isFavorite={false}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500">Inga produkter hittades</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Copy products from main page
const products: Product[] = [
  { id: 1, name: 'LEGO Sockor', category: 'toys', price: 49, originalPrice: 79, image: '/products/lego-socks.jpg', rating: 4.8, reviews: 124, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 20}, {size: '40-42', stock: 18}, {size: '43-45', stock: 12}], isPopular: true },
  { id: 2, name: 'Playmobil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/playmobil-socks.jpg', rating: 4.6, reviews: 89, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 12}, {size: '40-42', stock: 10}, {size: '43-45', stock: 6}] },
  { id: 3, name: 'Bil Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/car-socks.jpg', rating: 4.7, reviews: 156, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 15}], isPopular: true },
  { id: 4, name: 'Dinosaurie Sockor', category: 'animals', price: 49, originalPrice: 79, image: '/products/dino-socks.jpg', rating: 4.9, reviews: 234, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isNew: true, isPopular: true },
  { id: 5, name: 'Enhörning Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/unicorn-socks.jpg', rating: 4.8, reviews: 189, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isPopular: true },
  { id: 6, name: 'Hundvalp Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/puppy-socks.jpg', rating: 4.7, reviews: 145, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 7, name: 'Katt Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/cat-socks.jpg', rating: 4.6, reviews: 98, variants: [{size: '34-36', stock: 8}, {size: '37-39', stock: 10}, {size: '40-42', stock: 9}, {size: '43-45', stock: 5}] },
  { id: 8, name: 'Harry Potter Sockor', category: 'cartoons', price: 59, originalPrice: 99, image: '/products/harry-socks.jpg', rating: 4.9, reviews: 312, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}], isSale: true, isPopular: true },
  { id: 9, name: 'Mickey Mouse Sockor', category: 'cartoons', price: 49, originalPrice: 49, image: '/products/mickey-socks.jpg', rating: 4.7, reviews: 167, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 10, name: 'Spider-Man Sockor', category: 'cartoons', price: 49, originalPrice: 79, image: '/products/spiderman-socks.jpg', rating: 4.8, reviews: 203, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true, isPopular: true },
  { id: 11, name: 'Star Wars Sockor', category: 'movies', price: 59, originalPrice: 99, image: '/products/starwars-socks.jpg', rating: 4.9, reviews: 278, variants: [{size: '34-36', stock: 22}, {size: '37-39', stock: 28}, {size: '40-42', stock: 25}, {size: '43-45', stock: 20}], isNew: true, isPopular: true },
  { id: 12, name: 'Marvel Sockor', category: 'movies', price: 49, originalPrice: 79, image: '/products/marvel-socks.jpg', rating: 4.8, reviews: 198, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isSale: true },
  { id: 13, name: 'Gaming Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/gaming-socks.jpg', rating: 4.6, reviews: 134, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 22}], isPopular: true },
  { id: 14, name: 'Nintendo Sockor', category: 'gaming', price: 49, originalPrice: 79, image: '/products/nintendo-socks.jpg', rating: 4.8, reviews: 156, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}], isNew: true },
  { id: 15, name: 'Fotboll Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/football-socks.jpg', rating: 4.7, reviews: 89, variants: [{size: '34-36', stock: 30}, {size: '37-39', stock: 35}, {size: '40-42', stock: 32}, {size: '43-45', stock: 25}] },
  { id: 16, name: 'Basket Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/basketball-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 10}] },
  { id: 17, name: 'Regnbåge Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/rainbow-socks.jpg', rating: 4.8, reviews: 145, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isPopular: true },
  { id: 18, name: 'Skog Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/forest-socks.jpg', rating: 4.6, reviews: 112, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}, {size: '43-45', stock: 8}] },
  { id: 19, name: 'Porsche Sockor', category: 'toys', price: 49, originalPrice: 49, image: '/products/porsche-socks.jpg', rating: 4.7, reviews: 78, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 20, name: 'Space Sockor', category: 'movies', price: 59, originalPrice: 59, image: '/products/space-socks.jpg', rating: 4.8, reviews: 156, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isNew: true },
  { id: 21, name: 'Häst Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/horse-socks.jpg', rating: 4.6, reviews: 92, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 22, name: 'Viking Sockor', category: 'movies', price: 59, originalPrice: 79, image: '/products/viking-socks.jpg', rating: 4.7, reviews: 134, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isNew: true },
  { id: 23, name: 'Robot Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/robot-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}] },
  { id: 24, name: 'Fotbollslag Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/team-socks.jpg', rating: 4.8, reviews: 178, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 20}] },
  { id: 25, name: 'Blommor Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/flowers-socks.jpg', rating: 4.6, reviews: 89, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 26, name: 'Superhjälte Sockor', category: 'cartoons', price: 49, originalPrice: 79, image: '/products/superhero-socks.jpg', rating: 4.9, reviews: 245, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true },
  { id: 27, name: 'Drake Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/drake-socks.jpg', rating: 4.7, reviews: 123, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 10}] },
  { id: 28, name: 'Pirater Sockor', category: 'movies', price: 49, originalPrice: 49, image: '/products/pirate-socks.jpg', rating: 4.5, reviews: 78, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 29, name: 'Musik Sockor', category: 'gaming', price: 59, originalPrice: 59, image: '/products/music-socks.jpg', rating: 4.8, reviews: 167, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isNew: true },
  { id: 30, name: 'Tennis Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/tennis-socks.jpg', rating: 4.6, reviews: 56, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 15}] },
  { id: 31, name: 'Fisk Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/fish-socks.jpg', rating: 4.4, reviews: 45, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}, {size: '43-45', stock: 8}] },
  { id: 32, name: 'TV-serie Sockor', category: 'cartoons', price: 49, originalPrice: 79, image: '/products/tv-socks.jpg', rating: 4.7, reviews: 189, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true },
  { id: 33, name: 'Ninja Sockor', category: 'movies', price: 49, originalPrice: 49, image: '/products/ninja-socks.jpg', rating: 4.8, reviews: 201, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 34, name: 'Cyberpunk Sockor', category: 'gaming', price: 59, originalPrice: 79, image: '/products/cyber-socks.jpg', rating: 4.9, reviews: 234, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isNew: true },
  { id: 35, name: 'Golf Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/golf-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 36, name: 'Vapen Sockor', category: 'movies', price: 49, originalPrice: 49, image: '/products/weapon-socks.jpg', rating: 4.6, reviews: 98, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 37, name: 'Kanin Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/bunny-socks.jpg', rating: 4.8, reviews: 156, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}] },
  { id: 38, name: 'Disney Sockor', category: 'cartoons', price: 59, originalPrice: 99, image: '/products/disney-socks.jpg', rating: 4.9, reviews: 312, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 20}], isNew: true },
  { id: 39, name: 'Pokemon Sockor', category: 'gaming', price: 59, originalPrice: 79, image: '/products/pokemon-socks.jpg', rating: 4.9, reviews: 289, variants: [{size: '34-36', stock: 22}, {size: '37-39', stock: 28}, {size: '40-42', stock: 25}, {size: '43-45', stock: 18}], isNew: true },
  { id: 40, name: 'Glitter Sockor', category: 'nature', price: 59, originalPrice: 59, image: '/products/glitter-socks.jpg', rating: 4.6, reviews: 112, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 41, name: 'Retro gaming Sockor', category: 'gaming', price: 49, originalPrice: 79, image: '/products/retro-socks.jpg', rating: 4.8, reviews: 178, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isSale: true },
  { id: 42, name: 'Yoga Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/yoga-socks.jpg', rating: 4.5, reviews: 78, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}] },
  { id: 43, name: 'Fotbollsproffs Sockor', category: 'sports', price: 59, originalPrice: 79, image: '/products/pro-socks.jpg', rating: 4.9, reviews: 245, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}], isNew: true },
  { id: 44, name: 'Memes Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/meme-socks.jpg', rating: 4.7, reviews: 189, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 20}] },
  { id: 45, name: 'Vinter Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/winter-socks.jpg', rating: 4.6, reviews: 134, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}] },
  { id: 46, name: 'Sommar Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/summer-socks.jpg', rating: 4.7, reviews: 156, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}] },
  { id: 47, name: 'Natt Sockor', category: 'nature', price: 59, originalPrice: 79, image: '/products/night-socks.jpg', rating: 4.8, reviews: 123, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}], isNew: true },
  { id: 48, name: 'Regn Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/rain-socks.jpg', rating: 4.6, reviews: 67, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}, {size: '43-45', stock: 8}] },
  { id: 49, name: 'Sol Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/sun-socks.jpg', rating: 4.7, reviews: 98, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 50, name: 'Måne Sockor', category: 'nature', price: 59, originalPrice: 79, image: '/products/moon-socks.jpg', rating: 4.8, reviews: 145, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}], isNew: true },
  { id: 51, name: 'Stjärna Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/star-socks.jpg', rating: 4.9, reviews: 234, variants: [{size: '34-36', stock: 25}, {size: '37-39', stock: 30}, {size: '40-42', stock: 28}, {size: '43-45', stock: 20}] },
  { id: 52, name: 'Haj Sockor', category: 'animals', price: 49, originalPrice: 79, image: '/products/shark-socks.jpg', rating: 4.7, reviews: 167, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}], isSale: true },
  { id: 53, name: 'Björn Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/bear-socks.jpg', rating: 4.6, reviews: 123, variants: [{size: '34-36', stock: 18}, {size: '37-39', stock: 22}, {size: '40-42', stock: 20}, {size: '43-45', stock: 15}] },
  { id: 54, name: 'Öken Sockor', category: 'animals', price: 59, originalPrice: 79, image: '/products/ocean-socks.jpg', rating: 4.8, reviews: 189, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}], isNew: true },
  { id: 55, name: 'Fågel Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/bird-socks.jpg', rating: 4.5, reviews: 78, variants: [{size: '34-36', stock: 12}, {size: '37-39', stock: 15}, {size: '40-42', stock: 14}, {size: '43-45', stock: 10}] },
  { id: 56, name: 'Insekter Sockor', category: 'animals', price: 49, originalPrice: 49, image: '/products/bug-socks.jpg', rating: 4.4, reviews: 56, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}, {size: '43-45', stock: 8}] },
  { id: 57, name: 'Safari Sockor', category: 'animals', price: 59, originalPrice: 79, image: '/products/safari-socks.jpg', rating: 4.7, reviews: 167, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}], isNew: true },
  { id: 58, name: 'Arkad Sockor', category: 'gaming', price: 49, originalPrice: 49, image: '/products/arcade-socks.jpg', rating: 4.8, reviews: 198, variants: [{size: '34-36', stock: 20}, {size: '37-39', stock: 25}, {size: '40-42', stock: 22}, {size: '43-45', stock: 18}] },
  { id: 59, name: 'Surf Sockor', category: 'sports', price: 49, originalPrice: 49, image: '/products/surf-socks.jpg', rating: 4.6, reviews: 89, variants: [{size: '34-36', stock: 15}, {size: '37-39', stock: 18}, {size: '40-42', stock: 16}, {size: '43-45', stock: 12}] },
  { id: 60, name: 'Kaktus Sockor', category: 'nature', price: 49, originalPrice: 49, image: '/products/cactus-socks.jpg', rating: 4.5, reviews: 67, variants: [{size: '34-36', stock: 10}, {size: '37-39', stock: 12}, {size: '40-42', stock: 11}, {size: '43-45', stock: 8}] },
]
