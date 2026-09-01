'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteEventAction } from '@/app/dashboard/eventsActions';

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  eventId,
  eventTitle,
}: DeleteEventModalProps) {
  const [typedTitle, setTypedTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isMatch = typedTitle.trim() === eventTitle.trim();

  const handleClose = () => {
    setTypedTitle('');
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMatch) return;

    setErrorMessage(null);
    startTransition(async () => {
      const res = await deleteEventAction(eventId);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        router.push('/dashboard');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-[var(--bg-card)] rounded-2xl border border-rose-500/40 shadow-2xl w-full max-w-md overflow-hidden flex flex-col transition-all duration-300">
        {/* Encabezado */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-rose-500/10">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-bold border border-rose-500/30">
              ⚠️
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400 leading-tight">
                ¿Eliminar este evento?
              </h2>
              <p className="text-[11px] text-[var(--text-muted)]">
                Acción destructiva e irreversible
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isPending}
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <form onSubmit={handleDelete} className="p-6 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-medium text-xs flex items-center space-x-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-xs text-[var(--text-main)] leading-relaxed">
            Esta acción <strong>NO se puede deshacer</strong>. Esto eliminará permanentemente la invitación pública, todos los invitados registrados y las estadísticas de asistencia asociadas a:
          </p>

          <div className="p-3 rounded-xl bg-[var(--bg-input)] border border-slate-200 dark:border-slate-800 font-semibold text-[var(--text-main)] text-center break-words select-all">
            {eventTitle}
          </div>

          <div className="space-y-2 pt-2">
            <label className="font-semibold text-[var(--text-main)] block">
              Para confirmar, escribe <strong className="text-rose-600 dark:text-rose-400 font-bold">{eventTitle}</strong> a continuación:
            </label>
            <input
              type="text"
              value={typedTitle}
              onChange={(e) => setTypedTitle(e.target.value)}
              placeholder="Escribe el nombre exacto del evento"
              autoFocus
              className="w-full bg-[var(--bg-input)] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Botones de Acción */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer disabled:opacity-40"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isMatch || isPending}
              className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1.5"
            >
              {isPending && <span className="animate-spin text-xs">🌀</span>}
              <span>Eliminar definitivamente</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
