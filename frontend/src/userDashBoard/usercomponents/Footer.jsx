import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h2 className="footer__title">Subscribe for Weekly Book Releases</h2>
        <p className="footer__description">
          Stay updated with the latest book releases and exclusive offers.
        </p>
        <form className="footer__form">
          <input
            type="email"
            placeholder="Enter your email"
            className="footer__input"
          />
          <button type="submit" className="footer__button">
            Subscribe
          </button>
        </form>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2025 BookVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
