import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductCard.css'; // Reuse the same card structure

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card">
      <Skeleton height={300} style={{ display: 'block' }} />
      <div className="product-info">
        <Skeleton height={24} style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={28} width="50%" />
      </div>
      <div style={{ padding: '0 1rem 1rem 1rem' }}>
        <Skeleton height={45} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton; 