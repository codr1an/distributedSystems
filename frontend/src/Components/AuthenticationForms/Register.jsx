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
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!", 2000);
      return;
    }

    const payload = {
      email,
      name,
      password,
      address: "",
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
        setFormData({ email: "", name: "", password: "", confirmPassword: "" });
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
