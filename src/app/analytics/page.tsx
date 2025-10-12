import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, TrendingUp, Users, DollarSign, ShoppingCart, Eye, Clock, BarChart3, Activity, Target, Award, Download, Share, Filter, Calendar, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Analytics - Mantu E-commerce',
  description: 'View your store analytics and insights',
}

export default function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
      trendColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      trendColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      trendColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Page Views',
      value: '12,345',
      change: '+25.7%',
      trend: 'up',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
      trendColor: 'text-orange-600 dark:text-orange-400'
    }
  ]

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$299', status: 'completed', time: '2 hours ago', avatar: 'JD' },
    { id: '#1235', customer: 'Jane Smith', amount: '$149', status: 'pending', time: '4 hours ago', avatar: 'JS' },
    { id: '#1236', customer: 'Mike Johnson', amount: '$449', status: 'completed', time: '6 hours ago', avatar: 'MJ' },
    { id: '#1237', customer: 'Sarah Wilson', amount: '$99', status: 'refunded', time: '8 hours ago', avatar: 'SW' },
  ]

  const topProducts = [
    { name: 'Premium Wireless Headphones Pro', sales: 145, revenue: '$43,350', growth: '+12%', image: '🎧' },
    { name: 'Smart Fitness Watch Ultra', sales: 98, revenue: '$39,200', growth: '+8%', image: '⌚' },
    { name: 'Bluetooth Speaker Waterproof', sales: 87, revenue: '$13,050', growth: '+15%', image: '🔊' },
    { name: 'Mechanical Keyboard RGB', sales: 76, revenue: '$15,200', growth: '+5%', image: '⌨️' },
  ]

  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 139 },
    { month: 'Mar', sales: 5000, orders: 980 },
    { month: 'Apr', sales: 4500, orders: 390 },
    { month: 'May', sales: 6000, orders: 480 },
    { month: 'Jun', sales: 5500, orders: 380 },
  ]

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
            <Link href="/analytics" className="text-sm font-medium text-primary relative group">
              Analytics
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Track your store performance and customer insights in real-time
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Last 30 days</span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.title} className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className={`text-sm font-medium ${stat.trendColor}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-primary" />
                Sales Overview
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Sales ($)</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full ml-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Orders</span>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center group">
                  <div className="flex flex-col items-end w-full space-y-1 mb-2">
                    <div
                      className="bg-primary rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                      style={{ height: `${(data.sales / 6000) * 200}px`, width: '60%' }}
                    ></div>
                    <div
                      className="bg-purple-500 rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                      style={{ height: `${(data.orders / 1000) * 200}px`, width: '60%' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 transform rotate-45 origin-center">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-primary" />
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {order.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {order.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.amount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {order.time}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Products */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-primary" />
              Top Products
            </h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 transition-colors group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center text-lg">
                      {product.image}
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {product.revenue}
                    </p>
                    <p className={`text-sm font-medium ${product.growth.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-primary" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              {[
                { title: 'View Reports', desc: 'Detailed analytics reports', icon: BarChart3, color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' },
                { title: 'Customer Insights', desc: 'Customer behavior analysis', icon: Users, color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' },
                { title: 'Revenue Tracking', desc: 'Monitor your earnings', icon: DollarSign, color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' },
                { title: 'Export Data', desc: 'Download analytics data', icon: Download, color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400' }
              ].map((action, index) => (
                <button key={action.title} className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.desc}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-gradient-to-r from-primary via-primary/90 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Excellent Performance This Month! 🚀
                </h2>
                <p className="opacity-90 mb-4">
                  Your store is performing 25% better than last month. Keep up the great work!
                </p>
                <button className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:scale-105">
                  View Full Report
                </button>
              </div>
              <div className="hidden md:block">
                <Activity className="w-16 h-16 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
