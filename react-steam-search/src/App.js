import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import PopularGames from "./components/PopularGames/PopularGames";
import GameDetails from "./components/GameDetails/GameDetails";
import Wishlist from "./components/Wishlist/Wishlist";
import "./App.scss";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<PopularGames />} />
            <Route path="/game/:appid" element={<GameDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;
