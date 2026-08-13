'use client';

import React, { useState, useTransition } from 'react';
import { createEventAction } from '@/app/dashboard/eventsActions';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createEventAction(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-2xl p-6 md:p-8 border border-emerald-500/40 shadow-2xl text-[var(--text-main)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
              Nuevo Proyecto
            </span>
            <h2 className="text-xl font-bold text-[var(--text-main)] mt-0.5">
              Crear Nuevo Evento
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
              Nombre / Título del Evento <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ej: Boda de María & Juan / XV Años Sofía"
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700 text-[var(--text-main)] text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
            />
            <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
              Generaremos una dirección URL única automáticamente basada en este título.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
              Fecha Tentativa del Evento
            </label>
            <input
              type="date"
              name="eventDate"
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700 text-[var(--text-main)] text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-[var(--text-muted)] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md active:scale-95 transition-all disabled:opacity-50 flex items-center space-x-2 cursor-pointer"
            >
              <span>{isPending ? 'Creando...' : 'Crear Evento ✨'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
