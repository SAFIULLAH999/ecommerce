import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import animationManager from './utils/animationManager';
import autoAnimations from './utils/autoAnimations';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Blogs from './pages/Blogs';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Commerce from './pages/Commerce';
import Music from './pages/Music';
import Videos from './pages/Videos';
import './styles/animations.css';
import './App.css';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    console.log('toggleSidebar called, current state:', sidebarExpanded);
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

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize animations
    setTimeout(() => {
      const appElement = document.querySelector('.app');
      const contentWrapper = document.querySelector('.content-wrapper');

      if (appElement) {
        appElement.style.opacity = '1';
        appElement.style.transform = 'translateY(0)';
      }

      if (contentWrapper) {
        contentWrapper.style.opacity = '1';
        contentWrapper.style.transform = 'translateY(0)';
      }

      // Ensure animations are initialized
      animationManager.init();
      autoAnimations.init();
    }, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/commerce" element={<Commerce />} />
                <Route path="/music" element={<Music />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/design" element={<div className="page-placeholder">🎨 Design Studio Coming Soon</div>} />
                <Route path="/marketplace" element={<div className="page-placeholder">🏪 Marketplace Coming Soon</div>} />
                <Route path="/culinary" element={<div className="page-placeholder">🍰 Culinary Section Coming Soon</div>} />
                <Route path="/pages" element={<div className="page-placeholder">📑 Pages Manager Coming Soon</div>} />
              </Routes>
              <Footer />
            </div>
            <CartDrawer />
            <WishlistDrawer />
            <ScrollToTop />
          </div>
        </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
