import React from "react";
import "./PaymentSuccess.css"
import checkIcon from "../assets/check.png";

const PaymentSuccess: React.FC = () => {
  const transaction = {
    id: "TXN_54321_ABC123XY",
    phoneNumber: "+237 676 665 670",
    date: "8/7/2025",
    time: "10:24:11 AM",
  };

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        {/* SUCCESS MESSAGE */}
        <div>
          <div className="success-icon">
            <img src={checkIcon} alt="Success checkmark" />
          </div>

          <div>
            <h1 className="success-title">Payment Successful</h1>
            <p className="success-subtitle">
              Your payment has been processed successfully
            </p>
          </div>
        </div>

        {/* TRANSACTION DETAILS */}
        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value">{transaction.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">{transaction.phoneNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">
              {transaction.date}, {transaction.time}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="done-button">Done</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
