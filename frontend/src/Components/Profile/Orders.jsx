import Navbar from "../Home/Navbar";
import Order from "./Order";
import "./Orders.css";

const Orders = () => {
  return (
    <div>
      <Navbar />
      <div className="orders-container">
        <div className="orders-title">Your orders</div>
        <div className="orders-wrapper">
          <Order
            date="2024-11-17"
            total="150.00 EUR"
            deliveryStatus="arriving on 24.11.24"
            items={[
              { name: "Product 1", quantity: 2, price: "20.00 EUR" },
              { name: "Product 2", quantity: 1, price: "50.00 EUR" },
              { name: "Product 3", quantity: 3, price: "10.00 EUR" },
            ]}
          />
          <Order
            date="2024-11-17"
            total="150.00 EUR"
            items={[
              { name: "Product 1", quantity: 2, price: "20.00 EUR" },
              { name: "Product 2", quantity: 1, price: "50.00 EUR" },
              { name: "Product 3", quantity: 3, price: "10.00 EUR" },
            ]}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Orders;
