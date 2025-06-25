import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchCart, updateCartItem, removeCartItem, localUpdateQuantity, localRemoveItem } from '../slices/cartSlice';
import { supabase } from '../supabaseClient';
import './Cart.css';

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/f0f0f0/333?text=No+Image';

const Cart: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, loading: isLoading, error } = useSelector((state: RootState) => state.cart);

  // Fetch user id from Supabase Auth
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    fetchUserId();
  }, []);

  // Fetch cart from Supabase when userId is available
  useEffect(() => {
    if (!userId) return;
    dispatch(fetchCart(userId));
  }, [userId, dispatch]);

  // Handle quantity change for cart items
  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    if (!userId) return;
    if (newQuantity <= 0) {
      dispatch(localRemoveItem(cartItemId));
      dispatch(removeCartItem({ userId, cartItemId }));
      return;
    }
    dispatch(localUpdateQuantity({ cartItemId, quantity: newQuantity }));
    dispatch(updateCartItem({ userId, cartItemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (cartItemId: number) => {
    if (!userId) return;
    dispatch(localRemoveItem(cartItemId));
    dispatch(removeCartItem({ userId, cartItemId }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (isLoading || userId === null) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.product.image || PLACEHOLDER_IMAGE_URL}
                    alt={item.product.name}
                    className="product-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL;
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.product.name}</h3>
                  <p className="item-price">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleQuantityChange(item.id, item.quantity - 1); }}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleQuantityChange(item.id, item.quantity + 1); }}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p className="total-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleRemoveItem(item.id); }}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Items ({totalItems}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;