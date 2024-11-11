import Navbar from "./Navbar";
import phoneImage from "../../assets/iPhone.png";
import monitorImage from "../../assets/monitor.png";
import tvImage from "../../assets/tv.png";
import laptopImage from "../../assets/laptop.png";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="category-presentation">
        <div class="card-wrapper">
          <div class="card">
            <div class="product-image">
              <img src={phoneImage} class="card-img-top" alt="..." />
            </div>

            <h5 class="card-title">iPhone</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="/" class="btn btn-primary">
              To product
            </a>
          </div>
          <div class="card">
            <div class="product-image">
              <img src={laptopImage} class="card-img-top" alt="..." />
            </div>
            <h5 class="card-title">iPhone</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="/" class="btn btn-primary">
              To product
            </a>
          </div>
          <div class="card">
            <div class="product-image">
              <img src={laptopImage} class="card-img-top" alt="..." />
            </div>
            <h5 class="card-title">iPhone</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="/" class="btn btn-outline-dark">
              To product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
