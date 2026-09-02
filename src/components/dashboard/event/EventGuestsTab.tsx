'use client';

import React, { useState, useMemo } from 'react';
import type { Guest, GuestStatus } from '@/types/guest';
import GuestRow from '@/components/dashboard/guests/GuestRow';

interface EventGuestsTabProps {
  event: {
    id: string;
    title: string;
    slug: string;
  };
  guests: Guest[];
  onOpenCreateModal: () => void;
  onOpenEditModal: (guest: Guest) => void;
  onDeleteGuest: (guestId: string) => void;
  deletingId: string | null;
}

export default function EventGuestsTab({
  event,
  guests,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteGuest,
  deletingId,
}: EventGuestsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | GuestStatus>('all');

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesStatus = selectedStatus === 'all' || g.status === selectedStatus;
      if (!matchesStatus) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();
      const fullName = `${g.first_name || ''} ${g.last_name || ''}`.toLowerCase();
      const phone = (g.phone || '').toLowerCase();
      const email = (g.email || '').toLowerCase();
      const accessCode = (g.access_code || '').toLowerCase();
      const notes = (g.notes || '').toLowerCase();

      return (
        fullName.includes(term) ||
        phone.includes(term) ||
        email.includes(term) ||
        accessCode.includes(term) ||
        notes.includes(term)
      );
    });
  }, [guests, selectedStatus, searchTerm]);

  const confirmedCount = guests.filter((g) => g.status === 'confirmed').length;
  const pendingCount = guests.filter((g) => g.status === 'pending').length;
  const declinedCount = guests.filter((g) => g.status === 'declined').length;

  return (
    <div className="space-y-4 animate-fade-in-up pb-8">
      {/* Cabecera con Título y Acción Primaria Integrada */}
      <div className="flex items-center justify-between gap-3 pt-1 pb-1">
        <div className="flex items-center space-x-2.5">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            Invitados
          </h2>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {guests.length} {guests.length === 1 ? 'registrado' : 'registrados'}
          </span>
        </div>

        {/* Botón Primario: + Nuevo Invitado (Integrado en Toolbar, sin FAB) */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="py-2 px-3.5 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center space-x-1.5 shrink-0"
        >
          <span className="text-sm font-bold leading-none">+</span>
          <span>Nuevo Invitado</span>
        </button>
      </div>

      {/* Buscador y Pestañas de Estado */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, teléfono, código (#ABC123) o notas..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Pestañas de Filtrado */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedStatus('all')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-slate-200 dark:border-slate-800'
            }`}
          >
            Todos ({guests.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('confirmed')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'confirmed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-slate-200 dark:border-slate-800'
            }`}
          >
            ✓ Confirmados ({confirmedCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('pending')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'pending'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-slate-200 dark:border-slate-800'
            }`}
          >
            ⏳ Pendientes ({pendingCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('declined')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'declined'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-slate-200 dark:border-slate-800'
            }`}
          >
            ✕ No asistirán ({declinedCount})
          </button>
        </div>
      </section>

      {/* Lista de Invitados (Lista Plana Continua) */}
      {filteredGuests.length === 0 ? (
        <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xl">
            👥
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
              {guests.length === 0
                ? 'Aún no has agregado invitados a este evento'
                : 'No se encontraron invitados con los filtros aplicados'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {guests.length === 0
                ? 'Comienza a registrar personas o familias para asignarles pases y generar sus enlaces personalizados de confirmación.'
                : 'Intenta limpiar el término de búsqueda o seleccionar otro estado de confirmación.'}
            </p>
          </div>
          {guests.length === 0 ? (
            <button
              onClick={onOpenCreateModal}
              className="mt-2 py-2 px-4.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>+</span>
              <span>Agregar Primer Invitado</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
              className="mt-2 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--text-main)] font-semibold text-xs transition-all cursor-pointer"
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1 pb-1">
            <span>
              Mostrando {filteredGuests.length} de {guests.length} {guests.length === 1 ? 'invitado' : 'invitados'}
            </span>
          </div>

          <div className="divide-y divide-slate-200/70 dark:divide-slate-800/80 border-y border-slate-200/70 dark:border-slate-800/80">
            {filteredGuests.map((guest) => (
              <GuestRow
                key={guest.id}
                guest={guest}
                eventSlug={event.slug}
                eventTitle={event.title}
                onEdit={onOpenEditModal}
                onDelete={onDeleteGuest}
                isDeleting={deletingId === guest.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
