import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import BookModel from "../../home/BookModel";

function Trending() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (book, e) => {
    e.stopPropagation();
    if (
      Array.isArray(wishlist) &&
      wishlist.find((item) => item._id === book._id)
    ) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  const toggleCart = (book, e) => {
    e.stopPropagation();
    if (Array.isArray(cart) && cart.find((item) => item._id === book._id)) {
      dispatch(removeFromCart(book));
    } else {
      dispatch(addToCart(book));
    }
  };

  return (
    <div className="trending">
      <h2 className="trending__title">Trending Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="trending__books flex flex-wrap justify-center">
          {books.map((book) => (
            <div
              className="book cursor-pointer"
              key={book._id}
              onClick={() => setSelectedBook(book)}
              style={{ position: "relative" }}
            >
              <div className="book__image-container">
                <img
                  className="book__image"
                  src={
                    book.image && book.image.trim() !== ""
                      ? book.image
                      : "/placeholder-book.png"
                  }
                  alt={book.title}
                />
              </div>
              <h3 className="book__title">{book.title}</h3>
              <div className="flex items-center justify-center gap-1 book__author">
                <PersonIcon className="text-blue-400" fontSize="small" />
                <span> {book.author}</span>
              </div>
              {book.price !== undefined && (
                <div className="book__price flex items-center justify-center gap-1">
                  {book.onSale ? (
                    <>
                      <span className="text-red-600 font-bold">
                        R{book.price}
                      </span>
                      <LocalOfferIcon
                        className="text-red-500"
                        fontSize="small"
                        titleAccess="On Sale"
                        style={{ verticalAlign: "middle" }}
                      />
                    </>
                  ) : (
                    <span className="text-blue-700 font-semibold">
                      R{book.price}
                    </span>
                  )}
                </div>
              )}
              <div className="book__actions">
                <FavoriteIcon
                  onClick={(e) => toggleWishlist(book, e)}
                  style={{
                    cursor: "pointer",
                    color: wishlist.find((item) => item._id === book._id)
                      ? "red"
                      : "gray",
                  }}
                />
                <ShoppingCartIcon
                  onClick={(e) => toggleCart(book, e)}
                  style={{
                    cursor: "pointer",
                    color: cart.find((item) => item._id === book._id)
                      ? "green"
                      : "gray",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedBook && (
        <BookModel book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default Trending;
