import { useState } from 'react';
import { useMoviesList } from '../hooks/useMoviesList';
import MovieGrid from '../components/MovieGrid';
import MoviesErrorState from '../components/MoviesErrorState';
import PaginationControls from '../components/PaginationControls';
import PageContainer from '../components/PageContainer';

function MoviesPage() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error, refetch } = useMoviesList(page);

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
