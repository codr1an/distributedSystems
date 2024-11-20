import "./Order.css";

const Order = ({ date, total, deliveryStatus, items }) => {
  return (
    <div>
      <div className="order-container">
        <div className="order-overview">
          <h1>Date: {new Date(date).toLocaleDateString()}</h1>
          <h1>Total: {total.toFixed(2)} EUR</h1>
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
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toFixed(2)} EUR</td>
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
