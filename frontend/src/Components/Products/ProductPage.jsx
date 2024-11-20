import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../Home/Navbar";
import SimilarProductCard from "./SimilarProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:8080/api/products?category=${product.category}`)
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
              <h3>
                Max Mustermann <br /> 12345 Musterstadt
              </h3>
              <h2>Estimated delivery: </h2>
              <h3>17 November</h3>
            </div>
            <div className="user-actions">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="30"
                placeholder="Quantity"
              />
              <button
                id="productPageCartButton"
                type="button"
                className="btn btn-warning btn-sm"
              >
                Add to shoppingCart
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
