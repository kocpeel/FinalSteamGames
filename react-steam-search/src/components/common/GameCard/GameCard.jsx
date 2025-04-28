import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";
import "./GameCard.scss";

const GameCard = ({ game }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div className="game-card">
      <div className="game-card__header">
        <h3 className="game-card__title">{game.name}</h3>
        <p className="game-card__price">{game.price}</p>
      </div>
      <div className="game-card__content">
        <p className="game-card__publisher">Wydawca: {game.publisher}</p>
        <p className="game-card__players">
          Graczy online: {game.players_online}
        </p>
        <p className="game-card__description">{game.description}</p>
      </div>
      <div className="game-card__actions">
        <Link to={`/game/${game.appid}`} className="game-card__details">
          Szczegóły
        </Link>
        {isInWishlist(game.appid) ? (
          <button
            onClick={() => removeFromWishlist(game.appid)}
            className="game-card__wishlist-remove"
          >
            Usuń z listy życzeń
          </button>
        ) : (
          <button
            onClick={() => addToWishlist(game)}
            className="game-card__wishlist-add"
          >
            Dodaj do listy życzeń
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;
