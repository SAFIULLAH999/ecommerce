import React from 'react';
import './ProductGrid.css';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: 'Cotton fabric t-shirt',
      price: 165,
      originalPrice: 200,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fb3a66b16d7db4a3ba7b701c37f30a6c2?format=webp&width=800',
      colors: ['#90EE90', '#FFB6C1', '#87CEEB'],
      isNew: true
    },
    {
      id: 2,
      name: 'Sneaker sport shoes',
      price: 155,
      originalPrice: 180,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ff19e5884c8c3442f939896c64d90798b?format=webp&width=800',
      colors: ['#000', '#666'],
      discount: 15
    },
    {
      id: 3,
      name: 'Cotton fabric top',
      price: 149,
      originalPrice: 170,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Fc66a8c6d1a884446b31366c4f52eaed7?format=webp&width=800',
      colors: ['#FFF', '#F0F0F0'],
      sale: true
    },
    {
      id: 4,
      name: 'Apple smart watch',
      price: 199,
      originalPrice: 250,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2F2bbbb4775bbb45b4807085c054158c37?format=webp&width=800',
      colors: ['#000', '#FFF'],
      isNew: true
    },
    {
      id: 5,
      name: 'Men leather belt',
      price: 79,
      originalPrice: 95,
      image: 'https://cdn.builder.io/api/v1/image/assets%2F9f0b52c0859649e0acc31a2a0ba5605d%2Ffb094f865b2b4bf989d5b813377937c9?format=webp&width=800',
      colors: ['#8B4513', '#000'],
      sale: true
    }
  ];

  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping on all order above $200'
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Contact us 24 hours a day, 7 days a week'
    },
    {
      icon: '↩️',
      title: '30 Days Return',
      description: 'Simply return it within 30 days for an exchange'
    },
    {
      icon: '🔒',
      title: 'Payment Secure',
      description: 'Contact us 24 hours a day, 7 days a week'
    }
  ];

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <button className="view-all-btn">View All →</button>
        </div>
        
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.isNew && <span className="product-badge new">New</span>}
              {product.sale && <span className="product-badge sale">Sale</span>}
              {product.discount && <span className="product-badge discount">-{product.discount}%</span>}
              
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-btn">🤍</button>
                  <button className="action-btn">👁️</button>
                  <button className="action-btn">🛒</button>
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-colors">
                  {product.colors.map((color, index) => (
                    <span 
                      key={index} 
                      className="color-option" 
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="womens-fashion-banner">
          <div className="banner-content">
            <h2 className="banner-title">WOMEN'S <br/> FASHION</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
