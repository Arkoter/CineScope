import { useState } from 'react';
import { useMovieSearch } from '../hooks/useMovieSearch';
import MovieGrid from '../components/MovieGrid';
import PageContainer from '../components/PageContainer';

function SearchPage() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const { results, loading, error, hasSearched } = useMovieSearch(query);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (trimmed === '') return;
    setQuery(trimmed);
  };

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold text-white">Rechercher un film</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            aria-label="Rechercher un film"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Titre du film..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
          >
            Rechercher
          </button>
        </div>
      </form>

      {loading && <p className="text-slate-400">Recherche en cours...</p>}

      {error && (
        <div className="rounded-2xl border border-dashed border-red-900/50 bg-slate-900/50 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white">Impossible d'effectuer la recherche.</p>
          <p className="mt-1 text-slate-400">Une erreur est survenue. Veuillez réessayer.</p>
        </div>
      )}

      {!loading && !error && hasSearched && results.length > 0 && <MovieGrid movies={results} />}

      {!loading && !error && hasSearched && results.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white">Aucun résultat pour cette recherche.</p>
          <p className="mt-1 text-slate-400">Essayez avec un autre titre.</p>
        </div>
      )}
    </PageContainer>
  );
}

export default SearchPage;
