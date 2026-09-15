import { useMovies } from '../context/MoviesContext';
import MovieGrid from '../components/MovieGrid';
import MoviesErrorState from '../components/MoviesErrorState';
import PageContainer from '../components/PageContainer';

function HomePage() {
  const { movies, loading, error, refetch } = useMovies();

  return (
    <PageContainer>
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-6 py-14 text-center sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
          CineScope
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Découvrez votre prochain film
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Explorez des films, trouvez vos favoris et construisez votre bibliothèque personnelle.
        </p>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">Films populaires</h2>
          {!loading && !error && <span className="text-sm text-slate-400">{movies.length} films</span>}
        </div>

        {loading && <p className="text-slate-400">Chargement des films...</p>}
        {error && <MoviesErrorState onRetry={refetch} />}
        {!loading && !error && <MovieGrid movies={movies} />}
      </section>
    </PageContainer>
  );
}

export default HomePage;
