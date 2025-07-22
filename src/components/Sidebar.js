import React, { useEffect } from 'react';
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
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: false },
    { icon: '📱', label: 'eCommerce', active: true },
    { icon: '📝', label: 'Blogs', active: false },
    { icon: '🛍️', label: 'Shops', active: false },
    { icon: '📧', label: 'Messages', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
    { icon: '🛒', label: 'Commerce', active: false },
    { icon: '👤', label: 'Users', active: false },
    { icon: '📈', label: 'Gifts', active: false },
    { icon: '🎵', label: 'Music', active: false },
    { icon: '📺', label: 'Videos', active: false },
    { icon: '🎨', label: 'Tutorial Point', active: false },
    { icon: '📱', label: 'eCommerce', active: false },
    { icon: '🎶', label: 'Marketplace', active: false },
    { icon: '🍰', label: 'Culinary', active: false },
    { icon: '📑', label: 'UI Pages', active: false }
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
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${item.active ? 'active' : ''}`}
            title={!isExpanded ? item.label : ''}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {(isMobile ? mobileOpen : isExpanded) && <span className="sidebar-label">{item.label}</span>}
          </div>
        ))}
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
