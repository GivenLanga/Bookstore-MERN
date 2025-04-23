import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/slices/wishlistSlice";
import "./WishList.css"; // Add CSS file for styling

function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-item">
              <h3>{item.title}</h3>
              <p>by {item.author}</p>
              <button
                className="remove-button"
                onClick={() => dispatch(removeFromWishlist(item))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default WishList;
