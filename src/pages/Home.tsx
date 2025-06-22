import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../redux/store'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import './Home.css'

const Home: React.FC = () => {
  const featuredProducts = useSelector((state: RootState) => state.products.items.slice(0, 4))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to Minimal Store
            </h1>
            <p className="hero-subtitle">
              Discover quality products designed for modern living
            </p>
            <button className="cta-button" onClick={() => navigate('/products')}>
              Shop Now
            </button>
          </div>
        </div>
      </section>
      
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
              : featuredProducts.map(product => (
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