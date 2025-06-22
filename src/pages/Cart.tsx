import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import './Cart.css';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleQuantityChange = (id: number, size: string, color: string, quantity: number) => {
    dispatch(updateQuantity({ id, size, color, quantity }));
  };

  const handleRemoveItem = (id: number, size: string, color: string) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

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
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                <div className="item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.product.name}</h3>
                  <p className="item-price">${item.product.price.toFixed(2)}</p>
                  <div className="item-options">
                    <span className="option">Size: {item.size}</span>
                    <span className="option">Color: {item.color}</span>
                  </div>
                </div>
                
                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  <p className="total-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item.id, item.size, item.color)}
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