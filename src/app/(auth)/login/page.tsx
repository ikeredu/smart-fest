'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center px-4 py-8 text-center select-none bg-black text-potatoes overflow-hidden transform translate-x-0">
      {/* Fondo y Velo Botánico Oscuro */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 glass-botanical-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Header Superior */}
      <header className="relative z-10 w-full max-w-md pt-4">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-potatoes/70 block">
          Smart-Fest Platform
        </span>
        <h1 className="font-serif text-2xl md:text-3xl text-potatoes mt-1">
          Bienvenido de <span className="italic font-normal">nuevo</span>
        </h1>
      </header>

      {/* Tarjeta Cristalina de Login (Slim Glass Design) */}
      <main className="relative z-10 my-auto w-full max-w-sm glass-crystalline rounded-2xl p-6 md:p-8 text-left border border-potatoes/20 shadow-2xl backdrop-blur-xl">
        <h2 className="text-lg font-serif text-potatoes mb-1 text-center">
          Iniciar <span className="italic font-normal">Sesión</span>
        </h2>
        <p className="text-xs text-potatoes/70 text-center mb-6">
          Ingresa tus credenciales para acceder a tu dashboard
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-cranberry/40 border border-cranberry/60 text-potatoes text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/80 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
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
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
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

        <div className="mt-6 text-center text-xs text-potatoes/60">
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
