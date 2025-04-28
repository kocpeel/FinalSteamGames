import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation__links">
        <Link to="/" className="navigation__link">
          Strona główna
        </Link>
        <Link to="/wishlist" className="navigation__link">
          Lista życzeń
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
