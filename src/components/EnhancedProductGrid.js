import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import animationManager from '../utils/animationManager';
import './EnhancedProductGrid.css';

const EnhancedProductGrid = () => {
  // const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useApp();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    // Sample products with high-quality images
    const sampleProducts = [
      {
        id: 1,
        name: 'Cotton fabric T-shirt',
        price: 120,
        originalPrice: 150,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.5,
        reviews: 128,
        brand: 'Fashion Co',
        colors: ['#000', '#fff', '#999'],
        sizes: ['S', 'M', 'L', 'XL'],
        tag: 'Sale'
      },
      {
        id: 2,
        name: 'Leather handbag',
        price: 89,
        originalPrice: 120,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        reviews: 89,
        brand: 'Luxury Bags',
        colors: ['#8B4513', '#000', '#D2691E'],
        tag: 'Hot'
      },
      {
        id: 3,
        name: 'Casual T-shirt',
        price: 105,
        originalPrice: 140,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.3,
        reviews: 65,
        brand: 'Urban Style',
        colors: ['#FF6B35', '#F7931E', '#FFD23F'],
        sizes: ['S', 'M', 'L'],
        tag: 'New'
      },
      {
        id: 4,
        name: 'Smart Watch',
        price: 299,
        originalPrice: 399,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.6,
        reviews: 234,
        brand: 'TechWear',
        colors: ['#000', '#fff', '#C0C0C0'],
        tag: 'Featured'
      },
      {
        id: 5,
        name: 'Running Shoes',
        price: 89,
        originalPrice: 120,
        category: 'footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.4,
        reviews: 156,
        brand: 'SportMax',
        colors: ['#000', '#fff', '#FF0000'],
        sizes: ['7', '8', '9', '10', '11'],
        tag: 'Sale'
      },
      {
        id: 6,
        name: 'Wireless Headphones',
        price: 159,
        originalPrice: 199,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.7,
        reviews: 198,
        brand: 'AudioTech',
        colors: ['#000', '#fff', '#0066CC'],
        tag: 'Hot'
      }
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);

    // Initialize animations for product cards
    setTimeout(() => {
      document.querySelectorAll('.enhanced-product-card').forEach((card, index) => {
        animationManager.addScrollAnimation(card, 'fadeInUp');
        card.style.animationDelay = `${index * 0.1}s`;
      });
    }, 100);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, priceRange]);

  const categories = [
    { value: 'all', label: 'All', count: products.length },
    { value: 'clothing', label: 'Clothing', count: products.filter(p => p.category === 'clothing').length },
    { value: 'accessories', label: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
    { value: 'electronics', label: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
    { value: 'footwear', label: 'Footwear', count: products.filter(p => p.category === 'footwear').length }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    // Animate button feedback
    const button = document.querySelector(`[data-product-id="${product.id}"] .add-to-cart-btn`);
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product);
  };

  return (
    <div className="enhanced-product-grid">
      <div className="product-header">
        <div className="breadcrumb">
          <span>Home</span>
          <span className="separator">→</span>
          <span>Shop Page</span>
        </div>
        
        <div className="product-controls">
          <div className="left-controls">
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                  <span className="count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="right-controls">
            <div className="sort-control">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-content">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-labels">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Color</h3>
            <div className="color-filters">
              {['#000', '#fff', '#FF0000', '#0066CC', '#008000', '#FFA500'].map(color => (
                <div
                  key={color}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="size-filters">
              {['XS', 'S', 'M', 'L', 'XL', '7', '8', '9', '10'].map(size => (
                <button key={size} className="size-option">
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="products-main">
          <div className="results-info">
            <span>Showing {filteredProducts.length} of {products.length} results</span>
          </div>

          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="enhanced-product-card"
                data-product-id={product.id}
                data-scroll-animation="fadeInUp"
              >
                {product.tag && (
                  <div className={`product-tag ${product.tag.toLowerCase()}`}>
                    {product.tag}
                  </div>
                )}

                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  
                  <div className="product-overlay">
                    <div className="quick-actions">
                      <button
                        className="quick-action-btn"
                        onClick={() => handleQuickView(product)}
                        title="Quick View"
                      >
                        👁️
                      </button>
                      <button
                        className={`quick-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={() => handleAddToWishlist(product)}
                        title="Add to Wishlist"
                      >
                        {isInWishlist(product.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="rating-text">({product.reviews})</span>
                  </div>

                  {product.colors && (
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  )}

                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductGrid;
