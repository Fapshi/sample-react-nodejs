require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Minimal middleware
app.use(cors());
app.use(express.json());
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
