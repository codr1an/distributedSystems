import React, { useState, useEffect } from "react";
import "./Filters.css";

const Filters = () => {
  const [price, setPrice] = useState(1000);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    // api mocking
    const mockBrands = ["Samsung", "Apple", "Sony", "LG", "Huawei"];
    const mockYears = [2024, 2023, 2022, 2021, 2020];
    const mockMinPrice = 100;
    const mockMaxPrice = 5000;

    setBrands(mockBrands);
    setYears(mockYears);
    setPriceRange({ min: mockMinPrice, max: mockMaxPrice });
    setPrice(mockMaxPrice);
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
