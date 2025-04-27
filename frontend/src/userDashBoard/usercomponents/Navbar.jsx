import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon
import { Link } from "react-router-dom"; // Import Link from react-router-dom
/* import Profile from "./userpages/Profile"; */

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate(); // Initialize useNavigate

  // Avatar seed logic (shared with Profile)
  const [avatarSeed, setAvatarSeed] = useState(() => {
    // Try to get from localStorage, else generate and store
    let seed = localStorage.getItem("avatarSeed");
    if (!seed) {
      seed = Math.random().toString(36).substring(2, 10);
      localStorage.setItem("avatarSeed", seed);
    }
    return seed;
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/userDashBoard/search?query=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  return (
    <nav className="nav">
      <div className="nav__left">
        <span className="nav__logo">BookVerse</span>
        {/* <span className="home">
          <Tooltip title="Home" arrow>
            <HomeIcon style={{ marginRight: "5px" }} />
          </Tooltip>
        </span> */}
      </div>
      <div className="nav__middle">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <Tooltip title="Search" arrow>
          <SearchIcon
            style={{ cursor: "pointer", marginLeft: "8px" }}
            onClick={handleSearch} // Trigger search on click
          />
        </Tooltip>
      </div>
      <div className="nav__right">
        <Link to="/userDashBoard/cart">
          <span className="cart-span">
            <Tooltip title="Cart" arrow>
              <ShoppingCartIcon style={{ marginRight: "5px" }} />
            </Tooltip>
          </span>
        </Link>

        <Link to="/userDashBoard/wishlist">
          <span className="wishlist">
            <Tooltip title="WishList-icon" arrow>
              <FavoriteIcon style={{ marginRight: "5px" }} />
            </Tooltip>
          </span>
        </Link>

        <Link to="/userDashBoard/profile">
          {" "}
          {/* Ensure this matches the route in App.jsx */}
          <span className="profile-span">
            <Tooltip title="Profile" arrow>
              {/* Show avatar image instead of AccountCircleIcon */}
              <img
                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${avatarSeed}`}
                alt="avatar"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  marginRight: 5,
                  verticalAlign: "middle",
                  objectFit: "cover",
                  background: "#eee",
                }}
              />
            </Tooltip>
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
