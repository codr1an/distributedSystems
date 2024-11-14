import phoneImg from "../../assets/iPhone.png";
import "./SimilarProductPage.css";

const SimilarProductCard = ({ image, title, link, price }) => {
  image = phoneImg;
  price = "999,99e";
  link = "/product";
  title = "iPhone2";

  return (
    <div className="similarProductCardContainer">
      <a href={link} className="product-link">
        <div id="similarProductCard" className="card">
          <div className="similarProductCardImg">
            <img src={image} className="card-img-top" alt={title} />
          </div>
          <h5>{price}</h5>
          <p className="card-text">{title}</p>
        </div>
      </a>
    </div>
  );
};

export default SimilarProductCard;
