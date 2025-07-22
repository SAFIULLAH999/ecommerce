import React, { useState } from 'react';
// Force refresh
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import Blog from './components/Blog';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="app">
      <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
      <div className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <Header onSidebarToggle={toggleSidebar} />
        <Hero />
        <Categories />
        <ProductGrid />
        <Blog />
        <Footer />
      </div>
    </div>
  );
}

export default App;
