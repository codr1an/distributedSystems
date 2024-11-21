import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../Home/Navbar";
import SimilarProductCard from "./SimilarProductCard";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    if (product) {
      const url = `http://localhost:8080/api/products/filter?category=${product.category}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const shuffledProducts = data
            .filter((item) => item.id !== product.id)
            .sort(() => 0.5 - Math.random());
          setSimilarProducts(shuffledProducts.slice(0, 5));
        })
        .catch((error) =>
          console.error("Error fetching similar products:", error)
        );
    }
  }, [product]);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    setDeliveryDate(currentDate.toLocaleDateString());
  }, []);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/api/cart/product/${product.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          message.success("Product added to cart!", 1500);
        } else {
          message.error("Failed to add product to cart. Try again!", 1500);
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        message.error("Error adding product to cart. Please try again.", 1500);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="product-page-container">
        <div className="product-wrapper">
          <div className="product-img">
            <img
              src={product.imageUrl}
              className="d-block w-100"
              alt={product.name}
            />
          </div>
          <div className="product-body">
            <h1>{product.name}</h1>
            <h2>{product.price} €</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-price">
            <div className="delivery-info">
              <h1>{product.price} €</h1>
              <h2>Deliver to:</h2>
              {user ? (
                <h3>
                  {user.name} <br /> {user.address}
                </h3>
              ) : (
                <h3>You must log in</h3>
              )}
              <h2>Estimated delivery: </h2>
              <h3>{deliveryDate}</h3>
            </div>
            <div className="user-actions">
              <button
                id="productPageCartButton"
                type="button"
                className="btn btn-warning btn-sm"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="similar-products">
          {similarProducts.map((product) => (
            <SimilarProductCard
              key={product.id}
              image={product.imageUrl}
              title={product.name}
              link={`/product/${product.id}`}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
