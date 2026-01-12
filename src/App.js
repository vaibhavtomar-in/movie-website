import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MovieList } from './components/MovieList';
import { fetchMovies } from './services/movieService';
import './App.css';

export const App = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const loadMovies = async () => {
      try{
        const movieApiResponse = await fetchMovies(abortController.signal);
        if (movieApiResponse){
          setAllMovies(movieApiResponse);
          setLoading(false);
        }
      }catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
    };

    loadMovies();

    return () => {
    abortController.abort(); // Cleanup: cancel request on unmount
    };

  },[])

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