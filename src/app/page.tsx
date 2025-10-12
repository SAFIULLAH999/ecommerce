import Link from 'next/link'
import { ShoppingBag, Heart, User, Search } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Mantu</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/analytics" className="text-sm font-medium hover:text-primary">
              Analytics
            </Link>
            <Link href="/music" className="text-sm font-medium hover:text-primary">
              Music
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent rounded-md">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              🏷️ SALE!
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Discover luxury fashion that defines your unique style
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our curated collection of premium products designed to elevate your lifestyle.
            From fashion to technology, we bring you the best of modern design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Shop Now →
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-muted-foreground">
              Carefully selected products from trusted brands worldwide
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Curated Selection</h3>
            <p className="text-muted-foreground">
              Hand-picked items that match your style and preferences
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personal Service</h3>
            <p className="text-muted-foreground">
              Dedicated support to help you find exactly what you need
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
