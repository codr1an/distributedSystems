import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";
import HealthChecks from "./HealthChecks";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
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
