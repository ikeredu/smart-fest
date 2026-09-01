'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { generateDefaultInvitationConfig } from '@/lib/templates/defaultInvitationConfig';

function generateSlug(title: string): string {
  const cleanTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${cleanTitle}-${randomSuffix}`;
}

export async function createEventAction(formData: FormData) {
  const title = formData.get('title') as string;
  const eventDate = formData.get('eventDate') as string;

  if (!title || !title.trim()) {
    return { error: 'El título del evento es obligatorio.' };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'No tienes una sesión activa. Por favor inicia sesión.' };
  }

  // Ensure profile row exists to fulfill foreign key constraint (e.g. for Google OAuth users)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!profile) {
    await supabase.from('profiles').upsert([
      {
        id: user.id,
        full_name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split('@')[0] ||
          'Anfitrión',
        email: user.email || '',
      },
    ]);
  }

  const slug = generateSlug(title);
  const defaultConfig = generateDefaultInvitationConfig(title, eventDate);

  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        user_id: user.id,
        title: title.trim(),
        slug: slug,
        event_date: eventDate ? new Date(eventDate).toISOString() : null,
        config: defaultConfig,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return { error: `Error al crear el evento: ${error.message}` };
  }

  revalidatePath('/dashboard');
  return { success: true, event: data };
}

export async function deleteEventAction(eventId: string) {
  if (!eventId) {
    return { error: 'ID de evento inválido.' };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autorizado.' };
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)
    .eq('user_id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateEventBasicsAction(eventId: string, formData: FormData) {
  if (!eventId) {
    return { error: 'ID de evento inválido.' };
  }

  const title = (formData.get('title') as string)?.trim();
  const eventDate = formData.get('eventDate') as string;

  if (!title) {
    return { error: 'El título del evento es obligatorio.' };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autorizado.' };
  }

  const updatePayload: Record<string, string | null> = {
    title: title,
    event_date: eventDate ? new Date(eventDate).toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('events')
    .update(updatePayload)
    .eq('id', eventId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event basics:', error);
    return { error: `Error al actualizar evento: ${error.message}` };
  }

  revalidatePath(`/dashboard/events/${eventId}`);
  revalidatePath('/dashboard');
  return { success: true, event: data };
}
