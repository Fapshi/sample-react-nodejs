const mongoose = require('mongoose');

async function connect() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB; // optional
  if (!uri) {
    console.warn('Warning: MONGODB_URI not set; database will not connect.');
    return;
  }
  try {
    await mongoose.connect(uri, dbName ? { dbName } : undefined);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}

connect();

module.exports = mongoose;
