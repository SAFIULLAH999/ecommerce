'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, Sparkles } from 'lucide-react'

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setMessage('🎉 Welcome to SmartTech! Check your email for a 10% discount code.')
      setEmail('')
      setIsSubmitting(false)
      setIsSuccess(true)

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('')
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  // Clean up any pending timeouts on unmount
  React.useEffect(() => {
    return () => {
      // Clear any pending timeouts when component unmounts
    }
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-bounce-subtle">
        <Sparkles className="w-8 h-8 text-white/20" />
      </div>
      <div className="absolute bottom-10 right-10 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-white/20" />
      </div>
      <div className="absolute top-1/2 right-20 animate-bounce-subtle" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-4 h-4 text-white/20" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8 animate-fade-in">
            <Mail className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Stay in the Loop
          </h2>

          {/* Subheading */}
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Get exclusive access to new product launches, special offers, and insider tips.
            Join thousands of tech enthusiasts who trust SmartTech for their electronics needs.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto animate-slide-up animation-delay-400">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 animate-slide-up ${
                isSuccess
                  ? 'bg-green-500/20 border-green-400/30 text-green-100'
                  : 'bg-red-500/20 border-red-400/30 text-red-100'
              }`}>
                <div className="flex items-center gap-3">
                  {isSuccess && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in animation-delay-600">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Free Delivery</h3>
              <p className="text-primary-100 text-sm">On your first order</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Exclusive Deals</h3>
              <p className="text-primary-100 text-sm">Members-only discounts</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Early Access</h3>
              <p className="text-primary-100 text-sm">Be first to know</p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="mt-8 text-primary-200 text-sm animate-fade-in animation-delay-800">
            We respect your privacy. Unsubscribe at any time.
            <span className="block mt-1">
              By subscribing, you agree to our{' '}
              <a href="/privacy" className="underline hover:text-white transition-colors">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="/terms" className="underline hover:text-white transition-colors">
                Terms of Service
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
