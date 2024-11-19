import { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import "./ProductsList.css";
import Filters from "./Filters";
import ItemListing from "./ItemListing";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <Navbar />
      <div className="products-page-container">
        <div className="sorting-bar">
          <h1>
            Results for <span>"iPhone"</span>
          </h1>
          <div className="button">
            <button
              id="sortingButton"
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/products">
                  Price Ascending
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/products">
                  Price Descending
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-display">
          <div className="products-list">
            {currentProducts.map((product) => (
              <ItemListing
                key={product.id}
                title={product.name}
                price={product.price.toFixed(2)}
                image={product.imageUrl}
                description={product.description}
              />
            ))}
          </div>
          <div className="pagination">
            <div className="pagination-buttons">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-secondary" : "btn-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filters">
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
