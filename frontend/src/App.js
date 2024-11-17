import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Home from "./Components/Home/Home";
import ProductsList from "./Components/Products/ProductsList";
import LoginForm from "./Components/AuthenticationForms/Login";
import RegisterForm from "./Components/AuthenticationForms/Register";
import ProductPage from "./Components/Products/ProductPage";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
