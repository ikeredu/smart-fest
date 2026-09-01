import { AnyBlockData } from '@/types/blocks';

export interface InvitationConfig {
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
  music: {
    url: string;
    coverImage: string;
    autoplay: boolean;
  };
  blocks: AnyBlockData[];
}

/**
 * Genera la configuración inicial por defecto para un nuevo evento (CDUI).
 * Inyecta el título del evento y la fecha seleccionada dentro de la plantilla base.
 */
export function generateDefaultInvitationConfig(
  title: string,
  eventDate?: string | null
): InvitationConfig {
  const cleanTitle = title?.trim() || 'Nuestra Boda';
  const formattedDate = eventDate
    ? new Date(eventDate).toISOString()
    : '2026-10-15T18:00:00.000Z';

  return {
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
        title: cleanTitle,
        subtitle: '¡Nos Casamos!',
        backgroundImage: '',
        scrollLabel: 'Presione para abrir',
      },
      {
        _type: 'heroBlock',
        title: cleanTitle,
        subtitle: 'Acompáñanos a celebrar nuestro gran día',
        date: formattedDate,
        backgroundImage: '/images/foto_novios.jpeg',
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
        backgroundImage: '/images/fondo_padres.jpg',
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
            venueName: 'Iglesia Cristo Resucitado',
            time: '18:00 HRS',
            address: 'Agua Dulce, Veracruz',
            mapsUrl: 'https://maps.app.goo.gl/rAk2SNsXb57KHqWz5',
          },
          {
            id: 'loc_reception',
            type: 'reception',
            title: 'Recepción & Fiesta',
            venueName: 'Salón Tovenbu',
            time: '19:00 HRS',
            address: 'Diez Ordaz, 96690 Agua Dulce, Ver.',
            mapsUrl: 'https://maps.app.goo.gl/MSGB5jbkaLHc8vBb6',
          },
        ],
      },
      {
        _type: 'dressAndGiftsBlock',
        backgroundImage: '/images/fondo_dress_code.jpg',
        dressCodeTitle: 'Código de Vestimenta',
        dressCodeSubtitle: 'Formal',
        mensDressCode:
          'Les invitamos a vestir con su mejor estilo formal para acompañar la elegancia de la noche.',
        womensDressCode:
          'Les invitamos a lucir sus mejores galas en vestido largo o de noche.',
        giftsTitle: 'Mesa de Regalos',
        giftsDescription:
          'Tu presencia es el mejor regalo, pero si deseas tener un detalle con nosotros, agradecemos regalo en efectivo.',
      },
      {
        _type: 'galleryBlock',
        title: 'Nuestros Momentos',
        images: [
          '/images/carrusel/boda1.jpeg',
          '/images/carrusel/boda2.jpeg',
          '/images/carrusel/boda3.jpeg',
          '/images/carrusel/boda4.jpeg',
        ],
      },
      {
        _type: 'rsvpBlock',
        title: 'Confirmación de Asistencia',
        subtitle: 'RSVP',
        backgroundImage: '/images/fondo_confirmacion.jpg',
        maxGuests: 4,
        deadlineText: 'Favor de confirmar antes del 15 de Septiembre de 2026',
        submitButtonText: 'Confirmar',
        guestName: 'Familia Invitada',
      },
    ],
  };
}
