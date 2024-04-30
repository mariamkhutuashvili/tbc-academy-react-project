"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ToggleThemeButton() {
  const { t } = useTranslation();

  // Initialize theme state to 'system' by default which matches initial server render
  const [theme, setTheme] = useState<string>("system");

  useEffect(() => {
    // Check if theme is stored in localStorage and update state if so
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Define function to apply the theme
    const applyTheme = (themeValue: string) => {
      const pageContent = document.querySelector(".pages") as HTMLElement;
      pageContent.classList.remove("light-theme", "dark-theme");
      if (themeValue === "light") {
        pageContent.classList.add("light-theme");
      } else if (themeValue === "dark") {
        pageContent.classList.add("dark-theme");
      }
    };

    // Define function to handle system theme changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    // Apply the current theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme !== "system") {
      applyTheme(theme);
    } else {
      applyTheme(mediaQuery.matches ? "dark" : "light");
    }

    // Listen for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      // Cleanup event listener on unmount
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  // Handler to toggle theme state and persist to localStorage
  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  console.log(`Applying theme: ${theme}`);

  return (
    <div className="theme-switcher">
      <button className="button theme-button">{t("theme")}</button>
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
