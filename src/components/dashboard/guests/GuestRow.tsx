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

  const fullName = [guest.first_name, guest.last_name].filter(Boolean).join(' ') || 'Invitado sin nombre';
  const initials =
    ((guest.first_name?.[0] || '') + (guest.last_name?.[0] || '')).toUpperCase() || '👤';

  return (
    <div className="p-3.5 sm:p-4 hover:bg-slate-500/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
      {/* 1. Identidad + Información */}
      <div className="flex items-start space-x-3 min-w-0 flex-1">
        {/* Avatar de Iniciales */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20 mt-0.5 sm:mt-0">
          {initials}
        </div>

        {/* Detalles del Invitado */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Fila 1: Nombre + Estado + Código */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {fullName}
            </h3>

            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold flex items-center space-x-1 ${statusConfig.bg}`}
            >
              <span>{statusConfig.icon}</span>
              <span>{statusConfig.label}</span>
            </span>

            {guest.access_code && (
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                #{guest.access_code}
              </span>
            )}
          </div>

          {/* Fila 2: Pases, Contacto y Notas */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center space-x-1 font-medium text-[var(--text-main)]">
              <span className="text-emerald-600 dark:text-emerald-400">🎟️</span>
              <span>
                {guest.status === 'confirmed'
                  ? `${guest.passes_confirmed} de ${guest.passes_allocated} confirmados`
                  : `${guest.passes_allocated} ${guest.passes_allocated === 1 ? 'pase' : 'pases'}`}
              </span>
            </div>

            {guest.phone && (
              <div className="flex items-center space-x-1">
                <span>•</span>
                <span>📱 {guest.phone}</span>
              </div>
            )}

            {guest.email && (
              <div className="flex items-center space-x-1">
                <span>•</span>
                <span className="truncate max-w-[160px]">✉️ {guest.email}</span>
              </div>
            )}

            {guest.notes && (
              <div className="flex items-center space-x-1 italic text-[11px] text-[var(--text-muted)]">
                <span>•</span>
                <span className="truncate max-w-[200px]">💬 {guest.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Botones de Acción Compactos */}
      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center pl-12 sm:pl-0">
        {/* WhatsApp Directo */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="py-1.5 px-2.5 sm:px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
          title="Compartir enlace por WhatsApp"
        >
          <span>📲</span>
          <span className="text-[11px] sm:text-xs">WhatsApp</span>
        </button>

        {/* Copiar Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
          title="Copiar enlace personalizado del invitado"
        >
          <span>{copied ? '✓' : '🔗'}</span>
          <span className="hidden md:inline text-[11px]">{copied ? 'Copiado' : 'Link'}</span>
        </button>

        {/* Editar */}
        <button
          type="button"
          onClick={() => onEdit(guest)}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          title="Editar datos de invitado"
        >
          ✏️
        </button>

        {/* Eliminar */}
        <button
          type="button"
          onClick={() => onDelete(guest.id)}
          disabled={isDeleting}
          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-40 active:scale-95"
          title="Eliminar invitado"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}