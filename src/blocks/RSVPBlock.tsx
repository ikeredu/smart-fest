'use client';

import React, { useState } from 'react';
import { RSVPBlockData } from '../types/blocks';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RSVPBlockProps extends RSVPBlockData {
  id?: string;
}

export default function RSVPBlock({
  id = 'block-3',
  title = 'Confirmación de Asistencia',
  subtitle = 'RSVP',
  backgroundImage = 'https://lh3.googleusercontent.com/aida/AP1WRLujgnAG_YMpxpAe5ta6gFr-FhthPetJ7i8eJuTNjZMyjB7IgxjHVU8mJbqHfBaQL6mAuiKWjKTZCEzSbrVg400gb7X_U8mW_SortI7P16Y1E4ncQv7OZxGsBF1cPbTEo8PixaURY7CMSXmQy9ETaFVYwJYAIo1K8ed49_FJ9kzLR9s2ZDymg1suCJGC7PtorZbisWqOVF9UWkHRvOYiWJ1ado3Dui4_XFAUIdriw4c1RsiZ9ZV8vDk_Mg',
  maxGuests = 2,
  deadlineText = 'Favor de confirmar antes del 15 de Septiembre de 2026',
  submitButtonText = 'Confirmar',
  guestName = 'Familia Invitada',
}: RSVPBlockProps) {
  const [status, setStatus] = useState<'confirm' | 'less' | 'decline'>('confirm');
  const [guestsCount, setGuestsCount] = useState<number>(maxGuests);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const nameWords = guestName.split(' ');
  const firstPart = nameWords.slice(0, -1).join(' ');
  const lastWord = nameWords[nameWords.length - 1];

  const titleWords = title.split(' ');
  const titleFirstPart = titleWords.slice(0, -1).join(' ');
  const titleLastWord = titleWords[titleWords.length - 1];

  const handleStatusChange = (newStatus: 'confirm' | 'less' | 'decline') => {
    setStatus(newStatus);
    if (newStatus === 'confirm') {
      setGuestsCount(maxGuests);
    } else if (newStatus === 'less') {
      setGuestsCount(Math.max(1, maxGuests - 1));
    } else if (newStatus === 'decline') {
      setGuestsCount(0);
    }
  };

  const handleIncrement = () => {
    if (guestsCount < maxGuests - 1) {
      setGuestsCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (guestsCount > 1) {
      setGuestsCount(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  return (
    <section
      id={id}
      className="relative w-full h-screen h-[100dvh] flex flex-col justify-between items-center overflow-hidden select-none bg-black text-on-surface transform translate-x-0"
    >
      {/* 1. Fondo de flores suaves con difuminado */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt="Soft, ethereal white flowers background"
            className="w-full h-full object-cover origin-center scale-102"
          />
          {/* Velo cálido Mashed Potatoes al 70% + desenfoque */}
          <div className="absolute inset-0 bg-[#FFF2E6]/70 backdrop-blur-md" />
        </div>
      )}

      {/* 2. ENCABEZADO SUPERIOR (Arriba con aire) */}
      <header className="relative z-10 w-full flex flex-col items-center pt-8 md:pt-12 px-4 text-center animate-fade-in-up">
        <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#586357]/60 mb-2 drop-shadow-sm select-none">
          RSVP
        </span>

        <div className="flex items-center justify-center gap-3 w-full max-w-md md:max-w-xl mx-auto select-none">
          {/* Línea horizontal izquierda flexible */}
          <div className="h-[1px] bg-[#586357]/30 flex-grow max-w-[30px] md:max-w-[50px] flex-shrink" />
          
          {/* Título en minúsculas elegantes con juego de itálicas */}
          <h2 className="font-serif text-[22px] md:text-[32px] text-[#586357] font-medium tracking-tight leading-tight flex-shrink-0">
            {titleFirstPart} <span className="italic font-normal font-serif text-[#586357]">{titleLastWord}</span>
          </h2>
          
          {/* Línea horizontal derecha flexible */}
          <div className="h-[1px] bg-[#586357]/30 flex-grow max-w-[30px] md:max-w-[50px] flex-shrink" />
        </div>
        
        {/* Divisor vertical */}
        <div className="w-[1px] h-4 bg-gradient-to-b from-transparent via-[#586357]/30 to-transparent mt-3" />
      </header>

      {/* 3. TARJETA CENTRAL (Flotando libre en medio con my-auto) */}
      <main className="relative z-10 w-full max-w-md px-6 my-auto flex flex-col items-center justify-center gap-4 md:gap-5 animate-fade-in-up">
        
        {/* Icono de Reserva Circular */}
        <div className="w-14 h-14 rounded-full border border-[#586357]/20 bg-white/20 backdrop-blur-md flex items-center justify-center animate-gentle-wiggle shadow-sm select-none">
          {/* Icono de Libreta/Agenda en SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#586357]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
          </svg>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="w-full bg-white/30 backdrop-blur-md border border-white/45 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-center">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Información de la Invitación */}
              <div className="text-center space-y-1 mb-1">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#586357]/70 font-semibold">
                  Invitación para:
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#052102] drop-shadow-sm font-bold tracking-tight leading-tight">
                  {firstPart} <span className="italic font-normal font-serif text-[#052102]">{lastWord}</span>
                </h3>
                <p className="font-sans text-xs text-[#734141] font-semibold tracking-wide italic">
                  {maxGuests} {maxGuests === 1 ? 'invitado permitido' : 'invitados permitidos'}
                </p>
              </div>

              {/* Selector de Asistencia */}
              <div className="space-y-2.5">
                <span className="block text-center font-sans text-[10px] uppercase tracking-[0.2em] text-[#586357]/80 font-bold mb-0.5">
                  Estado de asistencia
                </span>

                {/* Opción 1: Confirmar asistencia */}
                <label className="group relative block cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    className="peer sr-only"
                    checked={status === 'confirm'}
                    onChange={() => handleStatusChange('confirm')}
                  />
                  <div className="w-full flex items-center py-2 px-3.5 rounded-full bg-white/10 border border-[#586357]/15 peer-checked:border-[#586357] peer-checked:bg-[#FFF2E6]/40 transition-all hover:bg-white/20 active:scale-[0.99]">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                      status === 'confirm' ? "bg-[#734141]/10" : "bg-[#586357]/10 group-hover:bg-[#586357]/20"
                    )}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn(
                        "w-4 h-4 transition-colors",
                        status === 'confirm' ? "text-[#734141]" : "text-[#586357]"
                      )}>
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs md:text-sm text-[#586357] font-semibold tracking-wide text-left">
                      Confirmo mi asistencia
                    </span>
                  </div>
                </label>

                {/* Opción 2: Asistir con menos personas */}
                {maxGuests > 1 && (
                  <label className="group relative block cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      className="peer sr-only"
                      checked={status === 'less'}
                      onChange={() => handleStatusChange('less')}
                    />
                    <div className="w-full flex items-center py-2 px-3.5 rounded-full bg-white/10 border border-[#586357]/15 peer-checked:border-[#586357] peer-checked:bg-[#FFF2E6]/40 transition-all hover:bg-white/20 active:scale-[0.99]">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                        status === 'less' ? "bg-[#734141]/10" : "bg-[#586357]/10 group-hover:bg-[#586357]/20"
                      )}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn(
                          "w-4 h-4 transition-colors",
                          status === 'less' ? "text-[#734141]" : "text-[#586357]"
                        )}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-1.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 19.25a6 6 0 0 1 10.75-3.5" />
                        </svg>
                      </div>
                      <span className="font-sans text-xs md:text-sm text-[#586357] font-semibold tracking-wide text-left">
                        Asistiré con menos personas
                      </span>
                    </div>
                  </label>
                )}

                {/* Opción 3: No podré asistir */}
                <label className="group relative block cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    className="peer sr-only"
                    checked={status === 'decline'}
                    onChange={() => handleStatusChange('decline')}
                  />
                  <div className="w-full flex items-center py-2 px-3.5 rounded-full bg-white/10 border border-[#586357]/15 peer-checked:border-[#586357] peer-checked:bg-[#FFF2E6]/40 transition-all hover:bg-white/20 active:scale-[0.99]">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                      status === 'decline' ? "bg-[#734141]/10" : "bg-[#586357]/10 group-hover:bg-[#586357]/20"
                    )}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn(
                        "w-3.5 h-3.5 transition-colors",
                        status === 'decline' ? "text-[#734141]" : "text-[#586357]"
                      )}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs md:text-sm text-[#586357] font-semibold tracking-wide text-left">
                      No podré asistir
                    </span>
                  </div>
                </label>
              </div>

              {/* Selector de número de invitados (solo visible si status === 'less') */}
              {status === 'less' && (
                <div className="flex flex-col items-center gap-1.5 pt-1.5 animate-fade-in-up">
                  <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#586357]/80 font-bold">
                    ¿Cuántos asistirán?
                  </span>
                  <div className="flex items-center gap-6 bg-white/20 border border-[#586357]/15 rounded-full py-1 px-4 shadow-sm select-none">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={guestsCount <= 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#586357] border border-[#586357]/20 hover:bg-[#FFF2E6]/40 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all font-bold cursor-pointer"
                    >
                      －
                    </button>
                    <span className="font-mono text-base font-bold text-[#052102] w-6 text-center">
                      {guestsCount}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={guestsCount >= maxGuests - 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#586357] border border-[#586357]/20 hover:bg-[#FFF2E6]/40 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all font-bold cursor-pointer"
                    >
                      ＋
                    </button>
                  </div>
                </div>
              )}

              {/* Botón de Enviar */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full bg-[#586357] text-[#FFF2E6] font-sans text-xs font-bold py-2.5 px-8 rounded-full shadow-md hover:bg-[#4a5349] transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-[0.2em] cursor-pointer"
                >
                  <span>{submitButtonText}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-[#FFF2E6]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

            </form>
          ) : (
            // Vista de Agradecimiento
            <div className="flex flex-col items-center justify-center text-center space-y-5 py-6 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-[#586357]/15 flex items-center justify-center border border-[#586357]/30 mb-1 pulse-soft">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#586357]">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.748-5.25Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-serif italic text-3xl text-[#052102] drop-shadow-sm font-semibold">
                ¡Muchas Gracias!
              </h3>
              {status === 'decline' ? (
                <p className="font-sans text-xs md:text-sm text-[#586357] leading-relaxed px-4">
                  Lamentamos que no puedas acompañarnos. Te extrañaremos en nuestro gran día.
                </p>
              ) : (
                <p className="font-sans text-xs md:text-sm text-[#586357] leading-relaxed px-4">
                  Tu asistencia ha sido confirmada para{' '}
                  <strong className="font-bold text-[#734141] font-mono">
                    {guestsCount} {guestsCount === 1 ? 'persona' : 'personas'}
                  </strong>.
                  <br />
                  ¡Estamos muy emocionados de celebrar juntos!
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 4. PIE DE PÁGINA (Fecha límite) */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-8 md:pb-12 px-4 text-center animate-fade-in-up">
        <div className="w-[1px] h-4 bg-gradient-to-b from-transparent via-[#586357]/30 to-transparent mb-2" />
        {deadlineText && !isSubmitted && (
          <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-semibold text-[#734141]">
            {deadlineText}
          </p>
        )}
        {isSubmitted && (
          <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-semibold text-[#586357]/60">
            With Love, Always
          </p>
        )}
      </footer>
    </section>
  );
}
