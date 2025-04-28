import React, { useEffect, useState } from "react";
import GameCard from "../common/GameCard/GameCard";
import Navigation from "../common/Navigation/Navigation";
import { useWishlist } from "../../context/WishlistContext";
import steamService from "../../services/steamService";
import "./Wishlist.scss";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGamesWithPlayers = async () => {
      try {
        const gamesWithPlayers = await Promise.all(
          wishlist.map(async (game) => ({
            ...game,
            currentPlayers: await steamService.getCurrentPlayers(game.appid),
          }))
        );
        setGames(gamesWithPlayers);
      } catch (err) {
        console.error("Error fetching player counts:", err);
        setGames(wishlist);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesWithPlayers();
  }, [wishlist]);

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="wishlist">
      <Navigation />
      <h1 className="wishlist__title">Lista życzeń</h1>
      {games.length === 0 ? (
        <p className="wishlist__empty">Twoja lista życzeń jest pusta</p>
      ) : (
        <div className="wishlist__list">
          {games.map((game) => (
            <GameCard key={game.appid} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
