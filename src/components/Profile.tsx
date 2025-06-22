import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../redux/store';
import { loginSuccess } from '../slices/authSlice'; // Re-use loginSuccess to update user info
import type { User } from '../slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would dispatch an action to update user info via an API.
    // Here, we just update the local Redux state.
    const updatedUser: User = {
      id: user!.id,
      ...formData,
    };
    
    dispatch(loginSuccess(updatedUser));
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      <p>Manage your personal information.</p>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled // Usually, email is not changed easily
          />
        </div>
        
        <button type="submit" className="update-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile; 