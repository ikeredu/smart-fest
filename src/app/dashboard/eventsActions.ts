'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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

  // Plantilla por defecto enriquecida con rutas relativas locales
  const formattedDate = eventDate
    ? new Date(eventDate).toISOString()
    : '2026-10-15T18:00:00.000Z';

  const defaultConfig = {
    theme: {
      primaryColor: '#734141',
      fontFamily: 'sans-serif',
    },
    music: {
      url: '/music/music.m4a',
      coverImage: '/images/kenia.png',
      autoplay: false,
    },
    blocks: [
      {
        _type: 'coverBlock',
        title: title.trim(),
        subtitle: '¡Nos Casamos!',
        backgroundImage: '',
        scrollLabel: 'Presione para abrir',
      },
      {
        _type: 'heroBlock',
        title: title.trim(),
        subtitle: 'Acompáñanos a celebrar nuestro gran día',
        date: formattedDate,
        backgroundImage: '/images/foto_novios.avif',
        effects: {
          glowEffect: true,
        },
      },
      {
        _type: 'parentsBlock',
        headerLabel: 'Nuestra Unión',
        brideParents: {
          label: 'Padres de la Novia',
          father: 'Alejandro Guillén Hernández',
          mother: 'Araceli Sotelo García',
        },
        groomParents: {
          label: 'Padres del Novio',
          father: 'Alfredo Deloya Martínez',
          mother: 'Guadalupe Arteaga Meza',
        },
        brideFullName: {
          firstName: 'Alejandra',
          lastName: 'Guillén Sotelo',
        },
        groomFullName: {
          firstName: 'David Emmanuel',
          lastName: 'Deloya Arteaga',
        },
        invitationMessage:
          'Tienen el honor de invitarle a la celebración de su matrimonio, uniendo dos historias en un solo camino de amor.',
        yearText: 'Dos Mil Veintiséis',
        backgroundImage: '/images/arbol.png',
      },
      {
        _type: 'locationsBlock',
        title: 'Ubicaciones',
        subtitle: 'Dónde & Cuándo',
        backgroundImage: '/images/igles.jpg',
        locations: [
          {
            id: 'loc_ceremony',
            type: 'ceremony',
            title: 'Ceremonia Religiosa',
            venueName: 'Parroquia de San Miguel Arcángel',
            time: '17:00 HRS',
            address: 'Av. Universidad #120, Col. Centro, Querétaro, Qro.',
            mapsUrl:
              'https://www.google.com/maps/dir/?api=1&destination=Parroquia+de+San+Miguel+Arcangel+Queretaro',
          },
          {
            id: 'loc_reception',
            type: 'reception',
            title: 'Recepción & Fiesta',
            venueName: 'Hacienda Las Campanas',
            time: '19:30 HRS',
            address: 'Carretera a Celaya Km 8.5, Querétaro, Qro.',
            mapsUrl:
              'https://www.google.com/maps/dir/?api=1&destination=Hacienda+Las+Campanas+Queretaro',
          },
        ],
      },
      {
        _type: 'rsvpBlock',
        title: 'Confirmación de Asistencia',
        subtitle: 'RSVP',
        backgroundImage:
          'https://lh3.googleusercontent.com/aida/AP1WRLujgnAG_YMpxpAe5ta6gFr-FhthPetJ7i8eJuTNjZMyjB7IgxjHVU8mJbqHfBaQL6mAuiKWjKTZCEzSbrVg400gb7X_U8mW_SortI7P16Y1E4ncQv7OZxGsBF1cPbTEo8PixaURY7CMSXmQy9ETaFVYwJYAIo1K8ed49_FJ9kzLR9s2ZDymg1suCJGC7PtorZbisWqOVF9UWkHRvOYiWJ1ado3Dui4_XFAUIdriw4c1RsiZ9ZV8vDk_Mg',
        maxGuests: 4,
        deadlineText: 'Favor de confirmar antes del 15 de Septiembre de 2026',
        submitButtonText: 'Confirmar',
        guestName: 'Familia Invitada',
      },
    ],
  };

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
