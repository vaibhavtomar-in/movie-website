import { fetchMovies } from './movieService';

describe('Movie Service API Tests', () => {
  
  it('should fetch movies from API', async () => {
    const movies = await fetchMovies();
    
    expect(movies).toBeDefined();
    expect(Array.isArray(movies)).toBe(true);
    expect(movies.length).toBeGreaterThan(0);
  });

  it('should return movies with correct structure', async () => {
    const movies = await fetchMovies();
    const firstMovie = movies[0];
    
    expect(firstMovie).toHaveProperty('Title');
    expect(firstMovie).toHaveProperty('Year');
  });
});