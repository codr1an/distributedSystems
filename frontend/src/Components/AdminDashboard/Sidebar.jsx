import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <h1>Dashboard</h1>
      <button type="button" class="btn btn">
        <i class="bi bi-speedometer2"> Health checks</i>
      </button>
      <h1>User Management</h1>
      <button type="button" class="btn btn">
        <i class="bi bi-people"> View Users</i>
      </button>
      <button type="button" class="btn btn">
        <i class="bi bi-person-add"> New User</i>
      </button>
      <h1>Product Management</h1>
      <button type="button" class="btn btn">
        <i class="bi bi-box-seam"> View Products</i>
      </button>
      <button type="button" class="btn btn">
        <i class="bi bi-plus-lg"> New Product</i>
      </button>
    </div>
  );
};

export default Sidebar;
