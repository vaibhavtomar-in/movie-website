import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite, favoritesCount } = useFavorites();
  
  const mockMovie = {
    Title: 'Test Movie',
    Year: '2024',
    Runtime: '120 min',
    Poster: 'test.jpg',
  };
  
  return (
    <div>
      <span data-testid="count">{favoritesCount}</span>
      <span data-testid="is-favorite">{isFavorite('Test Movie').toString()}</span>
      <button onClick={() => addFavorite(mockMovie)}>Add Favorite</button>
      <button onClick={() => removeFavorite('Test Movie')}>Remove Favorite</button>
      <div data-testid="favorites-list">
        {favorites.map((fav) => (
          <div key={fav.Title}>{fav.Title}</div>
        ))}
      </div>
    </div>
  );
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
  });

  it('should add movie to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    const addButton = screen.getByText('Add Favorite');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('should remove movie from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    const addButton = screen.getByText('Add Favorite');
    const removeButton = screen.getByText('Remove Favorite');
    
    fireEvent.click(addButton);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    
    fireEvent.click(removeButton);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
  });

  it('should not add duplicate favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    const addButton = screen.getByText('Add Favorite');
    
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('should persist favorites to localStorage', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    const addButton = screen.getByText('Add Favorite');
    fireEvent.click(addButton);
    
    const saved = localStorage.getItem('favorites');
    expect(saved).toBeTruthy();
    
    const parsed = JSON.parse(saved);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].Title).toBe('Test Movie');
  });
});