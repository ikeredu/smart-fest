'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { loginAction, loginWithGoogleAction, sendMagicLinkAction } from '../actions';

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
    <section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center px-4 py-6 text-center select-none bg-black text-potatoes overflow-hidden transform translate-x-0">
      {/* Fondo y Velo Botánico Oscuro */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 glass-botanical-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Header Superior */}
      <header className="relative z-10 w-full max-w-md pt-2">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-potatoes/70 block">
          Smart-Fest Platform
        </span>
        <h1 className="font-serif text-2xl md:text-3xl text-potatoes mt-1">
          Bienvenido de <span className="italic font-normal">nuevo</span>
        </h1>
      </header>

      {/* Tarjeta Cristalina de Login */}
      <main className="relative z-10 my-auto w-full max-w-sm glass-crystalline rounded-2xl p-6 md:p-8 text-left border border-potatoes/20 shadow-2xl backdrop-blur-xl">
        {/* Botón de Inicio con Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-potatoes text-xs tracking-wider font-semibold transition-all duration-300 disabled:opacity-50"
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
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-potatoes/30 to-transparent" />
          <span className="absolute px-3 bg-black/60 text-[9px] uppercase tracking-[0.25em] text-potatoes/60 rounded-full">
            o usa tu correo
          </span>
        </div>

        {/* Toggle Pestañas: Contraseña vs Magic Link */}
        <div className="grid grid-cols-2 p-1 mb-5 rounded-xl bg-black/30 border border-potatoes/10 text-xs">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              authMode === 'password'
                ? 'bg-potatoes/20 text-potatoes border border-potatoes/30'
                : 'text-potatoes/60 hover:text-potatoes'
            }`}
          >
            Contraseña
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('magic-link')}
            className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              authMode === 'magic-link'
                ? 'bg-potatoes/20 text-potatoes border border-potatoes/30'
                : 'text-potatoes/60 hover:text-potatoes'
            }`}
          >
            Magic Link ✨
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-cranberry/40 border border-cranberry/60 text-potatoes text-xs text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-greenbean/70 border border-potatoes/40 text-potatoes text-xs text-center">
            {success}
          </div>
        )}

        {/* Formulario 1: Email + Contraseña */}
        {authMode === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/80 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/80 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-3 px-6 rounded-xl bg-potatoes/[0.1] hover:bg-potatoes hover:text-black border border-potatoes/40 text-potatoes text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {isPending ? 'Ingresando...' : 'Entrar al Dashboard'}
            </button>
          </form>
        ) : (
          /* Formulario 2: Magic Link (Sin contraseña) */
          <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/80 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
              />
              <span className="text-[10px] text-potatoes/60 mt-1 block">
                Te enviaremos un correo con un enlace mágico para ingresar sin contraseña.
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-3 px-6 rounded-xl bg-potatoes/[0.1] hover:bg-potatoes hover:text-black border border-potatoes/40 text-potatoes text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {isPending ? 'Enviando...' : 'Enviar Enlace Mágico ✨'}
            </button>
          </form>
        )}

        <div className="mt-5 text-center text-xs text-potatoes/60">
          ¿No tienes una cuenta aún?{' '}
          <Link href="/signup" className="text-potatoes font-semibold underline underline-offset-4 hover:text-potatoes/80">
            Regístrate aquí
          </Link>
        </div>
      </main>

      {/* Footer Inferior */}
      <footer className="relative z-10 w-full max-w-md pb-2 text-[10px] uppercase tracking-[0.2em] text-potatoes/40">
        Smart-Fest &copy; {new Date().getFullYear()} — Event Management
      </footer>
    </section>
  );
}
