import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import GameCard from "../common/GameCard/GameCard";
import "./Wishlist.scss";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

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
      <div className="wishlist__games">
        {wishlist.map((game) => (
          <div key={game.appid} className="wishlist__game">
            <GameCard game={game} />
            <button
              onClick={() => removeFromWishlist(game.appid)}
              className="wishlist__remove"
            >
              Usuń z listy życzeń
            </button>
          </div>
        ))}
      </div>
      <Link to="/" className="wishlist__back">
        Wróć do strony głównej
      </Link>
    </div>
  );
};

export default Wishlist;
