import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', icon: '📱', productCount: 156, description: 'Latest tech gadgets and devices', color: '#667eea' },
    { id: 2, name: 'Fashion', icon: '👗', productCount: 243, description: 'Trendy clothing and accessories', color: '#f093fb' },
    { id: 3, name: 'Home & Garden', icon: '🏠', productCount: 89, description: 'Everything for your home', color: '#4facfe' },
    { id: 4, name: 'Sports', icon: '⚽', productCount: 67, description: 'Sports equipment and gear', color: '#43e97b' },
    { id: 5, name: 'Books', icon: '📚', productCount: 134, description: 'Books and educational materials', color: '#fa709a' },
    { id: 6, name: 'Toys', icon: '🧸', productCount: 78, description: 'Fun toys for all ages', color: '#fee140' },
    { id: 7, name: 'Beauty', icon: '💄', productCount: 92, description: 'Beauty and personal care', color: '#a8edea' },
    { id: 8, name: 'Automotive', icon: '🚗', productCount: 45, description: 'Car parts and accessories', color: '#d299c2' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', description: '', color: '#667eea' });

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name && newCategory.icon && newCategory.description) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories([...categories, {
        ...newCategory,
        id: newId,
        productCount: 0
      }]);
      setNewCategory({ name: '', icon: '', description: '', color: '#667eea' });
      setShowAddForm(false);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Organize your products into categories</p>
      </div>

      <div className="categories-controls">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Total Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.reduce((sum, cat) => sum + cat.productCount, 0)}</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>

        <button 
          className="add-category-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Category
        </button>
      </div>

      {showAddForm && (
        <div className="add-category-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Category</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddCategory} className="category-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Enter category name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Icon (Emoji)</label>
                <input
                  type="text"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  placeholder="🛍️"
                  maxLength="2"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Brief description of the category"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Color</label>
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            style={{ '--category-color': category.color }}
          >
            <div className="category-header">
              <div className="category-icon-wrapper">
                <span className="category-icon">{category.icon}</span>
              </div>
              
              <div className="category-actions">
                <button className="action-btn edit" title="Edit">
                  ✏️
                </button>
                <button 
                  className="action-btn delete" 
                  title="Delete"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="category-info">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              
              <div className="category-stats">
                <div className="product-count">
                  <span className="count-number">{category.productCount}</span>
                  <span className="count-label">Products</span>
                </div>
              </div>
            </div>
            
            <div className="category-footer">
              <button className="view-products-btn">
                View Products
              </button>
              <button className="manage-btn">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
