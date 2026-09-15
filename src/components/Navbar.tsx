import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Films', to: '/movies' },
  { label: 'Favoris', to: '/favorites' },
  { label: 'Bibliothèque', to: '/library' },
  { label: 'Profil', to: '/profile' },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-white"
        >
          Cine<span className="text-amber-400">Scope</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/search"
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400"
        >
          <span aria-hidden></span>
          Rechercher
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
