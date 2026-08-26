'use client';

import React from 'react';
import { DressAndGiftsBlockData } from '../types/blocks';

export default function DressAndGiftsBlock({
  backgroundImage = '/images/fondo_dress_code.jpg',
  dressCodeTitle,
  dressCodeSubtitle,
  mensDressCode,
  womensDressCode,
  giftsTitle,
  giftsDescription
}: DressAndGiftsBlockData) {
  return (
    <section 
      className="relative w-full min-h-screen h-[100dvh] flex flex-col justify-between items-center px-4 py-6 md:py-10 text-center select-none bg-black text-potatoes overflow-hidden transform translate-x-0"
    >
      {/* 1. Fondo de Pantalla Completa con Velo Botánico Oscuro Oficial */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={backgroundImage} 
            alt="Fondo Detalles" 
            className="w-full h-full object-cover object-[15%_center] origin-[15%_center] scale-105"
          />
          {/* Velo translúcido con desenfoque de cristal botánico */}
          <div className="absolute inset-0 glass-botanical-dark border-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>
      )}

      {/* 2. ENCABEZADO SUPERIOR VACÍO PARA BALANCE (Mantiene el justify-between equilibrado) */}
      <header className="relative z-10 w-full flex flex-col items-center pt-2 md:pt-4" />

      {/* 3. CONTENIDO PRINCIPAL (FLAT / CINEMATIC) */}
      <div className="relative z-10 flex flex-col w-full max-w-lg mx-auto my-auto gap-10 py-4 animate-fade-in-up">
        
        {/* SPOTLIGHT INVISIBLE: Sombra difuminada para homologar legibilidad con ParentsBlock */}
        <div className="absolute inset-0 bg-black/45 blur-[80px] -z-10 rounded-[100%] scale-[1.3] md:scale-[1.8] pointer-events-none" />

        {/* --- SECCIÓN: CÓDIGO DE VESTIMENTA --- */}
        <section className="flex flex-col items-center text-center gap-6">
          <header className="flex flex-col items-center">
            <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {dressCodeTitle || 'Código de Vestimenta'}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-potatoes font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]">
              <span className="italic font-normal">{dressCodeSubtitle || 'Formal'}</span>
            </h2>
          </header>

          <div className="flex flex-col gap-5 w-full px-4">
            {/* HOMBRES */}
            <div className="flex items-start gap-4 text-left group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 border border-potatoes/20 text-potatoes shrink-0 backdrop-blur-sm shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:border-potatoes/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-potatoes">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[11px] uppercase tracking-wider font-bold mb-1 text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Hombres
                </span>
                <span className="font-serif text-[15px] md:text-[16px] leading-relaxed text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {mensDressCode}
                </span>
              </div>
            </div>

            {/* Separador Fino */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-potatoes/40 to-transparent my-1" />

            {/* MUJERES */}
            <div className="flex items-start gap-4 text-left group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 border border-potatoes/20 text-potatoes shrink-0 backdrop-blur-sm shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:border-potatoes/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-potatoes">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[11px] uppercase tracking-wider font-bold mb-1 text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Mujeres
                </span>
                <span className="font-serif text-[15px] md:text-[16px] leading-relaxed text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {womensDressCode}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Separador Principal --- */}
        <div className="w-full flex justify-center my-1">
          <div className="h-[1px] w-full max-w-[150px] bg-gradient-to-r from-transparent via-potatoes/60 to-transparent" />
        </div>

        {/* --- Gift Section --- */}
        <section className="flex flex-col items-center text-center gap-5">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 border border-potatoes/20 text-potatoes shadow-sm backdrop-blur-sm transition-transform duration-500 hover:scale-110 hover:border-potatoes/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-potatoes">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 21V11.25m-7.5 0h15m-15 0V8.25m15 0V8.25m0 0a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3m-7.5 0a3 3 0 0 1 3-3h1.5a3 3 0 0 1 3 3m-7.5 0h7.5" />
            </svg>
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl text-potatoes font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]">
            {giftsTitle}
          </h2>
          
          <p className="font-sans text-[13px] md:text-[14px] leading-relaxed text-potatoes max-w-[280px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
            {giftsDescription}
          </p>
          
        </section>
      </div>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-4 md:pb-6">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          With Love, Always
        </span>
      </footer>

    </section>
  );
}
