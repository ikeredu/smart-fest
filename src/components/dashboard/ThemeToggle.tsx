'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-20 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse border border-slate-300 dark:border-slate-700" />
    );
  }

  return (
    <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs shadow-inner">
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Modo Claro"
        className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-sm font-bold scale-105'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Modo Oscuro (Navy)"
        className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-slate-800 text-indigo-400 shadow-sm font-bold scale-105 border border-slate-700'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        title="Tema del Sistema"
        className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm font-bold scale-105'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
