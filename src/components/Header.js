import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = ({ onSidebarToggle }) => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { getCartItemsCount, toggleCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Mega menu data
  const megaMenuData = {
    shop: {
      title: 'Shop',
      categories: [
        {
          name: 'Electronics',
          items: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Smart Watches']
        },
        {
          name: 'Fashion',
          items: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Jewelry']
        },
        {
          name: 'Home & Living',
          items: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Storage']
        },
        {
          name: 'Beauty',
          items: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care', 'Tools']
        }
      ],
      featured: [
        { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop' },
        { name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop' },
        { name: 'Sale Items', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop' }
      ]
    },
    categories: {
      title: 'Categories',
      categories: [
        {
          name: 'Popular Categories',
          items: ['Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors', 'Books']
        },
        {
          name: 'Trending Now',
          items: ['Smart Home', 'Sustainable Products', 'Fitness Equipment', 'Work From Home', 'Gaming']
        }
      ]
    }
  };

  // Search suggestions data
  const searchSuggestionsData = [
    'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro', 'AirPods Pro',
    'Nike Air Max', 'Adidas Ultraboost', 'Leather Jacket', 'Wireless Headphones',
    'Coffee Table', 'Desk Lamp', 'Skincare Set', 'Perfume', 'Smart Watch',
    'Gaming Chair', 'Bluetooth Speaker', 'Yoga Mat', 'Kitchen Appliances'
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
      if (showMegaMenu && !event.target.closest('.mega-menu-container')) {
        setShowMegaMenu(false);
        setActiveMegaMenu(null);
      }
      if (showSearchSuggestions && !event.target.closest('.search-container')) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, showMegaMenu, showSearchSuggestions]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestionsData.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

  // Mega menu handlers
  const handleMegaMenuEnter = (menuType) => {
    setActiveMegaMenu(menuType);
    setShowMegaMenu(true);
  };

  const handleMegaMenuLeave = () => {
    setShowMegaMenu(false);
    setActiveMegaMenu(null);
  };

  // Search handlers
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.length > 0) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSearchSuggestions(false);
    setSearchQuery('');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`header enhanced-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <button className="sidebar-toggle magnetic-btn" onClick={onSidebarToggle}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>

          <Link to="/" className="logo enhanced-logo">
            <div className="logo-icon">
              <div className="icon-ring"></div>
              <div className="icon-center"></div>
            </div>
            <span className="logo-text">Mantu</span>
          </Link>
        </div>

        {/* Enhanced Navigation */}
        <nav className="main-navigation">
          <div className="nav-links">
            <div
              className="nav-item mega-menu-trigger"
              onMouseEnter={() => handleMegaMenuEnter('shop')}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link to="/products" className="nav-link">
                Shop
                <svg className="nav-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
            </div>

            <div
              className="nav-item mega-menu-trigger"
              onMouseEnter={() => handleMegaMenuEnter('categories')}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link to="/categories" className="nav-link">
                Categories
                <svg className="nav-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
            </div>

            <Link to="/deals" className="nav-link">Deals</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>

        {/* Enhanced Search */}
        <div className="header-center">
          <div className="search-container" ref={searchRef}>
            <form className="enhanced-search-bar" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className={`search-input ${isSearchFocused ? 'focused' : ''}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                )}
              </div>
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>

            {/* Search Suggestions */}
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div className="search-suggestions">
                <div className="suggestions-header">
                  <span>Popular Searches</span>
                </div>
                <ul className="suggestions-list">
                  {searchSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <svg className="suggestion-icon" viewBox="0 0 24 24" width="16" height="16">
                        <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          {/* Enhanced Cart Button */}
          <button className="enhanced-cart-btn magnetic-btn" onClick={toggleCart}>
            <div className="cart-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </button>

          {loading ? (
            <div className="auth-loading">
              <div className="premium-loader small"></div>
            </div>
          ) : isAuthenticated ? (
            <div className="user-menu">
              <button
                className="enhanced-user-btn magnetic-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="user-name">{user?.displayName || user?.email || 'User'}</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              {showUserMenu && (
                <div className="enhanced-user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <div className="user-avatar large">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="user-details">
                        <span className="user-display-name">{user?.displayName || 'User'}</span>
                        <span className="user-email">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>My Profile</span>
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>My Orders</span>
                    </Link>
                    {user?.isAdmin && (
                      <Link to="/admin" className="dropdown-item admin-link" onClick={() => setShowUserMenu(false)}>
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                Sign In
              </Link>
              <Link to="/signup" className="auth-btn signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mega Menu */}
      {showMegaMenu && activeMegaMenu && (
        <div
          className="mega-menu-container"
          ref={megaMenuRef}
          onMouseEnter={() => setShowMegaMenu(true)}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="mega-menu-content">
            {activeMegaMenu === 'shop' && (
              <div className="mega-menu shop-menu">
                <div className="menu-categories">
                  {megaMenuData.shop.categories.map((category, index) => (
                    <div key={index} className="menu-category">
                      <h4 className="category-title">{category.name}</h4>
                      <ul className="category-items">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link to={`/products?category=${encodeURIComponent(item)}`} className="category-link">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="menu-featured">
                  <h4 className="featured-title">Featured Collections</h4>
                  <div className="featured-items">
                    {megaMenuData.shop.featured.map((item, index) => (
                      <Link key={index} to={`/collections/${item.name.toLowerCase().replace(' ', '-')}`} className="featured-item">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeMegaMenu === 'categories' && (
              <div className="mega-menu categories-menu">
                <div className="menu-categories">
                  {megaMenuData.categories.categories.map((category, index) => (
                    <div key={index} className="menu-category">
                      <h4 className="category-title">{category.name}</h4>
                      <ul className="category-items">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link to={`/categories/${encodeURIComponent(item)}`} className="category-link">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

