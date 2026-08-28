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

  // Helper para renderizar los iconos SVG de trazo fino según el tipo de locación
  const renderLocationIcon = (type: LocationItemData['type']) => {
    switch (type) {
      case 'ceremony':
        return (
          /* Icono de Iglesia / Templo con trazo fino ultrafino */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-6 h-6 text-potatoes/90"
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
          /* Icono de Copas de Brindis / Celebración con trazo fino */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-6 h-6 text-potatoes/90"
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
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-6 h-6 text-potatoes/90"
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
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center px-4 py-6 md:py-10 text-center select-none bg-potatoes text-mulledwine overflow-hidden"
    >
      {/* 1. Fondo de Pantalla Completa con Velo Luminoso */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt="Fondo de Ubicaciones"
          className="w-full h-full object-cover origin-center scale-105"
        />
        {/* Sin velo opaco, dejamos la imagen por sí sola. Solo un gradiente blanco ultra-sutil arriba y abajo para asegurar que el texto oscuro se lea bien */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40 pointer-events-none" />
      </div>

      {/* 2. ENCABEZADO SUPERIOR */}
      <header className="relative z-10 w-full flex flex-col items-center pt-4 md:pt-6 animate-fade-in-up">
        <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-mulledwine/70 mb-2 drop-shadow-sm">
          {subtitle}
        </span>

        <h2 className="font-serif text-3xl md:text-5xl text-mulledwine font-bold tracking-tight leading-tight">
          {titleWords.length > 1 ? (
            <>
              {firstPart}{' '}
              <span className="italic font-normal font-serif text-mulledwine">{lastWord}</span>
            </>
          ) : (
            title
          )}
        </h2>

        {/* Divisor fino */}
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-mulledwine/40 to-transparent mt-3" />
      </header>

      {/* 3. CONTENIDO PRINCIPAL: Grid de Tarjetas Verdes Oscuras */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto px-2 py-2 animate-fade-in-up">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {locations.map((loc) => {
            const navUrl =
              loc.mapsUrl ||
              loc.googleMapsUrl ||
              `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.venueName}, ${loc.address}`)}`;

            return (
              <div
                key={loc.id}
                className="glass-botanical-dark rounded-2xl p-5 md:p-6 flex flex-col justify-between items-center text-center space-y-4 hover:border-potatoes/40 transition-all duration-500 shadow-2xl shadow-black/20 group"
                style={{ backgroundColor: 'rgba(29, 38, 28, 0.85)' }}
              >
                {/* Header: Icono flotante minimalista de línea fina + Tipo + Nombre del lugar */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="text-potatoes/80 mb-0.5 group-hover:scale-110 transition-transform duration-500">
                    {renderLocationIcon(loc.type)}
                  </div>

                  <span className="font-sans text-[9.5px] uppercase tracking-[0.35em] font-semibold text-potatoes/60">
                    {loc.title}
                  </span>

                  <h3 className="font-serif text-lg md:text-xl font-normal text-potatoes drop-shadow-sm leading-snug">
                    {loc.venueName}
                  </h3>
                </div>

                {/* Divisor Fino en Degradado */}
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-potatoes/35 to-transparent" />

                {/* Detalle de Hora y Dirección en composición tipográfica sobria (Sin cápsulas gruesas) */}
                <div className="space-y-1 w-full">
                  <p className="font-sans text-xs tracking-[0.25em] font-semibold text-potatoes/90 uppercase">
                    {loc.time}
                  </p>
                  <p className="font-serif italic text-xs text-potatoes/75 leading-relaxed max-w-xs mx-auto">
                    {loc.address}
                  </p>
                </div>

                {/* Botón Ghost Etéreo (Sútil, con hover fluido) */}
                <div className="w-full pt-1">
                  <a
                    href={navUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-potatoes/[0.08] hover:bg-potatoes hover:text-black text-potatoes font-sans text-[10px] md:text-[11px] font-bold py-2.5 px-4 rounded-full border border-potatoes/30 transition-all duration-500 tracking-[0.25em] uppercase cursor-pointer group/btn shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 text-potatoes group-hover/btn:text-black transition-colors"
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
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 4. PIE DE PÁGINA */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-4 md:pb-6">
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-mulledwine/40 to-transparent mb-2" />
        <span className="font-serif italic text-xs md:text-sm text-mulledwine/60 tracking-wider">
          With Love, Always
        </span>
      </footer>
    </section>
  );
}
