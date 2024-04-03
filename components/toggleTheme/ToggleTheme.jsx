"use client";

import "./ToggleTheme.css";

export default function ToggleThemeButton() {
  const toggleTheme = () => {
    const pageContent = document.querySelector(".pages");
    pageContent.classList.toggle("dark-theme");
  };

  return (
    <button className="button" onClick={toggleTheme}>
      Switch Theme
    </button>
  );
}
