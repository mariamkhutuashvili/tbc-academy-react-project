"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ToggleTheme.css";

export default function ToggleThemeButton() {
  const { t } = useTranslation();

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
      <button className="button"> {t("theme")} </button>
      <div className="theme-switcher-content">
        <button
          className={`button ${theme === "light" ? "active" : ""}`}
          onClick={() => toggleTheme("light")}
        >
          {t("light")}
        </button>
        <button
          className={`button ${theme === "dark" ? "active" : ""}`}
          onClick={() => toggleTheme("dark")}
        >
          {t("dark")}
        </button>
        <button
          className={`button system-mode-button ${
            theme === "system" ? "active" : ""
          }`}
          onClick={() => toggleTheme("system")}
        >
          {t("system")}
        </button>
      </div>
    </div>
  );
}
