import React from 'react';
import './Analytics.css';

const Analytics = () => {
  const metrics = [
    { title: 'Total Sales', value: '$124,580', change: '+12.5%', icon: '💰', color: '#27ae60' },
    { title: 'Page Views', value: '2.4M', change: '+8.2%', icon: '👁️', color: '#3498db' },
    { title: 'Conversion Rate', value: '3.24%', change: '+0.8%', icon: '📈', color: '#e67e22' },
    { title: 'Active Users', value: '12,450', change: '+15.3%', icon: '👥', color: '#9b59b6' }
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Track your business performance and insights</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon" style={{ color: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-title">{metric.title}</p>
              <span className="metric-change" style={{ color: metric.color }}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Sales Overview</h3>
          <div className="chart-placeholder">
            <p>📊 Interactive charts coming soon!</p>
          </div>
        </div>
        
        <div className="chart-card">
          <h3>Traffic Sources</h3>
          <div className="chart-placeholder">
            <p>🥧 Pie chart visualization coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
