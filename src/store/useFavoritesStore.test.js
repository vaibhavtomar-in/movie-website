import { renderHook, act } from '@testing-library/react';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
  const mockMovie = {
    Title: 'Test Movie',
    Year: '2024',
    Runtime: '120 min',
    Poster: 'test.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
    // Reset store to initial state
    const { result } = renderHook(() => useFavoritesStore());
    act(() => {
      result.current.clearAllFavorites();
    });
  });

  it('should start with empty favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.getFavoritesCount()).toBe(0);
  });

  it('should add movie to favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    act(() => {
      result.current.addFavorite(mockMovie);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].Title).toBe('Test Movie');
    expect(result.current.isFavorite('Test Movie')).toBe(true);
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    act(() => {
      result.current.addFavorite(mockMovie);
      result.current.addFavorite(mockMovie);
    });
    
    expect(result.current.favorites).toHaveLength(1);
  });

  it('should remove movie from favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    act(() => {
      result.current.addFavorite(mockMovie);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    
    act(() => {
      result.current.removeFavorite('Test Movie');
    });
    
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite('Test Movie')).toBe(false);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    act(() => {
      result.current.addFavorite(mockMovie);
      result.current.addFavorite({ ...mockMovie, Title: 'Another Movie' });
    });
    
    expect(result.current.favorites).toHaveLength(2);
    
    act(() => {
      result.current.clearAllFavorites();
    });
    
    expect(result.current.favorites).toHaveLength(0);
  });

  it('should get favorites count', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    expect(result.current.getFavoritesCount()).toBe(0);
    
    act(() => {
      result.current.addFavorite(mockMovie);
    });
    
    expect(result.current.getFavoritesCount()).toBe(1);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavoritesStore());
    
    act(() => {
      result.current.addFavorite(mockMovie);
    });
    
    const saved = localStorage.getItem('favorites');
    expect(saved).toBeTruthy();
    
    const parsed = JSON.parse(saved);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].Title).toBe('Test Movie');
  });
});