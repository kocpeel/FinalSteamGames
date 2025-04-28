import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../common/Navigation/Navigation";
import { useWishlist } from "../../context/WishlistContext";
import steamService from "../../services/steamService";
import "./GameDetails.scss";

const GameDetails = () => {
  const { appid } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(appid);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameDetails = await steamService.getGameDetails(appid);
        if (gameDetails) {
          setGame(gameDetails);
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

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(appid);
    } else {
      addToWishlist({
        appid,
        name: game?.name,
        price: game?.price,
        publisher: game?.publisher,
        description: game?.description,
      });
    }
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!game) {
    return <div className="error">Gra nie została znaleziona</div>;
  }

  return (
    <div className="game-details">
      <Navigation />
      <div className="game-details__content">
        <h1 className="game-details__title">{game.name}</h1>
        <div className="game-details__info">
          <p className="game-details__publisher">Wydawca: {game.publisher}</p>
          <p className="game-details__price">Cena: {game.price}</p>
          <p className="game-details__players">
            Graczy online: {game.currentPlayers || "BRAK DANYCH"}
          </p>
        </div>
        <div className="game-details__description">
          <h2>Opis</h2>
          <p>{game.description}</p>
        </div>
        <div className="game-details__requirements">
          <h2>Wymagania sprzętowe</h2>
          <div dangerouslySetInnerHTML={{ __html: game.requirements }} />
        </div>
        <button
          className={`game-details__wishlist ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlistClick}
        >
          {isWishlisted ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
