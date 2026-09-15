import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { fetchMovieById, TmdbNotFoundError } from '../services/tmdb';
import { useFavorites } from '../context/FavoritesContext';
import PageContainer from '../components/PageContainer';
import PosterPlaceholder from '../components/PosterPlaceholder';

type Status = 'loading' | 'success' | 'not-found' | 'error';

function MovieDetailPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;
    const numericId = Number(id);

    async function load() {
      setStatus('loading');

      if (!id || Number.isNaN(numericId)) {
        if (!cancelled) setStatus('not-found');
        return;
      }

      try {
        const data = await fetchMovieById(numericId);
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

  if (status === 'loading') {
    return (
      <PageContainer>
        <p className="text-slate-300">Chargement du film...</p>
      </PageContainer>
    );
  }

  if (status === 'not-found') {
    return (
      <PageContainer>
        <h1 className="text-2xl font-bold text-white">Film introuvable</h1>
        <p className="mt-2 text-slate-300">
          Le film demandé n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/movies" className="mt-4 inline-block text-amber-400 hover:underline">
          Retour aux films
        </Link>
      </PageContainer>
    );
  }

  if (status === 'error' || !movie) {
    return (
      <PageContainer>
        <p className="text-slate-300">Impossible de charger ce film.</p>
        <Link to="/movies" className="mt-4 inline-block text-amber-400 hover:underline">
          Retour aux films
        </Link>
      </PageContainer>
    );
  }

  const favorite = isFavorite(movie.id);
  const formattedDate = movie.releaseDate
    ? new Date(movie.releaseDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Date inconnue';

  return (
    <PageContainer>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="aspect-2/3 w-full rounded-2xl border border-slate-800 object-cover"
          />
        ) : (
          <PosterPlaceholder className="aspect-2/3 w-full rounded-2xl border border-slate-800" />
        )}

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{movie.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-amber-400 px-2.5 py-1 font-bold text-slate-950">
              ★ {movie.rating}
            </span>
            {typeof movie.voteCount === 'number' && <span>{movie.voteCount} votes</span>}
            <span>{formattedDate}</span>
            {movie.duration && <span>{movie.duration} min</span>}
            {movie.originalLanguage && <span>Langue originale : {movie.originalLanguage}</span>}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.productionCountries && movie.productionCountries.length > 0 && (
            <p className="mt-4 text-sm text-slate-400">
              Pays de production : {movie.productionCountries.join(', ')}
            </p>
          )}

          {movie.description && (
            <p className="mt-6 max-w-2xl leading-relaxed text-slate-300">{movie.description}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleFavorite(movie.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                favorite
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            <Link
              to="/movies"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              Retour aux films
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default MovieDetailPage;
