import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import "./ViewPagesStyling.css";
import { Button } from "react-bootstrap";
import EditUserModal from "./Modals/EditUserModal";

const ViewUsers = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St, Springfield, IL, 62701",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Oak Ave, Springfield, IL, 62702",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      address: "789 Pine Blvd, Springfield, IL, 62703",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
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
                      <Button variant="danger" size="sm">
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
        <EditUserModal user={selectedUser} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ViewUsers;
