import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="crown-icon">👑</span>
              <span className="brand-name">Mantu</span>
            </div>
            <p className="footer-description">
              This fashion is the greatest creator of geometry enthusiast,
              a great designer and a great business company and fashion style.
            </p>
            <div className="payment-methods">
              <img src="/api/placeholder/40/25" alt="Google Pay" className="payment-icon" />
              <img src="/api/placeholder/40/25" alt="Apple Pay" className="payment-icon" />
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Category</h4>
            <ul className="footer-links">
              <li><a href="#fashion">Fashion</a></li>
              <li><a href="#electronics">Electronics</a></li>
              <li><a href="#shoes">Shoes</a></li>
              <li><a href="#bags">Bags & Purse</a></li>
              <li><a href="#watches">Watches</a></li>
              <li><a href="#accessories">Accessories</a></li>
              <li><a href="#perfumes">Perfumes</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#affiliate">Affiliate</a></li>
              <li><a href="#login">Login</a></li>
              <li><a href="#checkout">Checkout</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Account</h4>
            <ul className="footer-links">
              <li><a href="#profile">My Profile</a></li>
              <li><a href="#checkout">Checkout</a></li>
              <li><a href="#orders">My Order History</a></li>
              <li><a href="#tracking">Order Tracking</a></li>
              <li><a href="#help">Help & Support</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="contact-info">
              <p>📞 +123 456 789 Avenue, Bronalyn OH 44820</p>
              <p>📧 info@example.com</p>
              <p>🕐 Monday - Friday: 9:00-20:00<br />Saturday: 11:00 - 15:00</p>
            </div>
            <div className="social-links">
              <a href="#facebook" className="social-link">📘</a>
              <a href="#twitter" className="social-link">🐦</a>
              <a href="#instagram" className="social-link">📷</a>
              <a href="#youtube" className="social-link">📺</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© 2024 © All Rights | Developed with ❤️ by Mantu</p>
            <div className="payment-cards">
              <span className="payment-card">💳</span>
              <span className="payment-card">💳</span>
              <span className="payment-card">💳</span>
              <span className="payment-card">💳</span>
              <span className="payment-card">💳</span>
              <span className="payment-card">💳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
