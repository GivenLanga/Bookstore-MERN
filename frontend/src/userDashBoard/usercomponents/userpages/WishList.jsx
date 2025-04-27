import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/slices/wishlistSlice";
import "../Trending.css"; // Use Trending styles
import "./WishList.css"; // For .wishlist-empty

function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div className="trending">
      <h1 className="trending__title">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="trending__books">
          {wishlist.map((item) => (
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
                  onClick={() => dispatch(removeFromWishlist(item))}
                >
                  Remove
                </button>
              </div>
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
