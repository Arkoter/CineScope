import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Movie } from '../types/movie';
import { fetchPopularMovies } from '../services/tmdb';

interface MoviesContextValue {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchPopularMovies();
        if (!cancelled) setMovies(data.movies);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadIndex]);

  const refetch = () => setReloadIndex((index) => index + 1);

  return (
    <MoviesContext.Provider value={{ movies, loading, error, refetch }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies doit être utilisé dans un MoviesProvider');
  }
  return context;
}
