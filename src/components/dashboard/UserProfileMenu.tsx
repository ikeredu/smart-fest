/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { logoutAction } from '@/app/(auth)/actions';

interface UserProfileMenuProps {
  userName: string;
  userEmail: string;
  userRole: string;
  avatarUrl?: string | null;
}

const emptySubscribe = () => () => {};

export default function UserProfileMenu({
  userName,
  userEmail,
  userRole,
  avatarUrl,
}: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  // Cerrar con Escape y clic fuera
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const initialLetter = userName.trim() ? userName.trim().charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative select-none" ref={menuRef}>
      {/* Botón Trigger de la Barra */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Menú de perfil"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group flex items-center space-x-2 p-1 pl-1 sm:pr-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-slate-100 dark:bg-slate-800/90 border-emerald-500/40 shadow-xs'
            : 'bg-transparent border-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:border-slate-200 dark:hover:border-slate-800'
        }`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-emerald-500/40 object-cover"
          />
        ) : (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
            {initialLetter}
          </div>
        )}

        <div className="hidden sm:flex flex-col text-left leading-none">
          <span className="text-xs font-semibold text-[var(--text-main)] truncate max-w-[110px]">
            {userName}
          </span>
        </div>

        <svg
          className={`w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ============================================================ */}
      {/* 1. TELÓN DE FONDO (Overlay Scrim para homogeneizar capas)     */}
      {/* ============================================================ */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs animate-fade-in select-none cursor-pointer transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />,
        document.body
      )}

      {/* ============================================================ */}
      {/* 2. POPOVER ANCLADO (Desprendido directamente del botón)       */}
      {/* ============================================================ */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header de Usuario */}
          <div className="p-2 flex items-center space-x-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-10 h-10 rounded-full border border-emerald-500/40 object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                {initialLetter}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-[var(--text-main)] truncate block">
                  {userName}
                </span>
                <span className="text-[9px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold shrink-0">
                  {userRole}
                </span>
              </div>
              <span className="text-[11px] text-[var(--text-muted)] truncate block mt-0.5">
                {userEmail}
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800/80 my-2" />

          {/* Switcher de Tema */}
          <div className="px-2 py-1 space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
              Tema visual
            </span>
            {mounted ? (
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  title="Modo Claro"
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-white text-amber-600 font-semibold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Claro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  title="Modo Oscuro"
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-indigo-400 font-semibold shadow-xs border border-slate-700/60'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Oscuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  title="Automático del sistema"
                  className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                    theme === 'system'
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Auto</span>
                </button>
              </div>
            ) : (
              <div className="h-8 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            )}
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800/80 my-2" />

          {/* Accesos rápidos */}
          <div className="space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Mis Eventos</span>
            </Link>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800/80 my-2" />

          {/* Cerrar Sesión */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <span>Cerrar Sesión</span>
              <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
