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
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center my-auto py-2">
        {/* Sección de Padres */}
        <div className="w-full flex flex-col items-center gap-4 mb-6 md:mb-8">
          {/* Padres de la Novia */}
          <div className="space-y-0.5">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-potatoes/70 font-semibold mb-1">
              {brideParents.label}
            </p>
            <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
              {brideParents.father}
            </p>
            <p className="font-sans text-xs md:text-sm font-normal text-potatoes/80 italic">
              &
            </p>
            <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
              {brideParents.mother}
            </p>
          </div>

          {/* Ornamento Central */}
          <div className="font-serif italic text-lg md:text-xl text-potatoes/60 my-0.5 select-none drop-shadow-sm">
            ✧
          </div>

          {/* Padres del Novio */}
          <div className="space-y-0.5">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-potatoes/70 font-semibold mb-1">
              {groomParents.label}
            </p>
            <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
              {groomParents.father}
            </p>
            <p className="font-sans text-xs md:text-sm font-normal text-potatoes/80 italic">
              &
            </p>
            <p className="font-sans text-sm md:text-base font-normal text-potatoes drop-shadow-sm">
              {groomParents.mother}
            </p>
          </div>
        </div>

        {/* Nombres Completos de los Novios (Pieza Central Editorial Radiante) */}
        <div className="w-full mb-6 md:mb-8">
          <h2 className="flex flex-col items-center leading-tight">
            <span className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-potatoes font-medium drop-shadow-sm mb-0.5">
              {brideFullName.firstName}
            </span>
            <span className="font-serif text-xl md:text-2xl lg:text-3xl text-potatoes font-bold tracking-wide drop-shadow-sm">
              {brideFullName.lastName}
            </span>
            
            <span className="font-serif text-xl md:text-2xl text-potatoes font-bold my-2 opacity-90 drop-shadow-sm">
              &
            </span>

            <span className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-potatoes font-medium drop-shadow-sm mb-0.5">
              {groomFullName.firstName}
            </span>
            <span className="font-serif text-xl md:text-2xl lg:text-3xl text-potatoes font-bold tracking-wide drop-shadow-sm">
              {groomFullName.lastName}
            </span>
          </h2>
        </div>

        {/* Mensaje de Invitación */}
        <div className="w-full max-w-xs md:max-w-sm mx-auto">
          <div className="w-[1px] h-8 mx-auto mb-4 bg-gradient-to-b from-transparent via-potatoes/30 to-transparent" />
          <p className="font-sans text-xs md:text-sm italic text-potatoes/90 leading-relaxed font-normal drop-shadow-sm">
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
