exports.getPaymentStatus = async (req, res) => {
  const { transId } = req.params;

  // Mock data simulating a payment status response
  const mockResponse = {
    transId,
    status: "SUCCESSFUL",
    medium: "mobile money",
    serviceName: "Fapshi Payment Service",
    amount: 150,
    revenue: 140,
    payerName: "John Smith",
    email: "jsmith@example.com",
    redirectUrl: "https://yourapp.com/redirect",
    externalId: "order_98765",
    userId: "user_1234",
    webhook: "https://yourapp.com/webhook",
    financialTransId: "fin_txn_4567",
    dateInitiated: "2025-08-08",
    dateConfirmed: "2025-08-09",
  };

  // Return the mock response
  res.status(200).json(mockResponse);
};
