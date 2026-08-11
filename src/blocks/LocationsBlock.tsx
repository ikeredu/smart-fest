'use client';

import React from 'react';
import { LocationsBlockData, LocationItemData } from '../types/blocks';

interface LocationsBlockProps extends LocationsBlockData {
  id?: string;
}

export default function LocationsBlock({
  id = 'block-locations',
  title = 'Ubicaciones',
  subtitle = 'Dónde & Cuándo',
  backgroundImage = '/images/foto_novios.avif',
  locations = [],
}: LocationsBlockProps) {
  // Separamos el título para aplicar itálica a la última palabra si aplica
  const titleWords = title.split(' ');
  const firstPart = titleWords.slice(0, -1).join(' ');
  const lastWord = titleWords[titleWords.length - 1];

  // Helper para renderizar los iconos SVG según el tipo de locación
  const renderLocationIcon = (type: LocationItemData['type']) => {
    switch (type) {
      case 'ceremony':
        return (
          /* Icono de Iglesia / Templo */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-7 h-7 text-potatoes/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25v3m0 0H9.75m2.25 0h2.25M12 5.25v3m-7.5 3 7.5-6 7.5 6v9.75a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V11.25Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v3.75" />
          </svg>
        );

      case 'reception':
      case 'party':
        return (
          /* Icono de Copas de Brindis / Celebración */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-7 h-7 text-potatoes/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875m0 0a3.375 3.375 0 0 1-3.375-3.375V3h6.75v9.75a3.375 3.375 0 0 1-3.375 3.375Zm0 0H15.75m0 0a3.375 3.375 0 0 0 3.375-3.375V3h-6.75v9.75a3.375 3.375 0 0 0 3.375 3.375Zm0 0V21m-9.75 0h12"
            />
          </svg>
        );

      default:
        return (
          /* Icono genérico de Marcador de Mapa */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-7 h-7 text-potatoes/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        );
    }
  };

  return (
    <section
      id={id}
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 md:py-12 text-center select-none bg-black text-potatoes"
    >
      {/* 1. Fondo de Pantalla Completa con Velo Verde Botánico Oscuro */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt="Fondo de Ubicaciones"
          className="w-full h-full object-cover origin-center scale-105"
        />
        {/* Velo translúcido con desenfoque de cristal botánico */}
        <div className="absolute inset-0 bg-[#1D261C]/75 backdrop-blur-[14px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. ENCABEZADO SUPERIOR */}
      <header className="relative z-10 w-full flex flex-col items-center pt-4 md:pt-6 animate-fade-in-up">
        <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-semibold text-potatoes/70 mb-2 drop-shadow-sm">
          {subtitle}
        </span>

        <h2 className="font-serif text-3xl md:text-5xl text-potatoes font-bold tracking-tight leading-tight">
          {titleWords.length > 1 ? (
            <>
              {firstPart}{' '}
              <span className="italic font-normal font-serif text-potatoes">{lastWord}</span>
            </>
          ) : (
            title
          )}
        </h2>

        {/* Divisor fino */}
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-potatoes/40 to-transparent mt-3" />
      </header>

      {/* 3. CONTENIDO PRINCIPAL: Grid de Tarjetas de Ubicación */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto px-2 py-4 animate-fade-in-up">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between items-center text-center space-y-4 hover:border-potatoes/40 transition-all duration-300 group"
            >
              {/* Encabezado de la Tarjeta con Icono y Tipo */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-potatoes/10 border border-potatoes/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  {renderLocationIcon(loc.type)}
                </div>

                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-potatoes/60">
                  {loc.title}
                </span>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-potatoes drop-shadow-sm leading-snug">
                  {loc.venueName}
                </h3>
              </div>

              {/* Hora y Dirección */}
              <div className="space-y-2 w-full">
                <div className="inline-block bg-white/10 backdrop-blur-sm border border-potatoes/20 px-3 py-1 rounded-full">
                  <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-potatoes uppercase">
                    {loc.time}
                  </span>
                </div>

                <p className="font-sans text-xs md:text-sm italic text-potatoes/85 leading-relaxed max-w-xs mx-auto">
                  {loc.address}
                </p>
              </div>

              {/* Botones de Acción (Navegación GPS) */}
              <div className="w-full pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 bg-potatoes/20 hover:bg-potatoes text-potatoes hover:text-black font-sans text-xs font-bold py-2.5 px-4 rounded-full border border-potatoes/40 transition-all duration-300 flex items-center justify-center gap-2 tracking-wider uppercase cursor-pointer shadow-md active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <span>Cómo llegar</span>
                </a>

                {loc.wazeUrl && (
                  <a
                    href={loc.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-potatoes font-sans text-xs font-semibold py-2.5 px-4 rounded-full border border-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 tracking-wider uppercase cursor-pointer active:scale-95"
                  >
                    <span>Waze</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. PIE DE PÁGINA */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-4 md:pb-6">
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-potatoes/40 to-transparent mb-2" />
        <span className="font-serif italic text-xs md:text-sm text-potatoes/60 tracking-wider">
          With Love, Always
        </span>
      </footer>
    </section>
  );
}
