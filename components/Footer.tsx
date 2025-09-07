import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Truck, Shield, Headphones } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary-400 mb-4">SmartTech</h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner for quality electronics and exceptional service.
                We bring you the latest technology with unbeatable prices and premium customer support.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Tech Street<br />
                    Silicon Valley, CA 94043<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">+1 234 567 8900</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">info@smarttech.com</p>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <Headphones size={18} />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Truck className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold text-white">Free Shipping</h5>
                <p className="text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Shield className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold text-white">Secure Payment</h5>
                <p className="text-sm text-gray-400">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <CreditCard className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold text-white">Easy Returns</h5>
                <p className="text-sm text-gray-400">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Headphones className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold text-white">24/7 Support</h5>
                <p className="text-sm text-gray-400">Expert customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 SmartTech. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
