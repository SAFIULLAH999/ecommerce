import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/Header';
import MantuHeader from './components/MantuHeader';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ScrollToTop from './components/ScrollToTop';
import ParticleBackground from './components/ParticleBackground';
import { FloatingActionButton } from './components/LoadingAnimations';
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

// AdminRoute component - only for admin users
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
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
                {/* Optimized Background Elements */}
                <ParticleBackground
                  particleCount={15}
                  color="rgba(102, 126, 234, 0.4)"
                  size={2}
                  speed={0.3}
                  interactive={false}
                />
                <div className="mesh-gradient"></div>

                <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
                <div className={`main-content scroll-container ${
                  isMobile ? '' : (sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed')
                }`}>
                  {/* Mantu header UI */}
                  <MantuHeader />
                  <div className="content-wrapper">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      {/* Admin-only routes */}
                      <Route path="/dashboard" element={
                        <AdminRoute>
                          <Dashboard />
                        </AdminRoute>
                      } />
                      <Route path="/admin" element={
                        <AdminRoute>
                          <AdminDashboard />
                        </AdminRoute>
                      } />
                      <Route path="/users" element={
                        <AdminRoute>
                          <Users />
                        </AdminRoute>
                      } />
                      <Route path="/analytics" element={
                        <AdminRoute>
                          <Analytics />
                        </AdminRoute>
                      } />
                      <Route path="/commerce" element={
                        <AdminRoute>
                          <Commerce />
                        </AdminRoute>
                      } />
                      <Route path="/messages" element={
                        <AdminRoute>
                          <Messages />
                        </AdminRoute>
                      } />

                      {/* User routes (require login) */}
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } />
                      <Route path="/cart" element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      } />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } />
                      <Route path="/order-success" element={
                        <ProtectedRoute>
                          <OrderSuccess />
                        </ProtectedRoute>
                      } />
                      <Route path="/order-cancel" element={
                        <ProtectedRoute>
                          <OrderCancel />
                        </ProtectedRoute>
                      } />

                      {/* Public routes */}
                      <Route path="/products" element={<Products />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/music" element={<Music />} />
                      <Route path="/videos" element={<Videos />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                    <Footer />
                  </div>
                  <CartDrawer />
                  <WishlistDrawer />
                  <ScrollToTop />
                </div>

                {/* Floating Action Button */}
                <FloatingActionButton
                  icon="↑"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  position="bottom-right"
                  color="primary"
                />
              </div>
            </Router>
          </AppProvider>
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

