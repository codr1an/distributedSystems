import "./SimilarProductPage.css";

const SimilarProductCard = ({ image, title, link, price }) => {
  return (
    <div className="similarProductCardContainer">
      <a href={link} className="product-link">
        <div id="similarProductCard" className="card">
          <div className="similarProductCardImg">
            <img src={image} className="card-img-top" alt={title} />
          </div>
          <h5>{price}</h5>
          <h6>{title}</h6>
        </div>
      </a>
    </div>
  );
};

export default SimilarProductCard;
