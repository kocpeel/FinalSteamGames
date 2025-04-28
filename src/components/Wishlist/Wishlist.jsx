import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import GameCard from "../common/GameCard/GameCard";
import "./Wishlist.scss";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist">
        <div className="wishlist__empty">
          <h2>Lista życzeń jest pusta</h2>
          <Link to="/" className="wishlist__back">
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h2>Lista życzeń</h2>
      <div className="games-grid">
        {wishlist.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
      <Link to="/" className="wishlist__back">
        Wróć do strony głównej
      </Link>
    </div>
  );
};

export default Wishlist;
