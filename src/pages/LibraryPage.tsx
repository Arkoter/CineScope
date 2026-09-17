import type { Movie } from '../types/movie';
import { useLibrary, type LibraryStatus } from '../context/LibraryContext';
import MovieGrid from '../components/MovieGrid';
import PageContainer from '../components/PageContainer';

const categories: { status: LibraryStatus; title: string }[] = [
  { status: 'to_watch', title: 'À regarder' },
  { status: 'watching', title: 'En cours' },
  { status: 'watched', title: 'Vu' },
];

function LibrarySection({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p className="text-slate-400">Aucun film dans cette liste.</p>
      )}
    </section>
  );
}

function LibraryPage() {
  const { library } = useLibrary();
  const entries = Object.values(library);

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-white">Ma bibliothèque</h1>

      {categories.map(({ status, title }) => (
        <LibrarySection
          key={status}
          title={title}
          movies={entries.filter((entry) => entry.status === status).map((entry) => entry.movie)}
        />
      ))}
    </PageContainer>
  );
}

export default LibraryPage;
