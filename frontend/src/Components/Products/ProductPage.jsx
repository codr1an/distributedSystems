import "./ProductPage.css";
import Navbar from "../Home/Navbar";
import phoneImg from "../../assets/iPhone.png";
import SimilarProductCard from "./SimilarProductCard";
const ProductPage = ({
  image,
  titel,
  price,
  description,
  userAdress,
  userName,
  estimatedDelivery,
}) => {
  image = phoneImg;
  titel = "iPhone";
  price = "999,99 €";
  userAdress = "12345 Musterstadt";
  userName = "Max Mustermann";
  description =
    "ajuhsgduiyasldhaosidh aoisdj asoid aksjdnabs daoisd asdoiash dos asdoihasuid ahsudi uiasdas";
  estimatedDelivery = "17 November";

  return (
    <div>
      <Navbar />
      <div className="product-page-container">
        <div className="product-wrapper">
          <div className="product-img">
            <img src={image} className="d-block w-100" alt="Christmas" />
          </div>
          <div className="product-body">
            <h1>{titel}</h1>
            <h2>{price}</h2>
            <p>{description}</p>
          </div>
          <div className="product-price">
            <div className="delivery-info">
              <h1>{price}</h1>
              <h2>Deliver to:</h2>
              <h3>
                {userName} <br /> {userAdress}
              </h3>
              <h2>Estimated delivery: </h2>
              <h3>{estimatedDelivery}</h3>
            </div>
            <div className="user-actions">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="30"
                placeholder="Quantity"
              />
              <button
                id="productPageCartButton"
                type="button"
                class="btn btn-warning btn-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="similar-products">
          <SimilarProductCard />
          <SimilarProductCard />
          <SimilarProductCard />
          <SimilarProductCard />
          <SimilarProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
