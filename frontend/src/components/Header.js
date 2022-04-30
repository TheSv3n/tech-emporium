import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="title-text">
          <div>The Tech Emporium</div>
        </Link>
        <div>
          <Link to="/basket" className="title-text">
            <span>
              <i className="bi bi-basket2" /> Basket{" "}
              {basketItems.length > 0 ? `(${basketItems.length} items)` : ""}
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
                <i className="bi bi-box-arrow-in-right" /> Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
