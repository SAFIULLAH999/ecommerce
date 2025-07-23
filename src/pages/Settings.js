import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const { theme, toggleTheme } = useApp();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analytics: true,
      cookieConsent: true,
      locationTracking: false
    },
    appearance: {
      theme: theme || 'light',
      language: 'French',
      currency: 'GBP (£)',
      fontSize: 'medium',
      animations: true
    },
    business: {
      storeName: 'Mantu Store',
      contactEmail: 'contact@mantu.com',
      phone: '+1 (555) 123-4567',
      address: '123 Commerce St, City, State 12345',
      website: 'https://mantu.com',
      taxId: '12-3456789'
    },
    payment: {
      defaultCurrency: 'USD',
      paymentMethods: {
        creditCard: true,
        paypal: true,
        stripe: false,
        applePay: true
      },
      autoInvoicing: true,
      taxCalculation: true
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: '30',
      passwordExpiry: '90',
      ipRestriction: false
    }
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'business', label: 'Business', icon: '🏪' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'security', label: 'Security', icon: '🛡️' }
  ];

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', settings.appearance.theme);
  }, [settings.appearance.theme]);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));

    // Special handling for theme changes
    if (category === 'appearance' && setting === 'theme') {
      toggleTheme(value);
    }
  };

  const handlePaymentMethodChange = (method, value) => {
    setSettings(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        paymentMethods: {
          ...prev.payment.paymentMethods,
          [method]: value
        }
      }
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = 'Settings saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        notifications: { email: true, push: false, sms: true },
        privacy: { profileVisible: true, dataSharing: false, analytics: true, cookieConsent: true, locationTracking: false },
        appearance: { theme: 'light', language: 'English', currency: 'USD ($)', fontSize: 'medium', animations: true },
        business: { storeName: '', contactEmail: '', phone: '', address: '', website: '', taxId: '' },
        payment: { defaultCurrency: 'USD', paymentMethods: { creditCard: true, paypal: false, stripe: false, applePay: false }, autoInvoicing: false, taxCalculation: false },
        security: { twoFactorAuth: false, loginNotifications: true, sessionTimeout: '30', passwordExpiry: '90', ipRestriction: false }
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="settings-section">
            <h3>Notification Preferences</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Email Notifications</label>
                <span>Receive updates via email</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Push Notifications</label>
                <span>Receive push notifications on your device</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>SMS Notifications</label>
                <span>Receive important updates via SMS</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="settings-section">
            <h3>Privacy Settings</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Profile Visibility</label>
                <span>Make your profile visible to other users</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.profileVisible}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Data Sharing</label>
                <span>Allow sharing of anonymized data for analytics</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.dataSharing}
                  onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Analytics Tracking</label>
                <span>Help us improve by sharing usage analytics</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.analytics}
                  onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Cookie Consent</label>
                <span>Allow cookies for better user experience</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.cookieConsent}
                  onChange={(e) => handleSettingChange('privacy', 'cookieConsent', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Location Tracking</label>
                <span>Allow location-based features and recommendations</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.locationTracking}
                  onChange={(e) => handleSettingChange('privacy', 'locationTracking', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Theme</label>
                <span>Choose your preferred theme</span>
              </div>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Language</label>
                <span>Select your preferred language</span>
              </div>
              <select
                value={settings.appearance.language}
                onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                className="setting-select"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Currency</label>
                <span>Default currency for your store</span>
              </div>
              <select
                value={settings.appearance.currency}
                onChange={(e) => handleSettingChange('appearance', 'currency', e.target.value)}
                className="setting-select"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="JPY (¥)">JPY (¥)</option>
                <option value="CAD ($)">CAD ($)</option>
                <option value="AUD ($)">AUD ($)</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Font Size</label>
                <span>Adjust the interface font size</span>
              </div>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                className="setting-select"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Animations</label>
                <span>Enable smooth animations and transitions</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.appearance.animations}
                  onChange={(e) => handleSettingChange('appearance', 'animations', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="settings-section">
            <h3>Business Information</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Store Name</label>
                <span>Your business name</span>
              </div>
              <input
                type="text"
                value={settings.business.storeName}
                onChange={(e) => handleSettingChange('business', 'storeName', e.target.value)}
                className="setting-input"
                placeholder="Enter your store name"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Contact Email</label>
                <span>Primary email for customer inquiries</span>
              </div>
              <input
                type="email"
                value={settings.business.contactEmail}
                onChange={(e) => handleSettingChange('business', 'contactEmail', e.target.value)}
                className="setting-input"
                placeholder="contact@yourstore.com"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Phone Number</label>
                <span>Contact phone number</span>
              </div>
              <input
                type="tel"
                value={settings.business.phone}
                onChange={(e) => handleSettingChange('business', 'phone', e.target.value)}
                className="setting-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Website</label>
                <span>Your business website URL</span>
              </div>
              <input
                type="url"
                value={settings.business.website}
                onChange={(e) => handleSettingChange('business', 'website', e.target.value)}
                className="setting-input"
                placeholder="https://yourstore.com"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Tax ID</label>
                <span>Business tax identification number</span>
              </div>
              <input
                type="text"
                value={settings.business.taxId}
                onChange={(e) => handleSettingChange('business', 'taxId', e.target.value)}
                className="setting-input"
                placeholder="12-3456789"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Business Address</label>
                <span>Physical store address</span>
              </div>
              <textarea
                value={settings.business.address}
                onChange={(e) => handleSettingChange('business', 'address', e.target.value)}
                className="setting-textarea"
                rows="3"
                placeholder="123 Commerce St, City, State 12345"
              />
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="settings-section">
            <h3>Payment Settings</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Default Currency</label>
                <span>Primary currency for transactions</span>
              </div>
              <select
                value={settings.payment.defaultCurrency}
                onChange={(e) => handleSettingChange('payment', 'defaultCurrency', e.target.value)}
                className="setting-select"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="CAD">CAD</option>
              </select>
            </div>

            <div className="settings-subsection">
              <h4>Payment Methods</h4>
              <div className="setting-item">
                <div className="setting-info">
                  <label>Credit/Debit Cards</label>
                  <span>Accept Visa, MasterCard, American Express</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.payment.paymentMethods.creditCard}
                    onChange={(e) => handlePaymentMethodChange('creditCard', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>PayPal</label>
                  <span>Accept payments through PayPal</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.payment.paymentMethods.paypal}
                    onChange={(e) => handlePaymentMethodChange('paypal', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Stripe</label>
                  <span>Process payments with Stripe</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.payment.paymentMethods.stripe}
                    onChange={(e) => handlePaymentMethodChange('stripe', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Apple Pay</label>
                  <span>Accept Apple Pay payments</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.payment.paymentMethods.applePay}
                    onChange={(e) => handlePaymentMethodChange('applePay', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Auto Invoicing</label>
                <span>Automatically generate invoices for orders</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.payment.autoInvoicing}
                  onChange={(e) => handleSettingChange('payment', 'autoInvoicing', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Tax Calculation</label>
                <span>Automatically calculate taxes based on location</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.payment.taxCalculation}
                  onChange={(e) => handleSettingChange('payment', 'taxCalculation', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="setting-item">
              <div className="setting-info">
                <label>Two-Factor Authentication</label>
                <span>Add an extra layer of security to your account</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Login Notifications</label>
                <span>Get notified of new login attempts</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.loginNotifications}
                  onChange={(e) => handleSettingChange('security', 'loginNotifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Session Timeout</label>
                <span>Automatically log out after inactivity (minutes)</span>
              </div>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                className="setting-select"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Password Expiry</label>
                <span>Require password change after (days)</span>
              </div>
              <select
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
                className="setting-select"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">6 months</option>
                <option value="0">Never</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>IP Restriction</label>
                <span>Restrict access to specific IP addresses</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.ipRestriction}
                  onChange={(e) => handleSettingChange('security', 'ipRestriction', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and store preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-navigation">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </div>
          ))}
        </div>

        <div className="settings-content">
          {renderTabContent()}

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSaveSettings}>
              💾 Save Changes
            </button>
            <button className="reset-btn" onClick={handleResetSettings}>
              🔄 Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
