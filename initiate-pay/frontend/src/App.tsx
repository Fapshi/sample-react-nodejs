import ProductPage from "./pages/ProductPage"
import PaymentSuccess from "./pages/PaymentSuccess"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
