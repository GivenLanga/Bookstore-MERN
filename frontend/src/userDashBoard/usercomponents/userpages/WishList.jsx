import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/slices/wishlistSlice";
import "../Trending.css";
import "./WishList.css";
import PersonIcon from "@mui/icons-material/Person";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookModel from "../../../home/BookModel";

function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="trending">
      <h1 className="trending__title">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="trending__books flex flex-wrap justify-center">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="book cursor-pointer"
              onClick={() => setSelectedBook(item)}
              style={{ position: "relative" }}
            >
              <div className="book__image-container">
                <img
                  src={
                    item.image && item.image.trim() !== ""
                      ? item.image
                      : "/placeholder-book.png"
                  }
                  alt={item.title}
                  className="book__image"
                />
              </div>
              <h3 className="book__title">{item.title}</h3>
              <div className="flex items-center justify-center gap-1 book__author">
                <PersonIcon className="text-blue-400" fontSize="small" />
                <span>{item.author}</span>
              </div>
              {item.price !== undefined && (
                <div className="book__price flex items-center justify-center gap-1">
                  <span className="text-blue-700 font-semibold">
                    R{item.price}
                  </span>
                </div>
              )}
              <div className="book__actions">
                <button
                  className="remove-button flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromWishlist(item));
                  }}
                  title="Remove from Wishlist"
                >
                  <DeleteForeverIcon
                    className="text-red-600"
                    fontSize="small"
                  />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      )}
      {selectedBook && (
        <BookModel book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default WishList;
