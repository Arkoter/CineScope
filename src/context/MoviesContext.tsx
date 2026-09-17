import { createContext, useContext, type ReactNode } from 'react';
import type { Movie } from '../types/movie';
import { useMoviesList } from '../hooks/useMoviesList';

interface MoviesContextValue {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const { movies, loading, error, refetch } = useMoviesList(1);

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
