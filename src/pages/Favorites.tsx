import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { removeFromFavorites } from '../slices/favoritesSlice';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromFavorites = (productId: number) => {
    dispatch(removeFromFavorites(productId));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <h1 className="page-title">My Favorites</h1>
          <div className="empty-favorites">
            <h2>No favorites yet</h2>
            <p>Start adding products to your favorites to see them here.</p>
            <button onClick={() => navigate('/products')} className="browse-products">
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <h1 className="page-title">My Favorites</h1>
        <p className="favorites-count">You have {favorites.length} favorite product{favorites.length !== 1 ? 's' : ''}</p>
        
        <div className="favorites-grid">
          {favorites.map(product => (
            <div key={product.id} className="favorite-item">
              <ProductCard product={product} />
              <button 
                onClick={() => handleRemoveFromFavorites(product.id)}
                className="remove-favorite-btn"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites; 