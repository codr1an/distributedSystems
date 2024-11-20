import { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Order from "./Order";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/orders/mine/sort?sortBy=date&direction=desc",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="orders-container">
        <div className="orders-title">Your orders</div>
        <div className="orders-wrapper">
          {orders.length > 0 ? (
            orders.map((order) => (
              <Order
                key={order.id}
                date={order.date}
                total={order.totalPrice}
                deliveryStatus={order.status}
                items={order.items}
              />
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
