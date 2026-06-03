'use client';

import React from 'react';
import { CoverBlockData } from '../types/blocks';
import MusicWidget from '@/components/MusicWidget';

export default function CoverBlock({ title, subtitle, backgroundImage, scrollLabel, music }: CoverBlockData) {
  const handleScrollDown = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined') {
      const currentSection = (e.currentTarget as HTMLElement).closest('section');
      const nextSection = currentSection?.nextElementSibling as HTMLElement;
      const parentContainer = currentSection?.parentElement;
      if (nextSection && parentContainer) {
        parentContainer.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  // Separamos el título para aplicar la clase itálica a la segunda palabra si es "Ethereal Union"
  // O genéricamente si tiene más de una palabra, poner la última en itálica en una línea nueva.
  const words = title.split(' ');
  const firstPart = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section 
      className="relative flex flex-col items-center justify-center w-full h-screen text-center overflow-hidden select-none bg-potatoes snap-start"
    >
      {/* Widget de música específico para CoverBlock */}
      {music?.url && (
        <MusicWidget url={music.url} autoplay={music.autoplay} />
      )}

      {/* Imagen de fondo de la boda */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Fondo de Invitación" 
            className="w-full h-full object-cover scale-100 transition-transform duration-10000 ease-out animate-slow-zoom" 
            src={backgroundImage}
          />
          <div className="hero-overlay absolute inset-0 z-10" />
        </div>
      )}

      {/* Contenido Principal */}
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-5 md:px-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Encabezado Save The Date */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 md:w-16 bg-cranberry/40" />
            <span className="font-sans text-[10px] md:text-[12px] font-semibold text-cranberry tracking-[0.4em] uppercase">
              {subtitle || 'SAVE THE DATE'}
            </span>
            <div className="h-[1px] w-12 md:w-16 bg-cranberry/40" />
          </div>

          {/* Título Principal */}
          <h1 className="font-serif text-[42px] md:text-[64px] text-cranberry max-w-2xl leading-tight drop-shadow-md font-normal">
            {words.length > 1 ? (
              <>
                {firstPart} <br />
                <span className="italic font-normal">{lastWord}</span>
              </>
            ) : (
              title
            )}
          </h1>

          {/* Subtítulo inferior */}
          <div className="pt-6">
            <p className="font-sans text-xs md:text-sm text-potatoes tracking-[0.3em] uppercase drop-shadow-sm font-semibold bg-cranberry/20 px-4 py-1 rounded-full backdrop-blur-sm inline-block">
              Coming Summer 2025
            </p>
          </div>
        </div>

        {/* Indicador inferior 'Presione para abrir' */}
        <button 
          onClick={handleScrollDown}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6 cursor-pointer animate-gentle-float focus:outline-none group bg-transparent border-none w-full"
        >
          <span className="font-sans text-xs md:text-sm text-cranberry tracking-[0.3em] uppercase font-bold text-shadow-custom opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {scrollLabel || 'Presione para abrir'}
          </span>
          
          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-cranberry/30 backdrop-blur-md transition-all duration-500 hover:border-cranberry hover:bg-white/40 bg-potatoes/50 shadow-[0_4px_15px_rgba(115,65,65,0.15)] group-hover:scale-105">
            {/* Flecha doble hacia abajo en SVG fino */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1} 
              stroke="currentColor" 
              className="w-7 h-7 text-cranberry font-light"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </div>
        </button>
      </main>

      {/* Footer Minimalista */}
      <footer className="absolute bottom-4 left-0 w-full flex justify-center opacity-40 pointer-events-none z-20">
        <span className="font-sans text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-artichoke font-semibold">
          With Love, Always
        </span>
      </footer>
    </section>
  );
}
