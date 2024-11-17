const AdminNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ justifyContent: "space-between" }}
    >
      <a
        className="navbar-brand"
        href="/service_dashboard"
        style={{ marginLeft: 20 }}
      >
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
      <button
        type="button"
        class="btn btn-dark"
        style={{
          marginRight: 20,
        }}
      >
        <i class="bi bi-box-arrow-in-right"> Log out</i>
      </button>
    </nav>
  );
};

export default AdminNavbar;
