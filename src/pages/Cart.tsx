import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Cart.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  product: Product;
}

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/f0f0f0/333?text=No+Image';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get user_id from Supabase Auth (or use a placeholder for testing)
  // Replace this with your actual auth logic
  const user = supabase.auth.getUser ? supabase.auth.getUser() : null;
  // @ts-ignore
  const userId = user?.id || '00000000-0000-0000-0000-000000000000';

  // Fetch cart items from Supabase
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('cart')
        .select('*, product:product_id(*)')
        .eq('user_id', userId);
      if (error) {
        setError('Failed to fetch cart items.');
        setCartItems([]);
      } else {
        setCartItems(data as CartItem[]);
      }
      setIsLoading(false);
    };
    fetchCart();
  }, [userId]);

  // Update quantity in Supabase
  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(cartItemId);
      return;
    }
    // Optimistic update
    setCartItems(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQuantity } : item));
    const { error } = await supabase
      .from('cart')
      .update({ quantity: newQuantity })
      .eq('id', cartItemId);
    if (error) {
      setError('Failed to update quantity.');
      // Optionally revert state here
    }
    // isLoading kullanılmıyor!
  };

  // Remove item from Supabase
  const handleRemoveItem = async (cartItemId: number) => {
    // Optimistic update: remove item from state immediately
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId);
    if (error) {
      setError('Failed to remove item.');
      // Optionally, revert state here if needed
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (isLoading) {
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
        <button type="button" onClick={() => alert('clicked!')}>Test Button</button>
      </div>
    </div>
  );
};

export default Cart; 