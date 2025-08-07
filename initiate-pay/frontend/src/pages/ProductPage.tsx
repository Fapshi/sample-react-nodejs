import React, { useState } from 'react';
import './ProductPage.css';
import productImage from '../assets/image.png';



const product = {
  id: 'prod_12345',
  name: 'Sun Glasses',
  price: 2000,
  description: 'Nice glasses for sunny days',
  imageUrl: productImage,
};


const ProductPage: React.FC = () => {
  const [showPaymentMessage, setShowPaymentMessage] = useState<boolean>(false);

  const handleBuyNowClick = () => {
    console.log('"Buy Now" clicked. Initiating payment flow...');
    setShowPaymentMessage(true);
    setTimeout(() => setShowPaymentMessage(false), 4000);
  };

  return (
    <div className="page-container">
      <div className="product-card">
        {/* MODIFICATION START: Wrap image in its own container for flexbox styling */}
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        {/* MODIFICATION END */}

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">
            {product.price} XAF
          </p>
          <p className="product-description">{product.description}</p>

          <button className="buy-now-button" onClick={handleBuyNowClick}>
            Buy Now
          </button>

          {showPaymentMessage && (
            <div className="payment-message">
              Redirecting to payment... (Backend not implemented yet)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;