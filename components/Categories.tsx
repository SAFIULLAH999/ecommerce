import Link from 'next/link'
import { Smartphone, Laptop, Gamepad2, Home, Headphones, Watch } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "Latest smartphones and accessories",
    productCount: 150,
    icon: Smartphone,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "High-performance laptops for work and play",
    productCount: 89,
    icon: Laptop,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: 3,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "Gaming consoles, accessories and gear",
    productCount: 120,
    icon: Gamepad2,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 4,
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "Intelligent home automation devices",
    productCount: 75,
    icon: Home,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 5,
    name: "Audio",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "Headphones, speakers and audio equipment",
    productCount: 95,
    icon: Headphones,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    id: 6,
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80",
    description: "Smartwatches and fitness trackers",
    productCount: 60,
    icon: Watch,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50"
  }
]

export const Categories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of electronic products and find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon

            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden group-hover:scale-105">
                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Icon Overlay */}
                    <div className={`absolute top-4 right-4 p-3 rounded-full ${category.bgColor} shadow-lg`}>
                      <IconComponent size={24} className={`text-${category.color.split('-')[1]}-600`} />
                    </div>

                    {/* Product Count Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {category.productCount} products
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                        <IconComponent size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                        Shop Now →
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in animation-delay-600">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
