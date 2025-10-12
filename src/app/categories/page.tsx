import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Grid, List, Sparkles, TrendingUp, Star, ArrowRight, Zap } from 'lucide-react'

export const metadata = {
  title: 'Categories - Mantu E-commerce',
  description: 'Explore our product categories',
}

export default function CategoriesPage() {
  const categories = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Latest gadgets and tech accessories for modern living',
      productCount: 1247,
      color: 'from-blue-500 to-purple-600',
      icon: '📱',
      trending: true,
      featured: true
    },
    {
      id: '2',
      name: 'Fashion',
      description: 'Trendy clothing and accessories for every occasion',
      productCount: 892,
      color: 'from-pink-500 to-rose-600',
      icon: '👗',
      trending: false,
      featured: true
    },
    {
      id: '3',
      name: 'Home & Garden',
      description: 'Everything for your home and garden beautification',
      productCount: 634,
      color: 'from-green-500 to-emerald-600',
      icon: '🏠',
      trending: false,
      featured: false
    },
    {
      id: '4',
      name: 'Sports & Outdoors',
      description: 'Gear for active lifestyle and outdoor adventures',
      productCount: 456,
      color: 'from-orange-500 to-red-600',
      icon: '⚽',
      trending: true,
      featured: false
    },
    {
      id: '5',
      name: 'Books & Media',
      description: 'Books, movies, music and digital entertainment',
      productCount: 789,
      color: 'from-indigo-500 to-blue-600',
      icon: '📚',
      trending: false,
      featured: false
    },
    {
      id: '6',
      name: 'Health & Beauty',
      description: 'Personal care and wellness products for self-care',
      productCount: 543,
      color: 'from-purple-500 to-pink-600',
      icon: '✨',
      trending: false,
      featured: true
    }
  ]

  const featuredCategories = categories.filter(cat => cat.featured)
  const allCategories = categories

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
            <Link href="/products" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/categories" className="text-sm font-medium text-primary relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Product Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse our organized collection of products by category. Find exactly what you're looking for.
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
              Featured Categories
            </h2>
            <Link href="#all-categories" className="text-primary hover:text-primary/80 font-medium flex items-center group">
              View All
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  {/* Category Background */}
                  <div className={`relative h-64 bg-gradient-to-br ${category.color}`}>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4 animate-bounce">{category.icon}</div>
                        <div className="absolute top-4 right-4">
                          {category.trending && (
                            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {category.productCount.toLocaleString()} products
                      </span>
                      <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-2">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section id="all-categories">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Categories
            </h2>

            {/* View Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">View:</span>
              <button className="p-3 bg-primary text-white rounded-xl">
                <Grid className="w-5 h-5" />
              </button>
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {category.icon}
                    </div>
                    {category.trending && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-xs font-medium flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        Hot
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {category.productCount.toLocaleString()} items
                    </span>
                    <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      <span className="mr-2">Browse</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Categories', value: '24', icon: Grid },
            { label: 'Total Products', value: '4,361', icon: ShoppingBag },
            { label: 'New This Month', value: '127', icon: Sparkles },
            { label: 'Avg. Rating', value: '4.8', icon: Star }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-primary via-primary/90 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated with New Categories
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Be the first to know when we add new product categories and collections. Get exclusive early access to new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none shadow-lg"
              />
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
