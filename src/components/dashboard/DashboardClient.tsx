'use client';

import React, { useState } from 'react';
import { logoutAction } from '@/app/(auth)/actions';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';
import ThemeToggle from './ThemeToggle';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  event_date: string | null;
  created_at: string;
  config?: unknown;
}

interface DashboardClientProps {
  userEmail: string;
  userName: string;
  userRole: string;
  avatarUrl?: string | null;
  events: EventItem[];
}

export default function DashboardClient({
  userEmail,
  userName,
  userRole,
  avatarUrl,
  events,
}: DashboardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-300 select-none">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3.5 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Role Badge */}
          <div className="flex items-center space-x-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)]">
              Smart-Fest
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
              {userRole}
            </span>
          </div>

          {/* Controls: Theme Toggle + User Info + Logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Switch de Tema */}
            <ThemeToggle />

            {/* Perfil del Usuario */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-8 h-8 rounded-full border border-emerald-500/30 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[var(--text-main)] leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[150px]">
                  {userEmail}
                </span>
              </div>
            </div>

            {/* Botón Cerrar Sesión con texto Salir e icono */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="py-1.5 px-3 sm:px-3.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 border border-slate-300 dark:border-slate-700 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <span>Salir</span>
                <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 md:p-10 flex flex-col space-y-8">
        {/* Welcome Card Banner (Sin el botón de nuevo evento, enfocado en el saludo y con borde verde delicado) */}
        <section className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-300">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
            Panel de Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] mt-1">
            ¡Hola, <span className="text-emerald-600 dark:text-emerald-400">{userName}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-xl leading-relaxed">
            Bienvenido a tu panel de administración. Desde aquí podrás gestionar tus eventos activos, personalizar tus invitaciones modulares y administrar tus invitados.
          </p>
        </section>

        {/* Dynamic Events Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
              <span>Mis Eventos</span>
              <span className="text-xs font-normal text-[var(--text-muted)] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {events.length}
              </span>
            </h2>

            {/* Botón Nuevo Evento en la cabecera de Mis Eventos */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-emerald-600/20 active:scale-95 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span className="text-sm leading-none">+</span>
              <span>Nuevo Evento</span>
            </button>
          </div>

          {events.length === 0 ? (
            /* EMPTY STATE (Con borde verde delicado) */
            <div className="bg-[var(--bg-card)] rounded-2xl p-8 sm:p-12 border border-emerald-500/30 dark:border-emerald-500/40 text-center flex flex-col items-center justify-center space-y-4 shadow-sm transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                ✨
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-main)]">
                  Aún no tienes ningún evento
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Crea tu primera invitación digital interactiva. Define el título de tu evento y comienza a personalizar tus módulos.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
              >
                + Crear Mi Primer Evento
              </button>
            </div>
          ) : (
            /* EVENTS GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-[var(--text-muted)] border-t border-slate-200 dark:border-slate-800">
        Smart-Fest &copy; {new Date().getFullYear()} — Plataforma SaaS de Gestión de Eventos
      </footer>

      {/* Modal para Crear Evento */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
