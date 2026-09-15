import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function NotFoundPage() {
  return (
    <PageContainer>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-20 text-center">
        <p className="text-5xl font-extrabold text-amber-400">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page introuvable</h1>
        <p className="mt-2 text-slate-400">
          La page que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
