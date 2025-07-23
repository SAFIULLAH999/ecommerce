import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Blogs from './pages/Blogs';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
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
    <AppProvider>
      <Router>
        <div className="app">
          <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
          <div className={`main-content scroll-container ${
            isMobile ? '' : (sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed')
          }`}>
            <Header onSidebarToggle={toggleSidebar} />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <Footer />
          </div>
          <CartDrawer />
          <WishlistDrawer />
        </div>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;
