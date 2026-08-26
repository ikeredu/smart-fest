'use client';

import React, { useState, useRef } from 'react';
import { GalleryBlockData } from '../types/blocks';

export default function GalleryBlock({
  title = 'Nuestros Momentos',
  images = []
}: GalleryBlockData) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
    const swipeThreshold = 50;
    if (touchEndX.current < touchStartX.current - swipeThreshold) {
      // Swipe left
      nextSlide();
    }
    if (touchEndX.current > touchStartX.current + swipeThreshold) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <section 
      className="relative w-full h-[100dvh] bg-black overflow-hidden select-none"
    >
      {/* 1. Track del Carrusel */}
      <div 
        className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`Galería ${idx + 1}`} 
              className="w-full h-full object-cover object-center"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* 2. Degradado Inferior (Exclusivo para la zona del título/puntos) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* 3. Título Inferior Flotante */}
      <div className="absolute bottom-24 md:bottom-28 left-0 w-full text-center px-4 pointer-events-none z-10 animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl text-potatoes font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] tracking-wide">
          {title}
        </h2>
      </div>

      {/* 4. Paginación tipo Píldora e Indicador de Swipe */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex flex-col items-center gap-4 pointer-events-auto z-10">
        
        {/* Texto Animado Swipe */}
        <div 
          className="flex items-center gap-2 text-potatoes/90 font-sans text-[9px] md:text-[10px] uppercase tracking-widest font-bold drop-shadow-md animate-swipe-hint"
        >
          <span>&larr;</span>
          <span>Desliza para ver más</span>
          <span>&rarr;</span>
        </div>

        {/* Puntos (Píldoras) */}
        <div className="flex justify-center items-center space-x-2 md:space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a la foto ${idx + 1}`}
              className={`h-1.5 md:h-2 rounded-full shadow-sm transition-all duration-500 ${
                idx === currentIndex 
                  ? 'w-6 md:w-8 bg-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                  : 'w-1.5 md:w-2 bg-potatoes/40 hover:bg-potatoes/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
