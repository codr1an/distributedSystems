import ProductCard from "./ProductCard";
import phoneImage from "../../assets/iPhone.png";
import laptopImage from "../../assets/laptop.png";
import monitorImage from "../../assets/monitor.png";
import tvImage from "../../assets/tv.png";

const ProductsCarousel = () => {
  return (
    <div
      id="productCarousel"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="slide">
            <div className="card-wrapper">
              <ProductCard
                image={phoneImage}
                title="iPhone"
                price="12345"
                link="/"
              />
              <ProductCard
                image={laptopImage}
                title="Laptop"
                price="67890"
                link="/"
              />
              <ProductCard
                image={monitorImage}
                title="Monitor"
                price="23456"
                link="/"
              />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="slide">
            <div className="card-wrapper">
              <ProductCard image={tvImage} title="TV" price="78910" link="/" />
              <ProductCard
                image={phoneImage}
                title="iPhone"
                price="12345"
                link="/"
              />
              <ProductCard
                image={laptopImage}
                title="Laptop"
                price="67890"
                link="/"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProductsCarousel;
