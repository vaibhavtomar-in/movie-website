import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearAllFavorites,
  selectFavorites,
  selectFavoritesCount,
  selectIsFavorite,
} from './favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    favorites: [],
  };

  const mockMovie = {
    Title: 'Test Movie',
    Year: '2024',
    Runtime: '120 min',
    Poster: 'test.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addFavorite', () => {
    const actual = favoritesReducer(initialState, addFavorite(mockMovie));
    expect(actual.favorites).toHaveLength(1);
    expect(actual.favorites[0].Title).toBe('Test Movie');
  });

  it('should not add duplicate favorites', () => {
    let state = favoritesReducer(initialState, addFavorite(mockMovie));
    state = favoritesReducer(state, addFavorite(mockMovie));
    expect(state.favorites).toHaveLength(1);
  });

  it('should handle removeFavorite', () => {
    let state = favoritesReducer(initialState, addFavorite(mockMovie));
    state = favoritesReducer(state, removeFavorite('Test Movie'));
    expect(state.favorites).toHaveLength(0);
  });

  it('should handle clearAllFavorites', () => {
    let state = favoritesReducer(initialState, addFavorite(mockMovie));
    state = favoritesReducer(state, clearAllFavorites());
    expect(state.favorites).toHaveLength(0);
  });

  it('should select favorites', () => {
    const state = { favorites: { favorites: [mockMovie] } };
    expect(selectFavorites(state)).toEqual([mockMovie]);
  });

  it('should select favorites count', () => {
    const state = { favorites: { favorites: [mockMovie] } };
    expect(selectFavoritesCount(state)).toBe(1);
  });

  it('should select if movie is favorite', () => {
    const state = { favorites: { favorites: [mockMovie] } };
    expect(selectIsFavorite('Test Movie')(state)).toBe(true);
    expect(selectIsFavorite('Other Movie')(state)).toBe(false);
  });
});