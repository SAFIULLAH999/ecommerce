import React, { useState } from 'react';
import './Products.css';
import { useApp } from '../context/AppContext';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useApp();

  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 199.99, image: '🎧', rating: 4.5, stock: 15 },
    { id: 2, name: 'Gaming Chair', category: 'furniture', price: 299.99, image: '🪑', rating: 4.8, stock: 8 },
    { id: 3, name: 'Smart Watch', category: 'electronics', price: 249.99, image: '⌚', rating: 4.3, stock: 22 },
    { id: 4, name: 'Coffee Maker', category: 'appliances', price: 129.99, image: '☕', rating: 4.6, stock: 12 },
    { id: 5, name: 'Laptop Stand', category: 'accessories', price: 59.99, image: '💻', rating: 4.4, stock: 30 },
    { id: 6, name: 'Desk Lamp', category: 'furniture', price: 79.99, image: '💡', rating: 4.2, stock: 18 },
    { id: 7, name: 'Bluetooth Speaker', category: 'electronics', price: 89.99, image: '🔊', rating: 4.7, stock: 25 },
    { id: 8, name: 'Plant Pot', category: 'home', price: 24.99, image: '🪴', rating: 4.1, stock: 45 }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'home', label: 'Home & Garden' }
  ];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage your product inventory</p>
      </div>

      <div className="products-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <button className="add-product-btn">
          ➕ Add Product
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span className="product-emoji">{product.image}</span>
              <div className="product-actions">
                <button className="action-btn edit">✏️</button>
                <button className="action-btn delete">🗑️</button>
              </div>
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-category">{product.category}</div>
              
              <div className="product-rating">
                <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-value">({product.rating})</span>
              </div>
              
              <div className="product-price">${product.price}</div>
              
              <div className="product-stock">
                <span className={`stock-indicator ${product.stock < 10 ? 'low' : 'good'}`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
            
            <div className="product-card-actions">
              <button className="view-btn">View Details</button>
              <button className="edit-btn">Quick Edit</button>
              <button className="add-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <span className="no-products-icon">📦</span>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Products;
