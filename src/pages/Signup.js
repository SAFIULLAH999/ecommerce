import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/animations.css';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsLoaded(true);

    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Calculate password strength
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const response = await signup(userData);

      if (response.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const handleFacebookSignup = () => {
    console.log('Facebook signup clicked');
  };

  const getPasswordStrengthText = () => {
    const strengths = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return strengths[passwordStrength] || 'Very Weak';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#16a085'];
    return colors[passwordStrength] || '#e74c3c';
  };

  return (
    <div className={`auth-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="auth-background">
        <div className="auth-particles"></div>
        <div className="auth-gradient-orb orb-1"></div>
        <div className="auth-gradient-orb orb-2"></div>
        <div className="auth-gradient-orb orb-3"></div>
      </div>

      <div className="auth-content signup-content">
        <div className={`auth-info signup-info ${isLoaded ? 'slide-in-left' : ''}`}>
          <div className="info-content">
            <h2 className="info-title">Start your journey</h2>
            <p className="info-description">
              Create your account and unlock access to thousands of products from trusted sellers worldwide.
            </p>
            <div className="info-features">
              <div className="feature-item float-animation">
                <div className="feature-icon">🌟</div>
                <span>Exclusive Deals</span>
              </div>
              <div className="feature-item float-animation">
                <div className="feature-icon">🎯</div>
                <span>Personalized Recommendations</span>
              </div>
              <div className="feature-item float-animation">
                <div className="feature-icon">🏆</div>
                <span>VIP Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`auth-card signup-card ${isLoaded ? 'slide-in-bottom' : ''}`}>
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">👑</span>
              <span className="logo-text">Mantu</span>
            </div>
            <h1 className="auth-title gradient-text">Create Account</h1>
            <p className="auth-subtitle">Join thousands of happy customers</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form signup-form">
            {error && (
              <div className="error-message stagger-item" style={{
                background: '#fee',
                color: '#c33',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #fcc'
              }}>
                {error}
              </div>
            )}

            <div className="name-group">
              <div className="input-group stagger-item">
                <label className="input-label">First Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="auth-input ultra-smooth focus-smooth"
                    placeholder="First name"
                    required
                  />
                  <div className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="input-group stagger-item">
                <label className="input-label">Last Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="auth-input ultra-smooth focus-smooth"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

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
                  placeholder="Create a strong password"
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
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill ultra-smooth"
                      style={{ 
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span 
                    className="strength-text"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div className="input-group stagger-item">
              <label className="input-label">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="auth-input ultra-smooth focus-smooth"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle ultra-smooth"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="error-message">
                  Passwords do not match
                </div>
              )}
            </div>

            <div className="form-checkboxes stagger-item">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                  required
                />
                <span className="checkbox-mark ultra-smooth"></span>
                <span className="checkbox-text">
                  I agree to the <Link to="/terms" className="link">Terms of Service</Link> and <Link to="/privacy" className="link">Privacy Policy</Link>
                </span>
              </label>

              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="subscribeToNewsletter"
                  checked={formData.subscribeToNewsletter}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-mark ultra-smooth"></span>
                <span className="checkbox-text">Subscribe to our newsletter for exclusive offers</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !formData.agreeToTerms}
              className={`auth-button primary-button button-smooth ripple ultra-smooth ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
              onClick={handleGoogleSignup}
              className="social-button google-button button-smooth hover-lift ultra-smooth"
            >
              <svg viewBox="0 0 24 24" className="social-icon">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign up with Google</span>
            </button>

            <button 
              onClick={handleFacebookSignup}
              className="social-button facebook-button button-smooth hover-lift ultra-smooth"
            >
              <svg viewBox="0 0 24 24" className="social-icon">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Sign up with Facebook</span>
            </button>
          </div>

          <div className="auth-footer stagger-item">
            <p className="footer-text">
              Already have an account? 
              <Link to="/login" className="auth-link ultra-smooth">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
