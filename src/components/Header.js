import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = ({ onSidebarToggle }) => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { getCartItemsCount, toggleCart } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

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
    <header className={`header sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={onSidebarToggle}>
            ☰
          </button>
          <Link to="/" className="logo">
            <span>🛍️ E-Commerce</span>
          </Link>
        </div>

        <div className="header-center">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        <div className="header-right">
          <button className="cart-btn" onClick={toggleCart}>
            🛒 <span className="cart-count">{getCartItemsCount()}</span>
          </button>

          {loading ? (
            <div className="auth-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user?.displayName || user?.email || 'User'}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    👤 Profile
                  </Link>
                  <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                    📦 Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/admin" onClick={() => setShowUserMenu(false)}>
                      ⚙️ Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="logout-btn">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link
                to="/login"
                className={`login-btn ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`signup-btn ${location.pathname === '/signup' ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

