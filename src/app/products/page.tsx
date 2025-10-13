import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Star, ShoppingCart, Filter, Grid, List, SlidersHorizontal, Eye, Zap, LogOut } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'

export const metadata = {
  title: 'Products - Mantu E-commerce',
  description: 'Browse our amazing collection of products',
}

export default function ProductsPage() {
  const { addItem, isInCart, getItemQuantity } = useCart()
  const { isAuthenticated, user, logout, toggleLoginModal, toggleRegisterModal, loginModal, registerModal } = useAuth()

  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones Pro',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller',
      badgeColor: 'bg-green-500',
      discount: 25,
      features: ['Noise Cancelling', '30h Battery', 'Fast Charge']
    },
    {
      id: '2',
      name: 'Smart Fitness Watch Ultra',
      price: 399,
      originalPrice: 499,
      rating: 4.6,
      reviews: 89,
      badge: 'New',
      badgeColor: 'bg-blue-500',
      discount: 20,
      features: ['Heart Rate', 'GPS', 'Waterproof']
    },
    {
      id: '3',
      name: 'Professional Camera Lens 85mm',
      price: 899,
      originalPrice: 1199,
      rating: 4.9,
      reviews: 56,
      badge: 'Sale',
      badgeColor: 'bg-red-500',
      discount: 25,
      features: ['f/1.4 Aperture', 'Image Stabilization', 'Weather Sealed']
    },
    {
      id: '4',
      name: 'Ergonomic Office Chair Premium',
      price: 449,
      originalPrice: 599,
      rating: 4.7,
      reviews: 203,
      badge: 'Popular',
      badgeColor: 'bg-purple-500',
      discount: 25,
      features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh']
    },
    {
      id: '5',
      name: 'Mechanical Keyboard RGB Pro',
      price: 199,
      originalPrice: 249,
      rating: 4.5,
      reviews: 167,
      badge: 'Trending',
      badgeColor: 'bg-orange-500',
      discount: 20,
      features: ['Blue Switches', 'RGB Lighting', 'Aluminum Frame']
    },
    {
      id: '6',
      name: 'Bluetooth Speaker Waterproof',
      price: 149,
      originalPrice: 199,
      rating: 4.4,
      reviews: 98,
      badge: null,
      badgeColor: '',
      discount: 25,
      features: ['360° Sound', 'IPX7 Waterproof', '12h Battery']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Mantu
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-sm font-medium text-primary relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors relative group">
              Analytics
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/music" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors relative group">
              Music
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group">
              <Search className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative">
              <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLoginModal}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Premium Products
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover amazing products that match your style and needs
              </p>
            </div>

            {/* Filter and Sort */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>

              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Rated</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Showing 6 of 1,247 products</span>
            <div className="flex items-center space-x-2">
              <span>View:</span>
              <button className="p-2 bg-primary text-white rounded-md">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${product.badgeColor} shadow-lg`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                      -{product.discount}%
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center hover:scale-110">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center hover:scale-110">
                      <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
                    </button>
                    <button className="w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center hover:scale-110">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: `/api/placeholder/400/400?text=${encodeURIComponent(product.name)}`,
                    quantity: 1,
                    stock: 10 // Mock stock value
                  })}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Load More Products
          </button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-primary via-primary/90 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified about new products, exclusive discounts, and early access to sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Auth Modals */}
      <AuthModal
        isOpen={loginModal}
        onClose={() => {}}
        type="login"
      />
      <AuthModal
        isOpen={registerModal}
        onClose={() => {}}
        type="register"
      />
    </div>
  )
}
