import { Link } from 'react-router-dom';
import { useMovies } from '../context/MoviesContext';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';
import MoviesErrorState from '../components/MoviesErrorState';
import PageContainer from '../components/PageContainer';

function FavoritesPage() {
  const { movies, loading, error, refetch } = useMovies();
  const { favorites } = useFavorites();
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold text-white">Mes favoris</h1>

      {loading && <p className="text-slate-400">Chargement des films...</p>}
      {error && <MoviesErrorState onRetry={refetch} />}

      {!loading && !error && favoriteMovies.length > 0 && <MovieGrid movies={favoriteMovies} />}

      {!loading && !error && favoriteMovies.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          <p className="mt-4 text-lg font-semibold text-white">
            Vous n'avez encore aucun film favori.
          </p>
          <p className="mt-1 text-slate-400">
            Ajoutez des films à vos favoris pour les retrouver ici.
          </p>
          <Link
            to="/movies"
            className="mt-6 inline-block rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
          >
            Découvrir les films
          </Link>
        </div>
      )}
    </PageContainer>
  );
}

export default FavoritesPage;
