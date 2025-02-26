"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Start with undefined to prevent hydration mismatch instead of default light theme
  const [theme, setTheme] = useState<Theme | undefined>(undefined);
  // const [isInitialized, setIsInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // // This code will only run on the client side
    // const savedTheme = localStorage.getItem("theme") as Theme | null;
    // const initialTheme = savedTheme || "light"; // Default to light theme

    // setTheme(initialTheme);
    // setIsInitialized(true);

    // Get saved theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    // Set the theme
    setTheme(initialTheme);

    // Apply theme to document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Mark as mounted
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (isInitialized) {
  //     localStorage.setItem("theme", theme);
  //     if (theme === "dark") {
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       document.documentElement.classList.remove("dark");
  //     }
  //   }
  // }, [theme, isInitialized]);

  useEffect(() => {
    // Only update localStorage after initial mount and when theme changes
    if (mounted && theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Apply theme to document directly in the toggle function
      // This makes the theme change immediate
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  // During server-side rendering or before hydration, render children without any theme applied
  // After mounting, provide the theme context with actual values
  return (
    <ThemeContext.Provider
      value={{
        theme: (theme as Theme) || "light", // Fallback to light for typing
        toggleTheme,
      }}
    >
      {!mounted ? (
        // Simple wrapper while loading to prevent flash
        <div style={{ visibility: "hidden" }}>{children}</div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
