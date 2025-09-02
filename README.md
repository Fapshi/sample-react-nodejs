# 💳 Fapshi Payment Integration – React + Node.js Sample

This is a simple full-stack demo project that shows how to integrate [Fapshi](https://www.fapshi.com)'s payment APIs using a **React.js frontend** and a **Node.js (Express) backend**.

It demonstrates how developers can:

- Generate a payment link via Fapshi's API
- Redirect users to complete their payment
- Handle post-payment redirection
- Handle webhooks for payment status updates

Check the [Fapshi Documentation](https://docs.fapshi.com/en/docs/api-reference/getting-started) for details on the API and endpoints

---

## 📁 Project Structure

This repository contains the implementation of Fapshi's payment integration:

```
/initiate-pay    → Implementation of the payment integration
```

---

## 🚀 Features

- Frontend: React (with Vite or CRA)
- Backend: Node.js with Express
- Example use case: simple product checkout
- Clean, beginner-friendly code
- Easily extendable to fit real-world scenarios

---

## 🧰 Technologies Used

- React.js
- Node.js
- Express.js
- Axios (for API calls)
- Dotenv (for managing API credentials)

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/fapshi/sample-react-nodejs.git
cd sample-react-nodejs
```

### 2. Navigate to the project directory

```bash
cd initiate-pay
```

The directory contains both `backend` and `frontend` subdirectories.

---

## ⚙️ Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your Fapshi API credentials
npm install
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Ensure your backend is running on port `5000`, or update the API base URL in the frontend code.

---

## 🔐 Environment Variables

In your `.env` file inside the `backend` folder:

```env
FAPSHI_API_USER=your_api_user_here
FAPSHI_API_KEY=your_api_key_here
```

> You can find your keys in the [Fapshi Dashboard](https://dashboard.fapshi.com).

---

## ✅ Example Workflow

1. User clicks "Pay" after filling a form or selecting a product.
2. Frontend sends a request to the backend.
3. Backend calls the Fapshi API to create a payment link.
4. Frontend receives the link and redirects the user to complete payment.
5. After payment, the user sees a success/failure confirmation screen.

---

## 📸 Screenshots

_Add UI screenshots or a demo GIF here if available._

---
## ❓ FAQs

**Q: Can I use this project in production?**  
A: Yes, you can adapt and build on it for production use.

**Q: How do I implement Fapshi payments?**  
A: Follow the implementation in this repository or check our [documentation](https://docs.fapshi.com) for more details.

---

## 📄 License

This project is open-source under the **MIT License**.  
You are free to modify and use it in your projects.

---

## 🙌 Credits

Built with ❤️ by the **Fapshi Team**  
Website: [fapshi.com](https://www.fapshi.com)  
Support: [support@fapshi.com](mailto:support@fapshi.com)
Help Center: [fapshi.com/help-and-support](https://www.fapshi.com/en/help-and-support)
