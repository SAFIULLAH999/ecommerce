import React from 'react';
import { useApp } from '../context/AppContext';
import './WishlistDrawer.css';

const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    toggleWishlistDrawer,
    removeFromWishlist,
    addToCart
  } = useApp();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    console.log('Moved to cart:', product.name);
  };

  if (!isWishlistOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={toggleWishlistDrawer}></div>
      <div className="wishlist-drawer">
        <div className="drawer-header">
          <h3>Wishlist ({wishlist.length})</h3>
          <button className="close-btn" onClick={toggleWishlistDrawer}>✕</button>
        </div>

        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <span className="empty-icon">💝</span>
              <h4>Your wishlist is empty</h4>
              <p>Save items you love for later!</p>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  <div className="item-image">
                    <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
                  </div>
                  
                  <div className="item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price">${item.price}</div>
                    {item.originalPrice && (
                      <div className="item-original-price">${item.originalPrice}</div>
                    )}
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      className="move-to-cart-btn"
                      onClick={() => handleMoveToCart(item)}
                      title="Move to Cart"
                    >
                      🛒
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from Wishlist"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
