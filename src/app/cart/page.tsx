import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Star, ShoppingCart, Filter, Grid, List, SlidersHorizontal, Eye, Zap, LogOut, Plus, Minus, Trash2, ArrowRight, Truck, Shield, CreditCard } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()
  const { isAuthenticated, user, toggleLoginModal, loginModal } = useAuth()

  const shippingCost = total > 50 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shippingCost + tax

  if (items.length === 0) {
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
                    onClick={() => {}}
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

        {/* Empty Cart */}
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to find something you love!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <AuthModal
          isOpen={loginModal}
          onClose={() => {}}
          type="login"
        />
      </div>
    )
  }

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
                  onClick={() => {}}
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cart Items</h2>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-lg font-medium border-x border-gray-300 dark:border-gray-600">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600 dark:text-green-400' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {shippingCost === 0 && (
                  <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    🎉 You qualified for free shipping!
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              {isAuthenticated ? (
                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={toggleLoginModal}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Login to Checkout</span>
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Free shipping on orders over $50
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {total < 50 ? `Add $${(50 - total).toFixed(2)} more for free shipping` : 'You qualify for free shipping!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={loginModal}
        onClose={() => {}}
        type="login"
      />
    </div>
  )
}
