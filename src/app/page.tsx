import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Star, Truck, Shield, Headphones, Sparkles, ArrowRight, Play } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
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
            <Link href="/products" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
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
            <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10"></div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Sale Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
                <Sparkles className="w-4 h-4 mr-2" />
                🔥 MEGA SALE! Up to 70% OFF
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent animate-fade-in">
                Discover luxury fashion
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent animate-fade-in animation-delay-200">
                that defines your unique style
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
              Explore our curated collection of premium products designed to elevate your lifestyle.
              From fashion to technology, we bring you the best of modern design with unmatched quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-600">
              <Link
                href="/products"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="group inline-flex items-center px-10 py-5 border-2 border-gray-300 dark:border-gray-600 rounded-2xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-500" />
                <span>Free Shipping Worldwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-purple-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Carefully selected products from trusted brands worldwide, ensuring exceptional quality and authenticity
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Curated Selection</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Hand-picked items that match your style and preferences, curated by our expert fashion specialists
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Personal Service</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Dedicated support to help you find exactly what you need, with personalized recommendations and styling advice
              </p>
            </div>
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Luxury Watch', price: '$299', badge: 'Bestseller', color: 'from-amber-400 to-orange-500' },
              { name: 'Designer Bag', price: '$199', badge: 'New', color: 'from-pink-400 to-rose-500' },
              { name: 'Premium Sneakers', price: '$149', badge: 'Sale', color: 'from-blue-400 to-purple-500' },
              { name: 'Smart Jewelry', price: '$89', badge: 'Trending', color: 'from-green-400 to-emerald-500' }
            ].map((product, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`relative h-48 bg-gradient-to-br ${product.color}`}>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
