'use client';

import React from 'react';
import type { GuestStatsMetrics } from '@/types/guest';

interface GuestStatsProps {
  metrics: GuestStatsMetrics;
}

export default function GuestStats({ metrics }: GuestStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Cupos / Pases Asignados */}
      <div className="bg-[var(--bg-card)] rounded-2xl p-5 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Total Pases
          </span>
          <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/20">
            🎟️
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
            {metrics.totalPassesAllocated}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            En {metrics.totalFamilies} {metrics.totalFamilies === 1 ? 'invitación' : 'invitaciones'}
          </p>
        </div>
      </div>

      {/* 2. Confirmados */}
      <div className="bg-[var(--bg-card)] rounded-2xl p-5 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Confirmados
          </span>
          <span className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
            ✓
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {metrics.totalPassesConfirmed}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {metrics.totalConfirmedGuests} {metrics.totalConfirmedGuests === 1 ? 'grupo confirmado' : 'grupos confirmados'}
          </p>
        </div>
      </div>

      {/* 3. Pendientes */}
      <div className="bg-[var(--bg-card)] rounded-2xl p-5 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Pendientes
          </span>
          <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/20">
            ⏳
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
            {metrics.totalPendingPasses}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Pases por responder
          </p>
        </div>
      </div>

      {/* 4. No Asistirán */}
      <div className="bg-[var(--bg-card)] rounded-2xl p-5 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            No Asistirán
          </span>
          <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-sm font-bold border border-rose-500/20">
            ✕
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400">
            {metrics.totalDeclinedPasses}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Cancelaciones / declinados
          </p>
        </div>
      </div>
    </div>
  );
}