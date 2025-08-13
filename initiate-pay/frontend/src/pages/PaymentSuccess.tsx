import React, { useEffect, useState } from "react";
import "./PaymentSuccess.css"
import checkIcon from "../assets/check.png";
import { Link } from "react-router-dom";
import { paymentService } from "../services/paymentService";

const PaymentSuccess: React.FC = () => {
  const [transaction, setTransaction] = useState({
    id: "Loading...",
    phoneNumber: "Loading...",
    date: "Loading...",
    time: "Loading...",
    amount: "Loading...",
    email: "Loading...",
  });

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        // Extract transaction ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const transactionId = urlParams.get('transId') ||
          urlParams.get('transactionId') ||
          urlParams.get('id');

        if (transactionId) {
          console.log('Fetching details for transaction:', transactionId);

          // Fetch complete transaction details from backend
          const response = await paymentService.getPaymentStatus(transactionId);

          console.log('Transaction details received:', response);

          // Format the date and time
          const dateString = response.dateConfirmed || response.dateInitiated || new Date().toISOString();
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
            id: response.transId || transactionId,
            phoneNumber: response.medium || 'Not provided',
            date: formattedDate,
            time: formattedTime,
            amount: response.amount ? `${response.amount} XAF` : 'Not provided',
            email: response.email || 'Not provided',
          });
        } else {
          // Fallback if no transaction ID in URL
          setTransaction({
            id: 'TXN_54321_ABC123XY',
            phoneNumber: '+237 676 665 670',
            date: '8/7/2025',
            time: '10:24:11 AM',
            amount: '100 XAF',
            email: 'user@example.com',
          });
        }
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        // Fallback to default values on error
        setTransaction({
          id: 'Error loading',
          phoneNumber: 'Error loading',
          date: 'Error loading',
          time: 'Error loading',
          amount: 'Error loading',
          email: 'Error loading',
        });
      }
    };

    fetchTransactionDetails();
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
            <span className="detail-label">Medium</span>
            <span className="detail-value">{transaction.phoneNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{transaction.amount}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">
              {transaction.date}, {transaction.time}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{transaction.email}</span>
          </div>
        </div>

        {/* BUTTON */}
        <Link to="/">
          <button className="done-button">Done</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;