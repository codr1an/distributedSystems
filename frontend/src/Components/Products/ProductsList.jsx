import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar";
import "./ProductsList.css";
import Filters from "./Filters";
import ItemListing from "./ItemListing";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const productsPerPage = 8;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filter,
    }));
  };

  useEffect(() => {
    let url = `http://localhost:8080/api/products/filter?`;

    if (searchTerm) url += `search=${searchTerm}&`;
    if (category) url += `category=${category}&`;

    if (filters.brand) url += `brand=${filters.brand}&`;
    if (filters.year) url += `year=${filters.year}&`;
    if (filters.price) url += `price=${filters.price}&`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [category, filters, searchTerm]);

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
            Results
            {searchTerm && <span> for "{searchTerm}"</span>}{" "}
          </h1>
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
                productId={product.id}
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
                    currentPage === index + 1 ? "btn-warning" : "btn-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filters">
          <Filters onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
