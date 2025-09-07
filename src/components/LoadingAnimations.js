import React, { useState, useEffect } from 'react';
import './LoadingAnimations.css';

// Premium Loading Spinner
export const PremiumLoader = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`premium-loader ${size} ${color}`}>
      <div className="loader-ring">
        <div className="loader-segment"></div>
        <div className="loader-segment"></div>
        <div className="loader-segment"></div>
        <div className="loader-segment"></div>
      </div>
      <div className="loader-core">
        <div className="core-pulse"></div>
      </div>
    </div>
  );
};

// Skeleton Loading for Product Cards
export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title shimmer"></div>
        <div className="skeleton-line skeleton-subtitle shimmer"></div>
        <div className="skeleton-features">
          <div className="skeleton-tag shimmer"></div>
          <div className="skeleton-tag shimmer"></div>
          <div className="skeleton-tag shimmer"></div>
        </div>
        <div className="skeleton-price shimmer"></div>
        <div className="skeleton-button shimmer"></div>
      </div>
    </div>
  );
};

// Page Transition Loader
export const PageTransitionLoader = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="page-transition-loader">
      <div className="transition-overlay">
        <div className="loader-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <div className="icon-ring"></div>
              <div className="icon-center"></div>
            </div>
            <h2 className="brand-name">Mantu</h2>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
          
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Button Loading State
export const ButtonLoader = ({ size = 'small' }) => {
  return (
    <div className={`button-loader ${size}`}>
      <div className="spinner-ring">
        <div className="spinner-arc"></div>
      </div>
    </div>
  );
};

// Content Loading Placeholder
export const ContentLoader = ({ lines = 3, width = '100%' }) => {
  return (
    <div className="content-loader" style={{ width }}>
      {[...Array(lines)].map((_, index) => (
        <div 
          key={index}
          className="content-line shimmer"
          style={{ 
            width: index === lines - 1 ? '70%' : '100%',
            animationDelay: `${index * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );
};

// Image Loading Placeholder
export const ImageLoader = ({ width = '100%', height = '200px', borderRadius = '8px' }) => {
  return (
    <div 
      className="image-loader shimmer"
      style={{ width, height, borderRadius }}
    >
      <div className="image-placeholder">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

// Floating Action Button with Loading
export const FloatingActionButton = ({ 
  icon, 
  onClick, 
  loading = false, 
  position = 'bottom-right',
  color = 'primary' 
}) => {
  return (
    <button 
      className={`floating-action-btn ${position} ${color} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <ButtonLoader size="small" />
      ) : (
        <span className="fab-icon">{icon}</span>
      )}
      <div className="fab-ripple"></div>
    </button>
  );
};

// Loading Overlay for Sections
export const SectionLoader = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <div className="section-loader">
      <div className="section-loader-content">
        <PremiumLoader size="large" />
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

// Pulse Loading Animation
export const PulseLoader = ({ count = 3, size = 'medium' }) => {
  return (
    <div className={`pulse-loader ${size}`}>
      {[...Array(count)].map((_, index) => (
        <div 
          key={index}
          className="pulse-dot"
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

// Wave Loading Animation
export const WaveLoader = ({ color = 'primary' }) => {
  return (
    <div className={`wave-loader ${color}`}>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
    </div>
  );
};

// Typing Animation Loader
export const TypingLoader = ({ text = 'Loading', speed = 500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setDisplayText('');
        setCurrentIndex(0);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex, text, speed]);

  return (
    <div className="typing-loader">
      <span className="typing-text">{displayText}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

// Progress Circle
export const ProgressCircle = ({ progress = 0, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-svg">
        <circle
          className="progress-background"
          stroke="var(--border-light)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-foreground"
          stroke="var(--primary-color)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.3s ease'
          }}
          strokeLinecap="round"
        />
      </svg>
      <div className="progress-text">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

// Loading States Hook
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setLoadingError = (errorMessage) => {
    setLoading(false);
    setError(errorMessage);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError
  };
};

// Global Loading Manager
export class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
    this.listeners = new Set();
  }

  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners();
  }

  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }

  isAnyLoading() {
    return Array.from(this.loadingStates.values()).some(loading => loading);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.loadingStates));
  }
}

export const loadingManager = new LoadingManager();
