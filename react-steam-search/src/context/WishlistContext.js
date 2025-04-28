import React, { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (game) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.appid === game.appid)) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const removeFromWishlist = (appid) => {
    setWishlist((prev) => prev.filter((game) => game.appid !== appid));
  };

  const isInWishlist = (appid) => {
    return wishlist.some((game) => game.appid === appid);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
