import Navbar from "../Home/Navbar";
import "./ProductsList.css";
import phoneImage from "../../assets/iPhone.png";
import Filters from "./Filters";
import ItemListing from "./ItemListing";

const ProductsList = () => {
  return (
    <div>
      <Navbar />
      <div class="products-page-container">
        <div class="sorting-bar">
          <h1>
            Results for <p4>"iPhone"</p4>
          </h1>
          <div class="button">
            <button
              id="sortingButton"
              class="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort by
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/products">
                  Price Ascending
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/products">
                  Price Descending
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="products-list">
          <ItemListing
            title="iPhone"
            price="999,99"
            image={phoneImage}
            description={
              "hfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadakhfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadak "
            }
          ></ItemListing>
          <ItemListing
            title="iPhone"
            price="999,99"
            image={phoneImage}
            description={
              "hfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadakhfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadak "
            }
          ></ItemListing>
          <ItemListing
            title="iPhone"
            price="999,99"
            image={phoneImage}
            description={
              "hfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadakhfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadak "
            }
          ></ItemListing>
          <ItemListing
            title="iPhone"
            price="999,99"
            image={phoneImage}
            description={
              "hfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadakhfdjggashnjkma sd sdbasdja sdamsd baksdm, asd asda sda dadm asd asjkdb n,m asjd asdadak "
            }
          ></ItemListing>
        </div>
        <div class="filters">
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
