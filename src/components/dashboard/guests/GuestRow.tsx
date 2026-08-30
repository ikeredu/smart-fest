'use client';

import React, { useState } from 'react';
import type { Guest } from '@/types/guest';

interface GuestRowProps {
  guest: Guest;
  eventSlug: string;
  eventTitle: string;
  onEdit: (guest: Guest) => void;
  onDelete: (guestId: string) => void;
  isDeleting?: boolean;
}

export default function GuestRow({
  guest,
  eventSlug,
  eventTitle,
  onEdit,
  onDelete,
  isDeleting,
}: GuestRowProps) {
  const [copied, setCopied] = useState(false);

  const getPersonalUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const codeParam = guest.access_code ? `?guest=${guest.access_code}` : '';
    return `${origin}/${eventSlug}${codeParam}`;
  };

  const handleCopyLink = () => {
    const url = getPersonalUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const url = getPersonalUrl();
    const cleanPhone = (guest.phone || '').replace(/[^0-9]/g, '');
    const message = `¡Hola ${guest.first_name}! Con mucha ilusión queremos compartir contigo nuestra invitación para *${eventTitle}*.\n\nPuedes ver todos los detalles y confirmar tu asistencia aquí:\n${url}`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  // Status Badge Configuration
  const statusConfig = {
    confirmed: {
      label: 'Confirmado',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: '✓',
    },
    pending: {
      label: 'Pendiente',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: '⏳',
    },
    declined: {
      label: 'No asistirá',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: '✕',
    },
  }[guest.status] || {
    label: 'Pendiente',
    bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: '⏳',
  };

  const fullName = [guest.first_name, guest.last_name].filter(Boolean).join(' ');

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl p-4 sm:p-5 border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/60 shadow-sm transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      {/* 1. Información Principal del Invitado */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {fullName}
          </h3>
          <span
            className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-semibold flex items-center space-x-1 ${statusConfig.bg}`}
          >
            <span>{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
          </span>
          {guest.access_code && (
            <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              #{guest.access_code}
            </span>
          )}
        </div>

        {/* Contacto & Pases */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
          <div className="flex items-center space-x-1.5 font-medium">
            <span className="text-emerald-600 dark:text-emerald-400">🎟️</span>
            <span className="text-[var(--text-main)] font-semibold">
              {guest.status === 'confirmed'
                ? `${guest.passes_confirmed} de ${guest.passes_allocated} pases confirmados`
                : `${guest.passes_allocated} ${guest.passes_allocated === 1 ? 'pase asignado' : 'pases asignados'}`}
            </span>
          </div>

          {guest.phone && (
            <div className="flex items-center space-x-1">
              <span>📱</span>
              <span>{guest.phone}</span>
            </div>
          )}

          {guest.email && (
            <div className="flex items-center space-x-1">
              <span>✉️</span>
              <span className="truncate max-w-[180px]">{guest.email}</span>
            </div>
          )}
        </div>

        {/* Notas Internas */}
        {guest.notes && (
          <p className="text-[11px] text-[var(--text-muted)] italic line-clamp-1 bg-[var(--bg-input)] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 inline-block mt-1">
            💬 {guest.notes}
          </p>
        )}
      </div>

      {/* 2. Botones de Acción */}
      <div className="flex items-center flex-wrap gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
        {/* WhatsApp Share */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm active:scale-95"
          title="Compartir enlace por WhatsApp"
        >
          <span>📲 WhatsApp</span>
        </button>

        {/* Copiar Enlace Personalizado */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm active:scale-95"
          title="Copiar enlace personalizado del invitado"
        >
          <span>{copied ? '✓ ¡Copiado!' : '🔗 Copiar Link'}</span>
        </button>

        {/* Editar */}
        <button
          type="button"
          onClick={() => onEdit(guest)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
          title="Editar datos de invitado"
        >
          ✏️
        </button>

        {/* Eliminar */}
        <button
          type="button"
          onClick={() => onDelete(guest.id)}
          disabled={isDeleting}
          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-40 active:scale-95"
          title="Eliminar invitado"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}