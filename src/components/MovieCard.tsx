import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { useFavorites } from '../context/FavoritesContext';
import PosterPlaceholder from './PosterPlaceholder';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:border-slate-700">
      <div className="relative overflow-hidden">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PosterPlaceholder className="aspect-2/3 w-full" />
        )}
        <span className="absolute right-2 top-2 rounded-full bg-slate-950/80 px-2 py-1 text-xs font-bold text-amber-400">
          ★ {movie.rating}
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(movie.id)}
          aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-sm shadow transition-colors ${
            favorite
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-950/80 text-slate-200 hover:bg-slate-800'
          }`}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold leading-tight text-white">{movie.title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'Date inconnue'}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(movie.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              favorite
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
            }`}
          >
            {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </button>
          <Link
            to={`/movies/${movie.id}`}
            className="rounded-lg border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Voir le film
          </Link>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
