'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    slug: string;
    event_date: string | null;
    created_at: string;
    config?: unknown;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Sin fecha definida';

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const publicUrl = `${origin}/${event.slug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link
      href={`/dashboard/events/${event.id}`}
      className="bg-[var(--bg-card)] rounded-2xl p-6 border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/70 dark:hover:border-emerald-500/80 flex flex-col justify-between space-y-5 transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer"
    >
      {/* Superior: Título, Badge y Fecha */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold whitespace-nowrap shrink-0">
            Activo
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
          <div className="flex items-center space-x-1.5">
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="text-[11px] text-[var(--text-muted)] truncate bg-[var(--bg-input)] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono">
          /{event.slug}
        </div>
      </div>

      {/* Inferior: Copiar link rápido y llamada a la acción */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleCopyLink}
          className="py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-all flex items-center space-x-1 cursor-pointer"
          title="Copiar enlace público de la invitación"
        >
          <span>{copied ? '✓ Copiado' : '🔗 Copiar link'}</span>
        </button>

        <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
          <span>Gestionar</span>
          <span>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
