import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <Sidebar />
        <div className="health-checks-container"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
