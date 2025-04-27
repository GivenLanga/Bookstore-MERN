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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

function Trending() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data || []); // Adjust based on API response structure
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (book) => {
    if (
      Array.isArray(wishlist) &&
      wishlist.find((item) => item._id === book._id)
    ) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  const toggleCart = (book) => {
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
        <div className="trending__books">
          {books.map((book) => (
            <div className="book" key={book._id}>
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
              <p className="book__author">by {book.author}</p>
              <div className="book__actions">
                <FavoriteIcon
                  onClick={() => toggleWishlist(book)}
                  style={{
                    cursor: "pointer",
                    color: wishlist.find((item) => item._id === book._id)
                      ? "red"
                      : "gray",
                  }}
                />
                <ShoppingCartIcon
                  onClick={() => toggleCart(book)}
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
    </div>
  );
}

export default function TrendingWithBoundary() {
  return (
    <ErrorBoundary>
      <Trending />
    </ErrorBoundary>
  );
}
