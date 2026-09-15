import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TMDB_MAX_PAGE = 500;

const languageNames = new Intl.DisplayNames(['fr'], { type: 'language' });
const regionNames = new Intl.DisplayNames(['fr'], { type: 'region' });

export class TmdbNotFoundError extends Error {
  constructor() {
    super('Ressource introuvable');
    this.name = 'TmdbNotFoundError';
  }
}

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbCountry {
  iso_3166_1: string;
  name: string;
}

interface TmdbMovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
}

interface TmdbMovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: TmdbGenre[];
  runtime: number | null;
  overview: string;
  original_language: string;
  production_countries: TmdbCountry[];
}

interface TmdbConfiguration {
  images: {
    secure_base_url: string;
    poster_sizes: string[];
  };
}

interface ImageConfig {
  baseUrl: string;
  posterSize: string;
}

async function tmdbFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    throw new TmdbNotFoundError();
  }

  if (!response.ok) {
    throw new Error(`Erreur TMDB (${response.status})`);
  }

  return response.json() as Promise<T>;
}

let genresPromise: Promise<Map<number, string>> | null = null;

function getGenreMap(): Promise<Map<number, string>> {
  if (!genresPromise) {
    genresPromise = tmdbFetch<{ genres: TmdbGenre[] }>(
      '/genre/movie/list?language=fr-FR',
    ).then((data) => new Map(data.genres.map((genre) => [genre.id, genre.name])));
  }
  return genresPromise;
}

let imageConfigPromise: Promise<ImageConfig> | null = null;

function getImageConfig(): Promise<ImageConfig> {
  if (!imageConfigPromise) {
    imageConfigPromise = tmdbFetch<TmdbConfiguration>('/configuration').then((data) => {
      const sizes = data.images.poster_sizes;
      const posterSize = sizes.includes('w500') ? 'w500' : (sizes.at(-2) ?? 'original');
      return { baseUrl: data.images.secure_base_url, posterSize };
    });
  }
  return imageConfigPromise;
}

function buildPosterUrl(path: string | null, config: ImageConfig): string | null {
  return path ? `${config.baseUrl}${config.posterSize}${path}` : null;
}

function getLanguageName(code: string): string | undefined {
  try {
    return code ? languageNames.of(code) : undefined;
  } catch {
    return undefined;
  }
}

function getCountryName(country: TmdbCountry): string {
  try {
    return regionNames.of(country.iso_3166_1) ?? country.name;
  } catch {
    return country.name;
  }
}

function mapMovieSummary(
  raw: TmdbMovieSummary,
  genreMap: Map<number, string>,
  imageConfig: ImageConfig,
): Movie {
  return {
    id: raw.id,
    title: raw.title,
    poster: buildPosterUrl(raw.poster_path, imageConfig),
    releaseDate: raw.release_date,
    rating: Math.round(raw.vote_average * 10) / 10,
    voteCount: raw.vote_count,
    genres: raw.genre_ids
      .map((id) => genreMap.get(id))
      .filter((name): name is string => Boolean(name)),
    description: raw.overview,
  };
}

function mapMovieDetail(raw: TmdbMovieDetail, imageConfig: ImageConfig): Movie {
  return {
    id: raw.id,
    title: raw.title,
    poster: buildPosterUrl(raw.poster_path, imageConfig),
    releaseDate: raw.release_date,
    rating: Math.round(raw.vote_average * 10) / 10,
    voteCount: raw.vote_count,
    genres: raw.genres.map((genre) => genre.name),
    duration: raw.runtime ?? undefined,
    description: raw.overview,
    originalLanguage: getLanguageName(raw.original_language),
    productionCountries: raw.production_countries.map(getCountryName),
  };
}

export interface PaginatedMovies {
  movies: Movie[];
  page: number;
  totalPages: number;
}

export async function fetchPopularMovies(page = 1): Promise<PaginatedMovies> {
  const [genreMap, imageConfig, data] = await Promise.all([
    getGenreMap(),
    getImageConfig(),
    tmdbFetch<{ results: TmdbMovieSummary[]; page: number; total_pages: number }>(
      `/movie/popular?language=fr-FR&page=${page}`,
    ),
  ]);

  return {
    movies: data.results.map((movie) => mapMovieSummary(movie, genreMap, imageConfig)),
    page: data.page,
    totalPages: Math.min(data.total_pages, TMDB_MAX_PAGE),
  };
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const [genreMap, imageConfig, data] = await Promise.all([
    getGenreMap(),
    getImageConfig(),
    tmdbFetch<{ results: TmdbMovieSummary[] }>(
      `/search/movie?language=fr-FR&include_adult=false&query=${encodeURIComponent(query)}`,
    ),
  ]);

  return data.results.map((movie) => mapMovieSummary(movie, genreMap, imageConfig));
}

export async function fetchMovieById(id: number): Promise<Movie> {
  const [imageConfig, data] = await Promise.all([
    getImageConfig(),
    tmdbFetch<TmdbMovieDetail>(`/movie/${id}?language=fr-FR`),
  ]);

  return mapMovieDetail(data, imageConfig);
}
