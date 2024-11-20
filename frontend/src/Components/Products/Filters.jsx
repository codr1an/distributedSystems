import React, { useState, useEffect } from "react";
import "./Filters.css";

const Filters = () => {
  const [price, setPrice] = useState(1000);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const products = await response.json();
        const uniqueBrands = Array.from(
          new Set(products.map((product) => product.brand))
        );
        setBrands(
          uniqueBrands.length > 5 ? uniqueBrands.slice(0, 5) : uniqueBrands
        );

        const uniqueYears = Array.from(
          new Set(products.map((product) => product.modelYear))
        );
        setYears(
          uniqueYears.length > 5 ? uniqueYears.slice(0, 5) : uniqueYears
        );

        const prices = products.map((product) => product.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
        setPrice(Math.max(...prices));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFilters();
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="filter-container">
      <div className="brand-filter">
        <h1>Brands</h1>
        {brands.map((brand, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={brand}
              id={`brand-${index}`}
            />
            <label className="form-check-label" htmlFor={`brand-${index}`}>
              {brand}
            </label>
          </div>
        ))}
      </div>

      <div className="price-filter">
        <h1>
          Price{" "}
          <span className="price-text">
            {priceRange.min} € - {price} €
          </span>
        </h1>

        <input
          type="range"
          className="form-range"
          id="customRange1"
          min={priceRange.min}
          max={priceRange.max}
          value={price}
          onChange={handlePriceChange}
        />
      </div>

      <div className="year-filter">
        <h1>Model Year</h1>
        {years.map((year, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              value={year}
              id={`year-${index}`}
            />
            <label className="form-check-label" htmlFor={`year-${index}`}>
              {year}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
