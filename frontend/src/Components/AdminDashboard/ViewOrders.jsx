import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import "./ViewPagesStyling.css";
import { Button } from "react-bootstrap";
import { message } from "react-message-popup";
import useAdminAuth from "../Auth/AdminAuth";

const ViewOrders = () => {
  useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/orders/bulk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleShowDeleteModal = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/orders/${selectedOrder.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Order deleted successfully", 1500);
        fetchOrders();
        handleCloseDeleteModal();
      } else {
        message.error("Failed to delete order", 1500);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Error deleting order", 1500);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Order status updated successfully", 1500);
        fetchOrders();
      } else {
        message.error("Failed to update order status", 1500);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Error updating order status", 1500);
    }
  };
  return (
    <div>
      <AdminNavbar />
      <div className="view-container">
        <Sidebar />
        <div className="view-wrapper">
          <div className="view-title">
            <h2>Orders</h2>
          </div>
          <div className="view-table">
            <table
              id="ordersTable"
              className="table table-striped table-bordered table-hover"
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    ID
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Placed on
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    Address
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Price
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.date}</td>
                    <td>{order.user.name}</td>
                    <td>{order.user.address}</td>
                    <td>{order.totalPrice.toFixed(2)}€</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="select"
                      >
                        <option value="pending">Pending</option>
                        <option value="on its way">On its way</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="d-flex justify-content-between">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowModal(order)}
                      >
                        View
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(order)}
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

      {showDeleteModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseDeleteModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selectedOrder?.user.name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCloseDeleteModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteOrder}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedOrder?.user.name}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder?.user.address}
                </p>
                <p>
                  <strong>Total Price:</strong>{" "}
                  {selectedOrder?.totalPrice.toFixed(2)}€
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder?.status}
                </p>
                <hr />
                <h5>Items:</h5>
                <ul>
                  {selectedOrder?.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity} x {item.product.name} (
                      {item.product.price.toFixed(2)}€ each)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
