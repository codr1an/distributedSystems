import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import "./ViewPagesStyling.css";
import { Button } from "react-bootstrap";
import EditProductModal from "./Modals/EditProductModal";

const ViewProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Product A",
      price: 100,
      description: "Description of Product A",
      imageUrl: "./iPhone.png",
    },
    {
      id: 2,
      name: "Product B",
      price: 150,
      description: "Description of Product B",
      imageUrl: "./iPhone.png",
    },
    {
      id: 3,
      name: "Product C",
      price: 75,
      description: "Description of Product C",
      imageUrl: "./iPhone.png",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
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
                        onClick={() => handleEditClick(product)}
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

      {selectedProduct && (
        <EditProductModal
          showModal={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ViewProducts;
