interface MoviesErrorStateProps {
  onRetry: () => void;
}

function MoviesErrorState({ onRetry }: MoviesErrorStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-red-900/50 bg-slate-900/50 px-6 py-16 text-center">
      <p className="text-lg font-semibold text-white">Impossible de charger les films.</p>
      <p className="mt-1 text-slate-400">
        Une erreur est survenue lors de la récupération des données. Veuillez réessayer.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
      >
        Réessayer
      </button>
    </div>
  );
}

export default MoviesErrorState;
