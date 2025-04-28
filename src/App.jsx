import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import Navigation from "./components/common/Navigation/Navigation";
import PopularGames from "./components/PopularGames/PopularGames";
import GameDetails from "./components/GameDetails/GameDetails";
import Wishlist from "./components/Wishlist/Wishlist";
import "./App.scss";

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="app__content">
            <Routes>
              <Route path="/" element={<PopularGames />} />
              <Route path="/game/:appid" element={<GameDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WishlistProvider>
  );
};

export default App;
