import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import './Products.css';

const Products: React.FC = () => {
  const allProducts = useSelector((state: RootState) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', ...new Set(allProducts.map(product => product.category))];
  
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">All Products</h1>
        
        <div className="filters">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <label htmlFor="category">Filter by Category:</label>
            <select 
              id="category"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="results-info">
          <p>Showing {filteredProducts.length} of {allProducts.length} products</p>
        </div>

        <div className="product-grid">
          {isLoading 
            ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
        
        {!isLoading && filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 