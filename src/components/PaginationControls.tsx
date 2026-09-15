interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

function PaginationControls({ page, totalPages, onPrevious, onNext }: PaginationControlsProps) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <nav
      aria-label="Pagination du catalogue"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstPage}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:text-slate-200"
      >
        Page précédente
      </button>

      <span aria-current="page" className="text-sm font-medium text-slate-300">
        Page {page} sur {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isLastPage}
        className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:text-slate-200"
      >
        Page suivante
      </button>
    </nav>
  );
}

export default PaginationControls;
