import { Link } from "react-router-dom";
import "./Header.css";

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
        <Link to="/profile" className="nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
