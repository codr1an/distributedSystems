import React, { useState } from "react";
import "./Forms.css";
import logo from "../../assets/logo.png";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);

        const roleResponse = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        });

        const roleData = await roleResponse.json();

        if (roleResponse.ok) {
          localStorage.setItem("role", roleData.role);
          message.success("Login successful", 1000);

          if (roleData.role === "user") {
            navigate("/");
          } else if (roleData.role === "admin") {
            navigate("/service_dashboard");
          }
        } else {
          message.error("Unable to retrieve user role", 1000);
        }
      } else {
        message.error("Login failed. Please check your credentials.", 1000);
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.", 1000);
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
        <h1>Sign in</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            <a
              href="/register"
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Not registered yet?
            </a>
          </p>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ marginTop: 20 }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
