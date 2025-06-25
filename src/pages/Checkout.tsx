import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { updateCartItem, removeCartItem, fetchCart } from '../slices/cartSlice';
import { supabase } from '../supabaseClient';

const Checkout: React.FC = () => {
  interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: cartItems, loading } = useSelector((state: RootState) => state.cart);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Kullanıcı id'sini Supabase'den alıp sepeti çek
  useEffect(() => {
    const fetchUserAndCart = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        dispatch(fetchCart(user.id));
      }
    };
    fetchUserAndCart();
  }, [dispatch]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const userId = cartItems.find(i => i.id === cartItemId)?.user_id;
    if (!userId) return;
    dispatch(updateCartItem({ userId, cartItemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (cartItemId: number) => {
    const userId = cartItems.find(i => i.id === cartItemId)?.user_id;
    if (!userId) return;
    dispatch(removeCartItem({ userId, cartItemId }));
  };

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItems: cartItems.map(item => ({
          title: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      }),
    });
    const { url } = await response.json();
    window.location.href = url;
  };

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="loading-message">Loading your cart...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Please add some items to your cart before proceeding to checkout.</p>
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <form className="checkout-form" onSubmit={handleStripeCheckout}>
          <div className="checkout-content">
            <div className="checkout-sections">
              {/* Shipping Info */}
              <div className="checkout-section">
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleShippingChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Cart Items Controls */}
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >-</button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >Remove</button>
                      </div>
                    </div>
                    <div className="item-price">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              {/* Payment Info (Stripe Checkout) */}
              <div className="checkout-section">
                {/* Payment handled by Stripe Checkout */}
              </div>
            </div>
            {/* Order Summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" className="place-order-btn">
                Pay with Card - ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;