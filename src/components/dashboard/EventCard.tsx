'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteEventAction } from '@/app/dashboard/eventsActions';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    event_date: string | null;
    created_at: string;
    config: any;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Sin fecha definida';

  const handleCopyLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const publicUrl = `${origin}/${event.slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de eliminar el evento "${event.title}"? Esta acción no se puede deshacer.`)) {
      startTransition(async () => {
        await deleteEventAction(event.id);
      });
    }
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/60 flex flex-col justify-between space-y-6 transition-all duration-200 shadow-sm hover:shadow-md group">
      {/* Superior: Título, Badge y Fecha */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold whitespace-nowrap shrink-0">
            Activo
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
          <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formattedDate}</span>
        </div>

        <div className="mt-3 text-[11px] text-[var(--text-muted)] truncate bg-[var(--bg-input)] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono">
          /{event.slug}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          {/* Action 1: Personalizar */}
          <Link
            href={`/dashboard/events/${event.id}/editor`}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            <span>🎨 Personalizar</span>
          </Link>

          {/* Action 2: Invitados */}
          <Link
            href={`/dashboard/events/${event.id}/guests`}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            <span>👥 Invitados</span>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Action 3: Copiar Link */}
          <button
            onClick={handleCopyLink}
            className="flex-1 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>{copied ? '✓ ¡Copiado!' : '🔗 Copiar Link'}</span>
          </button>

          {/* Action 4: Eliminar */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="py-1.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-[11px] font-medium transition-all disabled:opacity-50 cursor-pointer"
            title="Eliminar evento"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
