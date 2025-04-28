import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import steamService from "../../services/steamService";
import "./GameDetails.scss";

const GameDetails = () => {
  const { appid } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const data = await steamService.getGameDetails(appid);
        if (data) {
          setGame(data);
        } else {
          setError("Nie udało się pobrać szczegółów gry");
        }
      } catch (err) {
        setError("Wystąpił błąd podczas pobierania szczegółów gry");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [appid]);

  if (loading) {
    return <div className="game-details loading">Ładowanie...</div>;
  }

  if (error) {
    return <div className="game-details error">{error}</div>;
  }

  if (!game) {
    return <div className="game-details empty">Gra nie została znaleziona</div>;
  }

  const formatRequirements = (requirements) => {
    if (typeof requirements === "string") return requirements;
    if (typeof requirements === "object") {
      return Object.entries(requirements)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    }
    return "Wymagania sprzętowe niedostępne";
  };

  return (
    <div className="game-details">
      <div className="game-details__header">
        <h1>{game.name}</h1>
        <div className="game-details__actions">
          <Link to="/" className="game-details__back">
            Powrót
          </Link>
          {isInWishlist(game.appid) ? (
            <button
              onClick={() => removeFromWishlist(game.appid)}
              className="game-details__wishlist-remove"
            >
              Usuń z listy życzeń
            </button>
          ) : (
            <button
              onClick={() => addToWishlist(game)}
              className="game-details__wishlist-add"
            >
              Dodaj do listy życzeń
            </button>
          )}
        </div>
      </div>

      <div className="game-details__content">
        <div className="game-details__info">
          <p className="game-details__price">Cena: {game.price}</p>
          <p className="game-details__publisher">Wydawca: {game.publisher}</p>
          <p className="game-details__players">
            Graczy online: {game.players_online}
          </p>
          <p className="game-details__release">
            Data wydania: {game.release_date}
          </p>
        </div>

        <div className="game-details__description">
          <h2>Opis</h2>
          <p>{game.description}</p>
        </div>

        <div className="game-details__requirements">
          <h2>Wymagania sprzętowe</h2>
          <pre>{formatRequirements(game.requirements)}</pre>
        </div>

        <div className="game-details__genres">
          <h2>Gatunki</h2>
          <div className="game-details__tags">
            {game.genres.map((genre, index) => (
              <span key={index} className="game-details__tag">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="game-details__screenshots">
          <h2>Zrzuty ekranu</h2>
          <div className="game-details__screenshots-grid">
            {game.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="game-details__screenshot"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
