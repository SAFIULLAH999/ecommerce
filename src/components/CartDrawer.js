import React from 'react';
import { useApp } from '../context/AppContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    toggleCartDrawer,
    updateCartQuantity,
    removeFromCart,
    getCartTotal,
    clearCart
  } = useApp();

  const handleCheckout = () => {
    // Here you would typically redirect to checkout page
    console.log('Proceeding to checkout...');
    toggleCartDrawer();
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={toggleCartDrawer}></div>
      <div className="cart-drawer">
        <div className="drawer-header">
          <h3>Shopping Cart ({cart.length})</h3>
          <button className="close-btn" onClick={toggleCartDrawer}>✕</button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-icon">🛒</span>
              <h4>Your cart is empty</h4>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
                    </div>
                    
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-price">${item.price}</div>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="total">
                    <span>Total: <strong>${getCartTotal().toFixed(2)}</strong></span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button className="clear-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
