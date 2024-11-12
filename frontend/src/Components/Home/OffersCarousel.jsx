import offersCarousel from "../../assets/blackfriday.jpg";
import gaming from "../../assets/gaming.jpg";
import christmas from "../../assets/christmas.jpg";
import "./OffersCarousel.css";

const OffersCarousel = () => {
  return (
    <div
      id="offersCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={christmas} className="d-block w-100" alt="Christmas" />
        </div>
        <div className="carousel-item">
          <img src={gaming} className="d-block w-100" alt="Gaming" />
        </div>
        <div className="carousel-item">
          <img src={offersCarousel} className="d-block w-100" alt="Offers" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#offersCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#offersCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default OffersCarousel;
