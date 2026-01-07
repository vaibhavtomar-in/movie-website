// movies API url
const API_URL = 'https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies';

// Fetch all movies
export const fetchMovies = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Get movies by year (filter function)
export const getMoviesByYear = (movies, year) => {
  return movies.filter(movie => movie.Year === year);
};

// Get image URL (returns poster or placeholder)
export const getImageUrl = (poster) => {
  return poster || 'https://via.placeholder.com/300x450?text=No+Image';
};