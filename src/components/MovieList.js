import PropTypes from 'prop-types';
import { MovieCard } from './MovieCard';
import './MovieList.css';

export const MovieList = ({ title, movies, loading, error }) => {
  if (loading) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-section">
        <h2 className="movie-list-title">{title}</h2>
        <div className="no-movies">No movies found</div>
      </div>
    );
  }

  return (
    <div className="movie-list-section">
      <h2 className="movie-list-title">{title}</h2>
      <div className="movie-list-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.Title}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

MovieList.defaultProps = {
  movies: [],
  loading: false,
  error: null,
};