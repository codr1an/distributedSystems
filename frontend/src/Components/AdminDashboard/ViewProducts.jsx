import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import "./ViewPagesStyling.css";
import { Button } from "react-bootstrap";
import EditProductModal from "./Modals/EditProductModal";
import { message } from "react-message-popup";
import useAdminAuth from "../Auth/AdminAuth";

const ViewProducts = () => {
  useAdminAuth();

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleShowDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/products/${selectedProduct.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Product deleted successfully", 1500);
        fetchProducts();
        handleCloseDeleteModal();
      } else {
        message.error("Failed to delete product", 1500);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Error deleting product", 1500);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="view-container">
        <Sidebar />
        <div className="view-wrapper">
          <div className="view-title">
            <h2>Products</h2>
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
                  <th scope="col" style={{ width: "5%" }}>
                    Price
                  </th>
                  <th scope="col" style={{ width: "50%" }}>
                    Description
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Image URL
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.imageUrl}</td>
                    <td className="d-flex justify-content-between">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleShowModal(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleShowDeleteModal(product)}
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
        <EditProductModal
          showModal={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
          fetchProducts={fetchProducts}
        />
      )}

      {showDeleteModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Product</h5>
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
                  <strong>{selectedProduct?.name}</strong>?
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
                  onClick={handleDeleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
