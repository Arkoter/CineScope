import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded border border-gray-300 p-3">
      <img src={movie.poster} alt={movie.title} className="w-full rounded" />

      <h3 className="font-bold">{movie.title}</h3>
      <p className="text-sm text-gray-600">Année : {movie.year}</p>
      <p className="text-sm text-gray-600">Note : {movie.rating}</p>

      <button type="button" className="rounded bg-gray-200 px-2 py-1 text-sm">
        Ajouter aux favoris
      </button>
      <button type="button" className="rounded bg-blue-600 px-2 py-1 text-sm text-white">
        Voir le film
      </button>
    </article>
  );
}

export default MovieCard;
