import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout Page</h1>
          <nav className="breadcrumb">
            <span>Home</span> → <span>Checkout Page</span>
          </nav>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <section className="customer-section">
              <h2>New Customer</h2>
              <div className="checkout-options">
                <label className="checkout-option">
                  <input type="radio" name="customer" value="register" defaultChecked />
                  Register Account
                </label>
                <label className="checkout-option">
                  <input type="radio" name="customer" value="guest" />
                  Guest Checkout
                </label>
              </div>
              <p className="checkout-description">
                By creating an account, you will be able to check faster, get an overview of your order status and keep track of the orders you have previously made.
              </p>
              <button className="continue-btn">Continue</button>
            </section>
            
            <section className="returning-customer">
              <h2>Returning Customer</h2>
              <form className="login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email address" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <button className="forgot-password">Forgot Password?</button>
              </form>
            </section>
            
            <section className="billing-details">
              <h2>Billing Details</h2>
              <form className="billing-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name*</label>
                    <input type="text" placeholder="Enter first name" />
                  </div>
                  <div className="form-group">
                    <label>Last Name*</label>
                    <input type="text" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Address line 1" />
                </div>
              </form>
            </section>
          </div>
          
          <div className="order-summary">
            <h2>Summary</h2>
            <div className="summary-content">
              <div className="summary-row">
                <span>Sub Total</span>
                <span>$295.00</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>$28.00</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>$315.00</span>
              </div>
              
              <div className="order-items">
                <div className="order-item">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb3a66b16d7db4a3ba7b701c37f30a6c2?format=webp&width=800" alt="Product" />
                  <div className="item-details">
                    <h4>Round neck t-shirt</h4>
                    <p>Color: Blue</p>
                    <p>$33.00</p>
                  </div>
                </div>
                <div className="order-item">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ff19e5884c8c3442f939896c64d90798b?format=webp&width=800" alt="Product" />
                  <div className="item-details">
                    <h4>Skinny black jeans</h4>
                    <p>Color: Black</p>
                    <p>$280.00</p>
                  </div>
                </div>
              </div>
              
              <div className="delivery-method">
                <h3>Delivery Method</h3>
                <div className="delivery-options">
                  <label>
                    <input type="radio" name="delivery" defaultChecked />
                    Free Shipping
                  </label>
                  <label>
                    <input type="radio" name="delivery" />
                    Flat Rate
                  </label>
                </div>
              </div>
              
              <div className="payment-method">
                <h3>Payment Method</h3>
                <p>Please select the preferred payment method to use on this order.</p>
                <button className="add-payment-btn">Add new card</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
