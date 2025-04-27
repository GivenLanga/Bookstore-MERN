import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import "../Trending.css"; // Use Trending styles

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="trending">
      <h1 className="trending__title">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="trending__books">
          {cart.map((item) => (
            <div key={item._id} className="book">
              <div className="book__image-container">
                <img
                  src={item.image || "/placeholder-book.png"}
                  alt={item.title}
                  className="book__image"
                />
              </div>
              <div className="book__title">{item.title}</div>
              <div className="book__author">{item.author}</div>
              {item.price && <div className="book__price">${item.price}</div>}
              <div className="book__actions">
                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </div>
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
