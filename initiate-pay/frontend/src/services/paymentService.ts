const API_BASE_URL = 'http://localhost:5000/api';

export interface PaymentInitiateRequest {
  amount: number;
  email?: string;
  userId?: string;
  externalId?: string;
  redirectUrl?: string;
  message?: string;
}

export interface PaymentInitiateResponse {
  transId: string;
  status: string;
  amount: number;
  message: string;
  link?: string;
  paymentLink?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  transId: string;
  status: string;
  medium?: string;
  serviceName?: string;
  transType?: string;
  amount: number;
  email?: string;
  redirectUrl?: string;
  externalId?: string;
  userId?: string;
  financialTransId?: string;
  dateInitiated?: string;
  dateConfirmed?: string;
}

class PaymentService {
  async initiatePayment(data: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initiate payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    }
  }

  async getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/status/${transactionId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get payment status');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment status error:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();