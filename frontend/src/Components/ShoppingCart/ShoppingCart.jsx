import Navbar from "../Home/Navbar";
import "./ShoppingCart.css";
import CartItem from "./CartItem";
import phoneImg from "../../assets/tv.png";

const ShoppingCart = () => {
  const totalPrice = "1234,55";
  return (
    <div>
      <Navbar />
      <div className="shopping-shoppingCart-container">
        <div className="shopping-shoppingCart-wrapper">
          <div className="shopping-shoppingCart-items">
            <div className="shopping-shoppingCart-title">
              <h1>Shopping Cart</h1>
              <h2>Price</h2>
            </div>
            <CartItem
              image={phoneImg}
              title="iPhone"
              price="999,99"
              description="ajkhasgduijkahsdhbaosiudhasoid hjasiod"
            />
            <CartItem
              image={phoneImg}
              title="iPhone"
              price="999,99"
              description="ajkhasgduijkahsdhbaosiudhasoid hjasiod"
            />
            <CartItem
              image={phoneImg}
              title="iPhone"
              price="999,99"
              description="ajkhasgduijkahsdhbaosiudhasoid hjasiod"
            />
            <CartItem
              image={phoneImg}
              title="iPhone"
              price="999,99"
              description="ajkhasgduijkahsdhbaosiudhasoid hjasiod"
            />
          </div>
          <div className="shopping-shoppingCart-overview">
            <h1>Subtotal: {totalPrice}</h1>
            <button className="place-order-button">Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
