import React from "react";
import "./Navbar.css";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__left">
        <span className="nav__logo">BookVerse</span>
        <span className="home">
          <Tooltip title="Home" arrow>
            <HomeIcon style={{ marginRight: "5px" }} />
          </Tooltip>
        </span>
      </div>
      <div className="nav__middle">
        <input type="text" placeholder="Search" />
        <Tooltip title="Search" arrow>
          <SearchIcon style={{ cursor: "pointer", marginLeft: "8px" }} />
        </Tooltip>
      </div>
      <div className="nav__right">
        <span className="cart">
          <Tooltip title="Cart" arrow>
            <ShoppingCartIcon style={{ marginRight: "5px" }} />
          </Tooltip>
        </span>
        <span className="wishlist">
          <Tooltip title="WishList" arrow>
            <FavoriteIcon style={{ marginRight: "5px" }} />
          </Tooltip>
        </span>
        <span className="profile">
          <Tooltip title="Profile" arrow>
            <AccountCircleIcon style={{ marginRight: "5px" }} />
          </Tooltip>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
