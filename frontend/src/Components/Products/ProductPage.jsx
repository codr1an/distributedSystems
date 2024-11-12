import "./ProductPage.css";
import Navbar from "../Home/Navbar";
import phoneImg from "../../assets/iPhone.png";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <div className="product-page-container">
        <div className="product-wrapper">
          <div className="product-img">
            <img src={phoneImg} className="d-block w-100" alt="Christmas" />
          </div>
          <div className="product-body"></div>
          <div className="product-price"></div>
        </div>
        <div className="similar-products"></div>
      </div>
    </div>
  );
};

export default ProductPage;
