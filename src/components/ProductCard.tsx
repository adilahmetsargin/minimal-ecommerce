import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { Product } from '../data/products';
import { addToFavorites, removeFromFavorites } from '../slices/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { supabase } from '../supabaseClient';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/f0f0f0/333?text=No+Image';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to add to cart!');
      return;
    }
    const userId = user.id;
    const { error } = await supabase
      .from('cart')
      .insert([{ user_id: userId, product_id: product.id, quantity: 1 }]);
    if (error) {
      toast.error('Failed to add product to cart!');
    } else {
      toast.success('Product added to cart!');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.success('Removed from favorites!');
    } else {
      dispatch(addToFavorites(product));
      toast.success('Added to favorites!');
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image-container">
          <img 
            src={product.image || PLACEHOLDER_IMAGE_URL} 
            alt={product.name} 
            className="product-image" 
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null; 
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL;
            }}
          />
          <button 
            className={`favorite-btn-icon ${isFavorite ? 'favorited' : ''}`}
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard; 