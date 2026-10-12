import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  return (
    <button type="button" className="nav-btn-link theme-toggle-btn" onClick={toggleTheme} aria-label={label} aria-pressed={isDark} title={label}>
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      <span className="theme-toggle-label">{label}</span>
    </button>
  );
}
