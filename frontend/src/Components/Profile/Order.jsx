import "./Order.css";

const Order = ({ date, total, deliveryStatus, items }) => {
  return (
    <div>
      <div className="order-container">
        <div className="order-overview">
          <h1>Date: {date}</h1>
          <h1>Total: {total}</h1>
          <h1>Status: {deliveryStatus}</h1>
        </div>
        <div className="order-items">
          <table>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
