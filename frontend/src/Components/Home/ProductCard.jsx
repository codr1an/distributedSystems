import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ image, title, price, link, description }) => {
  return (
    <div className="card">
      <div className="product-image">
        <div className="price-display">{price}</div>
        <img src={image} className="card-img-top" alt={title} />
      </div>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <div className="button-container">
        <Link to={link} className="btn btn-outline-dark btn-sm">
          {"> See product"}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
