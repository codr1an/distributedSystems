import Navbar from "./Navbar";
import phoneImage from "../../assets/iPhone.png";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="category-presentation">
        <div class="card-wrapper">
          <div class="card" style={{ width: 300 }}>
            <img src={phoneImage} class="card-img" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card" style={{ width: 300 }}>
            <img src={phoneImage} class="card-img" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card" style={{ width: 300 }}>
            <img src={phoneImage} class="card-img" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card" style={{ width: 300 }}>
            <img src={phoneImage} class="card-img" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
