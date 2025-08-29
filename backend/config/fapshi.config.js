require('dotenv').config();
// Resolve credentials from multiple possible env names (backward compatible)
const resolvedApiUser = process.env.FAPSHI_APIUSER || process.env.FAPSHI_API_USER || '';
const resolvedApiKey = process.env.FAPSHI_APIKEY || process.env.FAPSHI_API_KEY || '';
// Warn if missing but do not crash the server (health endpoint should still work)
if (!resolvedApiUser || !resolvedApiKey) {
  console.warn('Warning: Missing Fapshi API credentials (FAPSHI_APIUSER/FAPSHI_APIKEY). Some endpoints will fail until set.');
}
// Fapshi API configuration
const config = {
  baseUrl: process.env.FAPSHI_BASE_URL || 'https://live.fapshi.com',
  timeout: parseInt(process.env.API_TIMEOUT || '10000', 10),
  headers: {
    'Content-Type': 'application/json',
    'apiuser': resolvedApiUser,
    'apikey': resolvedApiKey
  }
};
module.exports = config;
