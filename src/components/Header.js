import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onSidebarToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartItemsCount, toggleCartDrawer, toggleWishlistDrawer } = useApp();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Mobile menu toggle clicked!');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Search clicked!');
    // Add search functionality here
  };

  const handleWishlistClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Wishlist clicked!');
    toggleWishlistDrawer();
  };

  const handleCartClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Cart clicked!');
    toggleCartDrawer();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="crown-icon">👑</span>
            <span className="brand-name">Mantu</span>
          </div>
        </div>

        <nav className="main-nav">
          <Link to="/home" className={`nav-link ${location.pathname === '/home' || location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>Categories</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Products</Link>
          <Link to="/blogs" className={`nav-link ${location.pathname === '/blogs' ? 'active' : ''}`}>Pages</Link>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          type="button"
          style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto', cursor: 'pointer' }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="header-right">
          <div className="header-icons">
            <div
              className="search-icon"
              title="Search"
              onClick={handleSearchClick}
              style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto', cursor: 'pointer' }}
            >🔍</div>
            <div
              className="wishlist-icon"
              title="Wishlist"
              onClick={handleWishlistClick}
              style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto', cursor: 'pointer' }}
            >🤍</div>
            <div
              className="cart-icon"
              title="Shopping Cart"
              onClick={handleCartClick}
              style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto', cursor: 'pointer' }}
            >
              🛒
              {getCartItemsCount() > 0 && (
                <span className="cart-count">{getCartItemsCount()}</span>
              )}
            </div>
          </div>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <span className="user-info ultra-smooth">
                  {user && user.firstName ? `Hi, ${user.firstName}` : 'Account'}
                </span>
                <button
                  className="logout-btn ultra-smooth hover-lift button-smooth"
                  onClick={logout}
                  disabled={isLoading}
                  style={{ marginLeft: 12 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn ultra-smooth hover-lift">
                  Sign In
                </Link>
                <Link to="/signup" className="signup-btn ultra-smooth hover-lift button-smooth">
                  <span>Sign Up</span>
                  <svg className="btn-arrow" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/home" className={`nav-link ${location.pathname === '/home' || location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Categories</Link>
        <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Products</Link>
        <Link to="/blogs" className={`nav-link ${location.pathname === '/blogs' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Pages</Link>
      </nav>
    </header>
  );
};

export default Header;
