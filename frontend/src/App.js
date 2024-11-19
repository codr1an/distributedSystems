import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Home from "./Components/Home/Home";
import ProductsList from "./Components/Products/ProductsList";
import LoginForm from "./Components/AuthenticationForms/Login";
import RegisterForm from "./Components/AuthenticationForms/Register";
import ProductPage from "./Components/Products/ProductPage";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import UserProfile from "./Components/Profile/UserProfile";
import Orders from "./Components/Profile/Orders";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ViewProducts from "./Components/AdminDashboard/ViewProducts";
import ViewUsers from "./Components/AdminDashboard/ViewUsers";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/my_profile" element={<UserProfile />} />
        <Route path="/my_orders" element={<Orders />} />
        <Route path="/service_dashboard" element={<AdminDashboard />} />
        <Route path="/view_products" element={<ViewProducts />} />
        <Route path="/view_users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
