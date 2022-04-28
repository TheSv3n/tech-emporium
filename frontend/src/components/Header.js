import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="title-text">
          <div>The Tech Emporium</div>
        </Link>
        <div>
          <Link to="/cart" className="title-text">
            <span>
              <i className="bi bi-cart3" /> Cart{" "}
              {cartItems.length > 0 ? `(${cartItems.length} items)` : ""}
            </span>
          </Link>
          {userInfo ? (
            <Link to="/profile">
              <span className="menu-item">
                <i className="bi bi-person" /> Profile
              </span>
            </Link>
          ) : (
            <Link to="/login" className="title-text">
              <span className="menu-item">
                <i class="bi bi-box-arrow-in-right" /> Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
