'use client';

import React from 'react';
import { CoverBlockData } from '../types/blocks';

export default function CoverBlock({ title, subtitle, backgroundImage, scrollLabel }: CoverBlockData) {
  const handleScrollDown = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Separamos el título para aplicar la clase itálica a la segunda palabra si es "Ethereal Union"
  // O genéricamente si tiene más de una palabra, poner la última en itálica en una línea nueva.
  const words = title.split(' ');
  const firstPart = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section 
      className="relative flex flex-col items-center justify-center w-full h-screen text-center overflow-hidden select-none bg-[#fcf8f8]"
    >
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
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-6">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Encabezado Save The Date */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 md:w-16 bg-[#D4AF37]/40" />
            <span className="font-sans text-[10px] md:text-[12px] font-semibold text-[#D4AF37] tracking-[0.4em] uppercase">
              {subtitle || 'SAVE THE DATE'}
            </span>
            <div className="h-[1px] w-12 md:w-16 bg-[#D4AF37]/40" />
          </div>

          {/* Título Principal */}
          <h1 className="font-serif text-[42px] md:text-[64px] text-[#5d5f5f] max-w-2xl leading-[1.15] drop-shadow-md font-normal">
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
            <p className="font-sans text-xs md:text-sm text-[#1c1b1b]/70 tracking-[0.3em] uppercase drop-shadow-sm font-semibold">
              Coming Summer 2025
            </p>
          </div>
        </div>

        {/* Indicador inferior 'Presione para abrir' */}
        <button 
          onClick={handleScrollDown}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 cursor-pointer animate-gentle-float focus:outline-none group bg-transparent border-none w-full"
        >
          <span className="font-sans text-[11px] md:text-xs text-[#8f7200] tracking-[0.3em] uppercase font-bold text-shadow-gold opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {scrollLabel || 'Presione para abrir'}
          </span>
          
          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#8f7200]/20 backdrop-blur-md transition-all duration-500 hover:border-[#8f7200] hover:bg-white/30 bg-white/40 shadow-[0_4px_15px_rgba(115,92,0,0.1)] group-hover:scale-105">
            {/* Flecha doble hacia abajo en SVG fino */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1} 
              stroke="currentColor" 
              className="w-7 h-7 text-[#8f7200] font-light"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </div>
        </button>
      </main>

      {/* Footer Minimalista */}
      <footer className="absolute bottom-4 left-0 w-full flex justify-center opacity-30 pointer-events-none z-20">
        <span className="font-sans text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-[#1c1b1b]">
          With Love, Always
        </span>
      </footer>
    </section>
  );
}
