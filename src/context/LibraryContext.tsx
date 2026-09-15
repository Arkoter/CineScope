import { createContext, useContext, useState, type ReactNode } from 'react';

export type LibraryStatus = 'to_watch' | 'watching' | 'watched';

interface LibraryContextValue {
  library: Record<number, LibraryStatus>;
  getStatus: (id: number) => LibraryStatus | undefined;
  setStatus: (id: number, status: LibraryStatus) => void;
  removeFromLibrary: (id: number) => void;
}

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<Record<number, LibraryStatus>>({});

  const getStatus = (id: number) => library[id];

  const setStatus = (id: number, status: LibraryStatus) => {
    setLibrary((current) => ({ ...current, [id]: status }));
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
