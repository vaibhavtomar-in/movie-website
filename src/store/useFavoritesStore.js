import { create } from 'zustand';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
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

export const useFavoritesStore = create((set, get) => ({
  // State
  favorites: loadFavoritesFromStorage(),

  // Actions
  addFavorite: (movie) => set((state) => {
    console.log('Adding favorite:', movie);
    const exists = state.favorites.find((fav) => fav.Title === movie.Title);
    
    if (exists) {
      return state; // No change if already exists
    }
    
    const newFavorites = [...state.favorites, movie];
    saveFavoritesToStorage(newFavorites);
    return { favorites: newFavorites };
  }),

  removeFavorite: (movieTitle) => set((state) => {
    console.log('Removing favorite:', movieTitle);
    const newFavorites = state.favorites.filter((fav) => fav.Title !== movieTitle);
    saveFavoritesToStorage(newFavorites);
    return { favorites: newFavorites };
  }),

  clearAllFavorites: () => set(() => {
    saveFavoritesToStorage([]);
    return { favorites: [] };
  }),

  // Computed/Selector functions
  isFavorite: (movieTitle) => {
    const state = get();
    return state.favorites.some((fav) => fav.Title === movieTitle);
  },

  getFavoritesCount: () => {
    const state = get();
    return state.favorites.length;
  },
}));