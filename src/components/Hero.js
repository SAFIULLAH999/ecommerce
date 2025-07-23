import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/animations.css';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const handleShopNow = () => {
    navigate('/products');
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Fashion sale for Men's",
      subtitle: "New Collection Fashion that suits your style.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fec157bc7941940898d314b09a8ec793f?format=webp&width=800",
      category: "men"
    },
    {
      id: 2,
      title: "Exclusive Premium Collection",
      subtitle: "Discover luxury fashion that defines your unique style.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2F32cb81698bdf4be1ade05536b5a9f73d?format=webp&width=800",
      category: "premium"
    },
    {
      id: 3,
      title: "Cosmetics sale for Women's",
      subtitle: "Elevate your beauty style that speaks confidence.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc36b83dc8c4649a19eb6934b14ec8032?format=webp&width=800",
      category: "cosmetics"
    },
    {
      id: 4,
      title: "Fashion sale for Children's",
      subtitle: "Fun and comfortable style for your little ones.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb82b8992e74d4d72b1a0ef478b569ba0?format=webp&width=800",
      category: "children"
    },
    {
      id: 5,
      title: "Fashion sale for women's",
      subtitle: "Elevate your every day style that speaks volumes.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc2b4f4277e2d4a35acee16ed6d7d58ad?format=webp&width=800",
      category: "women"
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];
  
  return (
    <section 
      ref={heroRef}
      className={`hero ultra-smooth ${isLoaded ? 'loaded' : ''}`}
    >
      <div className="hero-background-overlay"></div>
      <div className="hero-particles"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-text ${isLoaded ? 'slide-in-left' : ''}`}>
            <div className="sale-badge pulse-animation">
              <span className="sale-text">Sale!</span>
              <div className="badge-glow"></div>
            </div>
            
            <h1 className="hero-title gradient-text typewriter-effect">
              <span className="title-line-1">
                {currentSlideData.title.split(' ').slice(0, 2).join(' ')}
              </span>
              <br />
              <span className="title-line-2">
                {currentSlideData.title.split(' ').slice(2).join(' ')}
              </span>
            </h1>
            
            <p className={`hero-subtitle fade-in-text ${isLoaded ? 'slide-in-bottom' : ''}`}>
              {currentSlideData.subtitle}
            </p>
            
            <button 
              className="shop-now-btn button-smooth hover-lift ripple ultra-smooth" 
              onClick={handleShopNow}
            >
              <span className="btn-text">Shop Now</span>
              <div className="btn-glow"></div>
              <svg className="btn-arrow" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={`hero-image ${isLoaded ? 'slide-in-right' : ''}`}>
            <div className="hero-image-container">
              <div className="decorative-circle float-animation"></div>
              <div className="image-frame">
                <div className="image-overlay"></div>
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className={`model-image ultra-smooth ${isTransitioning ? 'transitioning' : ''}`}
                  key={currentSlide}
                />
                <div className="image-glow"></div>
              </div>
              <div className="decorative-dots bounce"></div>
              <div className="decorative-lines gradient-animation"></div>
              <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-navigation">
          <button 
            className={`nav-arrow nav-prev button-smooth hover-scale ${isTransitioning ? 'disabled' : ''}`} 
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className={`nav-arrow nav-next button-smooth hover-scale ${isTransitioning ? 'disabled' : ''}`} 
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ultra-smooth hover-scale ${
                index === currentSlide ? 'active' : ''
              } ${isTransitioning ? 'disabled' : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="indicator-fill"></div>
            </button>
          ))}
        </div>
        
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
