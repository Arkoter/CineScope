import { useMovies } from '../context/MoviesContext';
import MovieGrid from '../components/MovieGrid';
import MoviesErrorState from '../components/MoviesErrorState';
import PageContainer from '../components/PageContainer';

function MoviesPage() {
  const { movies, loading, error, refetch } = useMovies();

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold text-white">Films</h1>

      {loading && <p className="text-slate-400">Chargement des films...</p>}
      {error && <MoviesErrorState onRetry={refetch} />}
      {!loading && !error && <MovieGrid movies={movies} />}
    </PageContainer>
  );
}

export default MoviesPage;
