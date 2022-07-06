import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const basket = useSelector((state) => state.basket);
  const { basketItems } = basket;

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-text title-text">
          <Link to="/" className="header-text">
            <div>The Tech Emporium</div>
          </Link>
          <form className="search-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Search Products"
              name="search"
              className="search-field"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
        <div className="menu-text">
          <Link to="/basket" className="header-text">
            <span>
              <i className="bi bi-basket2" /> Basket{" "}
              {basketItems.length > 0 ? `(${basketItems.length} items)` : ""}
            </span>
          </Link>
          {userInfo ? (
            <Link to="/profile" className="header-text">
              <span className="menu-item">
                <i className="bi bi-person" /> Profile
              </span>
            </Link>
          ) : (
            <Link to="/login" className="header-text">
              <span className="menu-item">
                <i className="bi bi-box-arrow-in-right" /> Login
              </span>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin" className="header-text">
              <span className="menu-item">
                <i className="bi bi bi-gear" /> Admin
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
