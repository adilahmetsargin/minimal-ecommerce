import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import Profile from '../components/Profile';
import Orders from '../components/Orders';
import './Account.css';

type ActiveTab = 'profile' | 'orders';

const Account: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1 className="page-title">My Account</h1>
          <p className="welcome-message">Welcome back, {user?.firstName}!</p>
        </div>
        
        <div className="account-content">
          <div className="account-sidebar">
            <button 
              className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
            </button>
          </div>
          
          <div className="account-main">
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'orders' && <Orders />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 