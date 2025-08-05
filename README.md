# 💳 Fapshi Payment Integration – React + Node.js Sample

This is a simple full-stack demo project that shows how to integrate [Fapshi](https://www.fapshi.com)'s payment APIs using a **React.js frontend** and a **Node.js (Express) backend**.

It demonstrates how developers can:

- Generate a payment link via Fapshi's API (initiate pay)
- Redirect users to pay
- Handle post-payment redirection or display a success message
- Handle payments with your own custom checkout page (direct pay)
- Handle webhooks for payment status updates

Check the [Fapshi Documentation](https://docs.fapshi.com/en/docs/api-reference/getting-started) for details on the API and endpoints

---

## 📁 Project Structure

This repository contains two folders showing different ways to use the Fapshi API:

```
/direct-pay      → Direct Pay (Single-call payment link creation)
/initiate-pay    → Initiate Pay (More controlled flow, two-step process)
```

> ⚠️ **Important Note about Direct Pay:**  
> The **Direct Pay** method is **blocked by default in Live Mode** for security reasons.  
> To activate Direct Pay in production, please contact Fapshi Support at [support@fapshi.com](mailto:support@fapshi.com).

---

## 🚀 Features

- Frontend: React (with Vite or CRA)
- Backend: Node.js with Express
- Demonstrates both **Direct Pay** and **Initiate Pay** flows
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

### 2. Choose the Integration Flow

- For **Direct Pay**, navigate to:

  ```bash
  cd direct-pay
  ```

- For **Initiate Pay**, navigate to:
  ```bash
  cd initiate-pay
  ```

Each folder contains its own `backend` and `frontend` directories.

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

**Q: What’s the difference between Direct Pay and Initiate Pay?**  
Follow this article: [Direct Pay vs Initiate Pay](https://www.fapshi.com/en/help-and-support/direct-pay-vs-initiate-pay-all-you-need-to-know)

**Q: Why is Direct Pay disabled in live mode?**  
A: It’s restricted by default to prevent abuse. [Contact support](mailto:support@fapshi.com) to activate it in production. Submit your request with the following details:

- Your Fapshi API user
- Your website URL (if applicable)
- Your business name
- A clear description of your use case and why you need Direct Pay over Initiate Pay

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
