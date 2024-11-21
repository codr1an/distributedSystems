import React, { useState } from "react";
import "./Forms.css";
import logo from "../../assets/logo.png";
import { message } from "react-message-popup";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    address: "", // added address field
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    address: "", // added error handling for address
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required!";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address!";
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = "Name is required!";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required!";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long!";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required!"; // validate address
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { email, name, password, address } = formData;

    const payload = {
      email,
      name,
      password,
      address, // include address in the payload
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Registration successful!", 2000);
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          address: "",
        });
      } else if (response.status === 409) {
        message.error("The email address is already registered!", 2000);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Registration failed!", 2000);
      }
    } catch (error) {
      message.error("An error occurred while registering!", 2000);
    }
  };

  return (
    <div className="container">
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          className="logo-img"
          style={{ marginBottom: 20 }}
        />
      </a>
      <div className="wrapper">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="First and last name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="confirmPassword">Re-enter password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
          <p>
            <a
              href="/login"
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Already registered?
            </a>
          </p>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ marginTop: 20 }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
