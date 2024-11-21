import { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import user from "../../assets/user.png";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../Auth/UserAuth";

const UserProfile = () => {
  useUserAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-title">My Profile</div>
        <div className="profile-wrapper">
          <div className="profile-image">
            <img src={user} alt="User Profile" />
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <span className="profile-label">Name:</span> {userData.name}
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span> {userData.email}
            </div>
            <div className="profile-field">
              <span className="profile-label">Address:</span> {userData.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
