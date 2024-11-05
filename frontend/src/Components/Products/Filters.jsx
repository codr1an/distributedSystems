import React, { useState } from "react";
import "./Filters.css";

const Filters = () => {
  const [price, setPrice] = useState(1000);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="filter-container">
      <div className="brand-filter">
        <h1>Brands</h1>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Samsung
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Apple
          </label>
        </div>
      </div>
      <div className="price-filter">
        <h1>
          Price <span className="price-text">0 - {price}</span>
        </h1>

        <input
          type="range"
          className="form-range"
          id="customRange1"
          min="1"
          max="1000"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div className="brand-filter">
        <h1>Device Model Year</h1>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            2024
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            2023
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
