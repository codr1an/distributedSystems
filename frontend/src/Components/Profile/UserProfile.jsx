import { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import user from "../../assets/user.png";
import "./UserProfile.css";
import EditProfileForm from "./EditPofileForm";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = {
        name: "John Doe",
        eMail: "john.doe@example.com",
        address: "Musterstr. 1, 1234 Musterstadt",
      };
      setUserData(data);
    };

    fetchUserData();
  }, []);

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
            <img src={user} alt="/" />
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <span className="profile-label">Name:</span> {userData.name}
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span> {userData.eMail}
            </div>
            <div className="profile-field">
              <span className="profile-label">Address:</span> {userData.address}
            </div>
          </div>
          <div className="profile-options">
            <EditProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
