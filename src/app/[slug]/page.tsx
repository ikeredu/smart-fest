import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import InvitationClient from '@/components/invitation/InvitationClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('title')
    .eq('slug', slug)
    .single();

  if (!event) {
    return {
      title: 'Evento no encontrado | Smart-Fest',
    };
  }

  return {
    title: `${event.title} | Invitación Digital`,
    description: `Estás invitado a ${event.title}. Confirma tu asistencia en línea.`,
  };
}

export default async function DynamicEventPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !event || !event.config) {
    notFound();
  }

  return <InvitationClient config={event.config} />;
}
