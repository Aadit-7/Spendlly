import { useEffect, useState } from "react";

import {
  Menu,
  Wallet,
  Moon,
  Sun,
} from "lucide-react";

import Sidebar from "./Sidebar";

function PageLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    localStorage.setItem(
      "theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((previousTheme) => !previousTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-[#020617]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-64">
        {/* Mobile Header */}

        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 transition-colors duration-300 dark:border-slate-800 dark:bg-[#0b1120] lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-blue-500">
              <Wallet size={18} />
            </div>

            <div>
              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                Spendly
              </span>

              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Expense Tracker
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}

            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
              title={
                isDarkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            {/* Mobile Menu */}

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>
          </div>
        </header>

        {/* Desktop Theme Toggle */}

        <div className="fixed right-6 top-6 z-30 hidden lg:block">
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-100 hover:shadow-md dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:shadow-lg dark:shadow-black/20 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
            title={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}

export default PageLayout;