import "./CartItem.css";

const CartItem = ({ image, title, price, description, quantity }) => {
  return (
    <div id="cartItem" className="cart-item-card mb-3">
      <div className="row g-1">
        <div className="col-md-2">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <div className="product-description">
              <h2 className="card-title">{title}</h2>
              <p className="card-text">{description}</p>
            </div>
            <p className="price">
              <big className="text-bold">{price}</big>
            </p>
          </div>
          <div className="item-options">
            <input
              type="number"
              id="item-quantity"
              name="quantity"
              min="1"
              max="30"
              placeholder="Qt."
            />
            <button className="delete-item-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
