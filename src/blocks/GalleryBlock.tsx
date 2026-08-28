'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GalleryBlockData } from '../types/blocks';

export default function GalleryBlock({
  title = 'Nuestros Momentos',
  images = []
}: GalleryBlockData) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 1. Pipeline de Precarga y Decodificación GPU Inmediata (Cero Latencia)
  useEffect(() => {
    if (typeof window === 'undefined' || !images.length) return;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().catch(() => {
          // Si el navegador no soporta decode o falla silenciosamente, el caché estándar continúa
        });
      }
    });
  }, [images]);

  if (!images || images.length === 0) return null;

  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 45;
    if (touchEndX.current < touchStartX.current - swipeThreshold) {
      // Swipe izquierda -> siguiente foto
      nextSlide();
    }
    if (touchEndX.current > touchStartX.current + swipeThreshold) {
      // Swipe derecha -> foto anterior
      prevSlide();
    }
  };

  return (
    <section 
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-black overflow-hidden select-none"
    >
      {/* 1. Track del Carrusel Cinematográfico Acelerado por GPU */}
      <div 
        className="relative w-full h-full flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div 
              key={idx} 
              className="w-full h-full flex-shrink-0 relative overflow-hidden bg-black"
            >
              {/* Fotografía con Efecto Ken Burns Dinámico en la Diapositiva Activa */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                key={`${src}-${isActive ? 'active' : 'idle'}`}
                src={src} 
                alt={`Fotografía ${idx + 1}`} 
                loading="eager"
                decoding="sync"
                className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                  isActive ? 'animate-ken-burns' : 'scale-100'
                }`}
                draggable="false"
              />
            </div>
          );
        })}
      </div>

      {/* 2. Haz de Luz / Prisma Botánico (Organic Lens Flare) */}
      <div className="absolute -top-[20%] -right-[15%] w-[120%] h-[90%] pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-70 animate-lens-shimmer">
        <div className="w-full h-full bg-gradient-to-bl from-potatoes/20 via-potatoes/[0.07] to-transparent transform rotate-12 blur-2xl" />
      </div>

      {/* Destello lumínico secundario en esquina inferior izquierda */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[80%] h-[60%] pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-40">
        <div className="w-full h-full bg-gradient-to-tr from-potatoes/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* 3. Contador Minimalista en Esquina Superior */}
      <div className="absolute top-8 left-6 z-20 pointer-events-none animate-fade-in-up">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-potatoes">
          <span className="font-mono text-[11px] font-bold tracking-widest text-potatoes">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-potatoes/40 font-light">/</span>
          <span className="font-mono text-[10px] font-medium text-potatoes/60 tracking-widest">
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 4. Degradado Inferior Cinematográfico */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* 5. Título Inferior Flotante */}
      <div className="absolute bottom-24 md:bottom-28 left-0 w-full text-center px-4 pointer-events-none z-20 animate-fade-in-up">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-semibold text-potatoes/70 mb-1.5 block drop-shadow-sm">
          Galería Nupcial
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-potatoes font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] tracking-wide">
          {title}
        </h2>
      </div>

      {/* 6. Paginación tipo Píldora e Indicador de Swipe */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex flex-col items-center gap-3.5 pointer-events-auto z-20">
        
        {/* Indicador Animado de Desplazamiento */}
        <div 
          className="flex items-center gap-2 text-potatoes/90 font-sans text-[9px] md:text-[10px] uppercase tracking-widest font-bold drop-shadow-md animate-swipe-hint"
        >
          <span>&larr;</span>
          <span>Desliza para ver más</span>
          <span>&rarr;</span>
        </div>

        {/* Píldoras de Navegación Interactiva */}
        <div className="flex justify-center items-center space-x-2 md:space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a la fotografía ${idx + 1}`}
              className={`h-1.5 md:h-2 rounded-full shadow-sm transition-all duration-500 cursor-pointer ${
                idx === currentIndex 
                  ? 'w-7 md:w-9 bg-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] scale-105' 
                  : 'w-1.5 md:w-2 bg-potatoes/40 hover:bg-potatoes/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
