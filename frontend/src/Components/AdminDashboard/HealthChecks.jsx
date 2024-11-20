import { useEffect, useState } from "react";
import "./HealthChecks.css";

const HealthChecks = () => {
  const [healthData, setHealthData] = useState({
    backend: {},
    frontend: {},
    database: {},
  });

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/health", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch health data");
        }

        const data = await response.json();

        // Remove the root timestamp and store the component data
        const { timestamp, ...components } = data;
        setHealthData(components);
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    // Fetch health data initially
    fetchHealthData();

    // Set up polling every 1 minute (60,000 ms)
    const intervalId = setInterval(fetchHealthData, 60000);

    // Clean up polling on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "UP":
        return "bg-success";
      case "DOWN":
        return "bg-danger";
      case "DEGRADED":
        return "bg-warning";
      default:
        return "";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="health-checks-wrapper">
      <div className="health-checks-title">
        <h2>Health Checks</h2>
      </div>
      <table id="healthChecksTable" className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Component</th>
            <th>Status</th>
            <th>Last Checked</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(healthData).map((component) => (
            <tr key={component}>
              <td>{component.charAt(0).toUpperCase() + component.slice(1)}</td>
              <td>
                <span
                  className={`badge ${getStatusClass(
                    healthData[component].status
                  )}`}
                >
                  {healthData[component].status === "UP"
                    ? "Operational"
                    : healthData[component].status}
                </span>
              </td>
              <td>{formatTimestamp(healthData[component].timestamp)}</td>
              <td>{healthData[component].message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthChecks;
