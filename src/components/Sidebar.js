import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isExpanded, onToggle }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Sidebar toggle clicked!', { isMobile, mobileOpen });
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      onToggle();
    }
  };

  const handleOverlayClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  const location = useLocation();

  // Define all menu items with role requirements
  const allMenuItems = [
    { icon: '🏠', label: 'Home', path: '/home', roles: ['public', 'user', 'admin'] },
    { icon: '📦', label: 'Products', path: '/products', roles: ['public', 'user', 'admin'] },
    { icon: '📋', label: 'Categories', path: '/categories', roles: ['public', 'user', 'admin'] },
    { icon: '📝', label: 'Blogs', path: '/blogs', roles: ['public', 'user', 'admin'] },
    { icon: '🎵', label: 'Music', path: '/music', roles: ['public', 'user', 'admin'] },
    { icon: '📺', label: 'Videos', path: '/videos', roles: ['public', 'user', 'admin'] },
    { icon: '🛒', label: 'Cart', path: '/cart', roles: ['user', 'admin'] },
    { icon: '⚙️', label: 'Settings', path: '/settings', roles: ['user', 'admin'] },
    { icon: '📊', label: 'Dashboard', path: '/dashboard', roles: ['admin'] },
    { icon: '👤', label: 'Users', path: '/users', roles: ['admin'] },
    { icon: '📈', label: 'Analytics', path: '/analytics', roles: ['admin'] },
    { icon: '🛒', label: 'Commerce', path: '/commerce', roles: ['admin'] },
    { icon: '📧', label: 'Messages', path: '/messages', roles: ['admin'] },
  ];

  // Filter menu items based on user role
  const getFilteredMenuItems = () => {
    if (!isAuthenticated) {
      return allMenuItems.filter(item => item.roles.includes('public'));
    } else if (isAdmin) {
      return allMenuItems.filter(item => item.roles.includes('admin'));
    } else {
      return allMenuItems.filter(item => item.roles.includes('user'));
    }
  };

  const menuItems = getFilteredMenuItems();

  return (
    <>
      {isMobile && mobileOpen && (
        <div className="sidebar-overlay show" onClick={handleOverlayClick}></div>
      )}
      <div className={`sidebar ${
        isMobile ?
          (mobileOpen ? 'sidebar-expanded mobile-open' : 'sidebar-collapsed') :
          (isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed')
      }`}>
      <div className="sidebar-header">
        {(isMobile ? mobileOpen : isExpanded) && (
          <div className="sidebar-logo">
            <span className="crown-icon">👑</span>
            <span className="brand-name">Mantu</span>
          </div>
        )}
        <button
          className="sidebar-toggle-btn"
          onClick={handleToggle}
          type="button"
          style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto', cursor: 'pointer' }}
        >
          {(isMobile ? mobileOpen : isExpanded) ? '‹' : '›'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''} ${item.category}`}
              title={!(isMobile ? mobileOpen : isExpanded) ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {(isMobile ? mobileOpen : isExpanded) && <span className="sidebar-label">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {(isMobile ? mobileOpen : isExpanded) && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">JD</div>
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Sidebar;
