'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const getPersonalUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const codeParam = guest.access_code ? `?guest=${guest.access_code}` : '';
    return `${origin}/${eventSlug}${codeParam}`;
  };

  const handleCopyLink = () => {
    const url = getPersonalUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsMenuOpen(false);
    }, 1500);
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
    setIsMenuOpen(false);
  };

  // Configuración de Estados RSVP
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
    <div className="p-3.5 sm:p-4 hover:bg-slate-500/5 transition-colors flex items-center justify-between gap-3 group relative">
      {/* 1. Identidad + Información */}
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        {/* Avatar de Iniciales */}
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
          {initials}
        </div>

        {/* Detalles del Invitado */}
        <div className="flex-1 min-w-0 space-y-0.5">
          {/* Fila 1: Nombre + Estado + Código */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="font-bold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {fullName}
            </h3>

            <span
              className={`text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold flex items-center space-x-1 ${statusConfig.bg}`}
            >
              <span>{statusConfig.icon}</span>
              <span>{statusConfig.label}</span>
            </span>

            {guest.access_code && (
              <span className="text-[9px] sm:text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                #{guest.access_code}
              </span>
            )}
          </div>

          {/* Fila 2: Pases, Contacto y Notas */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] sm:text-xs text-[var(--text-muted)]">
            <div className="flex items-center space-x-1 font-medium text-[var(--text-main)]">
              <span className="text-emerald-600 dark:text-emerald-400">🎟️</span>
              <span>
                {guest.status === 'confirmed'
                  ? `${guest.passes_confirmed}/${guest.passes_allocated} confirmados`
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
              <div className="hidden sm:flex items-center space-x-1">
                <span>•</span>
                <span className="truncate max-w-[150px]">✉️ {guest.email}</span>
              </div>
            )}

            {guest.notes && (
              <div className="flex items-center space-x-1 italic text-[10px] sm:text-[11px] text-[var(--text-muted)]">
                <span>•</span>
                <span className="truncate max-w-[140px] sm:max-w-[220px]">💬 {guest.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Acciones en Mobile (< sm): WhatsApp Directo + Menú Contextual (⋯) */}
      <div className="flex sm:hidden items-center gap-1.5 shrink-0" ref={menuRef}>
        {/* Botón WhatsApp Mobile */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="h-8.5 px-2.5 rounded-xl bg-emerald-50 active:bg-emerald-100 dark:bg-emerald-950/40 dark:active:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
          title="Compartir por WhatsApp"
          aria-label="Compartir por WhatsApp"
        >
          <span>📲</span>
          <span>WhatsApp</span>
        </button>

        {/* Botón Menú Contextual Mobile (⋯) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8.5 h-8.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            title="Más opciones"
            aria-label="Más opciones"
          >
            ⋯
          </button>

          {/* Menú Flotante Contextual */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-30 w-48 bg-[var(--bg-card)] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 animate-fade-in-up text-xs divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-1">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <span className="text-emerald-500 font-bold">{copied ? '✓' : '🔗'}</span>
                  <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit(guest);
                  }}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <span>✏️</span>
                  <span>Editar Invitado</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete(guest.id);
                  }}
                  disabled={isDeleting}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <span>🗑️</span>
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Acciones en Desktop (>= sm): Barra Inline Limpia */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        {/* WhatsApp Directo */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
          title="Compartir enlace por WhatsApp"
        >
          <span>📲</span>
          <span>WhatsApp</span>
        </button>

        {/* Copiar Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
          title="Copiar enlace personalizado del invitado"
        >
          <span>{copied ? '✓' : '🔗'}</span>
          <span className="hidden md:inline text-[11px]">{copied ? 'Copiado' : 'Link'}</span>
        </button>

        {/* Editar */}
        <button
          type="button"
          onClick={() => onEdit(guest)}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 flex items-center space-x-1"
          title="Editar datos de invitado"
        >
          <span>✏️</span>
          <span className="hidden lg:inline text-[11px]">Editar</span>
        </button>

        {/* Eliminar */}
        <button
          type="button"
          onClick={() => onDelete(guest.id)}
          disabled={isDeleting}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-40 active:scale-95 flex items-center space-x-1"
          title="Eliminar invitado"
        >
          <span>🗑️</span>
        </button>
      </div>
    </div>
  );
}