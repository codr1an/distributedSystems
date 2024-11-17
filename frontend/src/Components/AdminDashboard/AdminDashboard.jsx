import "./AdminDashboard.css";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <Sidebar />
        <div className="health-checks-container">
          <div className="health-checks-wrapper">
            <div className="health-checks-title">
              <h2>Health Checks</h2>
            </div>
            <table id="healthChecksTable" class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Last Checked</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Backend Service</td>
                  <td>
                    <span class="badge bg-success">Operational</span>
                  </td>
                  <td>2024-11-17 10:15 AM</td>
                  <td>
                    All endpoints responded within acceptable time limits.
                  </td>
                </tr>
                <tr>
                  <td>Frontend Service</td>
                  <td>
                    <span class="badge bg-warning">Degraded</span>
                  </td>
                  <td>2024-11-17 10:20 AM</td>
                  <td>High response times observed during peak traffic.</td>
                </tr>
                <tr>
                  <td>Database</td>
                  <td>
                    <span class="badge bg-danger">Down</span>
                  </td>
                  <td>2024-11-17 9:45 AM</td>
                  <td>Connection timeout errors; under investigation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
