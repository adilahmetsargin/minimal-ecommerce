import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '../redux/store';
import { addToCart } from '../slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../slices/favoritesSlice';
import './ProductDetail.css';

const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400/f0f0f0/333?text=No+Image';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Black');
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

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product.id,
      product,
      size: selectedSize,
      color: selectedColor,
      quantity
    }));
    toast.success('Product added to cart!');
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
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        <div className="product-detail">
          <div className="product-image-section">
            <img 
              src={product.image || PLACEHOLDER_IMAGE_URL} 
              alt={product.name} 
              className="product-detail-image" 
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null; 
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL;
              }}
            />
          </div>
          
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-detail-title">{product.name}</h1>
              <button 
                className={`favorite-btn-detail ${isFavorite ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            
            <div className="product-options">
              <div className="option-group">
                <label>Size:</label>
                <div className="size-options">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="option-group">
                <label>Color:</label>
                <div className="color-options">
                  {['Black', 'White', 'Gray', 'Blue'].map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="option-group">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
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