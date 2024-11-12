const Navbar = () => {
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
            <a className="nav-link" href="/">
              Phones
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Tablets
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Laptops
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Computers
            </a>
          </li>
        </ul>

        <form className="form-inline d-flex mx-auto">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ minWidth: 400 }}
          />
          <button className="btn btn-warning" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav ">
          <div class="dropdown-center">
            <a
              class="btn btn-dark dropdown-toggle"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person"> Account</i>
            </a>

            <ul
              class="dropdown-menu dropdown-menu-dark"
              style={{ marginTop: 10, marginLeft: -20 }}
            >
              <li>
                <a class="dropdown-item" href="/login">
                  Login
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="btn btn-dark"
            style={{
              marginRight: 20,
            }}
          >
            <i class="bi bi-cart"> Shopping Cart</i>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
