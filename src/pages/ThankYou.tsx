import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-icon">✓</div>
          <h1 className="thank-you-title">Thank You!</h1>
          <p className="thank-you-message">
            Your order has been successfully placed. We've sent a confirmation email with your order details.
          </p>
          
          <div className="order-info">
            <h2>What's Next?</h2>
            <div className="next-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Order Confirmation</h3>
                  <p>You'll receive an email confirmation with your order details within the next few minutes.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Order Processing</h3>
                  <p>We'll start processing your order and prepare it for shipping within 1-2 business days.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Shipping</h3>
                  <p>You'll receive a shipping confirmation with tracking information once your order ships.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
            <button onClick={() => navigate('/')} className="back-home">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 