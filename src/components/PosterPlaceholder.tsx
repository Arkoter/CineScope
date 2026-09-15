interface PosterPlaceholderProps {
  className?: string;
}

function PosterPlaceholder({ className = '' }: PosterPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-800 px-2 text-center text-sm font-medium text-slate-400 ${className}`}
    >
      Affiche indisponible
    </div>
  );
}

export default PosterPlaceholder;
