'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { signupAction } from '../actions';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await signupAction(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
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
          Crea tu <span className="italic font-normal">Cuenta</span>
        </h1>
      </header>

      {/* Tarjeta Cristalina de Registro (Slim Glass Design) */}
      <main className="relative z-10 my-auto w-full max-w-sm glass-crystalline rounded-2xl p-6 md:p-8 text-left border border-potatoes/20 shadow-2xl backdrop-blur-xl">
        <h2 className="text-lg font-serif text-potatoes mb-1 text-center">
          Registro de <span className="italic font-normal">Anfitrión</span>
        </h2>
        <p className="text-xs text-potatoes/70 text-center mb-6">
          Comienza a gestionar tus invitaciones y listas de invitados
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-cranberry/40 border border-cranberry/60 text-potatoes text-xs text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-greenbean/60 border border-potatoes/40 text-potatoes text-xs text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/80 mb-1">
              Nombre Completo o Novios
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Ej. Sofía & Diego"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-potatoes/20 text-potatoes text-xs placeholder:text-potatoes/30 focus:outline-none focus:border-potatoes/60 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-potatoes/[0.1] hover:bg-potatoes hover:text-black border border-potatoes/40 text-potatoes text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {isPending ? 'Registrando...' : 'Crear mi Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-potatoes/60">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-potatoes font-semibold underline underline-offset-4 hover:text-potatoes/80">
            Inicia sesión aquí
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
