'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { GuestStatus } from '@/types/guest';

function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createGuestAction(eventId: string, formData: FormData) {
  if (!eventId) {
    return { error: 'ID de evento inválido.' };
  }

  const firstName = (formData.get('firstName') as string)?.trim();
  const lastName = (formData.get('lastName') as string)?.trim() || null;
  const phone = (formData.get('phone') as string)?.trim() || null;
  const email = (formData.get('email') as string)?.trim() || null;
  const notes = (formData.get('notes') as string)?.trim() || null;
  const rawPasses = formData.get('passesAllocated') as string;
  const passesAllocated = parseInt(rawPasses, 10) || 1;

  if (!firstName) {
    return { error: 'El nombre del invitado o familia es obligatorio.' };
  }

  if (passesAllocated < 1) {
    return { error: 'Los pases asignados deben ser al menos 1.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: 'No tienes una sesión activa.' };
  }

  // Verificar pertenencia del evento
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id')
    .eq('id', eventId)
    .eq('user_id', user.id)
    .single();

  if (eventError || !event) {
    return { error: 'Evento no encontrado o no autorizado.' };
  }

  const accessCode = generateAccessCode();

  const { data, error } = await supabase
    .from('guests')
    .insert([
      {
        event_id: eventId,
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        passes_allocated: passesAllocated,
        passes_confirmed: 0,
        status: 'pending' as GuestStatus,
        notes: notes,
        access_code: accessCode,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating guest:', error);
    return { error: `Error al registrar invitado: ${error.message}` };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  return { success: true, guest: data };
}

export async function updateGuestAction(guestId: string, eventId: string, formData: FormData) {
  if (!guestId || !eventId) {
    return { error: 'Identificadores inválidos.' };
  }

  const firstName = (formData.get('firstName') as string)?.trim();
  const lastName = (formData.get('lastName') as string)?.trim() || null;
  const phone = (formData.get('phone') as string)?.trim() || null;
  const email = (formData.get('email') as string)?.trim() || null;
  const notes = (formData.get('notes') as string)?.trim() || null;
  const status = (formData.get('status') as GuestStatus) || 'pending';
  const passesAllocated = parseInt(formData.get('passesAllocated') as string, 10) || 1;
  const passesConfirmed = parseInt(formData.get('passesConfirmed') as string, 10) || 0;

  if (!firstName) {
    return { error: 'El nombre del invitado o familia es obligatorio.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autorizado.' };
  }

  const updatePayload: Record<string, string | number | null> = {
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    email: email,
    passes_allocated: passesAllocated,
    passes_confirmed: status === 'declined' ? 0 : passesConfirmed,
    status: status,
    notes: notes,
    updated_at: new Date().toISOString(),
  };

  if (status === 'confirmed') {
    updatePayload.confirmed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('guests')
    .update(updatePayload)
    .eq('id', guestId)
    .eq('user_id', user.id)
    .eq('event_id', eventId)
    .select()
    .single();

  if (error) {
    console.error('Error updating guest:', error);
    return { error: `Error al actualizar invitado: ${error.message}` };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  return { success: true, guest: data };
}

export async function deleteGuestAction(guestId: string, eventId: string) {
  if (!guestId || !eventId) {
    return { error: 'Identificadores inválidos.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autorizado.' };
  }

  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', guestId)
    .eq('user_id', user.id)
    .eq('event_id', eventId);

  if (error) {
    console.error('Error deleting guest:', error);
    return { error: `Error al eliminar invitado: ${error.message}` };
  }

  revalidatePath(`/dashboard/events/${eventId}/guests`);
  return { success: true };
}