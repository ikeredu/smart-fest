'use client';

import { HeroBlockData } from '../types/blocks';

export default function HeroBlock({ title, subtitle, date, backgroundImage }: HeroBlockData) {
  // Imagen de fondo con fallback a la foto de novios local
  const bgImage = backgroundImage || '/images/foto_novios.avif';

  // Formateamos la fecha completa en español
  const dateObj = new Date(date);
  const rawFormattedDate = dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Capitalización adecuada de la fecha (Ej: "Sábado, 15 de Octubre de 2026")
  const displayDate = rawFormattedDate.split(' ').map(word => {
    if (['de', 'del', 'y', 'el', 'la'].includes(word.toLowerCase())) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  return (
    <section
      className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center px-4 py-8 md:py-12 overflow-hidden select-none bg-black"
    >
      {/* 1. Fondo de la Fotografía (brillo natural preservado) */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt="Foto de los Novios"
          className="w-full h-full object-cover origin-center scale-100 transition-transform duration-10000 ease-out animate-slow-zoom"
        />
        {/* Degradado súper tenue en la parte superior únicamente para sutileza de lectura */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. HEADER SUPERIOR (Texto flotante sin contenedor/caja) */}
      <header className="relative z-10 w-full max-w-md mx-auto pt-10 text-center animate-fade-in-up delay-100">
        <p className="font-sans text-[11px] md:text-[13px] font-semibold text-potatoes tracking-[0.3em] uppercase mb-2 opacity-90 drop-shadow-sm">
          {subtitle || 'THE WEDDING OF'}
        </p>

        {/* Título en color Artichoke verde orgánico (#586357) como en el mock */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-artichoke font-bold leading-tight drop-shadow-md mb-3">
          {title}
        </h1>

        {/* Fecha entre dos líneas finas */}
        <div className="flex items-center justify-center gap-3 text-potatoes opacity-80">
          <span className="h-[1px] w-8 md:w-10 bg-potatoes/60" />
          <span className="font-serif italic text-xs md:text-sm text-potatoes font-normal">
            {displayDate}
          </span>
          <span className="h-[1px] w-8 md:w-10 bg-potatoes/60" />
        </div>
      </header>

      {/* 3. ESPACIADOR CENTRAL (Enfoca la foto de los novios) */}
      <div className="flex-grow" />

      {/* 4. FOOTER INFERIOR (Tarjeta Glass 'Fit' Alineada Abajo a la Izquierda) */}
      <footer className="relative z-10 w-full pb-8 md:pb-12 px-4 md:px-8 animate-fade-in-up delay-500 flex justify-start">
        <div className="bg-cabernet/40 backdrop-blur-xl border border-potatoes/30 rounded-3xl p-4 md:p-5 w-full max-w-[240px] md:max-w-[260px] shadow-2xl relative text-left">
          {/* Icono de Anillos de Boda Entrelazados SVG */}
          <div className="flex justify-start mb-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-potatoes/85"
            >
              <circle cx="9.5" cy="12" r="4.5" />
              <circle cx="14.5" cy="12" r="4.5" />
              <path d="M12 7.5a4.5 4.5 0 0 1 1.5 3.5" opacity="0.5" />
            </svg>
          </div>

          {/* Texto del Versículo Fit (Compacto y Ajustado) */}
          <blockquote className="font-serif italic text-xs md:text-sm text-potatoes/95 leading-relaxed font-normal mb-3">
            “Mejores son dos que uno, porque obtienen mejor recompensa por su trabajo. Porque si caen, el uno levantará a su compañero.”
          </blockquote>

          {/* Atribución en Badge Translúcido Compacto */}
          <div className="flex justify-start">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-potatoes/20 px-2.5 py-0.5 rounded-full font-sans text-[8px] md:text-[9px] text-potatoes/90 uppercase tracking-[0.2em] font-semibold">
              — ECLESIASTÉS 4:9-10 —
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
