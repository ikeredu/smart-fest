import HeroBlock from '@/blocks/HeroBlock';
import CoverBlock from '@/blocks/CoverBlock';
import MusicWidget from '@/components/MusicWidget';
import invitationData from '@/mocks/invitation.json';
import { AnyBlockData } from '@/types/blocks';

export default function Home() {
  // En el futuro, estos datos vendrán de un fetch a la base de datos.
  // Por ahora, leemos directamente el JSON local.
  const blocks = invitationData.blocks as AnyBlockData[];
  const musicConfig = invitationData.music;

  return (
    <main className="min-h-screen bg-white relative">
      {/* 1. Widget de Música Global si está configurado en el JSON */}
      {musicConfig?.url && (
        <MusicWidget url={musicConfig.url} autoplay={musicConfig.autoplay} />
      )}

      {/* 2. Motor de Renderizado Dinámico (CDUI) */}
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'coverBlock':
            return <CoverBlock key={index} {...block} />;
            
          case 'heroBlock':
            return <HeroBlock key={index} {...block} />;
          
          default:
            // Si viene un bloque desconocido, lo omitimos con gracia
            return null;
        }
      })}
    </main>
  );
}
