import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import { fetchMovies } from './services/movieService';
import './App.css';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const movies = await fetchMovies();
      setAllMovies(movies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar siteName="MovieHub" />
      
      <main className="main-content">
        <MovieList
          title="All Movies"
          movies={allMovies}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;