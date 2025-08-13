import React, { useState } from "react";
import "./ProductPage.css";
import productImage from "../assets/headphones.png";
import { StarIcon } from "lucide-react";
import { paymentService } from "../services/paymentService";

const product = {
  id: "prod_12345",
  name: "AirPods Pro",
  price: 100,
  description: "A perfect balance of high-fidelity audio",
  imageUrl: productImage,
};

const ProductPage: React.FC = () => {
  const [showPaymentMessage, setShowPaymentMessage] = useState<boolean>(false);
  const [paymentMessage, setPaymentMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBuyNowClick = async () => {
    setIsLoading(true);
    setShowPaymentMessage(false);

    try {
      console.log('Initiating payment for:', product.name, 'Amount:', product.price);

      const paymentData = {
        amount: product.price,
        externalId: product.id,
        message: `Payment for ${product.name}`,
        redirectUrl: 'http://localhost:5173/payment-success' // Replace with actual success page URL
      };

      const response = await paymentService.initiatePayment(paymentData);

      console.log('Payment initiated successfully:', response);

      // Check if there's a payment link to redirect to
      const paymentLink = response.link || response.paymentLink;

      if (paymentLink) {
        console.log('Redirecting to payment link:', paymentLink);

        // Keep loading state active and redirect immediately
        // Don't set isLoading to false since we're redirecting
        window.location.href = paymentLink;
        return; // Exit early to avoid setting isLoading to false
      } else {
        // Fallback if no payment link is provided
        setPaymentMessage(`Payment initiated! Transaction ID: ${response.transId}`);
        setShowPaymentMessage(true);
        setTimeout(() => setShowPaymentMessage(false), 6000);
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentMessage(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowPaymentMessage(true);

      // Hide error message after 4 seconds
      setTimeout(() => setShowPaymentMessage(false), 4000);
      setIsLoading(false);
    }
  };

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

            <button
              className="buy-now-button"
              onClick={handleBuyNowClick}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          {showPaymentMessage && (
            <div className={`payment-message ${paymentMessage.includes('failed') ? 'error' : 'success'}`}>
              {paymentMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
