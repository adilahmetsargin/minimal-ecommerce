import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { supabase } from '../supabaseClient';
import './Products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) {
        setError('Failed to fetch products.');
        setProducts([]);
      } else {
        setProducts(data as Product[]);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = products.filter(product => {
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
          <p>Showing {filteredProducts.length} of {products.length} products</p>
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
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Products; 