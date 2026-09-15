export interface Movie {
  id: number;
  title: string;
  poster: string | null;
  releaseDate: string;
  rating: number;
  voteCount?: number;
  genres?: string[];
  duration?: number;
  description?: string;
  originalLanguage?: string;
  productionCountries?: string[];
}
