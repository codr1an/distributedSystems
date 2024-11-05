import Navbar from "../Home/Navbar";
import "./Products.css";
import phoneImage from "../../assets/iPhone.png";
import Filters from "./Filters";

const ProductsList = () => {
  return (
    <div>
      <Navbar />
      <div class="products-page-container">
        <div class="products-list">
          <h1>Results</h1>
          <div class="card mb-3">
            <div class="row g-1">
              <div class="col-md-2">
                <img
                  src={phoneImage}
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">iPhone X</h2>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div
                    data-coreui-read-only="true"
                    data-coreui-toggle="rating"
                    data-coreui-value="3"
                  ></div>{" "}
                  <p class="price">
                    <big class="text-bold">99,99 euronen</big>
                  </p>
                  <button type="button" class="btn btn-warning">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="filters">
          <Filters></Filters>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
