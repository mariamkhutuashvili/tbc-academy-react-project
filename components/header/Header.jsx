import Link from "next/link";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/products" className="nav-link">
          Products
        </Link>
        <Link href="/blog" className="nav-link">
          Blog
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
        <Link href="/profile" className="nav-link">
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
