import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductsCarousel = () => {
  const [firstPageProducts, setFirstPageProducts] = useState([]);
  const [secondPageProducts, setSecondPageProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.length >= 6) {
          const shuffledProducts = [...data].sort(() => 0.5 - Math.random());
          setFirstPageProducts(shuffledProducts.slice(0, 3));
          setSecondPageProducts(shuffledProducts.slice(3, 6));
        }
      });
  }, []);

  return (
    <div
      id="productCarousel"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="slide">
            <div className="card-wrapper">
              {firstPageProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.imageUrl}
                  title={product.name}
                  price={product.price.toFixed(2) + "€"}
                  description={product.description}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="slide">
            <div className="card-wrapper">
              {secondPageProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.imageUrl}
                  title={product.name}
                  price={product.price.toFixed(2) + "€"}
                  description={product.description}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProductsCarousel;
