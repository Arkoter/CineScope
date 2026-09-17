import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Movie } from '../types/movie';

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Movie }
  | { type: 'REMOVE_FAVORITE'; payload: { id: number } };

interface FavoritesContextValue {
  favorites: Movie[];
  isFavorite: (id: number) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function favoritesReducer(state: Movie[], action: FavoritesAction): Movie[] {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.some((movie) => movie.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter((movie) => movie.id !== action.payload.id);
    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const isFavorite = (id: number) => favorites.some((movie) => movie.id === id);

  const addFavorite = (movie: Movie) => dispatch({ type: 'ADD_FAVORITE', payload: movie });

  const removeFavorite = (id: number) => dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}
