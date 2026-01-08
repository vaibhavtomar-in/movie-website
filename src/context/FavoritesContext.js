import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.Title === movie.Title)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieTitle) => {
    setFavorites((prev) => prev.filter((fav) => fav.Title !== movieTitle));
  };

  const isFavorite = (movieTitle) => {
    return favorites.some((fav) => fav.Title === movieTitle);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};