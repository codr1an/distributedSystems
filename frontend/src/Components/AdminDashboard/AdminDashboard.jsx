import React, { useEffect } from "react";
import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";
import HealthChecks from "./HealthChecks";
import Sidebar from "./Sidebar";
import useAdminAuth from "../Auth/AdminAuth";

const AdminDashboard = () => {
  useAdminAuth();
  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <Sidebar />
        <div className="health-checks-container">
          <HealthChecks />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
