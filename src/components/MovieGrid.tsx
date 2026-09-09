import { movies } from '../data/movies';
import MovieCard from './MovieCard';

function MovieGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
