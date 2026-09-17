import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { fetchMovieById, TmdbNotFoundError } from '../services/tmdb';

export type MovieDetailsStatus = 'loading' | 'success' | 'not-found' | 'error';

interface UseMovieDetailsResult {
  movie: Movie | null;
  status: MovieDetailsStatus;
}

export function useMovieDetails(id: number | undefined): UseMovieDetailsResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [status, setStatus] = useState<MovieDetailsStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');

      if (id === undefined || Number.isNaN(id)) {
        if (!cancelled) setStatus('not-found');
        return;
      }

      try {
        const data = await fetchMovieById(id);
        if (!cancelled) {
          setMovie(data);
          setStatus('success');
        }
      } catch (err) {
        if (cancelled) return;
        setStatus(err instanceof TmdbNotFoundError ? 'not-found' : 'error');
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { movie, status };
}
