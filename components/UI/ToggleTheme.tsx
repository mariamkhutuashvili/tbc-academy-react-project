"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../../locales/client";

export default function ToggleThemeButton() {
  const t = useI18n();

  // Initialize theme state to 'system' by default which matches initial server render
  const [theme, setTheme] = useState<string>("system");
  const [systemTheme, setSystemTheme] = useState<string>("light");

  useEffect(() => {
    // Check if theme is stored in localStorage and update state if so
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Check the system theme and set it
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    // Add listener to update system theme on change
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  useEffect(() => {
    // Define function to apply the theme
    const applyTheme = (themeValue: string) => {
      const appContainer = document.getElementById("app-container");
      if (appContainer) {
        appContainer.classList.remove("light-theme", "dark-theme");
        if (themeValue === "light") {
          appContainer.classList.add("light-theme");
        } else if (themeValue === "dark") {
          appContainer.classList.add("dark-theme");
        }
      }
    };

    // Apply the current theme
    if (theme !== "system") {
      applyTheme(theme);
    } else {
      applyTheme(systemTheme);
    }
  }, [theme, systemTheme]);

  // Handler to toggle theme state and persist to localStorage
  const toggleTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  const getThemeIcon = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "light") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="theme-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      );
    } else if (currentTheme === "dark") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="theme-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="theme-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          />
        </svg>
      );
    }
  };

  return (
    <div className="theme-switcher">
      <button className="button theme-button">{getThemeIcon()}</button>
      <div className="theme-switcher-content">
        <button
          className={`button ${theme === "light" ? "active" : ""}`}
          onClick={() => toggleTheme("light")}
          aria-label="Light Theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="theme-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          {t("light")}
        </button>
        <button
          className={`button ${theme === "dark" ? "active" : ""}`}
          onClick={() => toggleTheme("dark")}
          aria-label="Dark Theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="theme-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          {t("dark")}
        </button>
        <button
          className={`button system-mode-button ${
            theme === "system" ? "active" : ""
          }`}
          onClick={() => toggleTheme("system")}
          aria-label="System Theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="theme-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
          {t("system")}
        </button>
      </div>
    </div>
  );
}
