'use client';

import React, { useState, useTransition } from 'react';
import { updateEventBasicsAction } from '@/app/dashboard/eventsActions';

interface EventSettingsTabProps {
  event: {
    id: string;
    title: string;
    slug: string;
    event_date: string | null;
  };
  onOpenDeleteModal: () => void;
  onSuccess: (msg: string) => void;
}

export default function EventSettingsTab({
  event,
  onOpenDeleteModal,
  onSuccess,
}: EventSettingsTabProps) {
  const [title, setTitle] = useState(event.title || '');
  const [eventDate, setEventDate] = useState(
    event.event_date ? event.event_date.substring(0, 16) : ''
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('El título del evento es obligatorio.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('eventDate', eventDate);

    startTransition(async () => {
      const res = await updateEventBasicsAction(event.id, formData);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        onSuccess('Datos del evento actualizados correctamente');
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      {/* 1. Formulario de Datos Básicos */}
      <section className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
            Ajustes Principales
          </span>
          <h2 className="text-xl font-bold text-[var(--text-main)] mt-0.5">
            Información del Evento
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Modifica el nombre y la fecha oficial de la celebración.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-medium text-xs flex items-center space-x-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Nombre del Evento */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[var(--text-main)] block">
              Título del Evento <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej. Boda David & Alejandra"
              required
              className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[var(--text-main)] block">
              Fecha y Hora de la Celebración
            </label>
            <input
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-[var(--text-main)] focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Enlace Público (Solo Lectura) */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[var(--text-main)] block">
              Identificador Público (Slug)
            </label>
            <input
              type="text"
              value={`/${event.slug}`}
              disabled
              className="w-full bg-[var(--bg-input)]/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-[var(--text-muted)] cursor-not-allowed opacity-75"
            />
          </div>

          {/* Botón Guardar */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center space-x-2"
            >
              {isPending && <span className="animate-spin text-xs">🌀</span>}
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </section>

      {/* 2. Zona de Peligro (Danger Zone) */}
      <section className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-6 sm:p-8 border border-rose-300 dark:border-rose-900/60 shadow-sm space-y-4">
        <div className="flex items-center space-x-2.5 text-rose-600 dark:text-rose-400">
          <span className="text-lg">⚠️</span>
          <h3 className="text-base font-bold">Zona de Peligro</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1 max-w-lg">
            <h4 className="text-xs font-bold text-[var(--text-main)]">
              Eliminar este evento definitivamente
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Una vez eliminado, se borrarán todos los enlaces, pases, confirmaciones y la lista completa de invitados. Esta acción no se puede deshacer.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenDeleteModal}
            className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-rose-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            🗑️ Eliminar Evento
          </button>
        </div>
      </section>
    </div>
  );
}
