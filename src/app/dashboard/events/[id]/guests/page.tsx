import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { formatPersonName } from '@/lib/formatters';
import EventManageClient from '@/components/dashboard/event/EventManageClient';
import type { Metadata } from 'next';

interface GuestsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: GuestsPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('title')
    .eq('id', id)
    .single();

  return {
    title: event ? `Invitados: ${event.title} | Smart-Fest` : 'Gestión de Invitados | Smart-Fest',
  };
}

export default async function GuestsPage({ params }: GuestsPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Obtener perfil de usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const rawUserName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Anfitrión';
  const userName = formatPersonName(rawUserName);

  const userEmail = profile?.email || user.email || '';
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || null;
  const userRole =
    profile?.role === 'admin'
      ? 'Administrador'
      : profile?.role === 'planner'
      ? 'Planner'
      : 'Anfitrión';

  // 2. Obtener datos del evento validando pertenencia al usuario
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, title, slug, event_date')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (eventError || !event) {
    notFound();
  }

  // 3. Obtener lista de invitados del evento
  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', id)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <EventManageClient
      event={event}
      guests={guests || []}
      userEmail={userEmail}
      userName={userName}
      userRole={userRole}
      avatarUrl={avatarUrl}
      initialTab="guests"
    />
  );
}