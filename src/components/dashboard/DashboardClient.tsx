'use client';

import React, { useState } from 'react';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';
import DashboardHeader from './DashboardHeader';
import { formatPersonName } from '@/lib/formatters';

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
  const [eventToEdit, setEventToEdit] = useState<EventItem | null>(null);

  const handleOpenCreate = () => {
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: EventItem) => {
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventToEdit(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-300 select-none">
      {/* Header Bar */}
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
        avatarUrl={avatarUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 md:p-10 flex flex-col space-y-8">
        {/* Welcome Card Banner (Sin el botón de nuevo evento, enfocado en el saludo y con borde verde delicado) */}
        <section className="bg-[var(--bg-card)] rounded-xl p-5 sm:p-6 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-300">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
            Panel de Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] mt-1">
            ¡Hola, <span className="text-emerald-600 dark:text-emerald-400">{formatPersonName(userName)}</span>!
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
              onClick={handleOpenCreate}
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
                onClick={handleOpenCreate}
                className="mt-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
              >
                + Crear Mi Primer Evento
              </button>
            </div>
          ) : (
            /* EVENTS GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleOpenEdit}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-[var(--text-muted)] border-t border-slate-200 dark:border-slate-800">
        Smart-Fest &copy; {new Date().getFullYear()} — Plataforma SaaS de Gestión de Eventos
      </footer>

      {/* Modal para Crear / Editar Evento */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventToEdit={eventToEdit}
      />
    </div>
  );
}
