import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { fetchPopularMovies } from '../services/tmdb';

interface UseMoviesListResult {
  movies: Movie[];
  totalPages: number;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

export function useMoviesList(page = 1): UseMoviesListResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchPopularMovies(page);
        if (!cancelled) {
          setMovies(data.movies);
          setTotalPages(Math.max(data.totalPages, 1));
        }
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
  }, [page, reloadIndex]);

  const refetch = () => setReloadIndex((index) => index + 1);

  return { movies, totalPages, loading, error, refetch };
}
