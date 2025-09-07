import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import './ProductShowcase.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, addToWishlist, wishlist = [] } = useCart();
  const showcaseRef = useRef(null);

  // Backend products
  const [products, setProducts] = useState([]);
/*
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "electronics",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.8,
      reviews: 1247,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#000000', '#ffffff', '#ff6b6b'],
      sizes: ['S', 'M', 'L'],
      features: ['Noise Cancelling', 'Wireless', '30h Battery'],
      badge: 'Best Seller',
      inStock: true,
      fastShipping: true,
      description: "Experience premium sound quality with our latest wireless headphones featuring advanced noise cancellation technology."
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      category: "electronics",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.6,
      reviews: 892,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#000000', '#4a90e2', '#f39c12'],
      sizes: ['38mm', '42mm', '44mm'],
      features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
      badge: 'New',
      inStock: true,
      fastShipping: true,
      description: "Track your fitness goals with this advanced smartwatch featuring comprehensive health monitoring."
    },
    {
      id: 3,
      name: "Designer Leather Jacket",
      category: "fashion",
      price: 449.99,
      originalPrice: 599.99,
      discount: 25,
      rating: 4.9,
      reviews: 567,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#8B4513', '#000000', '#654321'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Genuine Leather', 'Premium Quality', 'Handcrafted'],
      badge: 'Limited Edition',
      inStock: true,
      fastShipping: false,
      description: "Crafted from premium genuine leather, this designer jacket combines style with durability."
    },
    {
      id: 4,
      name: "Modern Coffee Table",
      category: "home",
      price: 329.99,
      originalPrice: 429.99,
      discount: 23,
      rating: 4.7,
      reviews: 234,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#8B4513', '#D2691E', '#FFFFFF'],
      sizes: ['Small', 'Medium', 'Large'],
      features: ['Solid Wood', 'Modern Design', 'Easy Assembly'],
      badge: 'Trending',
      inStock: true,
      fastShipping: true,
      description: "Transform your living space with this elegant modern coffee table featuring clean lines and premium materials."
    },
    {
      id: 5,
      name: "Professional Camera Lens",
      category: "electronics",
      price: 899.99,
      originalPrice: 1199.99,
      discount: 25,
      rating: 4.9,
      reviews: 445,
      images: [
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#000000'],
      sizes: ['50mm', '85mm', '135mm'],
      features: ['Professional Grade', 'Image Stabilization', 'Weather Sealed'],
      badge: 'Pro Choice',
      inStock: true,
      fastShipping: true,
      description: "Capture stunning professional-quality photos with this premium camera lens featuring advanced optics."
    },
    {
      id: 6,
      name: "Luxury Skincare Set",
      category: "beauty",
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      rating: 4.8,
      reviews: 1156,
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
      ],
      colors: ['#FFB6C1', '#FFFFFF', '#F0E68C'],
      sizes: ['Travel Size', 'Full Size', 'Deluxe'],
      features: ['Organic Ingredients', 'Dermatologist Tested', 'Cruelty Free'],
      badge: 'Bestseller',
      inStock: true,
      fastShipping: true,
      description: "Pamper your skin with this luxury skincare set featuring premium organic ingredients and proven results."
    }
*/

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(`${API_BASE_URL}/products`);
        const json = await resp.json();
        if (json?.success && Array.isArray(json.data)) {
          // Normalize backend fields to match UI needs
          const mapped = json.data.map(p => ({
            id: p.id,
            name: p.name,
            price: Number(p.price ?? 0),
            originalPrice: Number(p.originalPrice ?? p.price ?? 0),
            images: Array.isArray(p.images) && p.images.length ? p.images : [p.imageUrl || p.image].filter(Boolean),
            rating: p.rating ?? 4.5,
            reviews: p.reviews ?? 100,
            category: p.category?.slug || p.category?.name || 'all',
            features: p.features ?? [],
            colors: p.colors ?? [],
            sizes: p.sizes ?? [],
            inStock: (p.stock ?? 0) > 0,
            badge: p.badge || null,
            description: p.description || '',
            fastShipping: true,
          }));
          setProducts(mapped);
        } else if (Array.isArray(json)) {
          // If API returns raw array
          setProducts(json);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error('Failed to fetch products', e);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      { id: 'all', name: 'All Products', count: products.length },
      { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
      { id: 'fashion', name: 'Fashion', count: products.filter(p => p.category === 'fashion').length },
      { id: 'home', name: 'Home & Living', count: products.filter(p => p.category === 'home').length },
      { id: 'beauty', name: 'Beauty', count: products.filter(p => p.category === 'beauty').length }
    ];
  }, [products]);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Filter and sort products with memoization for performance
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => activeFilter === 'all' || product.category === activeFilter)
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.id - a.id;
          default:
            return 0;
        }
      });
  }, [products, activeFilter, sortBy]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = showcaseRef.current?.querySelectorAll('.product-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProducts]);

  const handleAddToCart = useCallback((product, e) => {
    e.stopPropagation();
    addToCart(product);

    // Add visual feedback
    const button = e.target.closest('.add-to-cart-btn');
    if (button) {
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 1000);
    }
  }, [addToCart]);

  const handleAddToWishlist = useCallback((product, e) => {
    e.stopPropagation();
    addToWishlist(product);
  }, [addToWishlist]);

  const isInWishlist = (productId) => {
    return wishlist && Array.isArray(wishlist) ? wishlist.some(item => item.id === productId) : false;
  };

  const openQuickView = (product, e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <section className="product-showcase" ref={showcaseRef}>
      <div className="showcase-container">
        {/* Section Header */}
        <div className="showcase-header animate-on-scroll fade-in-up">
          <div className="header-content">
            <h2 className="section-title text-reveal">Featured Products</h2>
            <p className="section-subtitle">Discover our handpicked selection of premium products</p>
          </div>

          {/* View Mode Toggle */}
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <rect x="3" y="3" width="7" height="7" fill="currentColor"/>
                <rect x="14" y="3" width="7" height="7" fill="currentColor"/>
                <rect x="3" y="14" width="7" height="7" fill="currentColor"/>
                <rect x="14" y="14" width="7" height="7" fill="currentColor"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="showcase-controls animate-on-scroll fade-in-up stagger-1">
          {/* Category Filters */}
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-controls">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`products-grid ${viewMode} stagger-animation`}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={openQuickView}
              isInWishlist={isInWishlist(product.id)}
              viewMode={viewMode}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="load-more-section animate-on-scroll fade-in-up">
          <button className="load-more-btn magnetic-btn">
            <span>Load More Products</span>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 5v14M5 12l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={closeQuickView}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          isInWishlist={isInWishlist(quickViewProduct.id)}
        />
      )}
    </section>
  );
};

// Enhanced Product Card Component
const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  isInWishlist,
  viewMode,
  animationDelay
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      className={`product-card enhanced-card ${viewMode} animate-on-scroll fade-in-scale`}
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={handleImageHover}
      onMouseLeave={handleImageLeave}
    >
      {/* Product Badge */}
      {product.badge && (
        <div className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </div>
      )}

      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="discount-badge">
          -{discountPercentage}%
        </div>
      )}

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Image Overlay */}
        <div className={`image-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="overlay-actions">
            <button
              className="action-btn quick-view-btn"
              onClick={(e) => onQuickView(product, e)}
              title="Quick View"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            <button
              className={`action-btn wishlist-btn ${isInWishlist ? 'active' : ''}`}
              onClick={(e) => onAddToWishlist(product, e)}
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Fast Shipping Badge */}
        {product.fastShipping && (
          <div className="shipping-badge">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M16 3h5v5M21 3l-7 7M13 13l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Fast Shipping
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                ⭐
              </span>
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Features */}
        <div className="product-features">
          {product.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>

        {/* Colors */}
        <div className="product-colors">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              title={`Color option ${index + 1}`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="product-pricing">
          <span className="current-price">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn magnetic-btn"
          onClick={(e) => onAddToCart(product, e)}
          disabled={!product.inStock}
        >
          <span className="btn-text">
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </span>
          <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Quick View Modal Component
const QuickViewModal = ({ product, onClose, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedColor: product.colors[selectedColor],
      selectedSize: product.sizes[selectedSize],
      quantity
    };
    onAddToCart(productWithOptions);
    onClose();
  };

  return (
    <div className="quick-view-modal" onClick={handleBackdropClick}>
      <div className="modal-content animate-bounce-in">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        <div className="modal-body">
          {/* Product Images */}
          <div className="modal-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            {product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="modal-details">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="product-pricing">
              <span className="current-price">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice}</span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Features */}
            <div className="product-features">
              <h4>Features:</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="option-group">
                <h4>Color:</h4>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === index ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="option-group">
                <h4>Size:</h4>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-option ${selectedSize === index ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(index)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="option-group">
              <h4>Quantity:</h4>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button
                className="add-to-cart-btn primary"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={() => onAddToWishlist(product)}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"/>
                </svg>
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
