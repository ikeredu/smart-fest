'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { loginAction, loginWithGoogleAction, sendMagicLinkAction } from '../actions';
import ThemeToggle from '@/components/dashboard/ThemeToggle';

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<'password' | 'magic-link'>('password');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  const handleMagicLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await sendMagicLinkAction(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
      }
    });
  };

  const handleGoogleLogin = () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await loginWithGoogleAction();
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 text-center select-none bg-slate-100 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header Superior con Selector de Tema */}
      <header className="w-full max-w-md pt-2 flex items-center justify-between">
        <div className="text-left">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
            Smart-Fest Platform
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Bienvenido
          </h1>
        </div>

        {/* Switch de Tema */}
        <ThemeToggle />
      </header>

      {/* Tarjeta Cristalina / SaaS de Login */}
      <main className="my-auto w-full max-w-sm bg-white dark:bg-[#1c2541] rounded-2xl p-6 md:p-8 text-left border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">
        {/* Botón de Inicio con Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending}
          className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.3-.8-.4-1.7-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Divisor Estético */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800" />
          <span className="absolute px-3 bg-white dark:bg-[#1c2541] text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            o usa tu correo
          </span>
        </div>

        {/* Toggle Pestañas: Contraseña vs Magic Link */}
        <div className="grid grid-cols-2 p-1 mb-5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authMode === 'password'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Contraseña
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('magic-link')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authMode === 'magic-link'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Magic Link ✨
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs text-center">
            {success}
          </div>
        )}

        {/* Formulario 1: Email + Contraseña */}
        {authMode === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? 'Ingresando...' : 'Entrar al Dashboard'}
            </button>
          </form>
        ) : (
          /* Formulario 2: Magic Link */
          <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Te enviaremos un correo con un enlace mágico para ingresar sin contraseña.
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? 'Enviando...' : 'Enviar Enlace Mágico ✨'}
            </button>
          </form>
        )}

        <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          ¿No tienes una cuenta aún?{' '}
          <Link href="/signup" className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-4 hover:opacity-80">
            Regístrate aquí
          </Link>
        </div>
      </main>

      {/* Footer Inferior */}
      <footer className="w-full max-w-md pb-2 text-[11px] text-slate-400 dark:text-slate-500">
        Smart-Fest &copy; {new Date().getFullYear()} — Event Management Platform
      </footer>
    </section>
  );
}
