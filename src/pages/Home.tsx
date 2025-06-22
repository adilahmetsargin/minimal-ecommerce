import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { supabase } from '../supabaseClient'
import './Home.css'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)
      if (error) {
        setError('Failed to fetch products.')
        setProducts([])
      } else {
        setProducts(data as Product[])
      }
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1 className="hero-title">Discover Minimal Style</h1>
          <p className="hero-subtitle">Quality products for modern living</p>
          <button className="cta-button" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>
      </section>
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="product-grid">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Home 