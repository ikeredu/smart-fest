'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Link2, Check, Pencil, ArrowRight } from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  event_date: string | null;
  created_at: string;
  config?: unknown;
}

interface EventCardProps {
  event: EventItem;
  onEdit?: (event: EventItem) => void;
}

export default function EventCard({ event, onEdit }: EventCardProps) {
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
      className="bg-[var(--bg-card)] rounded-xl p-4 sm:p-5 border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/70 dark:hover:border-emerald-500/80 flex flex-col justify-between space-y-3.5 transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer"
    >
      {/* Superior: Título, Badge y Fecha + Slug */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold whitespace-nowrap shrink-0">
            Activo
          </span>
        </div>

        {/* Metadatos en una sola línea fluida y elegante */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--text-muted)]">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span>{formattedDate}</span>
          </div>
          <span className="h-2.5 w-px bg-slate-300 dark:bg-slate-700/80 mx-1 inline-block shrink-0" />
          <span className="font-mono text-[11px] opacity-75 truncate max-w-[200px] sm:max-w-[300px]">
            /{event.slug}
          </span>
        </div>
      </div>

      {/* Inferior: Copiar link a la izquierda, y grupo de acciones (Editar + Gestionar) a la derecha */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {/* Izquierda: Acción utilitaria de difusión */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="h-7 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
          title="Copiar enlace público de la invitación"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5 opacity-70" />
              <span>Copiar link</span>
            </>
          )}
        </button>

        {/* Derecha: Grupo operativo de gestión del evento */}
        <div className="flex items-center space-x-2.5">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(event);
              }}
              className="h-7 px-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Editar título o fecha del evento"
            >
              <Pencil className="w-3.5 h-3.5 opacity-80" />
              <span>Editar</span>
            </button>
          )}

          {onEdit && (
            <span className="h-3 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />
          )}

          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
            <span>Gestionar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
