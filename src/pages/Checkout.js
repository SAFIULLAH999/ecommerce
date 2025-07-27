import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getStripePublishableKey } from '../utils/stripeConfig';
import './Checkout.css';

// Validate Stripe publishable key
const stripePublishableKey = getStripePublishableKey();
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // Check if Stripe is available
      if (!stripePromise) {
        throw new Error('Stripe is not configured. Please check your environment variables.');
      }

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          items: cart,
          customerInfo: orderData
        })
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe. Please refresh the page and try again.');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStripeCheckout();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Checkout</h2>
          {error && <div className="error-message">{error}</div>}
          {!stripePublishableKey && (
            <div className="warning-message">
              ⚠️ Payment processing is not configured. Please contact support.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={orderData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={orderData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={orderData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={orderData.address}
                onChange={handleInputChange}
                required
              />
              <div className="form-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={orderData.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={orderData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={orderData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="pay-button"
              disabled={loading || cart.length === 0 || !stripePublishableKey}
            >
              {loading ? 'Processing...' :
               !stripePublishableKey ? 'Payment Not Available' :
               `Pay $${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 
