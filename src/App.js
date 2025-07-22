import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarExpanded(false); // Auto-collapse sidebar on mobile
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
      <div className={`main-content scroll-container ${
        isMobile ? '' : (sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed')
      }`}>
        <Header onSidebarToggle={toggleSidebar} />
        <div className="content-wrapper">
          <Hero />
          <Categories />
          <ProductGrid />
          <Blog />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
