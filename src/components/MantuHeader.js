import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './MantuHeader.css';

const MantuHeader = () => {
  const { isAuthenticated } = useAuth();
  const { getCartItemsCount, toggleCart } = useCart();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const term = search.trim();
    if (!term) return;
    navigate(`/products?search=${encodeURIComponent(term)}`);
    setSearch('');
    setNavOpen(false);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span><i className="fas fa-phone"></i> +1 234 567 8900</span>
              <span><i className="fas fa-envelope"></i> info@mantu.com</span>
            </div>
            <div className="top-links">
              {isAuthenticated ? (
                <Link to="/settings">Account</Link>
              ) : (
                <>
                  <Link to="/login" className="login-link">Login</Link>
                  <Link to="/signup" className="register-link">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <h2><Link to="/" style={{ textDecoration:'none', color:'inherit' }}>Mantu</Link></h2>
            </div>

            <div className={`nav-menu${navOpen ? ' active' : ''}`} id="navMenu">
              <ul className="nav-links">
                <li><Link to="/" className="nav-link" onClick={()=>setNavOpen(false)}>Home</Link></li>
                <li><Link to="/products" className="nav-link" onClick={()=>setNavOpen(false)}>Shop</Link></li>
                <li><a href="#categories" className="nav-link" onClick={()=>setNavOpen(false)}>Categories</a></li>
                <li><Link to="/about" className="nav-link" onClick={()=>setNavOpen(false)}>About</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={()=>setNavOpen(false)}>Contact</Link></li>
              </ul>
            </div>

            <div className="nav-actions">
              <form className="search-box" onSubmit={onSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <button className="search-btn" aria-label="Search"><i className="fas fa-search"></i></button>
              </form>
              <button className="cart-icon" onClick={toggleCart} aria-label="Open cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count" style={{ display: getCartItemsCount()>0 ? 'flex' : 'none' }}>{getCartItemsCount()}</span>
              </button>
              <button className="mobile-menu-toggle" id="mobileToggle" onClick={()=>setNavOpen(!navOpen)} aria-label="Toggle Menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MantuHeader;

