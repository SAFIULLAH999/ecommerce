import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCancel = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 64, color: '#e74c3c', marginBottom: 16 }}>❌</div>
      <h2>Payment Cancelled</h2>
      <p>Your payment was not completed. You can try again or review your cart.</p>
      <button
        style={{ marginTop: 32, background: '#667eea', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
        onClick={() => navigate('/cart')}
      >
        Return to Cart
      </button>
    </div>
  );
};

export default OrderCancel; 