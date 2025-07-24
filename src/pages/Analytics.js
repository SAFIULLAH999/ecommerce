import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  // const [activeMetric, setActiveMetric] = useState('overview');

  const metrics = {
    overview: {
      pageViews: 142534,
      uniqueVisitors: 45672,
      bounceRate: 34.2,
      avgSessionTime: '3:42',
      conversionRate: 2.8
    },
    traffic: {
      organic: 45,
      direct: 28,
      social: 15,
      referral: 12
    },
    demographics: {
      mobile: 68,
      desktop: 25,
      tablet: 7
    }
  };

  const topPages = [
    { page: '/products', views: 25430, percentage: 18.5 },
    { page: '/home', views: 18762, percentage: 13.2 },
    { page: '/categories', views: 12845, percentage: 9.1 },
    { page: '/blogs', views: 8932, percentage: 6.3 }
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>📈 Analytics Dashboard</h1>
        <div className="header-controls">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="date-selector"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Overview Metrics */}
        <div className="metrics-section">
          <h3>Key Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">👁️</div>
              <div className="metric-data">
                <h4>{metrics.overview.pageViews.toLocaleString()}</h4>
                <p>Page Views</p>
                <span className="metric-change positive">+12.5%</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">👤</div>
              <div className="metric-data">
                <h4>{metrics.overview.uniqueVisitors.toLocaleString()}</h4>
                <p>Unique Visitors</p>
                <span className="metric-change positive">+8.3%</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">⏰</div>
              <div className="metric-data">
                <h4>{metrics.overview.avgSessionTime}</h4>
                <p>Avg Session Time</p>
                <span className="metric-change negative">-5.2%</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">📊</div>
              <div className="metric-data">
                <h4>{metrics.overview.bounceRate}%</h4>
                <p>Bounce Rate</p>
                <span className="metric-change positive">-2.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="chart-section">
          <h3>Traffic Sources</h3>
          <div className="traffic-sources">
            <div className="source-item">
              <div className="source-info">
                <span className="source-label">🔍 Organic Search</span>
                <span className="source-percentage">{metrics.traffic.organic}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${metrics.traffic.organic}%`}}></div>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-info">
                <span className="source-label">🌐 Direct</span>
                <span className="source-percentage">{metrics.traffic.direct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${metrics.traffic.direct}%`}}></div>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-info">
                <span className="source-label">📱 Social Media</span>
                <span className="source-percentage">{metrics.traffic.social}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${metrics.traffic.social}%`}}></div>
              </div>
            </div>
            
            <div className="source-item">
              <div className="source-info">
                <span className="source-label">🔗 Referral</span>
                <span className="source-percentage">{metrics.traffic.referral}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${metrics.traffic.referral}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Analytics */}
        <div className="chart-section">
          <h3>Device Usage</h3>
          <div className="device-stats">
            <div className="device-item">
              <div className="device-icon">📱</div>
              <div className="device-info">
                <h4>Mobile</h4>
                <p>{metrics.demographics.mobile}%</p>
              </div>
            </div>
            
            <div className="device-item">
              <div className="device-icon">💻</div>
              <div className="device-info">
                <h4>Desktop</h4>
                <p>{metrics.demographics.desktop}%</p>
              </div>
            </div>
            
            <div className="device-item">
              <div className="device-icon">📟</div>
              <div className="device-info">
                <h4>Tablet</h4>
                <p>{metrics.demographics.tablet}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="pages-section">
          <h3>Top Pages</h3>
          <div className="pages-list">
            {topPages.map((page, index) => (
              <div key={index} className="page-item">
                <div className="page-info">
                  <span className="page-url">{page.page}</span>
                  <span className="page-views">{page.views.toLocaleString()} views</span>
                </div>
                <span className="page-percentage">{page.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="funnel-section">
          <h3>Conversion Funnel</h3>
          <div className="funnel-steps">
            <div className="funnel-step">
              <div className="step-bar" style={{width: '100%'}}>
                <span>Visitors: 45,672</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="step-bar" style={{width: '75%'}}>
                <span>Product Views: 34,254</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="step-bar" style={{width: '35%'}}>
                <span>Add to Cart: 15,985</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="step-bar" style={{width: '12%'}}>
                <span>Purchases: 5,482</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="realtime-section">
          <h3>Real-time Activity</h3>
          <div className="realtime-stats">
            <div className="realtime-stat">
              <div className="stat-value">127</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="realtime-stat">
              <div className="stat-value">23</div>
              <div className="stat-label">Page Views (last min)</div>
            </div>
            <div className="realtime-stat">
              <div className="stat-value">5</div>
              <div className="stat-label">Active Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
