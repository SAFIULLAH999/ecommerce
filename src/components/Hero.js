import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const intervalRef = useRef(null);

  // Slides data - moved before useEffect to avoid initialization error
  const slides = [
    {
      id: 1,
      title: "Premium Fashion Collection",
      subtitle: "Discover the Latest Trends",
      description: "Explore our curated selection of premium fashion items that define your unique style and personality.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "fashion",
      badge: "New Collection",
      price: "Starting from $99",
      features: ["Premium Quality", "Free Shipping", "30-Day Returns"],
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Luxury Accessories",
      subtitle: "Elevate Your Style",
      description: "Complete your look with our exclusive range of luxury accessories designed for the modern lifestyle.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "accessories",
      badge: "Limited Edition",
      price: "From $149",
      features: ["Handcrafted", "Premium Materials", "Lifetime Warranty"],
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Smart Technology",
      subtitle: "Innovation Meets Style",
      description: "Experience the perfect blend of cutting-edge technology and elegant design in our smart collection.",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "technology",
      badge: "Best Seller",
      price: "From $299",
      features: ["Latest Tech", "Wireless", "Fast Charging"],
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const handleShopNow = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Shop Now button clicked!');
    try {
      navigate('/products');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/products';
    }
  };

  useEffect(() => {
    setIsLoaded(true);

    // Auto-slide functionality
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };



  const nextSlide = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Next slide clicked!');
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, slides.length]);

  const prevSlide = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Previous slide clicked!');
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Slide indicator clicked:', index);
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section
      ref={heroRef}
      className={`hero premium-hero ${isLoaded ? 'loaded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: currentSlideData.bgColor,
        transition: 'background 1s ease-in-out'
      }}
    >
      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <div
          className="parallax-element element-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div
          className="parallax-element element-2"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
          }}
        ></div>
        <div
          className="parallax-element element-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        ></div>
      </div>

      {/* Main Hero Content */}
      <div className="hero-container">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-text animate-on-scroll fade-in-left">
            {/* Badge */}
            <div className="hero-badge animate-bounce-in stagger-1">
              <span className="badge-icon">✨</span>
              <span className="badge-text">{currentSlideData.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title text-reveal">
              <span className="title-line-1">
                {currentSlideData.title.split(' ').slice(0, 2).join(' ')}
              </span>
              <br />
              <span className="title-line-2 gradient-text">
                {currentSlideData.title.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="hero-subtitle animate-fade-in-up stagger-2">
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p className="hero-description animate-fade-in-up stagger-3">
              {currentSlideData.description}
            </p>

            {/* Features */}
            <div className="hero-features animate-fade-in-up stagger-4">
              {currentSlideData.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <svg className="feature-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="hero-price animate-fade-in-up stagger-5">
              <span className="price-label">Price:</span>
              <span className="price-value">{currentSlideData.price}</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions animate-fade-in-up stagger-6">
              <button
                className="shop-now-btn magnetic-btn animate-pulse"
                onClick={handleShopNow}
                type="button"
              >
                <span className="btn-text">Shop Now</span>
                <div className="btn-glow"></div>
                <svg className="btn-arrow" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button className="btn btn-outline btn-lg magnetic-btn">
                <span>View Collection</span>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div className="hero-image animate-on-scroll fade-in-right">
            <div className="hero-image-container">
              {/* Image Slides */}
              <div className="image-slider">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`slide-image ${index === currentSlide ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${(index - currentSlide) * 100}%)`,
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="hero-main-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="floating-ui-elements">
                <div className="ui-element ui-element-1 animate-float">
                  <div className="ui-content">
                    <span className="ui-label">New</span>
                    <span className="ui-value">+{slides.length}</span>
                  </div>
                </div>
                <div className="ui-element ui-element-2 animate-float-reverse">
                  <div className="ui-content">
                    <span className="ui-label">Rating</span>
                    <div className="rating-stars">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                <div className="ui-element ui-element-3 animate-float">
                  <div className="ui-content">
                    <span className="ui-label">Customers</span>
                    <span className="ui-value">10K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="hero-navigation">
          <button
            className={`nav-arrow nav-prev ${isTransitioning ? 'disabled' : ''}`}
            onClick={prevSlide}
            disabled={isTransitioning}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`nav-arrow nav-next ${isTransitioning ? 'disabled' : ''}`}
            onClick={nextSlide}
            disabled={isTransitioning}
            type="button"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''} ${isTransitioning ? 'disabled' : ''}`}
              onClick={goToSlide(index)}
              disabled={isTransitioning}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="indicator-fill"></div>
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="slide-counter">
          <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="separator">/</span>
          <span className="total">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
