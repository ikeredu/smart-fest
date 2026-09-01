'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import type { Guest, GuestStatus, GuestStatsMetrics } from '@/types/guest';
import { logoutAction } from '@/app/(auth)/actions';
import { deleteGuestAction } from '@/app/dashboard/events/[id]/guests/guestsActions';
import ThemeToggle from '@/components/dashboard/ThemeToggle';
import GuestStats from './GuestStats';
import GuestRow from './GuestRow';
import GuestModal from './GuestModal';

interface GuestsDashboardClientProps {
  event: {
    id: string;
    title: string;
    slug: string;
    event_date: string | null;
  };
  guests: Guest[];
  userEmail: string;
  userName: string;
  userRole: string;
  avatarUrl?: string | null;
}

export default function GuestsDashboardClient({
  event,
  guests,
  userEmail,
  userName,
  userRole,
  avatarUrl,
}: GuestsDashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | GuestStatus>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState<Guest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [generalCopied, setGeneralCopied] = useState(false);
  const [, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calcular métricas de aforo en tiempo real
  const metrics: GuestStatsMetrics = useMemo(() => {
    let totalPassesAllocated = 0;
    let totalPassesConfirmed = 0;
    let totalConfirmedGuests = 0;
    let totalPendingPasses = 0;
    let totalDeclinedPasses = 0;

    guests.forEach((g) => {
      totalPassesAllocated += g.passes_allocated || 0;
      if (g.status === 'confirmed') {
        totalPassesConfirmed += g.passes_confirmed || 0;
        totalConfirmedGuests += 1;
      } else if (g.status === 'pending') {
        totalPendingPasses += g.passes_allocated || 0;
      } else if (g.status === 'declined') {
        totalDeclinedPasses += g.passes_allocated || 0;
      }
    });

    return {
      totalFamilies: guests.length,
      totalPassesAllocated,
      totalPassesConfirmed,
      totalConfirmedGuests,
      totalPendingPasses,
      totalDeclinedPasses,
    };
  }, [guests]);

  // Filtrado de invitados
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

  const handleOpenCreateModal = () => {
    setGuestToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (guest: Guest) => {
    setGuestToEdit(guest);
    setIsModalOpen(true);
  };

  const handleDeleteGuest = (guestId: string) => {
    if (confirm('¿Estás seguro de eliminar este invitado de la lista?')) {
      setDeletingId(guestId);
      startTransition(async () => {
        const res = await deleteGuestAction(guestId, event.id);
        setDeletingId(null);
        if (res.error) {
          showToast(`Error: ${res.error}`);
        } else {
          showToast('Invitado eliminado con éxito');
        }
      });
    }
  };

  const handleCopyGeneralLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const generalUrl = `${origin}/${event.slug}`;
    navigator.clipboard.writeText(generalUrl);
    setGeneralCopied(true);
    setTimeout(() => setGeneralCopied(false), 2000);
  };

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Sin fecha programada';

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-300 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 py-3 px-5 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl animate-fade-in-up flex items-center space-x-2 border border-emerald-400">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3.5 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Role Badge */}
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-main)] hover:opacity-80 transition-opacity">
              Smart-Fest
            </Link>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
              {userRole}
            </span>
          </div>

          {/* Controls: Theme Toggle + User Info + Logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <ThemeToggle />

            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-8 h-8 rounded-full border border-emerald-500/30 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[var(--text-main)] leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[150px]">
                  {userEmail}
                </span>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="py-1.5 px-3 sm:px-3.5 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 border border-slate-300 dark:border-slate-700 text-slate-700 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <span>Salir</span>
                <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 md:p-10 flex flex-col space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
          <Link href="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-1">
            <span>←</span>
            <span>Mis Eventos</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text-main)] font-medium truncate max-w-[200px]">
            {event.title}
          </span>
          <span>/</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Lista de Invitados
          </span>
        </nav>

        {/* Event Header Banner */}
        <section className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
                Gestión de Asistencia & RSVP
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

          {/* Banner Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyGeneralLink}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-sm"
              title="Copiar enlace general del evento"
            >
              <span>{generalCopied ? '✓ ¡Copiado!' : '🔗 Enlace General'}</span>
            </button>

            <Link
              href={`/${event.slug}`}
              target="_blank"
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-sm"
            >
              <span>👁️ Ver Invitación</span>
            </Link>

            <button
              onClick={handleOpenCreateModal}
              className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-emerald-600/20 active:scale-95 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <span className="text-base leading-none">+</span>
              <span>Nuevo Invitado</span>
            </button>
          </div>
        </section>

        {/* Real-time KPI Stats Cards */}
        <GuestStats metrics={metrics} />

        {/* Toolbar: Search + Filter Tabs */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, teléfono, código o notas..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
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

            {/* Filter Tabs */}
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
                ✓ Confirmados ({metrics.totalConfirmedGuests})
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
                ⏳ Pendientes ({guests.filter((g) => g.status === 'pending').length})
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
                ✕ Cancelados ({guests.filter((g) => g.status === 'declined').length})
              </button>
            </div>
          </div>

          {/* Guests List Container */}
          {filteredGuests.length === 0 ? (
            <div className="bg-[var(--bg-card)] rounded-2xl p-8 sm:p-12 border border-emerald-500/30 dark:border-emerald-500/40 text-center flex flex-col items-center justify-center space-y-4 shadow-sm transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                👥
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-main)]">
                  {guests.length === 0
                    ? 'Aún no has agregado invitados a este evento'
                    : 'No se encontraron invitados con los filtros aplicados'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {guests.length === 0
                    ? 'Comienza a registrar las personas o familias para asignarles pases y generar sus enlaces personalizados de confirmación.'
                    : 'Intenta limpiar el término de búsqueda o seleccionar otro estado de confirmación.'}
                </p>
              </div>
              {guests.length === 0 ? (
                <button
                  onClick={handleOpenCreateModal}
                  className="mt-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  + Agregar Primer Invitado
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
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
                <span>
                  Mostrando {filteredGuests.length} de {guests.length} {guests.length === 1 ? 'invitado' : 'invitados'}
                </span>
              </div>

              <div className="space-y-3">
                {filteredGuests.map((guest) => (
                  <GuestRow
                    key={guest.id}
                    guest={guest}
                    eventSlug={event.slug}
                    eventTitle={event.title}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteGuest}
                    isDeleting={deletingId === guest.id}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-[var(--text-muted)] border-t border-slate-200 dark:border-slate-800">
        Smart-Fest &copy; {new Date().getFullYear()} — Plataforma SaaS de Gestión de Eventos
      </footer>

      {/* Guest Modal (Alta / Edición) */}
      <GuestModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setGuestToEdit(null);
        }}
        eventId={event.id}
        guestToEdit={guestToEdit}
        onSuccess={showToast}
      />
    </div>
  );
}