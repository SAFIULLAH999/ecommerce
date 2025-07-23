import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: '👨‍💼', joinDate: '2024-01-15', orders: 25 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active', avatar: '👩‍💻', joinDate: '2024-01-20', orders: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', status: 'Active', avatar: '👨‍💼', joinDate: '2024-01-10', orders: 45 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Customer', status: 'Inactive', avatar: '👩‍🎨', joinDate: '2024-01-25', orders: 3 },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Customer', status: 'Active', avatar: '👨‍🔧', joinDate: '2024-01-18', orders: 12 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRole === 'all' || user.role === selectedRole)
  );

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users Management</h1>
        <p>Manage user accounts and permissions</p>
      </div>

      <div className="users-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <button className="add-user-btn">
          ➕ Add User
        </button>
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-status">
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </div>
            </div>
            
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <div className="user-role">
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </div>
            </div>
            
            <div className="user-stats">
              <div className="stat">
                <span className="stat-value">{user.orders}</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat">
                <span className="stat-value">{new Date(user.joinDate).toLocaleDateString()}</span>
                <span className="stat-label">Joined</span>
              </div>
            </div>
            
            <div className="user-actions">
              <button className="action-btn view">👁️</button>
              <button className="action-btn edit">✏️</button>
              <button className="action-btn delete">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
