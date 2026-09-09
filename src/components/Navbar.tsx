const navLinks = ['Accueil', 'Films', 'Favoris', 'Bibliothèque', 'Profil'];

function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b border-gray-300 px-4 py-3">
      <a href="/" className="text-lg font-bold">CineScope</a>

      <ul className="flex gap-4">
        {navLinks.map((label) => (
          <li key={label}>
            <a href="#">{label}</a>
          </li>
        ))}
      </ul>

      <button type="button" className="ml-auto rounded bg-gray-200 px-3 py-1">
        Rechercher
      </button>
    </nav>
  );
}

export default Navbar;
