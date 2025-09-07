'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Zap, Smartphone, Gamepad2, Home } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: "Latest Smartphones 2024",
    subtitle: "Discover cutting-edge technology with our premium smartphone collection featuring the newest innovations",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Shop Smartphones",
    buttonLink: "/products/smartphones",
    icon: Smartphone,
    badge: "New Arrivals",
    discount: "Up to 30% off"
  },
  {
    id: 2,
    title: "Gaming Revolution",
    subtitle: "Experience next-gen gaming with our latest consoles, accessories, and gaming gear",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Explore Gaming",
    buttonLink: "/products/gaming",
    icon: Gamepad2,
    badge: "Hot Deals",
    discount: "Free Shipping"
  },
  {
    id: 3,
    title: "Smart Home Solutions",
    subtitle: "Transform your home with intelligent devices and automation for modern living",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Smart Home",
    buttonLink: "/products/smart-home",
    icon: Home,
    badge: "Trending",
    discount: "Bundle Savings"
  }
]

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, []) // Empty dependency array is correct here - we only want this to run once

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = heroSlides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <section className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <IconComponent size={16} />
              <span>{currentSlideData.badge}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {currentSlideData.discount}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-slide-up animation-delay-200">
              {currentSlideData.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
              <Link
                href={currentSlideData.buttonLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <Zap className="mr-2 group-hover:animate-pulse" size={20} />
                {currentSlideData.buttonText}
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-gray-900"
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-12 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm">4.8/5 Rating</span>
              </div>

              <div className="text-gray-300 text-sm">
                ✓ Free Shipping | ✓ 30-Day Returns | ✓ 2-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
