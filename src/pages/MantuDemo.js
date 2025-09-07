import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './MantuDemo.css';

// Enhanced product data with more variety
const initialProducts = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.5,
    reviews: 128,
    badge: "Sale",
    category: "fashion",
    inStock: true,
    description: "Comfortable premium cotton t-shirt perfect for everyday wear."
  },
  {
    id: 2,
    title: "Classic Denim Jacket",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.8,
    reviews: 89,
    badge: "Hot",
    category: "fashion",
    inStock: true,
    description: "Timeless denim jacket that never goes out of style."
  },
  {
    id: 3,
    title: "Leather Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.7,
    reviews: 203,
    badge: "New",
    category: "shoes",
    inStock: true,
    description: "Premium leather sneakers for comfort and style."
  },
  {
    id: 4,
    title: "Vintage Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.9,
    reviews: 156,
    badge: "Premium",
    category: "watches",
    inStock: true,
    description: "Elegant vintage-style watch with modern functionality."
  },
  {
    id: 5,
    title: "Canvas Backpack",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.6,
    reviews: 94,
    badge: "Sale",
    category: "bags",
    inStock: true,
    description: "Durable canvas backpack perfect for daily adventures."
  },
  {
    id: 6,
    title: "Wool Sweater",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    rating: 4.4,
    reviews: 67,
    badge: "Cozy",
    category: "fashion",
    inStock: false,
    description: "Soft wool sweater to keep you warm and stylish."
  }
];

const slides = [
  {
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends in fashion with up to 50% off',
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: 'Shop Now'
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the modern wardrobe',
    bg: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    cta: 'Explore Collection'
  },
  {
    title: 'Premium Quality',
    subtitle: 'Crafted with attention to detail and superior materials',
    bg: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: 'Shop Premium'
  }
];

function generateMoreProducts(count, existingLength) {
  const productNames = [
    "Casual Hoodie", "Sports Shoes", "Designer Sunglasses", "Leather Belt",
    "Cotton Pants", "Silk Scarf", "Winter Coat", "Running Shorts",
    "Formal Shirt", "Ankle Boots", "Crossbody Bag", "Baseball Cap",
    "Yoga Mat", "Wireless Headphones", "Coffee Mug", "Phone Case"
  ];

  const images = [
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1506629905607-d9c297d3d45b?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=580&q=80"
  ];

  const badges = ["New", "Sale", "Hot", "Premium", "Limited"];
  const categories = ["fashion", "shoes", "watches", "bags"];

  return Array.from({length: count}, (_, i) => {
    const price = Math.floor(Math.random() * 150) + 20;
    const originalPrice = price + Math.floor(Math.random() * 50) + 10;

    return {
      id: existingLength + i + 1,
      title: productNames[Math.floor(Math.random() * productNames.length)],
      price: price,
      originalPrice: originalPrice,
      image: images[Math.floor(Math.random() * images.length)],
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 20,
      badge: badges[Math.floor(Math.random() * badges.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      inStock: Math.random() > 0.1,
      description: `High-quality ${productNames[Math.floor(Math.random() * productNames.length)].toLowerCase()} with premium materials and excellent craftsmanship.`
    };
  });
}

// Stars component for product ratings
const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star"></i>
      ))}
      {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star"></i>
      ))}
    </span>
  );
};

export default function MantuDemo() {
  const {
    addToCart: addToCartContext,
    removeFromCart: removeFromCartContext,
    updateQuantity,
    clearCart: clearCartContext,
    getCartItemsCount,
    getCartTotal,
    cart: contextCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlist
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('default');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const intervalRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Use context cart instead of local state
  const cart = contextCart || [];

  // Hero slider autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(s => (s + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Enhanced scroll animations with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [allProducts]);

  // Filter and search products
  useEffect(() => {
    let filtered = allProducts;

    // Apply category filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(product => product.category === currentFilter);
    }

    // Apply search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [allProducts, currentFilter, search, currentSort]);

  // Handle search suggestions
  useEffect(() => {
    if (search.trim()) {
      const suggestions = allProducts
        .filter(product =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5)
        .map(product => product.title);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [search, allProducts]);

  // Enhanced cart functionality
  const addToCart = useCallback((product) => {
    if (!product.inStock) {
      notify('Product is out of stock!', 'error');
      return;
    }
    addToCartContext(product);
    notify(`${product.title} added to cart!`, 'success');
  }, [addToCartContext]);

  const removeFromCart = useCallback((id) => {
    const product = cart.find(item => item.id === id);
    if (removeFromCartContext) {
      removeFromCartContext(id);
    }
    if (product) {
      notify(`${product.title} removed from cart!`, 'info');
    }
  }, [removeFromCartContext, cart]);

  const updateCartQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  }, [updateQuantity, removeFromCart]);

  const clearCart = useCallback(() => {
    if (cart.length === 0) return;
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCartContext();
      notify('Cart cleared!', 'info');
    }
  }, [clearCartContext, cart.length]);

  // Wishlist functionality
  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      notify(`${product.title} removed from wishlist!`, 'info');
    } else {
      addToWishlist(product);
      notify(`${product.title} added to wishlist!`, 'success');
    }
  }, [addToWishlist, removeFromWishlist, isInWishlist]);

  // Quick view functionality
  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  }, []);

  // Share product functionality
  const shareProduct = useCallback((product) => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.href}#product-${product.id}`;
      navigator.clipboard.writeText(url).then(() => {
        notify('Product link copied to clipboard!', 'success');
      }).catch(() => {
        notify('Unable to share product', 'error');
      });
    }
  }, []);

  const cartCount = getCartItemsCount();
  const cartTotal = getCartTotal().toFixed(2);
  const wishlistCount = wishlist ? wishlist.length : 0;

  // Load more products
  const loadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      const moreProducts = generateMoreProducts(6, allProducts.length);
      setAllProducts(prev => [...prev, ...moreProducts]);
      setLoadingMore(false);
    }, 1500);
  }, [allProducts.length]);

  // Enhanced notification system
  const notify = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).slice(2);
    const notification = { id, message, type };

    setNotifications(prev => [...prev, notification]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  // Search functionality
  const handleSearch = useCallback((value) => {
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);
  }, []);

  const selectSuggestion = useCallback((suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  }, []);

  // Filter functionality
  const handleFilterChange = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setCurrentSort(sort);
  }, []);

  // Hero slider controls
  const nextSlide = useCallback(() => {
    setCurrentSlide(s => (s + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(s => (s - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Newsletter subscription
  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;

    if (email) {
      const submitBtn = e.target.querySelector('.btn');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        notify('Thank you for subscribing! Check your email for confirmation.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    }
  }, [notify]);

  // Mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="mantu">
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-slider">
          {slides.map((s, i) => (
            <div key={i} className={`slide ${i===currentSlide?'active':''}`} aria-hidden={i!==currentSlide}>
              <div className="slide-bg" style={{ backgroundImage: `url(${s.bg})` }} />
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title">{s.title}</h1>
                  <p className="hero-subtitle">{s.subtitle}</p>
                  <button className="btn btn-primary">{s.cta}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-nav">
          <button className="hero-prev" onClick={() => setCurrentSlide(s => (s-1+slides.length)%slides.length)}>‹</button>
          <button className="hero-next" onClick={() => setCurrentSlide(s => (s+1)%slides.length)}>›</button>
        </div>
        <div className="hero-dots">
          {slides.map((_,i)=>(
            <span key={i} className={`dot ${i===currentSlide?'active':''}`} onClick={()=>setCurrentSlide(i)} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories" id="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our wide range of products</p>
          </div>
          <div className="categories-grid">
            {[
              {title:'Fashion',sub:'Latest trends',img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80'},
              {title:'Shoes',sub:'Step in style',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=80'},
              {title:'Watches',sub:'Timeless pieces',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=720&q=80'},
              {title:'Bags',sub:'Carry with style',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=720&q=80'},
            ].map((c,idx)=> (
              <div key={idx} className="category-card animate-on-scroll">
                <div className="category-image"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="category-content"><h3>{c.title}</h3><p>{c.sub}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products + search */}
      <section className="featured-products" id="shop">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked items just for you</p>
          </div>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
            <input className="search-input" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div className="products-grid">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-card animate-on-scroll">
                <div className="product-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="product-badge">{p.badge}</div>
                  <div className="product-actions">
                    <button className="action-btn" title="Add to Wishlist">❤</button>
                    <button className="action-btn" title="Quick View">👁</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{p.title}</h3>
                  <div className="product-price"><span className="current-price">${p.price}</span><span className="original-price">${p.originalPrice}</span></div>
                  <div className="product-rating"><Stars rating={p.rating} /><span className="rating-text">({p.reviews} reviews)</span></div>
                  <button className="add-to-cart" onClick={()=>addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ textAlign:'center', marginTop:20 }}>
            {allProducts.length < 18 && (
              <button className="btn btn-outline" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading…' : 'Load More Products'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and get 10% off your first order</p>
            <form className="newsletter-form" onSubmit={(e)=>{e.preventDefault(); notify('Thank you for subscribing!','success'); e.currentTarget.reset();}}>
              <input type="email" placeholder="Enter your email" className="newsletter-input" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button className="mantu-cart-fab" onClick={()=>setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
        🛒<span className="mantu-cart-count">{cartCount}</span>
      </button>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="modal active" role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target===e.currentTarget) setCartOpen(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Shopping Cart</h3>
              <button className="modal-close" onClick={()=>setCartOpen(false)}>&times;</button>
            </div>
            <div className="modal-body" id="cartItems">
              {cart.length===0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image"><img src={item.image} alt={item.title} /></div>
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-price">${item.price} x {item.quantity}</div>
                    </div>
                    <button className="cart-item-remove" onClick={()=>removeFromCart(item.id)}>🗑️</button>
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <div className="cart-total"><strong>Total: ${cartTotal}</strong></div>
              <button className="btn btn-primary btn-full">Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="mantu-notifications">
        {notifications.map(n => (
          <div key={n.id} className={`notification notification-${n.type}`}>
            <div className="notification-content">
              <span>{n.message}</span>
              <button className="notification-close" onClick={()=> setNotifications(x=>x.filter(v=>v.id!==n.id))}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

