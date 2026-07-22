'use client';

import React from 'react';
import { CoverBlockData } from '../types/blocks';

export default function CoverBlock({ title, subtitle, scrollLabel }: CoverBlockData) {
  const handleScrollDown = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Separamos el título para aplicar la clase itálica a la última palabra
  const words = title.split(' ');
  const firstPart = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section 
      className="relative flex flex-col items-center justify-center w-full h-screen text-center overflow-hidden select-none bg-black"
    >
      {/* Video de Fondo Directo */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-100 transition-transform duration-10000 ease-out animate-slow-zoom"
        >
          {/* Video en HD panorámico para laptops y escritorios */}
          <source src="/videos/vid_principal_desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
          {/* Video vertical para dispositivos móviles */}
          <source src="/videos/vid_principal.mp4" type="video/mp4" />
        </video>
        
        {/* Degradado súper sutil ("tantito") para garantizar la legibilidad ininterrumpida de los textos */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Marco Editorial Perimetral */}
      <div className="absolute inset-4 md:inset-8 z-10 border border-potatoes/20 rounded-2xl pointer-events-none opacity-0 animate-fade-in-up delay-100" />

      {/* Contenido Principal Flotando Directamente sobre el Video */}
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <div className="text-center space-y-8">
          {/* 1. Encabezado "SAVE THE DATE" */}
          <div className="flex items-center justify-center gap-4 mb-4 opacity-0 animate-fade-in-up delay-300">
            <div className="h-[1px] w-12 md:w-16 bg-potatoes/40" />
            <span className="font-sans text-[11px] md:text-[13px] font-semibold text-potatoes tracking-[0.4em] uppercase">
              {subtitle || 'SAVE THE DATE'}
            </span>
            <div className="h-[1px] w-12 md:w-16 bg-potatoes/40" />
          </div>

          {/* 2. Título Principal */}
          <h1 className="font-serif text-[48px] md:text-[68px] text-potatoes max-w-2xl leading-[1.1] drop-shadow-lg font-bold tracking-tight opacity-0 animate-fade-in-up delay-500">
            {words.length > 1 ? (
              <>
                {firstPart} <br />
                <span className="italic font-normal font-serif text-potatoes">{lastWord}</span>
              </>
            ) : (
              title
            )}
          </h1>

          {/* 3. Subtítulo con fecha */}
          <div className="pt-6 opacity-0 animate-fade-in-up delay-700">
            <p className="font-sans text-xs md:text-sm text-potatoes tracking-[0.3em] uppercase drop-shadow-sm font-semibold bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm inline-block">
              Coming Summer 2025
            </p>
          </div>
        </div>

        {/* 4. Indicador inferior 'Presione para abrir' */}
        <button 
          onClick={handleScrollDown}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 cursor-pointer focus:outline-none group bg-transparent border-none w-full opacity-0 animate-fade-in-up delay-900"
        >
          <span className="font-sans text-[11px] md:text-xs text-potatoes tracking-[0.3em] uppercase font-bold text-shadow-gold opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {scrollLabel || 'Presione para abrir'}
          </span>
          
          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-potatoes/30 backdrop-blur-md transition-all duration-500 hover:border-potatoes hover:bg-white/20 bg-white/10 shadow-2xl pulse-soft group-hover:scale-105 animate-gentle-float">
            {/* Flecha doble hacia abajo en SVG fino */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1} 
              stroke="currentColor" 
              className="w-7 h-7 text-potatoes font-light"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </div>
        </button>
      </main>

      {/* Footer Minimalista */}
      <footer className="absolute bottom-4 left-0 w-full flex justify-center opacity-30 pointer-events-none z-20">
        <span className="font-sans text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-potatoes">
          With Love, Always
        </span>
      </footer>
    </section>
  );
}
