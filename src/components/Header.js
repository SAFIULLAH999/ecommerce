import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSidebarToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
          <a href="#home" className="nav-link">Home</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#pages" className="nav-link">Pages</a>
        </nav>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="header-right">
          <div className="search-icon">🔍</div>
          <div className="wishlist-icon">🤍</div>
          <div className="cart-icon">
            🛒
            <span className="cart-count">2</span>
          </div>
        </div>
      </div>

      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Categories</a>
        <a href="#products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Products</a>
        <a href="#pages" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pages</a>
      </nav>
    </header>
  );
};

export default Header;
