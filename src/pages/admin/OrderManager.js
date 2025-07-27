import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './OrderManager.css';

const OrderManager = () => {
  const { orders, loading } = useAdmin();
  const [localOrders, setLocalOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock orders data for demo
    const mockOrders = [
      {
        id: 1,
        orderNumber: 'ORD-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        total: 129.99,
        status: 'pending',
        items: 3,
        createdAt: new Date('2024-01-15'),
        shippingAddress: '123 Main St, City, State 12345'
      },
      {
        id: 2,
        orderNumber: 'ORD-002',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        total: 89.50,
        status: 'completed',
        items: 2,
        createdAt: new Date('2024-01-14'),
        shippingAddress: '456 Oak Ave, City, State 67890'
      },
      {
        id: 3,
        orderNumber: 'ORD-003',
        customerName: 'Bob Johnson',
        customerEmail: 'bob@example.com',
        total: 245.00,
        status: 'processing',
        items: 5,
        createdAt: new Date('2024-01-13'),
        shippingAddress: '789 Pine St, City, State 54321'
      }
    ];
    setLocalOrders(mockOrders);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update local state immediately
      setLocalOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );

      // In a real app, you'd make an API call here
      console.log(`Order ${orderId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const filteredOrders = localOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'processing': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-manager">
      <div className="order-manager-header">
        <h2>Order Management</h2>
        <div className="order-stats">
          <span className="stat">Total: {localOrders.length}</span>
          <span className="stat">Pending: {localOrders.filter(o => o.status === 'pending').length}</span>
          <span className="stat">Processing: {localOrders.filter(o => o.status === 'processing').length}</span>
        </div>
      </div>

      <div className="order-filters">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="order-number">{order.orderNumber}</td>
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{order.customerName}</div>
                    <div className="customer-email">{order.customerEmail}</div>
                  </div>
                </td>
                <td>{order.items}</td>
                <td className="order-total">${order.total}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-select"
                    style={{ color: getStatusColor(order.status) }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{order.createdAt.toLocaleDateString()}</td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => console.log('View order:', order.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <p>No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManager;