import React from 'react';
import { HeroBlockData } from '../types/blocks';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Pequeña utilidad para manejar clases de Tailwind limpiamente
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HeroBlock({ title, subtitle, date, backgroundImage, effects }: HeroBlockData) {
  // Formateamos la fecha para que se vea bonita (MVP style)
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section 
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-[80vh] text-center px-4 overflow-hidden",
        // Si no hay imagen, ponemos un color de fondo neutro elegante
        !backgroundImage && "bg-slate-50" 
      )}
    >
      {/* Capa de la imagen de fondo con un overlay oscuro para que el texto resalte */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 z-10 bg-black/40" />
        </>
      )}

      {/* Contenido (z-20 para que esté por encima del fondo) */}
      <div className={cn(
        "relative z-20 flex flex-col items-center gap-6",
        backgroundImage ? "text-white" : "text-slate-800"
      )}>
        {subtitle && (
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-light opacity-90">
            {subtitle}
          </p>
        )}
        
        <h1 className={cn(
          "text-5xl md:text-7xl font-serif tracking-tight transition-all duration-1000",
          effects?.glowEffect && "animate-gold-glow"
        )}>
          {title}
        </h1>
        
        <div className="w-16 h-[1px] bg-current opacity-50 my-2" />
        
        <p className="text-lg md:text-xl font-light capitalize">
          {formattedDate}
        </p>
      </div>
    </section>
  );
}
