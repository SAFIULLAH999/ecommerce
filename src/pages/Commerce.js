import React, { useState } from 'react';
import './Commerce.css';

const Commerce = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [salesData] = useState({
    totalSales: 48234,
    monthlyGrowth: 12.5,
    orderCount: 1256,
    avgOrderValue: 38.4
  });

  const [recentOrders] = useState([
    { id: '#12345', customer: 'John Smith', amount: 89.99, status: 'Completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Sarah Johnson', amount: 156.50, status: 'Processing', date: '2024-01-15' },
    { id: '#12347', customer: 'Mike Brown', amount: 45.00, status: 'Shipped', date: '2024-01-14' },
    { id: '#12348', customer: 'Lisa Wilson', amount: 78.25, status: 'Pending', date: '2024-01-14' }
  ]);

  const [topProducts] = useState([
    { name: 'Premium Headphones', sales: 234, revenue: 18720, image: '🎧' },
    { name: 'Smart Watch Pro', sales: 189, revenue: 37800, image: '⌚' },
    { name: 'Wireless Speaker', sales: 156, revenue: 12480, image: '🔊' },
    { name: 'Gaming Mouse', sales: 145, revenue: 8700, image: '🖱️' }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>${salesData.totalSales.toLocaleString()}</h3>
                  <p>Total Sales</p>
                  <span className="growth positive">+{salesData.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>{salesData.orderCount}</h3>
                  <p>Total Orders</p>
                  <span className="growth positive">+8.2%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💳</div>
                <div className="stat-info">
                  <h3>${salesData.avgOrderValue}</h3>
                  <p>Avg Order Value</p>
                  <span className="growth negative">-2.1%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>2,543</h3>
                  <p>Active Customers</p>
                  <span className="growth positive">+15.3%</span>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Recent Orders</h3>
                <div className="orders-list">
                  {recentOrders.map(order => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <span className="order-id">{order.id}</span>
                        <span className="customer-name">{order.customer}</span>
                      </div>
                      <div className="order-details">
                        <span className="amount">${order.amount}</span>
                        <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-card">
                <h3>Top Products</h3>
                <div className="products-list">
                  {topProducts.map((product, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <span className="product-icon">{product.image}</span>
                        <div>
                          <span className="product-name">{product.name}</span>
                          <span className="product-sales">{product.sales} sold</span>
                        </div>
                      </div>
                      <span className="product-revenue">${product.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="orders-content">
            <div className="orders-header">
              <h3>Order Management</h3>
              <button className="add-btn">+ New Order</button>
            </div>
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Date</span>
                <span>Actions</span>
              </div>
              {recentOrders.map(order => (
                <div key={order.id} className="table-row">
                  <span className="order-id">{order.id}</span>
                  <span>{order.customer}</span>
                  <span>${order.amount}</span>
                  <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  <span>{order.date}</span>
                  <div className="actions">
                    <button className="view-btn">👁️</button>
                    <button className="edit-btn">✏️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="products-content">
            <div className="products-header">
              <h3>Product Management</h3>
              <button className="add-btn">+ Add Product</button>
            </div>
            <div className="products-grid">
              {topProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p>{product.sales} sold</p>
                    <p className="revenue">${product.revenue.toLocaleString()}</p>
                  </div>
                  <div className="product-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="customers-content">
            <div className="customers-header">
              <h3>Customer Management</h3>
              <button className="add-btn">+ Add Customer</button>
            </div>
            <div className="customers-stats">
              <div className="customer-stat">
                <h4>2,543</h4>
                <p>Total Customers</p>
              </div>
              <div className="customer-stat">
                <h4>1,876</h4>
                <p>Active This Month</p>
              </div>
              <div className="customer-stat">
                <h4>$42.50</h4>
                <p>Avg Lifetime Value</p>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="analytics-content">
            <div className="analytics-header">
              <h3>Sales Analytics</h3>
              <select className="period-select">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="analytics-charts">
              <div className="chart-placeholder">
                <h4>Sales Trend</h4>
                <p>📈 Sales have increased by 12.5% this month</p>
              </div>
              <div className="chart-placeholder">
                <h4>Product Performance</h4>
                <p>🎯 Top category: Electronics (45% of sales)</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="commerce-page">
      <div className="page-header">
        <h1>🛒 Commerce Dashboard</h1>
        <p>Manage your e-commerce operations</p>
      </div>

      <div className="commerce-container">
        <div className="commerce-navigation">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </div>
          ))}
        </div>

        <div className="commerce-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Commerce;
