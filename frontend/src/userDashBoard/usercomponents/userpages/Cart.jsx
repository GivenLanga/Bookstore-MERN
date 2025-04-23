import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import "./Cart.css"; // Add CSS file for styling

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.title}</h3>
              <p>by {item.author}</p>
              <button
                className="remove-button"
                onClick={() => dispatch(removeFromCart(item))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
