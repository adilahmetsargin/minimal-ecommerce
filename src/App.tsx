import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import Account from './pages/Account'

function App() {
  return (
    <Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#4CAF50',
            },
          },
          error: {
            style: {
              background: '#f44336',
              color: 'white',
            },
             iconTheme: {
              primary: 'white',
              secondary: '#f44336',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Layout>
  )
}

export default App
