# Fapshi Payment Integration - Initiate Pay

This project demonstrates how to integrate Fapshi's payment API using a React frontend and Node.js backend. It focuses on the Initiate Pay flow, which is a two-step payment process.

## 🚀 Features

- Generate payment links via Fapshi's API
- Simple and clean React frontend
- Secure Node.js backend with Express
- Environment variable configuration
- Comprehensive error handling
- Test script for API testing

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Fapshi API credentials (API User and API Key)

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sample-react-nodejs.git
   cd sample-react-nodejs/initiate-pay
   ```

2. **Backend Setup**
   ```bash
   cd frontend/backend
   cp .env.example .env
   # Update .env with your Fapshi API credentials
   npm install
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ..  # Go back to frontend directory
   npm install
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with:

```env
PORT=5000
FAPSHI_API_USER=your_api_user_here
FAPSHI_API_KEY=your_api_key_here
```

## 🧪 Testing the API

You can test the API using the provided test script:

```bash
cd frontend/backend
node test_api.js
```

Or use Postman with these details:

- **Method**: POST
- **URL**: `http://localhost:5000/api/payment/initiate`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
      "amount": 500,
      "userId": "test_user_123"
  }
  ```

## 📸 Screenshots

![Postman Request](screenshots/postman-request.png)
*Example API request in Postman*

## 📂 Project Structure

```
initiate-pay/
├── frontend/                 # React frontend
│   ├── public/               # Static files
│   ├── src/                  # React source code
│   └── package.json          # Frontend dependencies
└── backend/                  # Node.js backend
    ├── config/               # Configuration files
    ├── controller/           # Request handlers
    ├── routes/               # API routes
    ├── .env                  # Environment variables
    └── server.js             # Express server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fapshi](https://www.fapshi.com) for their payment API
- All contributors who helped improve this project
