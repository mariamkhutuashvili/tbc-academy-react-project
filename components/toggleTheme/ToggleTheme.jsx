"use client";

import { useEffect, useState } from "react";
import "./ToggleTheme.css";

export default function ToggleThemeButton() {
  // Initialize theme state from localStorage or default to 'system'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    // Define function to apply the theme
    const applyTheme = (theme) => {
      const pageContent = document.querySelector(".pages");
      pageContent.classList.remove("light-theme", "dark-theme");
      if (theme === "light") {
        pageContent.classList.add("light-theme");
      } else if (theme === "dark") {
        pageContent.classList.add("dark-theme");
      }
    };

    // Define function to handle system theme changes
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    // Apply the current theme
    if (theme !== "system") {
      applyTheme(theme);
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(isDarkMode ? "dark" : "light");
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSystemThemeChange);

    // Cleanup event listener on unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Handler to toggle theme state and persist to localStorage
  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="theme-switcher">
      <button className="button">Theme </button>
      <div className="theme-switcher-content">
        <button
          className={`button ${theme === "light" ? "active" : ""}`}
          onClick={() => toggleTheme("light")}
        >
          Light
        </button>
        <button
          className={`button ${theme === "dark" ? "active" : ""}`}
          onClick={() => toggleTheme("dark")}
        >
          Dark
        </button>
        <button
          className={`button system-mode-button ${
            theme === "system" ? "active" : ""
          }`}
          onClick={() => toggleTheme("system")}
        >
          <span className="system-mode-icon"> </span>
          System
        </button>
      </div>
    </div>
  );
}
