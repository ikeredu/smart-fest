'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import type { Guest, GuestStatsMetrics } from '@/types/guest';
import { deleteGuestAction } from '@/app/dashboard/events/[id]/guests/guestsActions';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import GuestModal from '@/components/dashboard/guests/GuestModal';
import DeleteEventModal from './DeleteEventModal';
import EventOverviewTab from './EventOverviewTab';
import EventGuestsTab from './EventGuestsTab';
import EventSettingsTab from './EventSettingsTab';

export type EventTabType = 'overview' | 'guests' | 'settings';

interface EventManageClientProps {
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
  initialTab?: EventTabType;
}

export default function EventManageClient({
  event,
  guests,
  userEmail,
  userName,
  userRole,
  avatarUrl,
  initialTab = 'overview',
}: EventManageClientProps) {
  const [activeTab, setActiveTab] = useState<EventTabType>(initialTab);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState<Guest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deletingGuestId, setDeletingGuestId] = useState<string | null>(null);
  const [generalCopied, setGeneralCopied] = useState(false);
  const [, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Métricas de aforo en tiempo real
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

  const handleOpenCreateModal = () => {
    setGuestToEdit(null);
    setIsGuestModalOpen(true);
  };

  const handleOpenEditModal = (guest: Guest) => {
    setGuestToEdit(guest);
    setIsGuestModalOpen(true);
  };

  const handleDeleteGuest = (guestId: string) => {
    if (confirm('¿Estás seguro de eliminar este invitado de la lista?')) {
      setDeletingGuestId(guestId);
      startTransition(async () => {
        const res = await deleteGuestAction(guestId, event.id);
        setDeletingGuestId(null);
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
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
        avatarUrl={avatarUrl}
        breadcrumb={{ label: event.title }}
      />

      {/* Main Workspace Area (Ultra-Compact Top Navigation) */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col space-y-5">
        {/* Breadcrumb Navigation Compacto */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
            <Link
              href="/dashboard"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-1 font-medium"
            >
              <span>←</span>
              <span>Mis Eventos</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-bold truncate max-w-[280px]">
              {event.title}
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
              Activo
            </span>
          </nav>
        </div>

        {/* 3-Tabs Navigation Bar */}
        <section className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>📊</span>
            <span>Resumen</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guests')}
            className={`py-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'guests'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>👥</span>
            <span>Lista de Invitados</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                activeTab === 'guests'
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)]'
              }`}
            >
              {guests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>⚙️</span>
            <span>Configuración</span>
          </button>
        </section>

        {/* Tab Content Display */}
        <div className="pt-1">
          {activeTab === 'overview' && (
            <EventOverviewTab
              event={event}
              metrics={metrics}
              onNavigateToGuests={() => setActiveTab('guests')}
              onCopyLink={handleCopyGeneralLink}
              copied={generalCopied}
            />
          )}

          {activeTab === 'guests' && (
            <EventGuestsTab
              event={event}
              guests={guests}
              onOpenCreateModal={handleOpenCreateModal}
              onOpenEditModal={handleOpenEditModal}
              onDeleteGuest={handleDeleteGuest}
              deletingId={deletingGuestId}
            />
          )}

          {activeTab === 'settings' && (
            <EventSettingsTab
              event={event}
              onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
              onSuccess={showToast}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-[var(--text-muted)] border-t border-slate-200 dark:border-slate-800">
        Smart-Fest &copy; {new Date().getFullYear()} — Plataforma SaaS de Gestión de Eventos
      </footer>

      {/* Modales */}
      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => {
          setIsGuestModalOpen(false);
          setGuestToEdit(null);
        }}
        eventId={event.id}
        guestToEdit={guestToEdit}
        onSuccess={showToast}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        eventId={event.id}
        eventTitle={event.title}
      />
    </div>
  );
}
