import { Link, useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    message.success("You have been logged out", 1500);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim().toLowerCase();
    const category = new URLSearchParams(window.location.search).get(
      "category"
    );
    const brand = new URLSearchParams(window.location.search).get("brand");

    let searchParams = new URLSearchParams();

    if (category) searchParams.set("category", category);
    if (brand) searchParams.set("brand", brand);
    if (searchQuery) searchParams.set("search", searchQuery);

    navigate(`/products?${searchParams.toString()}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/" style={{ marginLeft: 20 }}>
        Valdivian
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/products?category=phone">
              Phones
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products?category=tv">
              Tvs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products?category=laptop">
              Laptops
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products?category=monitor">
              Monitors
            </Link>
          </li>
        </ul>

        <form className="form-inline d-flex mx-auto" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            style={{ minWidth: 400 }}
          />
          <button className="btn btn-warning" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav">
          <div className="dropdown-center">
            <a
              className="btn btn-dark dropdown-toggle"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person"> Account</i>
            </a>

            <ul
              className="dropdown-menu dropdown-menu-dark"
              style={{ marginTop: 10, marginLeft: -20 }}
            >
              {token && role === "user" ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/my_profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my_orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Log out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/cart" className="btn btn-dark" style={{ marginRight: 20 }}>
            <i className="bi bi-cart"> Shopping Cart</i>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
