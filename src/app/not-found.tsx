import Link from 'next/link'
import { ShoppingBag, Home, ArrowLeft, Search, Music, BarChart3, Grid } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-8xl font-bold text-gray-200 dark:text-gray-700 -z-10 animate-pulse animation-delay-300">
            404
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Products
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Grid className="w-4 h-4 mr-2" />
              Categories
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Popular Pages
          </h3>
          <div className="space-y-3">
            <Link href="/products" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Browse Products
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/categories" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
              <div className="flex items-center space-x-3">
                <Grid className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Explore Categories
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/music" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
              <div className="flex items-center space-x-3">
                <Music className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Music Store
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/analytics" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Analytics Dashboard
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* Support Message */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            If this is your site, and you weren't expecting a 404 for this path, please visit Netlify's "
            <a href="https://docs.netlify.com/routing/redirects/404s/" className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">
              page not found
            </a>
            " support guide for troubleshooting tips.
          </p>
        </div>
      </div>
    </div>
  )
}
