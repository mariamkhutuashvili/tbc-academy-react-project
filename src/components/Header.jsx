import { Link } from "react-router-dom";

function Header({ toggleTheme }) {
  return (
    <header className="header">
      <div>
        <button className="button" onClick={toggleTheme}>
          Switch Theme
        </button>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/blog" className="nav-link">
          Blog
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Header;
