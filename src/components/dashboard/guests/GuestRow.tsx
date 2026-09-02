'use client';

import React, { useState } from 'react';
import type { Guest } from '@/types/guest';
import { formatPersonName } from '@/lib/formatters';

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
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

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
      setIsActionSheetOpen(false);
    }, 1200);
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
    setIsActionSheetOpen(false);
  };

  // Configuración de estilo semántico del código según estado RSVP
  const statusConfig = {
    confirmed: {
      chipStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'Confirmado',
    },
    pending: {
      chipStyle: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      title: 'Pendiente',
    },
    declined: {
      chipStyle: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      title: 'No asistirá',
    },
  }[guest.status] || {
    chipStyle: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    title: 'Pendiente',
  };

  const rawFullName = [guest.first_name, guest.last_name].filter(Boolean).join(' ');
  const fullName = formatPersonName(rawFullName, 'Invitado sin nombre');

  return (
    <>
      <div className="py-2.5 sm:py-3 px-1 sm:px-2 hover:bg-slate-500/5 transition-colors flex items-center justify-between gap-3 group">
        {/* 1. Información Principal */}
        <div className="flex-1 min-w-0 space-y-0.5">
          {/* Fila 1: Nombre + Código con Color de Estado */}
          <div className="flex items-center space-x-2 min-w-0">
            <h3 className="font-bold text-xs sm:text-sm text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {fullName}
            </h3>
            {guest.access_code && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold shrink-0 ${statusConfig.chipStyle}`}
                title={`Estado: ${statusConfig.title}`}
              >
                #{guest.access_code}
              </span>
            )}
          </div>

          {/* Fila 2: Pases • Teléfono • Notas (Alineación perfecta al margen izquierdo) */}
          <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
            <span>
              {guest.passes_allocated} {guest.passes_allocated === 1 ? 'pase' : 'pases'}
            </span>
            {guest.phone && (
              <>
                <span>•</span>
                <span>{guest.phone}</span>
              </>
            )}
            {guest.notes && (
              <>
                <span>•</span>
                <span className="italic truncate max-w-[130px] sm:max-w-[200px]">{guest.notes}</span>
              </>
            )}
          </div>
        </div>

        {/* 2. Acciones en Mobile (< sm): WhatsApp + Menú Sheet (⋯) */}
        <div className="flex sm:hidden items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="h-8 px-2.5 rounded-xl bg-emerald-50 active:bg-emerald-100 dark:bg-emerald-950/40 dark:active:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
            title="Compartir por WhatsApp"
            aria-label="Compartir por WhatsApp"
          >
            <span>📲</span>
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setIsActionSheetOpen(true)}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            title="Más opciones"
            aria-label="Más opciones"
          >
            ⋯
          </button>
        </div>

        {/* 3. Acciones en Desktop (>= sm): Barra Inline Limpia */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
            title="Compartir enlace por WhatsApp"
          >
            <span>📲</span>
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all flex items-center space-x-1 cursor-pointer shadow-xs active:scale-95"
            title="Copiar enlace personalizado del invitado"
          >
            <span>{copied ? '✓' : '🔗'}</span>
            <span className="hidden md:inline text-[11px]">{copied ? 'Copiado' : 'Link'}</span>
          </button>

          <button
            type="button"
            onClick={() => onEdit(guest)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 flex items-center space-x-1"
            title="Editar datos de invitado"
          >
            <span>✏️</span>
            <span className="hidden lg:inline text-[11px]">Editar</span>
          </button>

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

      {/* 4. Action Sheet Nativo para Móviles (Bottom Drawer Flotante) */}
      {isActionSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsActionSheetOpen(false)}
          />

          {/* Lámina Inferior */}
          <div className="relative z-10 w-full bg-[var(--bg-card)] rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl p-5 pb-8 space-y-4 animate-slide-up">
            {/* Indicador */}
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto" />

            {/* Cabecera */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-[var(--text-main)] truncate">{fullName}</h4>
                  {guest.access_code && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold shrink-0 ${statusConfig.chipStyle}`}
                    >
                      #{guest.access_code}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {statusConfig.title} • {guest.passes_allocated} {guest.passes_allocated === 1 ? 'pase asignado' : 'pases asignados'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActionSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)] flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Opciones */}
            <div className="space-y-1.5 text-sm">
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-3 px-3.5 rounded-2xl flex items-center space-x-3 text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0">
                  {copied ? '✓' : '🔗'}
                </span>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-xs text-[var(--text-main)]">
                    {copied ? '¡Enlace Copiado!' : 'Copiar Enlace Personalizado'}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Enlace directo con código #{guest.access_code || ''}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsActionSheetOpen(false);
                  onEdit(guest);
                }}
                className="w-full py-3 px-3.5 rounded-2xl flex items-center space-x-3 text-[var(--text-main)] hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0">
                  ✏️
                </span>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-xs text-[var(--text-main)]">Editar Invitado</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Modificar cupos, estado RSVP o notas</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsActionSheetOpen(false);
                  onDelete(guest.id);
                }}
                disabled={isDeleting}
                className="w-full py-3 px-3.5 rounded-2xl flex items-center space-x-3 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:bg-rose-100 dark:active:bg-rose-900/50 transition-colors cursor-pointer disabled:opacity-40"
              >
                <span className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-base shrink-0">
                  🗑️
                </span>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-xs">Eliminar Invitado</div>
                  <div className="text-[10px] text-rose-500/80 dark:text-rose-400/80">Quitar permanentemente de este evento</div>
                </div>
              </button>
            </div>

            {/* Cancelar */}
            <button
              type="button"
              onClick={() => setIsActionSheetOpen(false)}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[var(--text-main)] font-semibold text-xs transition-colors cursor-pointer mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}