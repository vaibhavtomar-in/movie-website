import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.favorites.find((fav) => fav.Title === movie.Title);
      
      if (!exists) {
        state.favorites.push(movie);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFavorite: (state, action) => {
      const movieTitle = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.Title !== movieTitle);
      saveFavoritesToStorage(state.favorites);
    },
    clearAllFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { addFavorite, removeFavorite, clearAllFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;
export const selectFavoritesCount = (state) => state.favorites.favorites.length;
export const selectIsFavorite = (movieTitle) => (state) => {
  return state.favorites.favorites.some((fav) => fav.Title === movieTitle);
};

export default favoritesSlice.reducer;