import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameCard from "../common/GameCard/GameCard";
import steamService from "../../services/steamService";
import "./PopularGames.scss";

const PopularGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await steamService.getPopularGames();
        if (data) {
          setGames(data);
        } else {
          setError("Nie udało się pobrać gier");
        }
      } catch (err) {
        setError("Wystąpił błąd podczas pobierania gier");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className="popular-games loading">Ładowanie...</div>;
  }

  if (error) {
    return <div className="popular-games error">{error}</div>;
  }

  if (!games || games.length === 0) {
    return <div className="popular-games empty">Brak dostępnych gier</div>;
  }

  return (
    <div className="popular-games">
      <div className="popular-games__header">
        <h2>Popularne Gry</h2>
        <Link to="/wishlist" className="popular-games__wishlist-link">
          Lista życzeń
        </Link>
      </div>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.appid}
            game={{
              name: game.name,
              appid: game.appid,
              price: game.price,
              publisher: game.publisher,
              description: game.description,
              players_online: game.players_online,
              header_image: game.header_image,
              screenshots: game.screenshots,
              release_date: game.release_date,
              genres: game.genres,
              categories: game.categories,
              requirements: game.requirements,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
