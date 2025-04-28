import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";
import "./GameCard.scss";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(game.appid);

  const handleGameClick = () => {
    navigate(`/game/${game.appid}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(game.appid);
    } else {
      addToWishlist(game);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 30) {
      return words.slice(0, 30).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="game-card" onClick={handleGameClick}>
      <div className="game-card__header">
        <h3 className="game-card__title">{game.name || "TYTUŁ"}</h3>
        <button
          className={`game-card__wishlist ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlistClick}
        >
          {isWishlisted ? "★" : "☆"}
        </button>
      </div>
      <div className="game-card__content">
        <p className="game-card__publisher">
          Wydawca: {game.publisher || "WYDAWCA"}
        </p>
        <p className="game-card__price">
          Cena: {game.price || "CENA NIEDOSTĘPNA"}
        </p>
        <p className="game-card__players">
          Graczy online: {game.currentPlayers || "BRAK DANYCH"}
        </p>
        <p className="game-card__description">
          {truncateDescription(game.description || "OPIS")}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
