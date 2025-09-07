import React from 'react';
import MantuDemo from './MantuDemo';
import './Home.css';

/**
 * Home Page Component
 *
 * This is the main landing page that showcases the Mantu ecommerce template.
 * It uses the enhanced MantuDemo component with all the modern features:
 * - Hero slider with auto-play
 * - Product catalog with filtering and sorting
 * - Shopping cart functionality
 * - Wishlist features
 * - Search with suggestions
 * - Responsive design
 * - Smooth animations
 * - Modern UI/UX
 */
const Home = () => {
  return (
    <div className="home-container">
      <MantuDemo />
    </div>
  );
};

export default Home;
