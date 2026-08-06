'use client';

import React from 'react';
import { ParentsBlockData } from '../types/blocks';

interface ParentsBlockProps extends ParentsBlockData {
  id?: string;
}

export default function ParentsBlock({
  id = 'block-2',
  headerLabel = 'Nuestra Unión',
  brideParents,
  groomParents,
  brideFullName,
  groomFullName,
  invitationMessage,
  yearText = 'Dos Mil Veintiséis',
  backgroundImage = '/images/arbol_atardecer.jpg',
}: ParentsBlockProps) {
  return (
    <section
      id={id}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center px-4 py-8 md:py-12 text-center select-none bg-black text-potatoes"
    >
      {/* 1. Fondo de Pantalla Completa: Fotografía del Árbol + Velo Completo de Cristal Verde Botánico Oscuro */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundImage}
          alt="Árbol al Atardecer"
          className="w-full h-full object-cover origin-center scale-105"
        />
        {/* Velo de Cristal Verde Botánico Oscuro sobre TODA la pantalla (#1D261C al 65% + backdrop-blur-md) */}
        <div className="absolute inset-0 bg-[#1D261C]/65 backdrop-blur-[14px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. ENCABEZADO SUPERIOR (Sin contenedor de tarjeta) */}
      <header className="relative z-10 w-full flex flex-col items-center pt-2 md:pt-4 animate-fade-in-up">
        <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] font-semibold text-potatoes/80 mb-3 drop-shadow-sm">
          {headerLabel}
        </span>
        {/* Divisor Fino Vertical */}
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-transparent via-potatoes/40 to-transparent" />
      </header>

      {/* 3. CONTENIDO PRINCIPAL (Flotando directamente sobre el Cristal de Pantalla Completa) */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto px-4 py-2">
        {/* Contenedor Responsivo: Grid de 1 columna en móvil y 3 columnas en desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 mb-6 md:mb-8">

          {/* Bloque 1: La Novia y sus padres */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-potatoes/60 font-semibold mb-1">
                La Novia
              </span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-potatoes font-bold leading-snug drop-shadow-sm">
                <span className="italic font-normal">{brideFullName.firstName}</span>
                <br />
                {brideFullName.lastName}
              </h3>
            </div>

            <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-potatoes/70 italic">
              Con la bendición de
            </span>

            <div className="space-y-0.5">
              <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
                {brideParents.father}
              </p>
              <p className="font-sans text-xs text-potatoes/50 italic">&</p>
              <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
                {brideParents.mother}
              </p>
            </div>
          </div>

          {/* Divisor Central Responsivo */}
          <div className="flex md:flex-col items-center justify-center py-2 md:py-0">
            {/* Línea horizontal en móvil, vertical en desktop */}
            <div className="h-[1px] w-12 md:w-[1px] md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-transparent to-potatoes/40" />

            <span className="font-serif italic text-2xl md:text-3xl text-potatoes/60 mx-4 md:my-3 select-none">
              &
            </span>

            <div className="h-[1px] w-12 md:w-[1px] md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-potatoes/40 to-transparent" />
          </div>

          {/* Bloque 2: El Novio y sus padres */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-potatoes/60 font-semibold mb-1">
                El Novio
              </span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-potatoes font-bold leading-snug drop-shadow-sm">
                <span className="italic font-normal">{groomFullName.firstName}</span>
                <br />
                {groomFullName.lastName}
              </h3>
            </div>

            <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-potatoes/70 italic">
              Con la bendición de
            </span>

            <div className="space-y-0.5">
              <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
                {groomParents.father}
              </p>
              <p className="font-sans text-xs text-potatoes/50 italic">&</p>
              <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
                {groomParents.mother}
              </p>
            </div>
          </div>

        </div>

        {/* Mensaje de Invitación */}
        <div className="w-full max-w-xs md:max-w-md mx-auto">
          <div className="w-[1px] h-8 mx-auto mb-4 bg-gradient-to-b from-transparent via-potatoes/35 to-transparent" />
          <p className="font-sans text-xs md:text-sm italic text-potatoes/90 leading-relaxed font-normal">
            {invitationMessage}
          </p>
        </div>
      </main>

      {/* 4. PIE DE PÁGINA */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-2 md:pb-4">
        <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-transparent via-potatoes/40 to-transparent mb-2" />
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-potatoes/60">
          {yearText}
        </p>
      </footer>
    </section>
  );
}
