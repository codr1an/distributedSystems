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
          <p className="card-text">{title}</p>
        </div>
      </a>
    </div>
  );
};

export default SimilarProductCard;
