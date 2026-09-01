'use client';

import React from 'react';
import Link from 'next/link';
import type { GuestStatsMetrics } from '@/types/guest';
import GuestStats from '@/components/dashboard/guests/GuestStats';

interface EventOverviewTabProps {
  event: {
    id: string;
    title: string;
    slug: string;
    event_date: string | null;
  };
  metrics: GuestStatsMetrics;
  onNavigateToGuests: () => void;
  onCopyLink: () => void;
  copied: boolean;
}

export default function EventOverviewTab({
  event,
  metrics,
  onNavigateToGuests,
  onCopyLink,
  copied,
}: EventOverviewTabProps) {
  const confirmedPercent =
    metrics.totalPassesAllocated > 0
      ? Math.round((metrics.totalPassesConfirmed / metrics.totalPassesAllocated) * 100)
      : 0;

  const pendingPercent =
    metrics.totalPassesAllocated > 0
      ? Math.round((metrics.totalPendingPasses / metrics.totalPassesAllocated) * 100)
      : 0;

  const declinedPercent =
    metrics.totalPassesAllocated > 0
      ? Math.round((metrics.totalDeclinedPasses / metrics.totalPassesAllocated) * 100)
      : 0;

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Sin fecha programada';

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 1. Banner Principal del Evento (Solo vive en esta pestaña) */}
      <section className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
              Panel del Evento
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
              Activo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
            {event.title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] flex items-center space-x-2">
            <span>📅 {formattedDate}</span>
            <span>•</span>
            <span className="font-mono">/{event.slug}</span>
          </p>
        </div>

        {/* Acciones Rápidas del Banner */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onCopyLink}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-sm"
            title="Copiar enlace general de la invitación"
          >
            <span>{copied ? '✓ ¡Copiado!' : '🔗 Enlace General'}</span>
          </button>

          <Link
            href={`/${event.slug}`}
            target="_blank"
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-sm"
          >
            <span>👁️ Ver Invitación</span>
          </Link>
        </div>
      </section>

      {/* 2. Tarjeta de Salud de Aforo y Progreso Porcentual */}
      <section className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-300 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block">
              Salud del Aforo
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] mt-0.5">
              Estado de Confirmaciones
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Progreso general de confirmación sobre los pases asignados para este evento.
            </p>
          </div>

          <div className="flex items-baseline space-x-2 bg-emerald-500/10 px-4 py-2.5 rounded-2xl border border-emerald-500/20 self-start sm:self-auto">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {confirmedPercent}%
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
              Confirmado
            </span>
          </div>
        </div>

        {/* Barra de Progreso Visual Segmentada */}
        <div className="space-y-2">
          <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden flex p-0.5 gap-0.5 shadow-inner">
            {metrics.totalPassesConfirmed > 0 && (
              <div
                style={{ width: `${confirmedPercent}%` }}
                className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                title={`Confirmados: ${metrics.totalPassesConfirmed} pases (${confirmedPercent}%)`}
              />
            )}
            {metrics.totalPendingPasses > 0 && (
              <div
                style={{ width: `${pendingPercent}%` }}
                className="bg-amber-500 h-full rounded-full transition-all duration-700"
                title={`Pendientes: ${metrics.totalPendingPasses} pases (${pendingPercent}%)`}
              />
            )}
            {metrics.totalDeclinedPasses > 0 && (
              <div
                style={{ width: `${declinedPercent}%` }}
                className="bg-rose-500 h-full rounded-full transition-all duration-700"
                title={`No asistirán: ${metrics.totalDeclinedPasses} pases (${declinedPercent}%)`}
              />
            )}
          </div>

          {/* Leyenda de la Barra */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-[var(--text-muted)] pt-1 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[var(--text-main)] font-medium">
                  {metrics.totalPassesConfirmed} confirmados
                </span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>{metrics.totalPendingPasses} pendientes</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>{metrics.totalDeclinedPasses} no asistirán</span>
              </span>
            </div>

            <span className="font-semibold text-[var(--text-main)] font-mono">
              Total: {metrics.totalPassesAllocated} pases
            </span>
          </div>
        </div>
      </section>

      {/* 3. Grid de KPIs de Aforo */}
      <GuestStats metrics={metrics} />

      {/* 4. Tarjeta de Acceso a Invitados */}
      <section className="bg-[var(--bg-card)] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-[var(--text-main)]">
            Gestión de Invitados & Pases
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Accede al listado detallado para registrar nuevas familias, modificar cupos o enviar enlaces por WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToGuests}
          className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5 shrink-0"
        >
          <span>👥 Ver Lista de Invitados</span>
          <span>&rarr;</span>
        </button>
      </section>
    </div>
  );
}
