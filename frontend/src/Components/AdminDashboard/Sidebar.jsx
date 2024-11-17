import React, { useState } from "react";
import AddUserModal from "./Modals/AddUserModal.jsx";
import AddProductModal from "./Modals/AddProductModal.jsx";
import "./Sidebar.css";

const Sidebar = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleShowProductModal = () => setShowProductModal(true);
  const handleCloseProductModal = () => setShowProductModal(false);

  return (
    <div className="side-bar">
      <h1>Dashboard</h1>
      <a href="/service_dashboard">
        <button id="sideBarButton" type="button" className="btn btn">
          <i className="bi bi-speedometer2"> Health checks</i>
        </button>
      </a>

      <h1>User Management</h1>
      <a href="/view_users">
        <button id="sideBarButton" type="button" className="btn btn">
          <i className="bi bi-people"> View Users</i>
        </button>
      </a>
      <button
        id="sideBarButton"
        type="button"
        className="btn btn"
        onClick={handleShowUserModal}
      >
        <i className="bi bi-person-add"> New User</i>
      </button>

      <h1>Product Management</h1>
      <a href="/view_products">
        <button id="sideBarButton" type="button" className="btn btn">
          <i className="bi bi-box-seam"> View Products</i>
        </button>
      </a>
      <button
        id="sideBarButton"
        type="button"
        className="btn btn"
        onClick={handleShowProductModal}
      >
        <i className="bi bi-plus-lg"> New Product</i>
      </button>

      <AddUserModal
        showModal={showUserModal}
        handleClose={handleCloseUserModal}
      />
      <AddProductModal
        showModal={showProductModal}
        handleClose={handleCloseProductModal}
      />
    </div>
  );
};

export default Sidebar;
