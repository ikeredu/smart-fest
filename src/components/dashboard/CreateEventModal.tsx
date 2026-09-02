'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { createEventAction, updateEventBasicsAction } from '@/app/dashboard/eventsActions';

export interface EventToEdit {
  id: string;
  title: string;
  event_date: string | null;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: EventToEdit | null;
  onSuccess?: (event: unknown) => void;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  eventToEdit,
  onSuccess,
}: CreateEventModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isEditing = Boolean(eventToEdit);

  // Cierre con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloqueo de scroll en document.body
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const initialDate = eventToEdit?.event_date
    ? eventToEdit.event_date.split('T')[0]
    : '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let res;
      if (isEditing && eventToEdit?.id) {
        res = await updateEventBasicsAction(eventToEdit.id, formData);
      } else {
        res = await createEventAction(formData);
      }

      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        onSuccess?.(res.event);
        onClose();
      }
    });
  };

  return (
    /* Telón Scrim Estándar Homologado */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Tarjeta Modal Tripartita Borde a Borde */}
      <div
        className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-2xl border border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl overflow-hidden text-[var(--text-main)] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header Estructural */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base shrink-0">
              {isEditing ? '✏️' : '✨'}
            </div>
            <h2 className="text-lg font-bold text-[var(--text-main)] leading-tight">
              {isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Línea divisoria delgada y grisácea que NO toca los bordes */}
        <div className="mx-6 border-t border-slate-300 dark:border-slate-600 shrink-0" />

        {/* 2. Formulario con Body y Footer */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Body Estructural con Scroll Autónomo */}
          <div className="px-6 py-5 space-y-4.5 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                Nombre / Título del Evento <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                key={eventToEdit ? `edit-${eventToEdit.id}` : 'create'}
                defaultValue={eventToEdit?.title || ''}
                placeholder="Ej: Boda de María & Juan / XV Años Sofía"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700/80 text-[var(--text-main)] text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
              <span className="text-[11px] text-[var(--text-muted)] mt-1.5 block">
                {isEditing
                  ? 'El enlace público del evento se conservará sin cambios.'
                  : 'Generaremos una dirección URL única automáticamente basada en este título.'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-main)] mb-1.5">
                Fecha Tentativa del Evento
              </label>
              <input
                type="date"
                name="eventDate"
                key={eventToEdit ? `date-${eventToEdit.id}` : 'date-create'}
                defaultValue={initialDate}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700/80 text-[var(--text-main)] text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Línea divisoria delgada y grisácea que NO toca los bordes */}
          <div className="mx-6 border-t border-slate-300 dark:border-slate-600 shrink-0" />

          {/* 3. Footer Estructural */}
          <div className="px-6 py-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm hover:shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>
                {isPending
                  ? isEditing
                    ? 'Guardando...'
                    : 'Creando...'
                  : isEditing
                    ? 'Guardar Cambios ✓'
                    : 'Crear Evento ✨'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
