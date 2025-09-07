'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from './CartProvider'
import { Heart, Eye, Star, ShoppingCart, Zap, TrendingUp, Award } from 'lucide-react'

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.8,
    reviews: 245,
    badge: "New",
    category: "smartphones",
    inStock: true
  },
  {
    id: 2,
    title: "MacBook Pro M3",
    price: 2499.99,
    originalPrice: 2699.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.9,
    reviews: 189,
    badge: "Hot",
    category: "laptops",
    inStock: true
  },
  {
    id: 3,
    title: "PlayStation 5",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.7,
    reviews: 312,
    badge: "Sale",
    category: "gaming",
    inStock: true
  },
  {
    id: 4,
    title: "AirPods Pro",
    price: 249.99,
    originalPrice: 279.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c9eaef?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.6,
    reviews: 156,
    badge: "Popular",
    category: "audio",
    inStock: true
  },
  {
    id: 5,
    title: "Samsung Galaxy Watch 6",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.5,
    reviews: 98,
    badge: "New",
    category: "wearables",
    inStock: true
  },
  {
    id: 6,
    title: "Google Nest Hub Max",
    price: 229.99,
    originalPrice: 259.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    rating: 4.4,
    reviews: 87,
    badge: "Smart",
    category: "smart-home",
    inStock: true
  }
]

const getBadgeIcon = (badge: string) => {
  switch (badge.toLowerCase()) {
    case 'new':
      return <Zap size={14} />
    case 'hot':
      return <TrendingUp size={14} />
    case 'sale':
      return <Award size={14} />
    case 'popular':
      return <Star size={14} />
    default:
      return <Star size={14} />
  }
}

const getBadgeColor = (badge: string) => {
  switch (badge.toLowerCase()) {
    case 'new':
      return 'bg-green-500'
    case 'hot':
      return 'bg-red-500'
    case 'sale':
      return 'bg-orange-500'
    case 'popular':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [loading, setLoading] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const loadMoreProducts = () => {
    setLoading(true)
    setTimeout(() => {
      const moreProducts: Product[] = [
        {
          id: 7,
          title: "Dell XPS 13",
          price: 1299.99,
          originalPrice: 1499.99,
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
          rating: 4.6,
          reviews: 134,
          badge: "Sale",
          category: "laptops",
          inStock: true
        },
        {
          id: 8,
          title: "Sony WH-1000XM5",
          price: 349.99,
          originalPrice: 399.99,
          image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
          rating: 4.8,
          reviews: 203,
          badge: "Premium",
          category: "audio",
          inStock: true
        }
      ]
      setProducts([...products, ...moreProducts])
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium electronics with unbeatable quality and value
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Badge */}
                <div className={`absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium ${getBadgeColor(product.badge)}`}>
                  {getBadgeIcon(product.badge)}
                  {product.badge}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                    aria-label="Quick view"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center animate-fade-in animation-delay-600">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
                Load More Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 animate-fade-in animation-delay-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $50</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">30-Day Returns</h3>
              <p className="text-gray-600 text-sm">Easy return policy</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
