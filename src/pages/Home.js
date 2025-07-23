import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import EnhancedProductGrid from '../components/EnhancedProductGrid';
import Blog from '../components/Blog';
import animationManager from '../utils/animationManager';

const Home = () => {
  useEffect(() => {
    // Initialize animations for page sections
    setTimeout(() => {
      const sections = document.querySelectorAll('.home-page > *');
      sections.forEach((section, index) => {
        animationManager.addScrollAnimation(section, 'fadeInUp');
        section.style.animationDelay = `${index * 0.2}s`;
      });
    }, 100);
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <EnhancedProductGrid />
      <Blog />
    </div>
  );
};

export default Home;
