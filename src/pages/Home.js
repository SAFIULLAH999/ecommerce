import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';
import Blog from '../components/Blog';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
      <ProductGrid />
      <Blog />
    </div>
  );
};

export default Home;
