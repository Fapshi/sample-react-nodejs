require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log(`🟡 Incoming request: ${req.method} ${req.url}`);
  next();
});

// Your routes here
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
