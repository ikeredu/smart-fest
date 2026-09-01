'use client';

import React, { useState, useTransition } from 'react';
import type { Guest, GuestStatus } from '@/types/guest';
import { createGuestAction, updateGuestAction } from '@/app/dashboard/events/[id]/guests/guestsActions';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  guestToEdit?: Guest | null;
  onSuccess?: (msg: string) => void;
}

interface GuestModalInnerProps {
  onClose: () => void;
  eventId: string;
  guestToEdit?: Guest | null;
  onSuccess?: (msg: string) => void;
}

function GuestModalInner({
  onClose,
  eventId,
  guestToEdit,
  onSuccess,
}: GuestModalInnerProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states inicializados directamente desde las props (sin useEffect)
  const [firstName, setFirstName] = useState(guestToEdit?.first_name || '');
  const [lastName, setLastName] = useState(guestToEdit?.last_name || '');
  const [phone, setPhone] = useState(guestToEdit?.phone || '');
  const [email, setEmail] = useState(guestToEdit?.email || '');
  const [passesAllocated, setPassesAllocated] = useState(guestToEdit?.passes_allocated || 2);
  const [passesConfirmed, setPassesConfirmed] = useState(guestToEdit?.passes_confirmed || 0);
  const [status, setStatus] = useState<GuestStatus>(guestToEdit?.status || 'pending');
  const [notes, setNotes] = useState(guestToEdit?.notes || '');

  const isEditing = !!guestToEdit;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage('Por favor, ingresa el nombre o familia invitada.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName.trim());
    formData.append('lastName', lastName.trim());
    formData.append('phone', phone.trim());
    formData.append('email', email.trim());
    formData.append('passesAllocated', passesAllocated.toString());
    formData.append('notes', notes.trim());

    if (isEditing) {
      formData.append('status', status);
      formData.append('passesConfirmed', passesConfirmed.toString());
    }

    startTransition(async () => {
      let result;
      if (isEditing && guestToEdit) {
        result = await updateGuestAction(guestToEdit.id, eventId, formData);
      } else {
        result = await createGuestAction(eventId, formData);
      }

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        if (onSuccess) {
          onSuccess(isEditing ? 'Invitado actualizado con éxito' : 'Invitado registrado con éxito');
        }
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-[var(--bg-card)] rounded-2xl border border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300">
        {/* Header Modal */}
        <div className="px-6 py-4.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/20">
              {isEditing ? '✏️' : '👥'}
            </span>
            <div>
              <h2 className="text-base font-bold text-[var(--text-main)] leading-tight">
                {isEditing ? 'Editar Invitado' : 'Agregar Nuevo Invitado'}
              </h2>
              <p className="text-[11px] text-[var(--text-muted)]">
                {isEditing
                  ? 'Modifica los datos y estado de confirmación'
                  : 'Registra una persona o grupo para asignarle pases'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-medium text-xs flex items-center space-x-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-[var(--text-main)] block">
                Nombre o Familia <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="ej. Familia Gómez o David"
                required
                className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[var(--text-main)] block">
                Apellidos / Distintivo <span className="text-[10px] text-[var(--text-muted)] font-normal">(opcional)</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="ej. Sotelo"
                className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Teléfono y Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-[var(--text-main)] block">
                WhatsApp / Teléfono <span className="text-[10px] text-[var(--text-muted)] font-normal">(para enviar invitación)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ej. +52 442 123 4567"
                className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[var(--text-main)] block">
                Correo Electrónico <span className="text-[10px] text-[var(--text-muted)] font-normal">(opcional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej. invitado@correo.com"
                className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Pases Asignados y Control Numérico */}
          <div className="p-4 rounded-xl bg-[var(--bg-input)]/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[var(--text-main)] text-xs block">
                  Pases Asignados (Cupo)
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Cantidad máxima de personas permitidas con esta invitación
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setPassesAllocated((prev) => Math.max(1, prev - 1))}
                  disabled={passesAllocated <= 1}
                  className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[var(--text-main)] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold font-mono text-sm w-6 text-center text-[var(--text-main)]">
                  {passesAllocated}
                </span>
                <button
                  type="button"
                  onClick={() => setPassesAllocated((prev) => prev + 1)}
                  className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[var(--text-main)] font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Opciones Adicionales para Modo Edición */}
            {isEditing && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)] block">
                    Estado RSVP
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      const newStatus = e.target.value as GuestStatus;
                      setStatus(newStatus);
                      if (newStatus === 'confirmed' && passesConfirmed === 0) {
                        setPassesConfirmed(passesAllocated);
                      } else if (newStatus === 'declined') {
                        setPassesConfirmed(0);
                      }
                    }}
                    className="w-full bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  >
                    <option value="pending">⏳ Pendiente</option>
                    <option value="confirmed">✓ Confirmado</option>
                    <option value="declined">✕ No asistirá</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--text-main)] block">
                    Pases Confirmados Reales
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={passesAllocated}
                    value={passesConfirmed}
                    onChange={(e) => setPassesConfirmed(parseInt(e.target.value, 10) || 0)}
                    disabled={status === 'declined'}
                    className="w-full bg-[var(--bg-card)] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-[var(--text-main)] focus:outline-none focus:border-emerald-500 disabled:opacity-40"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notas Internas */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[var(--text-main)] block">
              Notas Internas <span className="text-[10px] text-[var(--text-muted)] font-normal">(mesa, alergias, requerimientos especiales)</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ej. Mesa 4, padrinos de anillos, menú celíaco..."
              className="w-full bg-[var(--bg-input)] border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-[var(--text-main)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center space-x-1.5"
            >
              {isPending && <span className="animate-spin text-xs">🌀</span>}
              <span>{isEditing ? 'Guardar Cambios' : 'Registrar Invitado'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GuestModal({
  isOpen,
  onClose,
  eventId,
  guestToEdit,
  onSuccess,
}: GuestModalProps) {
  if (!isOpen) return null;

  return (
    <GuestModalInner
      key={guestToEdit?.id ?? 'create-guest'}
      onClose={onClose}
      eventId={eventId}
      guestToEdit={guestToEdit}
      onSuccess={onSuccess}
    />
  );
}