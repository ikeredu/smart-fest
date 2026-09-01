'use client';

import React, { useState } from 'react';
import HeroBlock from '@/blocks/HeroBlock';
import CoverBlock from '@/blocks/CoverBlock';
import ParentsBlock from '@/blocks/ParentsBlock';
import LocationsBlock from '@/blocks/LocationsBlock';
import RSVPBlock from '@/blocks/RSVPBlock';
import DressAndGiftsBlock from '@/blocks/DressAndGiftsBlock';
import GalleryBlock from '@/blocks/GalleryBlock';
import EventDetailsBlock from '@/blocks/EventDetailsBlock';
import PetalShower from '@/components/PetalShower';
import { AnyBlockData } from '@/types/blocks';

interface InvitationClientProps {
  config: {
    theme?: {
      primaryColor?: string;
      fontFamily?: string;
    };
    music?: {
      url?: string;
      coverImage?: string;
      autoplay?: boolean;
    };
    blocks?: AnyBlockData[];
  };
}

export default function InvitationClient({ config }: InvitationClientProps) {
  const [isPetalActive, setIsPetalActive] = useState(false);

  const blocks = (config?.blocks || []) as AnyBlockData[];
  const musicConfig = config?.music;

  const handleOpenInvitation = () => {
    setIsPetalActive(true);
  };

  return (
    <main className="min-h-screen relative bg-black select-none">
      {/* 1. Capa Flotante Global para la Lluvia Botánica de Pétalos */}
      <PetalShower 
        isActive={isPetalActive} 
        onComplete={() => setIsPetalActive(false)} 
      />

      {/* 2. Motor de Renderizado Dinámico (CDUI) */}
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'coverBlock':
            return (
              <CoverBlock 
                key={index} 
                {...block} 
                musicUrl={musicConfig?.url} 
                musicAutoplay={musicConfig?.autoplay} 
                musicCoverImage={musicConfig?.coverImage}
                onOpenCover={handleOpenInvitation}
              />
            );
            
          case 'heroBlock':
            return <HeroBlock key={index} {...block} />;

          case 'parentsBlock':
            return <ParentsBlock key={index} id={`block-${index}`} {...block} />;

          case 'locationsBlock':
            return <LocationsBlock key={index} id={`block-${index}`} {...block} />;

          case 'rsvpBlock':
            return <RSVPBlock key={index} id={`block-${index}`} {...block} />;

          case 'dressAndGiftsBlock':
            return <DressAndGiftsBlock key={index} {...block} />;

          case 'galleryBlock':
            return <GalleryBlock key={index} {...block} />;

          case 'eventDetailsBlock':
            return <EventDetailsBlock key={index} {...block} />;

          default:
            return null;
        }
      })}
    </main>
  );
}
