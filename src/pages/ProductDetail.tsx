import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../redux/store';
import { addToFavorites, removeFromFavorites } from '../slices/favoritesSlice';
import { supabase } from '../supabaseClient';
import './ProductDetail.css';

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/f0f0f0/333?text=No+Image';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [quantity, setQuantity] = useState<number>(1);

  const product = products.find(p => p.id === Number(id));
  const isFavorite = product ? favorites.some(item => item.id === product.id) : false;

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="back-button">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    // Use a valid test uuid for user_id
    const userId = '00000000-0000-0000-0000-000000000000';
    const { error } = await supabase
      .from('cart')
      .insert([{ user_id: userId, product_id: product.id, quantity }]);
    if (error) {
      toast.error('Failed to add product to cart!');
    } else {
      toast.success('Product added to cart!');
    }
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success('Removed from favorites!');
    } else {
      dispatch(addToFavorites(product));
      toast.success('Added to favorites!');
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button" style={{marginTop: '2rem'}}>
        ← Back
      </button>
      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.image || PLACEHOLDER_IMAGE_URL}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL;
            }}
          />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-actions">
            <div className="favorite-row">
              <button
                className={`favorite-btn-icon ${isFavorite ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
              <span className="favorite-label">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </span>
            </div>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-detail">
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 