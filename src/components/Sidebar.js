import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isExpanded, onToggle }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      onToggle();
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  const location = useLocation();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '🏠', label: 'Home', path: '/home' },
    { icon: '📦', label: 'Products', path: '/products' },
    { icon: '📋', label: 'Categories', path: '/categories' },
    { icon: '📝', label: 'Blogs', path: '/blogs' },
    { icon: '📧', label: 'Messages', path: '/messages' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '🛒', label: 'Commerce', path: '#' },
    { icon: '👤', label: 'Users', path: '#' },
    { icon: '📈', label: 'Analytics', path: '#' },
    { icon: '🎵', label: 'Music', path: '#' },
    { icon: '📺', label: 'Videos', path: '#' },
    { icon: '🎨', label: 'Design', path: '#' },
    { icon: '🎶', label: 'Marketplace', path: '#' },
    { icon: '🍰', label: 'Culinary', path: '#' },
    { icon: '📑', label: 'Pages', path: '#' }
  ];

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
        <button className="sidebar-toggle-btn" onClick={handleToggle}>
          {(isMobile ? mobileOpen : isExpanded) ? '‹' : '›'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const ItemWrapper = item.path !== '#' ? Link : 'div';
          const itemProps = item.path !== '#' ? { to: item.path } : {};

          return (
            <ItemWrapper
              key={index}
              {...itemProps}
              className={`sidebar-item ${isActive ? 'active' : ''} ${item.path === '#' ? 'disabled' : ''}`}
              title={!isExpanded ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {(isMobile ? mobileOpen : isExpanded) && <span className="sidebar-label">{item.label}</span>}
            </ItemWrapper>
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
