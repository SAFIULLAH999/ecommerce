import React from 'react';
import './Header.css';

const Header = ({ onSidebarToggle }) => {
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
        
        <div className="header-right">
          <div className="search-icon">🔍</div>
          <div className="wishlist-icon">🤍</div>
          <div className="cart-icon">
            🛒
            <span className="cart-count">2</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
