import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard overview</p>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>$45,632</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>1,248</h3>
              <p>Total Users</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">����</div>
            <div className="stat-info">
              <h3>325</h3>
              <p>Orders</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>89</h3>
              <p>Products</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-charts">
          <div className="chart-card">
            <h3>Sales Overview</h3>
            <div className="chart-placeholder">
              <p>📊 Chart visualization would go here</p>
            </div>
          </div>
          
          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <div className="orders-list">
              <div className="order-item">
                <span>#ORD-001</span>
                <span>$129.99</span>
                <span className="status pending">Pending</span>
              </div>
              <div className="order-item">
                <span>#ORD-002</span>
                <span>$89.50</span>
                <span className="status completed">Completed</span>
              </div>
              <div className="order-item">
                <span>#ORD-003</span>
                <span>$245.00</span>
                <span className="status processing">Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
