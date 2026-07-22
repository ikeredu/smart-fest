'use client';

import React, { useEffect, useState } from 'react';
import { EventDetailsBlockData } from '../types/blocks';

export default function EventDetailsBlock({ title, label, date, location, backgroundImage }: EventDetailsBlockData) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Efecto Parallax interactivo del fondo para pantallas con cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setParallax({ x, y });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Parsear y formatear dinámicamente la fecha provista
  const dateObj = new Date(date);
  
  const rawFormattedDate = dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const capitalize = (str: string) => {
    return str.split(' ').map(word => {
      if (word === 'de' || word === 'del' || word === 'y' || word === 'el' || word === 'la') return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  const displayDate = capitalize(rawFormattedDate);

  const displayTime = dateObj.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) + " Horas";

  return (
    <section 
      className="relative w-full h-screen flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden snap-start select-none bg-potatoes"
    >
      {/* Imagen de fondo del evento con Parallax */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Fondo del Evento" 
            className="w-full h-full object-cover origin-center transition-transform duration-100 ease-out" 
            src={backgroundImage}
            style={{
              transform: `scale(1.06) translate(${parallax.x}px, ${parallax.y}px)`
            }}
          />
          {/* Degradado inferior para mejorar legibilidad del texto en el fondo */}
          <div className="absolute inset-0 bg-gradient-to-t from-mulledwine/50 via-transparent to-transparent" />
          {/* Capa de Viñeta rústica */}
          <div className="absolute inset-0 bg-vignette" />
        </div>
      )}

      {/* 1. TÍTULO PRINCIPAL (Nombres de esposos / cumpleañero / evento) */}
      <div className="relative z-10 w-full max-w-4xl text-center pt-12 md:pt-16 px-4">
        <h1 className="font-serif text-[42px] md:text-[64px] text-potatoes leading-tight drop-shadow-md select-none font-normal">
          {title}
        </h1>
      </div>

      {/* 2. TARJETA DE DETALLES LOGÍSTICOS (Alineada a la derecha en escritorio, centrada en móvil) */}
      <main className="relative z-10 w-full flex flex-col items-center md:items-end mt-auto pb-8">
        <div className="animate-fade-in backdrop-blur-md p-6 rounded-xl border border-white/10 text-center md:text-right w-full max-w-[280px] bg-mulledwine/5 shadow-xl select-none mr-0 md:mr-10">
          {/* Etiqueta / Header (ej. "Nuestra Historia") */}
          {label && (
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-potatoes/80 mb-3 font-semibold">
              {label}
            </p>
          )}

          {/* Fecha del Evento */}
          <h2 className="font-serif text-[22px] text-potatoes mb-1 leading-tight font-bold">
            {displayDate}
          </h2>

          {/* Hora del Evento */}
          <p className="font-serif italic text-[18px] text-potatoes/90 mb-3 font-normal">
            {displayTime}
          </p>

          {/* Línea Divisoria */}
          <div className="w-12 h-[1px] bg-potatoes/30 mx-auto md:ml-auto md:mr-0 mb-3" />

          {/* Ubicación / Lugar */}
          <p className="font-sans text-potatoes text-[14px] leading-relaxed font-normal">
            {location}
          </p>
        </div>
      </main>

      {/* Textura de papel sutil superpuesta para emular papelería fina */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-20"
      />
    </section>
  );
}
