require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set in .env file');
  process.exit(1);
}

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB');
  process.exit(0);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});
