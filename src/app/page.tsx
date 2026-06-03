import CoverBlock from '@/blocks/CoverBlock';
import StoryBlock from '@/blocks/StoryBlock';
import invitationData from '@/mocks/invitation.json';
import { AnyBlockData } from '@/types/blocks';

export default function Home() {
  // En el futuro, estos datos vendrán de un fetch a la base de datos.
  // Por ahora, leemos directamente el JSON local.
  const blocks = invitationData.blocks as AnyBlockData[];
  const musicConfig = invitationData.music;

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white relative">
      {/* Motor de Renderizado Dinámico (CDUI) */}
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'coverBlock':
            return (
              <CoverBlock 
                key={index} 
                {...block} 
                music={musicConfig?.url ? { url: musicConfig.url, autoplay: musicConfig.autoplay } : undefined} 
              />
            );
            
          case 'storyBlock':
            return <StoryBlock key={index} {...block} />;
          
          default:
            // Si viene un bloque desconocido, lo omitimos con gracia
            return null;
        }
      })}
    </main>
  );
}
