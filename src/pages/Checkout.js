import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const Checkout = () => {
  const { cart } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/checkout/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      setError(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12 }}>
      <h2>Checkout</h2>
      <p>Review your order and proceed to payment.</p>
      <ul style={{ marginBottom: 24 }}>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.name} x {item.quantity} — ${item.price} each
          </li>
        ))}
      </ul>
      {error && <div style={{ color: '#c00', marginBottom: 16 }}>{error}</div>}
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{ background: '#667eea', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
      >
        {loading ? 'Redirecting...' : 'Pay with Card'}
      </button>
    </div>
  );
};

export default Checkout; 