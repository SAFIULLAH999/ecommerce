import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
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
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderCancel from './pages/OrderCancel';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <AdminProvider>
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
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin" element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } />
                      <Route path="/products" element={<Products />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/order-cancel" element={<OrderCancel />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/commerce" element={<Commerce />} />
                      <Route path="/music" element={<Music />} />
                      <Route path="/videos" element={<Videos />} />
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
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

