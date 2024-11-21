import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import "./ViewPagesStyling.css";
import { Button } from "react-bootstrap";
import EditUserModal from "./Modals/EditUserModal";
import { message } from "react-message-popup";
import useAdminAuth from "../Auth/AdminAuth";

const ViewUsers = () => {
  useAdminAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/users/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/users/${selectedUser.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("User deleted successfully", 1500);
        fetchUsers();
        handleCloseDeleteModal();
      } else {
        message.error("Failed to delete user", 1500);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user", 1500);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="view-container">
        <Sidebar />
        <div className="view-wrapper">
          <div className="view-title">
            <h2>Users</h2>
          </div>
          <div className="view-table">
            <table
              id="productsTable"
              className="table table-striped table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    ID
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    E-Mail
                  </th>
                  <th scope="col" style={{ width: "50%" }}>
                    Address
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowModal(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <EditUserModal
          user={selectedUser}
          handleClose={handleCloseModal}
          refreshUsers={fetchUsers}
        />
      )}

      {showDeleteModal && (
        <div className="modal show" style={{ display: "block" }} tabindex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDeleteModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteUser}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
