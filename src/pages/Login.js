import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/animations.css';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    }, 2000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className={`auth-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="auth-background">
        <div className="auth-particles"></div>
        <div className="auth-gradient-orb orb-1"></div>
        <div className="auth-gradient-orb orb-2"></div>
        <div className="auth-gradient-orb orb-3"></div>
      </div>

      <div className="auth-content">
        <div className={`auth-card login-card ${isLoaded ? 'slide-in-bottom' : ''}`}>
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">👑</span>
              <span className="logo-text">Mantu</span>
            </div>
            <h1 className="auth-title gradient-text">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group stagger-item">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="auth-input ultra-smooth focus-smooth"
                  placeholder="Enter your email"
                  required
                />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="input-group stagger-item">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input ultra-smooth focus-smooth"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle ultra-smooth"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-options stagger-item">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-mark ultra-smooth"></span>
                <span className="checkbox-text">Remember me</span>
              </label>

              <Link to="/forgot-password" className="forgot-link ultra-smooth">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`auth-button primary-button button-smooth ripple ultra-smooth ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="button-arrow" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider stagger-item">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          <div className="social-login stagger-item">
            <button 
              onClick={handleGoogleLogin}
              className="social-button google-button button-smooth hover-lift ultra-smooth"
            >
              <svg viewBox="0 0 24 24" className="social-icon">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button 
              onClick={handleFacebookLogin}
              className="social-button facebook-button button-smooth hover-lift ultra-smooth"
            >
              <svg viewBox="0 0 24 24" className="social-icon">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="auth-footer stagger-item">
            <p className="footer-text">
              Don't have an account? 
              <Link to="/signup" className="auth-link ultra-smooth">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className={`auth-info ${isLoaded ? 'slide-in-right' : ''}`}>
          <div className="info-content">
            <h2 className="info-title">Join our community</h2>
            <p className="info-description">
              Discover amazing products, connect with sellers, and enjoy a seamless shopping experience.
            </p>
            <div className="info-features">
              <div className="feature-item float-animation">
                <div className="feature-icon">🛍️</div>
                <span>Premium Shopping</span>
              </div>
              <div className="feature-item float-animation">
                <div className="feature-icon">🚚</div>
                <span>Fast Delivery</span>
              </div>
              <div className="feature-item float-animation">
                <div className="feature-icon">💳</div>
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
