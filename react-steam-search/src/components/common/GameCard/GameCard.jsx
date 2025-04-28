import React from "react";
import "./GameCard.scss";

const GameCard = ({ game }) => {
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
    </div>
  );
};

export default GameCard;
