import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import "./ShoppingCart.css";
import CartItem from "./CartItem";
import { message } from "react-message-popup";
import useUserAuth from "../Auth/UserAuth";

const ShoppingCart = () => {
  useUserAuth();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch("http://localhost:8080/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCartData(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/cart/product/${productId}?quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCart = await response.json();
      setCartData(updatedCart);
    } catch (error) {
      setError(error.message);
      console.error("Error updating quantity:", error); // Log error to console
    }
  };

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/cart/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedCart = await response.json();
      setCartData(updatedCart);
    } catch (error) {
      setError(error.message);
      console.error("Error deleting product:", error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      fetchCartItems();
      message.success("Your order has been palced!", 1000);
    } catch (error) {
      setError(error.message);
      message.error("Something went wrong with your order", 1000);

      console.error("Error placing order:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="shopping-cart-container">
        <div className="shopping-cart-wrapper">
          <div className="shopping-cart-items">
            <div className="shopping-cart-title">
              <h1>Shopping Cart</h1>
              <h2>Price</h2>
            </div>
            {cartData?.items.map((item) => (
              <CartItem
                key={item.id}
                image={item.product.imageUrl}
                title={item.product.name}
                price={item.totalPrice.toFixed(2)}
                description={item.product.description}
                quantity={item.quantity}
                onQuantityChange={(newQuantity) =>
                  updateQuantity(item.product.id, newQuantity)
                }
                onDelete={() => deleteItem(item.product.id)}
              />
            ))}
          </div>
          <div className="shopping-cart-overview">
            <h1>Subtotal: {cartData?.totalCartPrice?.toFixed(2)} €</h1>
            <button className="place-order-button" onClick={placeOrder}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
