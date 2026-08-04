'use client';

import React, { useState } from 'react';
import HeroBlock from '@/blocks/HeroBlock';
import CoverBlock from '@/blocks/CoverBlock';
import ParentsBlock from '@/blocks/ParentsBlock';
import RSVPBlock from '@/blocks/RSVPBlock';
import PetalShower from '@/components/PetalShower';
import invitationData from '@/mocks/invitation.json';
import { AnyBlockData } from '@/types/blocks';

export default function Home() {
  const [isPetalActive, setIsPetalActive] = useState(false);

  // En el futuro, estos datos vendrán de un fetch a la base de datos.
  // Por ahora, leemos directamente el JSON local.
  const blocks = invitationData.blocks as AnyBlockData[];
  const musicConfig = invitationData.music;

  const handleOpenInvitation = () => {
    setIsPetalActive(true);
  };

  return (
    <main className="min-h-screen relative">
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

          case 'rsvpBlock':
            return <RSVPBlock key={index} id={`block-${index}`} {...block} />;
          
          default:
            // Si viene un bloque desconocido, lo omitimos con gracia
            return null;
        }
      })}
    </main>
  );
}
