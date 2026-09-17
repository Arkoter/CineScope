import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Movie } from '../types/movie';

export type LibraryStatus = 'to_watch' | 'watching' | 'watched';

interface LibraryEntry {
  movie: Movie;
  status: LibraryStatus;
}

interface LibraryContextValue {
  library: Record<number, LibraryEntry>;
  getStatus: (id: number) => LibraryStatus | undefined;
  setStatus: (movie: Movie, status: LibraryStatus) => void;
  removeFromLibrary: (id: number) => void;
}

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<Record<number, LibraryEntry>>({});

  const getStatus = (id: number) => library[id]?.status;

  const setStatus = (movie: Movie, status: LibraryStatus) => {
    setLibrary((current) => ({ ...current, [movie.id]: { movie, status } }));
  };

  const removeFromLibrary = (id: number) => {
    setLibrary((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  return (
    <LibraryContext.Provider value={{ library, getStatus, setStatus, removeFromLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary doit être utilisé dans un LibraryProvider');
  }
  return context;
}
