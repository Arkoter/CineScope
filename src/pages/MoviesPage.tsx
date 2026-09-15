import { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { fetchPopularMovies } from '../services/tmdb';
import MovieGrid from '../components/MovieGrid';
import MoviesErrorState from '../components/MoviesErrorState';
import PaginationControls from '../components/PaginationControls';
import PageContainer from '../components/PageContainer';

function MoviesPage() {
  const [page, setPage] = useState(1);
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
  const goToPreviousPage = () => setPage((current) => Math.max(1, current - 1));
  const goToNextPage = () => setPage((current) => Math.min(totalPages, current + 1));

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold text-white">Films</h1>

      {loading && <p className="text-slate-400">Chargement des films...</p>}
      {error && <MoviesErrorState onRetry={refetch} />}

      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </>
      )}
    </PageContainer>
  );
}

export default MoviesPage;
