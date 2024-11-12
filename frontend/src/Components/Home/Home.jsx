import React from "react";
import Navbar from "./Navbar";
import ProductsCarousel from "./ProductsCarousel";
import OffersCarousel from "./OffersCarousel";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="category-presentation">
        <div className="current-offers">
          <OffersCarousel />
        </div>
        <ProductsCarousel />
      </div>
    </div>
  );
};

export default Home;
