import React from "react";
import "./Profile.css";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function Profile() {
  return (
    <>
      <div className="profile__page">
        <div className="profile__left">
          <div className="profile__section">
            {" "}
            <span className="profile__cart">
              <ShoppingCartIcon />
              <h4>Cart</h4>
            </span>
            <p className="btn-shine">Cart is Empty</p>
          </div>

          <div className="profile__section">
            {" "}
            <span className="profile__wish">
              <FavoriteIcon />
              <h4>Wishlist</h4>
            </span>
            <p className="btn-shine">Wish-List is Empty</p>
          </div>

          <div className="profile__section">
            {" "}
            <span className="profile__sale">
              <LocalOfferIcon />
              <h4>Sale</h4>
            </span>
            <p className="btn-shine">No sales found</p>
          </div>
        </div>
        <div className="profile__right">
          <span className="profile__items">
            <AccountCircleIcon className="spanItem__left" />
            <h4>Profile</h4>
          </span>
          <span className="profile__items">
            <LogoutIcon className="spanItem__left" />
            <h4>Logout</h4>
          </span>
          <span className="profile__items">
            <AdminPanelSettingsIcon className="spanItem__left" />
            <h4>Admin</h4>
          </span>
          <span className="profile__items">
            <HomeIcon className="spanItem__left" />
            <h4>Home</h4>
          </span>
        </div>
      </div>
    </>
  );
}

export default Profile;
