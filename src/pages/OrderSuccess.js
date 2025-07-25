import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get('session_id');

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 12, textAlign: 'center' }}>
      <div style={{ fontSize: 64, color: '#27ae60', marginBottom: 16 }}>✅</div>
      <h2>Thank you for your purchase!</h2>
      <p>Your payment was successful.</p>
      {sessionId && <p style={{ color: '#888', marginTop: 12 }}>Order ID: <b>{sessionId}</b></p>}
      <button
        style={{ marginTop: 32, background: '#667eea', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
        onClick={() => navigate('/products')}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess; 