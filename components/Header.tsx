'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { useAuth } from './AuthProvider'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-primary-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="mr-1">📞</span> +1 234 567 8900
            </span>
            <span className="flex items-center">
              <span className="mr-1">✉️</span> info@smarttech.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-primary-100">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-primary-100 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-primary-100 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="text-primary-100 hover:text-white transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  SmartTech
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                Categories
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for electronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Account */}
              <div className="hidden md:flex items-center space-x-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm text-gray-700">Account</span>
              </div>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart size={24} className="text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-slide-down">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Products
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact
                </Link>

                {/* Mobile Search */}
                <div className="px-4 pt-4 border-t border-gray-200">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search electronics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Search size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
