import React, { useState } from "react";
import "./ProductPage.css";
import productImage from "../assets/headphones.png";
import { StarIcon } from "lucide-react";

const product = {
  id: "prod_12345",
  name: "AirPods Pro",
  price: 100,
  description: "A perfect balance of high-fidelity audio",
  imageUrl: productImage,
};

const ProductPage: React.FC = () => {
  const [showPaymentMessage, setShowPaymentMessage] = useState<boolean>(false);

  const handleBuyNowClick = () => {
    console.log('"Buy Now" clicked. Initiating payment flow...');
    setShowPaymentMessage(true);
    setTimeout(() => setShowPaymentMessage(false), 4000);
  };
  //const color = "#F6F6F6 #3f5cfd #FFFFFF";

  return (
    <div className="page-container">
      <div className="product-card">
        {/* MODIFICATION START: Wrap image in its own container for flexbox styling */}
        <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <h3 className="product-price">{product.price} XAF</h3>
          </div>
          <div className="product-description-container">
            <p className="product-description">{product.description}</p>
            <div className="ratings">
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <StarIcon className="star-icon" />
              <span className="rating-text">(121)</span>
            </div>

            <div className="desktop-price">{product.price} XAF</div>

            <button className="buy-now-button" onClick={handleBuyNowClick}>
              Buy Now
            </button>
          </div>

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
