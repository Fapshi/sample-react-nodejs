import React, { useEffect, useState } from "react";
import "./PaymentSuccess.css"
import checkIcon from "../assets/check.png";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const [transaction, setTransaction] = useState({
    id: "Loading...",
    phoneNumber: "Loading...",
    date: "Loading...",
    time: "Loading...",
  });

  useEffect(() => {
    // Extract transaction details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get transaction ID (Fapshi might send it as transId, transactionId, or id)
    const transactionId = urlParams.get('transId') ||
      urlParams.get('transactionId') ||
      urlParams.get('id') ||
      'TXN_54321_ABC123XY'; // fallback

    // Get phone number (Fapshi might send it as phone, phoneNumber, or medium)
    const phoneNumber = urlParams.get('phone') ||
      urlParams.get('phoneNumber') ||
      urlParams.get('medium') ||
      '+237 676 665 670'; // fallback

    // Get date (Fapshi might send it as date, dateConfirmed, or dateInitiated)
    const dateString = urlParams.get('date') ||
      urlParams.get('dateConfirmed') ||
      urlParams.get('dateInitiated') ||
      new Date().toISOString();

    // Format the date and time
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    setTransaction({
      id: transactionId,
      phoneNumber: phoneNumber,
      date: formattedDate,
      time: formattedTime,
    });
  }, []);

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
        <Link to="/">   <button className="done-button">Done</button> </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
