import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { searchMovies } from '../services/tmdb';

interface UseMovieSearchResult {
  results: Movie[];
  loading: boolean;
  error: boolean;
  hasSearched: boolean;
}

export function useMovieSearch(query: string): UseMovieSearchResult {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query === '') return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const data = await searchMovies(query);
        if (!cancelled) {
          setResults(data);
          setHasSearched(true);
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
  }, [query]);

  return { results, loading, error, hasSearched };
}
