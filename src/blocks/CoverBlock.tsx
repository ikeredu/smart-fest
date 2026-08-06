'use client';

import React from 'react';
import { CoverBlockData } from '../types/blocks';
import MusicWidget from '../components/MusicWidget';

interface CoverBlockProps extends CoverBlockData {
  musicUrl?: string;
  musicAutoplay?: boolean;
  musicCoverImage?: string;
  onOpenCover?: () => void;
}

export default function CoverBlock({ 
  title, 
  subtitle, 
  scrollLabel, 
  musicUrl, 
  musicAutoplay,
  musicCoverImage,
  onOpenCover 
}: CoverBlockProps) {
  const handleScrollDown = () => {
    // 1. Disparar el evento de lluvia botánica global a nivel de página
    if (onOpenCover) {
      onOpenCover();
    }

    if (typeof window !== 'undefined') {
      // 2. Desplazamiento exacto hacia el inicio del siguiente bloque (offsetTop)
      const nextElement = document.getElementById('block-1') || document.querySelector('section:nth-of-type(2)');
      const targetPosition = nextElement ? (nextElement as HTMLElement).offsetTop : window.innerHeight;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1.0 segundo
      let startTimestamp: number | null = null;

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  // Separamos el título para aplicar la clase itálica a la última palabra
  const words = title.split(' ');
  const firstPart = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section 
      id="block-0"
      className="relative flex flex-col justify-between items-center w-full min-h-screen py-8 md:py-12 text-center overflow-hidden select-none bg-black"
    >
      {/* Widget de Música Embebido en la Portada (fijo en top-right de este bloque) */}
      {musicUrl && (
        <MusicWidget url={musicUrl} autoplay={musicAutoplay} coverImage={musicCoverImage} />
      )}
      
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
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/30 to-black/50 pointer-events-none" />
      </div>

      {/* Marco Editorial Perimetral */}
      <div className="absolute inset-4 md:inset-8 z-10 border border-potatoes/20 rounded-2xl pointer-events-none opacity-0 animate-fade-in-up delay-100" />

      {/* 1. Encabezado "SAVE THE DATE" (Flotando arriba con padding) */}
      <header className="relative z-20 w-full pt-8 md:pt-12 px-6">
        <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-300">
          <div className="h-[1px] w-10 md:w-16 bg-potatoes/40" />
          <span className="font-sans text-[10px] sm:text-[11px] md:text-[13px] font-semibold text-potatoes tracking-[0.35em] uppercase">
            {subtitle || ''}
          </span>
          <div className="h-[1px] w-10 md:w-16 bg-potatoes/40" />
        </div>
      </header>

      {/* 2. Contenido Principal Flotando Directamente sobre el Video */}
      <main className="relative z-20 flex flex-col items-center justify-center px-6 my-auto py-6">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Título Principal */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-potatoes max-w-2xl leading-[1.15] drop-shadow-lg font-bold tracking-tight opacity-0 animate-fade-in-up delay-500">
            {words.length > 1 ? (
              <>
                {firstPart} <br />
                <span className="italic font-normal font-serif text-potatoes">{lastWord}</span>
              </>
            ) : (
              title
            )}
          </h1>

          {/* Subtítulo con fecha */}
          <div className="pt-2 md:pt-4 opacity-0 animate-fade-in-up delay-700">
            <p className="font-sans text-[11px] sm:text-xs md:text-sm text-potatoes tracking-[0.25em] uppercase drop-shadow-sm font-semibold bg-white/10 px-5 py-1.5 md:px-6 md:py-2 rounded-full backdrop-blur-sm inline-block">
              Septiembre 2026
            </p>
          </div>
        </div>
      </main>

      {/* 3. Indicador inferior 'Presione para abrir' + Footer en flujo flex */}
      <footer className="relative z-20 w-full flex flex-col items-center pb-4 md:pb-6 px-4 gap-4">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-3 cursor-pointer focus:outline-none group bg-transparent border-none w-full opacity-0 animate-fade-in-up delay-900"
        >
          <span className="font-sans text-[10px] sm:text-[11px] md:text-xs text-potatoes tracking-[0.25em] uppercase font-bold text-shadow-gold opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {scrollLabel || 'Presione para abrir'}
          </span>

          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 border-potatoes/30 backdrop-blur-md transition-all duration-500 hover:border-potatoes hover:bg-white/20 bg-white/10 shadow-2xl pulse-soft group-hover:scale-105 animate-gentle-float">
            {/* Flecha doble hacia abajo en SVG fino */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7 text-potatoes font-light"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </div>
        </button>

        <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-potatoes/40 pt-1">
          Con Cariño, Siempre
        </span>
      </footer>
    </section>
  );
}
