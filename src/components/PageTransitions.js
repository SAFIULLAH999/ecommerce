import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransitions.css';

// Page Transition Wrapper
export const PageTransition = ({ children, transitionKey }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('fade');
  const location = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    if (prevLocationRef.current.pathname !== location.pathname) {
      setIsTransitioning(true);
      
      // Determine transition type based on route
      const transitionType = getTransitionType(prevLocationRef.current.pathname, location.pathname);
      setTransitionType(transitionType);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        prevLocationRef.current = location;
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const getTransitionType = (from, to) => {
    // Define transition types based on routes
    const routeTransitions = {
      '/': 'slideUp',
      '/dashboard': 'slideLeft',
      '/products': 'slideRight',
      '/cart': 'slideDown',
      '/checkout': 'zoom'
    };

    return routeTransitions[to] || 'fade';
  };

  return (
    <div className={`page-transition-wrapper ${transitionType} ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="page-content">
        {children}
      </div>
      {isTransitioning && <TransitionOverlay type={transitionType} />}
    </div>
  );
};

// Transition Overlay Component
const TransitionOverlay = ({ type }) => {
  return (
    <div className={`transition-overlay ${type}`}>
      <div className="overlay-content">
        <div className="transition-loader">
          <div className="loader-ring">
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smooth Scroll Component
export const SmoothScroll = ({ children, speed = 1 }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    let isScrolling = false;
    let targetScrollTop = 0;
    let currentScrollTop = 0;

    const smoothScrollStep = () => {
      if (Math.abs(targetScrollTop - currentScrollTop) < 1) {
        currentScrollTop = targetScrollTop;
        isScrolling = false;
        return;
      }

      currentScrollTop += (targetScrollTop - currentScrollTop) * 0.1 * speed;
      element.scrollTop = currentScrollTop;
      
      if (isScrolling) {
        requestAnimationFrame(smoothScrollStep);
      }
    };

    const handleScroll = (e) => {
      e.preventDefault();
      targetScrollTop = Math.max(0, Math.min(
        element.scrollHeight - element.clientHeight,
        targetScrollTop + e.deltaY
      ));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScrollStep);
      }
    };

    element.addEventListener('wheel', handleScroll, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', handleScroll);
    };
  }, [speed]);

  return (
    <div ref={scrollRef} className="smooth-scroll-container">
      {children}
    </div>
  );
};

// Route Animation Hook
export const useRouteAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return isAnimating;
};

// Stagger Animation Component
export const StaggerContainer = ({ children, delay = 100, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`stagger-container ${className} ${isVisible ? 'visible' : ''}`}
    >
      {React.Children.map(children, (child, index) => (
        <div 
          className="stagger-item"
          style={{ 
            animationDelay: `${index * delay}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Parallax Component
export const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = '' 
}) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      if (direction === 'vertical') {
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div 
      ref={elementRef}
      className={`parallax-element ${className}`}
      style={{
        transform: direction === 'vertical' 
          ? `translateY(${offset}px)` 
          : `translateX(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

// Magnetic Effect Component
export const MagneticElement = ({ children, strength = 0.3, className = '' }) => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={elementRef}
      className={`magnetic-element ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.3s ease' : 'none'
      }}
    >
      {children}
    </div>
  );
};

// Reveal Animation Component
export const RevealAnimation = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 600,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    
    switch (direction) {
      case 'up': return 'translate(0, 50px)';
      case 'down': return 'translate(0, -50px)';
      case 'left': return 'translate(50px, 0)';
      case 'right': return 'translate(-50px, 0)';
      default: return 'translate(0, 50px)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`reveal-animation ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
      }}
    >
      {children}
    </div>
  );
};

// Morphing Background Component
export const MorphingBackground = ({ colors = [], duration = 5000 }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (colors.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentColorIndex(prev => (prev + 1) % colors.length);
    }, duration);

    return () => clearInterval(interval);
  }, [colors, duration]);

  return (
    <div 
      className="morphing-background"
      style={{
        background: `linear-gradient(135deg, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`,
        transition: `background ${duration * 0.8}ms ease-in-out`
      }}
    />
  );
};

// Floating Particles Component
export const FloatingParticles = ({ count = 20, color = '#667eea' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="floating-particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};
