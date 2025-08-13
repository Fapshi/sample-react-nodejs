require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Minimal middleware
app.use(cors());
app.use(express.json());

// Log concise info from API JSON responses (avoid amounts)
app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    try {
      if (req.originalUrl && req.originalUrl.startsWith('/api')) {
        // For initiate endpoint, print a compact JSON with the specific fields the user wants
        if (req.originalUrl.startsWith('/api/payment/initiate')) {
          const compact = {
            message: 'Payment successful',
            link: body?.link || body?.paymentLink || body?.url,
            transId: body?.transId || body?.transactionId,
            dateInitiated: body?.dateInitiated || body?.createdAt || body?.initiatedAt,
            redirectUrl: body?.redirectUrl || body?.redirect_url
          };
          console.log(JSON.stringify(compact, null, 2));
        } else {
          // Generic case: only print a single message-like field when present
          const msg = body && (body.message || body.msg || body.status || body.error);
          if (msg) {
            console.log(`[API ${req.method} ${req.originalUrl}] message: ${msg}`);
          } else {
            console.log(`[API ${req.method} ${req.originalUrl}] response sent`);
          }
        }
      }
    } catch (_) {
      // no-op
    }
    return originalJson(body);
  };
  next();
});

// API Routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = { app, server };
