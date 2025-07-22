import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      title: "Cosmetics sale for Women's",
      subtitle: "Elevate your beauty style that speaks confidence.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc36b83dc8c4649a19eb6934b14ec8032?format=webp&width=800",
      category: "cosmetics"
    },
    {
      id: 3,
      title: "Fashion sale for Children's",
      subtitle: "Fun and comfortable style for your little ones.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb82b8992e74d4d72b1a0ef478b569ba0?format=webp&width=800",
      category: "children"
    },
    {
      id: 4,
      title: "Fashion sale for women's",
      subtitle: "Elevate your every day style that speaks volumes.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc2b4f4277e2d4a35acee16ed6d7d58ad?format=webp&width=800",
      category: "women"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];
  return (
    <section className="hero page-transition">
      <div className="hero-container">
        <div className="hero-content stagger-animation">
          <div className="hero-text">
            <div className="sale-badge">
              <span className="sale-text">Sale!</span>
            </div>
            <h1 className="hero-title">
              {currentSlideData.title.split(' ').slice(0, 2).join(' ')} <br />
              {currentSlideData.title.split(' ').slice(2).join(' ')}
            </h1>
            <p className="hero-subtitle">
              {currentSlideData.subtitle}
            </p>
            <button className="shop-now-btn btn-enhanced btn-micro">Shop Now</button>
          </div>

          <div className="hero-image">
            <div className="hero-image-container">
              <div className="decorative-circle"></div>
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="model-image"
                key={currentSlide}
              />
              <div className="decorative-dots"></div>
              <div className="decorative-lines"></div>
            </div>
          </div>
        </div>

        <div className="hero-navigation">
          <button className="nav-arrow nav-prev" onClick={prevSlide}>‹</button>
          <button className="nav-arrow nav-next" onClick={nextSlide}>›</button>
        </div>

        <div className="hero-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
