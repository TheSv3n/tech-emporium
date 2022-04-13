import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="title-text">
          <div>The Tech Emporium</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
