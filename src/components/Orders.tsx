import React from 'react';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-12345',
    date: '2024-05-20',
    total: 114.98,
    status: 'Delivered',
    items: [
      { name: 'Classic Cotton Tee', quantity: 1 },
      { name: 'Slim-Fit Denim Jeans', quantity: 1 },
    ],
  },
  {
    id: 'ORD-12346',
    date: '2024-05-15',
    total: 45.00,
    status: 'Processing',
    items: [
      { name: 'Linen-Blend Shirt', quantity: 1 },
    ],
  },
  {
    id: 'ORD-12347',
    date: '2024-04-28',
    total: 199.99,
    status: 'Cancelled',
    items: [
      { name: 'Wool Blend Overcoat', quantity: 1 },
    ],
  },
];

const Orders: React.FC = () => {
  return (
    <div className="orders-section">
      <h2>My Orders</h2>
      <p>View your past orders and their status.</p>
      
      <div className="order-list">
        {mockOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <h3>Order #{order.id}</h3>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-card-body">
              <div className="order-details">
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              </div>
              <div className="order-items-summary">
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 