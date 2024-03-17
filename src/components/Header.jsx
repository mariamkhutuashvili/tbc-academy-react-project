function Header({ toggleTheme }) {
  return (
    <header className="header">
      <div>
        <button className="button" onClick={toggleTheme}>
          Switch Theme
        </button>
      </div>
      <nav className="nav">
        <a href="#home" className="nav-link">
          Home
        </a>
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#products" className="nav-link">
          Products
        </a>
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
