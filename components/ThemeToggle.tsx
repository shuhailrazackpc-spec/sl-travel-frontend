"use client";
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

/**
 * Button that toggles between light and dark themes.  Uses next-themes.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
    </button>
  );
}