import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import { removeFromWishlist } from "../../../redux/slices/wishlistSlice";
import "./Profile.css";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonIcon from "@mui/icons-material/Person";
import BookModel from "../../../home/BookModel";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom"; // add this import
import CloseIcon from "@mui/icons-material/Close";

function Profile() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const books = useSelector((state) => state.books); // Assumes all books are in state.books
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSection, setShowSection] = useState(null); // 'wishlist' | 'sale' | null
  const navigate = useNavigate(); // add this line
  // Track open state for each section
  const [openSections, setOpenSections] = useState({
    wishlist: false,
    sale: false,
  });

  // Open section on icon hover
  const handleOpenSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: true }));
  };

  // Close section on close button
  const handleCloseSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: false }));
  };

  // Get current user email from Firebase auth
  const userEmail = auth.currentUser ? auth.currentUser.email : "Profile";
  // Generate a random seed for the avatar (per session)
  const [avatarSeed] = useState(() =>
    Math.random().toString(36).substring(2, 10)
  );

  // Filter books that are on sale
  const saleBooks = Array.isArray(books)
    ? books.filter((book) => book.sale === true || book.onSale === true)
    : [];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Optionally clear localStorage or redirect
        localStorage.removeItem("isAdmin");
        window.location.reload(); // or use navigation if using react-router
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <div className="profile__page">
        <div className="profile__left">
          <div className="profile__section">
            <span className="profile__cart">
              <ShoppingCartIcon />
              <h4>Cart</h4>
            </span>
            {cart.length === 0 ? (
              <p className="btn-shine">Cart is Empty</p>
            ) : (
              <div className="profile__cart-items-list">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="profile__cart-item profile__cart-book-small"
                    onClick={() => setSelectedBook(item)}
                  >
                    <div className="profile__cart-img-container">
                      <img
                        src={
                          item.image && item.image.trim() !== ""
                            ? item.image
                            : "/placeholder-book.png"
                        }
                        alt={item.title}
                        className="profile__cart-img"
                      />
                    </div>
                    <div className="profile__cart-info">
                      <h3 className="profile__cart-title">{item.title}</h3>
                      <div className="profile__cart-author flex items-center gap-1">
                        <PersonIcon
                          className="text-blue-400"
                          fontSize="small"
                        />
                        <span>{item.author}</span>
                      </div>
                      {item.price !== undefined && (
                        <div className="profile__cart-price flex items-center gap-1">
                          <span className="text-blue-700 font-semibold">
                            R{item.price}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="profile__cart-actions">
                      <button
                        className="profile__cart-remove-btn flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeFromCart(item));
                        }}
                        title="Remove from Cart"
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
                {selectedBook && (
                  <BookModel
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                  />
                )}
              </div>
            )}
          </div>
          {/* Wishlist section as flex sibling, visible only if openSections.wishlist */}
          {openSections.wishlist && (
            <div className="profile__section">
              <span className="profile__wish">
                <FavoriteIcon />
                <h4>Wishlist</h4>
                <button
                  className="profile__close-btn"
                  onClick={() => handleCloseSection("wishlist")}
                  title="Close"
                  type="button"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </span>
              {wishlist.length === 0 ? (
                <p className="btn-shine">Wish-List is Empty</p>
              ) : (
                <div className="profile__cart-items-list">
                  {wishlist.map((item) => (
                    <div
                      key={item._id}
                      className="profile__cart-item profile__cart-book-small"
                      onClick={() => setSelectedBook(item)}
                    >
                      <div className="profile__cart-img-container">
                        <img
                          src={
                            item.image && item.image.trim() !== ""
                              ? item.image
                              : "/placeholder-book.png"
                          }
                          alt={item.title}
                          className="profile__cart-img"
                        />
                      </div>
                      <div className="profile__cart-info">
                        <h3 className="profile__cart-title">{item.title}</h3>
                        <div className="profile__cart-author flex items-center gap-1">
                          <PersonIcon
                            className="text-blue-400"
                            fontSize="small"
                          />
                          <span>{item.author}</span>
                        </div>
                        {item.price !== undefined && (
                          <div className="profile__cart-price flex items-center gap-1">
                            <span className="text-blue-700 font-semibold">
                              R{item.price}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="profile__cart-actions">
                        <button
                          className="profile__cart-remove-btn flex items-center gap-1"
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
                  {selectedBook && (
                    <BookModel
                      book={selectedBook}
                      onClose={() => setSelectedBook(null)}
                    />
                  )}
                </div>
              )}
            </div>
          )}
          {/* Sale section as flex sibling, visible only if openSections.sale */}
          {openSections.sale && (
            <div className="profile__section">
              <span className="profile__sale">
                <LocalOfferIcon />
                <h4>Sale</h4>
                <button
                  className="profile__close-btn"
                  onClick={() => handleCloseSection("sale")}
                  title="Close"
                  type="button"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </span>
              {saleBooks.length === 0 ? (
                <p className="btn-shine">No sales found</p>
              ) : (
                <div className="profile__cart-items-list">
                  {saleBooks.map((item) => (
                    <div
                      key={item._id}
                      className="profile__cart-item profile__cart-book-small"
                      onClick={() => setSelectedBook(item)}
                    >
                      <div className="profile__cart-img-container">
                        <img
                          src={
                            item.image && item.image.trim() !== ""
                              ? item.image
                              : "/placeholder-book.png"
                          }
                          alt={item.title}
                          className="profile__cart-img"
                        />
                      </div>
                      <div className="profile__cart-info">
                        <h3 className="profile__cart-title">{item.title}</h3>
                        <div className="profile__cart-author flex items-center gap-1">
                          <PersonIcon
                            className="text-blue-400"
                            fontSize="small"
                          />
                          <span>{item.author}</span>
                        </div>
                        {item.price !== undefined && (
                          <div className="profile__cart-price flex items-center gap-1">
                            <span className="text-blue-700 font-semibold">
                              R{item.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedBook && (
                    <BookModel
                      book={selectedBook}
                      onClose={() => setSelectedBook(null)}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="profile__right">
          <span className="profile__items">
            {/* Replace icon with random cartoon avatar */}
            <img
              src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${avatarSeed}`}
              alt="avatar"
              className="spanItem__left"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 8,
              }}
            />
            <h4
              style={{
                fontSize: "0.95rem",
                maxWidth: 140,
                height: 30,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                margin: 0,
                padding: 0,
                fontWeight: 400,
              }}
              title={userEmail}
            >
              {userEmail}
            </h4>
          </span>
          <span
            className="profile__items"
            onMouseEnter={() => handleOpenSection("wishlist")}
            style={{ cursor: "pointer" }}
          >
            <FavoriteIcon className="spanItem__left" />
            <h4>Wishlist</h4>
          </span>
          <span
            className="profile__items"
            onMouseEnter={() => handleOpenSection("sale")}
            style={{ cursor: "pointer" }}
          >
            <LocalOfferIcon className="spanItem__left" />
            <h4>Sale</h4>
          </span>
          <span className="profile__items" onClick={handleLogout}>
            <LogoutIcon className="spanItem__left" />
            <h4>Logout</h4>
          </span>
          <span
            className="profile__items"
            onClick={() => navigate("/")} // add navigation on click
            style={{ cursor: "pointer" }} // optional: show pointer cursor
          >
            <HomeIcon className="spanItem__left" />
            <h4>Home</h4>
          </span>
        </div>
      </div>
    </>
  );
}

export default Profile;
