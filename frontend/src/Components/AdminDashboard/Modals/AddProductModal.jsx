import React, { useState } from "react";
import { message } from "react-message-popup";

const AddProductModal = ({ showModal, handleClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [modelYear, setModelYear] = useState("");

  const handleSaveProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Authorization token is missing.");
      return;
    }

    const newProduct = {
      name,
      description,
      price,
      imageUrl,
      category,
      brand,
      modelYear,
    };

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        message.success("Product added successfully!", 1500);
        handleClose();
        window.location.reload();
      } else {
        message.error("Failed to add product", 1500);
      }
    } catch (error) {
      message.error("Error", 1500);
    }
  };

  return (
    <div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="255"
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="phone">Phone</option>
                    <option value="tv">TV</option>
                    <option value="laptop">Laptop</option>
                    <option value="monitor">Monitor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modelYear" className="form-label">
                    Model Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="modelYear"
                    value={modelYear}
                    onChange={(e) => setModelYear(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleSaveProduct}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
