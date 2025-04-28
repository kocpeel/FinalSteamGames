import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPopularPage = location.pathname === "/";
  const isWishlistPage = location.pathname === "/wishlist";
  const isGameDetailsPage = location.pathname.includes("/game/");

  return (
    <nav className="navigation">
      {isGameDetailsPage && (
        <button className="navigation__button" onClick={() => navigate("/")}>
          ← Powrót do popularnych gier
        </button>
      )}
      {!isWishlistPage && (
        <button
          className="navigation__button navigation__button--wishlist"
          onClick={() => navigate("/wishlist")}
        >
          Lista życzeń
        </button>
      )}
    </nav>
  );
};

export default Navigation;
