import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../store/themeSlice";

function ThemeToggle() {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.theme?.mode || "light");

  const isDark = mode === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

export default ThemeToggle;
