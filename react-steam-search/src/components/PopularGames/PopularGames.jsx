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
      <h2>Popularne Gry</h2>
      <div className="games-grid">
        {games.map((game) => (
          <Link to={`/game/${game.appid}`} key={game.appid}>
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
