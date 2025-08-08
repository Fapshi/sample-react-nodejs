import React, { useState } from "react";
import "./Payment.css";

interface Transaction {
  id: string;
  name: string;
  phoneNumber: string;
  status: "successful" | "unsuccessful";
}

const Payment: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "receipt">("home");
  const [pageTransition, setPageTransition] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  // Operator detection function
  const getOperatorFromNumber = (phone: string): string | null => {
    const cleanNumber = phone.replace(/\s+/g, "").replace(/^\+237/, "");

    if (/^(67|68|65|69)/.test(cleanNumber)) {
      return "MTN";
    }

    if (/^(69|65)/.test(cleanNumber)) {
      return "Orange";
    }

    return null;
  };

  // Validation function
  const validateTransaction = (
    name: string,
    email: string,
    phone: string
  ): { isValid: boolean; reason?: string } => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      return { isValid: false, reason: "Please enter your name" };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, reason: "Please enter a valid email address" };
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return { isValid: false, reason: "Please enter a valid phone number" };
    }

    return { isValid: true };
  };

  const getButtonText = (): string => {
    const operator = getOperatorFromNumber(phoneNumber);
    if (operator === "MTN") return "Pay with MTN momo";
    if (operator === "Orange") return "Pay with Orange Money";
    return "Pay";
  };

  const isButtonClickable = (): boolean => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      getOperatorFromNumber(phoneNumber) !== null
    );
  };

  const handlePay = () => {
    const validation = validateTransaction(name, email, phoneNumber);

    const newTransaction: Transaction = {
      id: `TXN_${Math.floor(Math.random() * 100000)}_${Math.random()
        .toString(36)
        .substr(2, 8)
        .toUpperCase()}`,
      name: name,
      phoneNumber: phoneNumber,
      status: validation.isValid ? "successful" : "unsuccessful",
    };

    setCurrentTransaction(newTransaction);
    setPageTransition("slide-left-to-right");
    setTimeout(() => {
      setCurrentPage("receipt");
      setTimeout(() => setPageTransition(""), 50);
    }, 50);
  };

  const handleDone = () => {
    // Reset form
    setName("");
    setEmail("");
    setPhoneNumber("");
    setCurrentTransaction(null);

    // Dissolve transition to home
    setPageTransition("dissolve");
    setTimeout(() => {
      setCurrentPage("home");
      setTimeout(() => setPageTransition(""), 50);
    }, 300);
  };

  const getFailureReason = (): string => {
    if (currentTransaction) {
      const validation = validateTransaction(
        currentTransaction.name,
        email,
        currentTransaction.phoneNumber
      );
      return validation.reason || "Transaction failed";
    }
    return "Please check your details and try again";
  };

  // Animation styles
  const getPageClass = () => {
    let baseClass = "page";

    switch (pageTransition) {
      case "slide-left-to-right":
        return `${baseClass} slide-left-to-right`;
      case "dissolve":
        return `${baseClass} dissolve`;
      default:
        return baseClass;
    }
  };

  // Home Page (Direct Pay)
  if (currentPage === "home") {
    return (
      <div className={getPageClass()}>
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="logo-container">
              <div className="logo-icon"></div>
              <a href="https://fapshi.com" className="logo-text">
                Fapshi
              </a>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="main-card">
            {/* Form */}
            <div className="form-section">
              {/* Name Input */}
              <div className="input-group">
                <label className="input-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter a valid email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone Number Input */}
              <div className="input-group">
                <label className="input-label">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter your whatsapp number"
                  className="input-field"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={!isButtonClickable()}
                className={`pay-button ${
                  isButtonClickable()
                    ? "pay-button-active"
                    : "pay-button-disabled"
                }`}
              >
                <span>{getButtonText()}</span>
              </button>
            </div>

            {/* Direct Pay Card */}
            <div className="direct-pay-card">
              <div className="direct-pay-content">
                <div className="direct-pay-text">
                  <h3 className="direct-pay-title">Direct Pay</h3>
                  <p className="direct-pay-subtitle">
                    Fill your information for a smooth transaction
                  </p>
                </div>
                <div className="direct-pay-icon">🛒</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Receipt Page
  if (currentPage === "receipt" && currentTransaction) {
    const isSuccessful = currentTransaction.status === "successful";

    return (
      <div className={getPageClass()}>
        <div className="container">
          {/* Header */}
          <div className="header">
            <button onClick={handleDone} className="back-button">
              ←
            </button>
            <h1 className="page-title">Transfer Receipt</h1>
          </div>

          {/* Receipt Card */}
          <div className="receipt-card">
            <div className="receipt-content">
              {/* Status Icon */}
              <div
                className={`status-icon ${
                  isSuccessful ? "status-success" : "status-error"
                }`}
              >
                {isSuccessful ? "✓" : "✗"}
              </div>

              {/* Status Text */}
              <h2
                className={`status-title ${
                  isSuccessful ? "status-title-success" : "status-title-error"
                }`}
              >
                Payment {isSuccessful ? "Successful" : "Unsuccessful"}
              </h2>

              <p className="status-message">
                {isSuccessful
                  ? "Your payment has been processed successfully"
                  : getFailureReason()}
              </p>

              {/* Transaction Details */}
              <div className="transaction-details">
                <div className="detail-row">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value">{currentTransaction.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {currentTransaction.name}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone Number:</span>
                  <span className="detail-value">
                    {currentTransaction.phoneNumber}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date().toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })}
                    ,{" "}
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Done Button */}
              <button onClick={handleDone} className="done-button">
                {isSuccessful ? "Done" : "Check your details"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Payment;
