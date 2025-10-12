import Link from 'next/link'
import { ShoppingBag, Heart, User, Search, Play, Pause, SkipForward, SkipBack, Volume2, Music as MusicIcon, Clock, Calendar, Headphones, Disc, Radio, TrendingUp, Star, Award, Zap, Shuffle, Repeat } from 'lucide-react'

export const metadata = {
  title: 'Music - Mantu E-commerce',
  description: 'Discover and shop music products',
}

export default function MusicPage() {
  const featuredAlbums = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Nova',
      price: 29.99,
      originalPrice: 39.99,
      genre: 'Electronic',
      releaseDate: '2024',
      tracks: 12,
      duration: '45:32',
      rating: 4.9,
      color: 'from-purple-500 to-pink-600',
      badge: 'Editor\'s Choice',
      description: 'A mesmerizing journey through electronic soundscapes'
    },
    {
      id: '2',
      title: 'Urban Symphony',
      artist: 'City Lights Collective',
      price: 24.99,
      originalPrice: 34.99,
      genre: 'Hip Hop',
      releaseDate: '2024',
      tracks: 10,
      duration: '38:15',
      rating: 4.7,
      color: 'from-orange-500 to-red-600',
      badge: 'Trending',
      description: 'Raw energy meets sophisticated beats'
    },
    {
      id: '3',
      title: 'Acoustic Sessions Vol. 2',
      artist: 'River Stone',
      price: 19.99,
      originalPrice: 29.99,
      genre: 'Folk',
      releaseDate: '2023',
      tracks: 8,
      duration: '32:48',
      rating: 4.8,
      color: 'from-green-500 to-blue-600',
      badge: 'Bestseller',
      description: 'Intimate performances captured in studio'
    }
  ]

  const newReleases = [
    { title: 'Neon Nights', artist: 'Electric Pulse', price: 14.99, genre: 'Electronic', badge: 'New' },
    { title: 'Jazz Café Sessions', artist: 'Smooth Operators', price: 16.99, genre: 'Jazz', badge: 'Hot' },
    { title: 'Rock Legends Live', artist: 'Thunder Strike', price: 21.99, genre: 'Rock', badge: 'Live' },
    { title: 'Classical Masters Vol. 3', artist: 'Symphony Orchestra', price: 18.99, genre: 'Classical', badge: 'Premium' },
  ]

  const genres = [
    { name: 'Pop', count: 1247, color: 'bg-pink-500', trending: true },
    { name: 'Rock', count: 892, color: 'bg-red-500', trending: false },
    { name: 'Electronic', count: 634, color: 'bg-purple-500', trending: true },
    { name: 'Hip Hop', count: 456, color: 'bg-orange-500', trending: false },
    { name: 'Jazz', count: 321, color: 'bg-blue-500', trending: false },
    { name: 'Classical', count: 289, color: 'bg-green-500', trending: false }
  ]

  const currentTrack = {
    title: 'Midnight Dreams',
    artist: 'Luna Nova',
    currentTime: '1:23',
    duration: '3:45',
    progress: 33
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
            <Link href="/music" className="text-sm font-medium text-primary relative group">
              Music
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
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
            Music Store
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover your next favorite album or artist. Stream, download, and collect music that moves you.
          </p>
        </div>

        {/* Enhanced Music Player Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MusicIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Now Playing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTrack.title} - {currentTrack.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
                  <Shuffle className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
                  <SkipBack className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
                <button className="w-16 h-16 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  <Play className="w-6 h-6 ml-1" />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
                  <SkipForward className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
                  <Repeat className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
                <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group">
                  <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-full rounded-full transition-all duration-300 relative"
                  style={{ width: `${currentTrack.progress}%` }}
                >
                  <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full shadow-lg -translate-y-1 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>{currentTrack.currentTime}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Albums */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Award className="w-8 h-8 text-yellow-500 mr-3" />
              Featured Albums
            </h2>
            <Link href="#all-albums" className="text-primary hover:text-primary/80 font-medium flex items-center group">
              View All Albums
              <TrendingUp className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAlbums.map((album, index) => (
              <div key={album.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`relative h-56 bg-gradient-to-br ${album.color}`}>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    </button>
                  </div>

                  {/* Album Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                          {album.badge}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(album.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm opacity-90 line-clamp-2">
                        {album.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    by {album.artist}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center">
                      <Disc className="w-4 h-4 mr-1" />
                      {album.tracks} tracks
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {album.duration}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {album.releaseDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${album.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${album.originalPrice}
                      </span>
                    </div>
                    <button className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Releases */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-yellow-500" />
              New Releases
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {newReleases.map((album, index) => (
                <div key={index} className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center relative">
                      <MusicIcon className="w-7 h-7 text-gray-500" />
                      <button className="absolute inset-0 w-full h-full bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {album.artist} • {album.genre}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      album.badge === 'New' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      album.badge === 'Hot' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      album.badge === 'Live' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {album.badge}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${album.price}
                    </span>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Genres */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Radio className="w-6 h-6 mr-3 text-primary" />
                Browse by Genre
              </h2>
              <div className="space-y-3">
                {genres.map((genre, index) => (
                  <button
                    key={genre.name}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${genre.color}`}></div>
                      <span className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {genre.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {genre.count}
                      </span>
                      {genre.trending && (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Music Lovers Club */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-6 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <Headphones className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Music Lovers Club</h3>
                <p className="text-sm opacity-90 mb-6">
                  Get early access to new releases, exclusive content, and VIP concert tickets.
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:scale-105 w-full">
                  Join Now - Free
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This Month</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Albums', value: '47', icon: Disc },
                  { label: 'Total Streams', value: '2.1M', icon: Play },
                  { label: 'Active Artists', value: '156', icon: MusicIcon }
                ].map((stat, index) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
