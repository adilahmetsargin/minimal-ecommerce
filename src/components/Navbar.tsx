import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store'
import { logout } from '../slices/authSlice'

const Navbar: React.FC = () => {
  // Cart count from Redux
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Minimal Store
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" className="nav-link">My Account</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 