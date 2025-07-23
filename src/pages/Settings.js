import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    privacy: {
      profileVisible: true,
      dataSharing: false,
      analytics: true
    },
    appearance: {
      theme: 'light',
      language: 'en',
      currency: 'USD'
    },
    business: {
      storeName: 'Mantu Store',
      contactEmail: 'contact@mantu.com',
      phone: '+1 (555) 123-4567',
      address: '123 Commerce St, City, State 12345'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would save settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and store preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-navigation">
          <div className="nav-item active">
            <span className="nav-icon">🔔</span>
            Notifications
          </div>
          <div className="nav-item">
            <span className="nav-icon">🔒</span>
            Privacy
          </div>
          <div className="nav-item">
            <span className="nav-icon">🎨</span>
            Appearance
          </div>
          <div className="nav-item">
            <span className="nav-icon">🏪</span>
            Business
          </div>
          <div className="nav-item">
            <span className="nav-icon">💳</span>
            Payment
          </div>
          <div className="nav-item">
            <span className="nav-icon">🛡️</span>
            Security
          </div>
        </div>

        <div className="settings-content">
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
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
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
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSaveSettings}>
              💾 Save Changes
            </button>
            <button className="reset-btn">
              🔄 Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
