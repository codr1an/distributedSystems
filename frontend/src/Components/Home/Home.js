import Navbar from "./Navbar";
import phoneImage from "../../assets/iPhone.png";
import monitorImage from "../../assets/monitor.png";
import tvImage from "../../assets/tv.png";
import laptopImage from "../../assets/laptop.png";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="category-presentation">
        <div class="card-wrapper">
          <div class="card-pair">
            <h1>Phones</h1>
            <div
              class="row row-cols-1 row-cols-md-2 g-1"
              style={{ width: "19rem" }}
            >
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={phoneImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">iPhone X</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={phoneImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Samsung S20</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={phoneImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Xiaomi Beijing</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={phoneImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Huawei Milbei</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="card-pair">
            <h1>Tvs</h1>
            <div
              class="row row-cols-1 row-cols-md-2 g-1"
              style={{ width: "19rem" }}
            >
              <div class="col">
                <div class="card h-100 border-white">
                  <img src={tvImage} class="card-img-top mx-auto" alt="..." />
                  <h5 class="card-title">iPhone X</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img src={tvImage} class="card-img-top mx-auto" alt="..." />
                  <h5 class="card-title">Samsung S20</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img src={tvImage} class="card-img-top mx-auto" alt="..." />
                  <h5 class="card-title">Xiaomi Beijing</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img src={tvImage} class="card-img-top mx-auto" alt="..." />
                  <h5 class="card-title">Huawei Milbei</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="card-pair">
            <h1>Monitors</h1>
            <div
              class="row row-cols-1 row-cols-md-2 g-1"
              style={{ width: "19rem" }}
            >
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={monitorImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">iPhone X</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={monitorImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Samsung S20</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={monitorImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Xiaomi Beijing</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={monitorImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Huawei Milbei</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="card-pair">
            <h1>Laptops</h1>
            <div
              class="row row-cols-1 row-cols-md-2 g-1"
              style={{ width: "19rem" }}
            >
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={laptopImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">iPhone X</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={laptopImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Samsung S20</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={laptopImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Xiaomi Beijing</h5>
                </div>
              </div>
              <div class="col">
                <div class="card h-100 border-white">
                  <img
                    src={laptopImage}
                    class="card-img-top mx-auto"
                    alt="..."
                  />
                  <h5 class="card-title">Huawei Milbei</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
