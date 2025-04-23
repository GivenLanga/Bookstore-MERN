import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home"; // Import Home icon
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slices/wishlistSlice"; // Corrected path
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [location]);

  const performSearch = (searchQuery) => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books?search=${searchQuery}`)
      .then((response) => {
        setResults(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    performSearch(query);
  };

  const toggleWishlist = (book) => {
    if (wishlist.find((item) => item._id === book._id)) {
      dispatch(removeFromWishlist(book));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  const toggleCart = (book) => {
    if (cart.find((item) => item._id === book._id)) {
      dispatch(removeFromCart(book));
    } else {
      dispatch(addToCart(book));
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <Tooltip title="Home" arrow>
          <HomeIcon
            onClick={() => navigate("/userDashBoard")}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              marginRight: "10px",
              color: "blue",
            }}
          />
        </Tooltip>
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <Tooltip title="Search" arrow>
            <SearchIcon style={{ cursor: "pointer", marginLeft: "8px" }} />
          </Tooltip>
        </button>
      </div>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((book) => (
              <div key={book._id} className="search-result-item">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
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
            ))
          ) : (
            <p className="no-results-text">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
