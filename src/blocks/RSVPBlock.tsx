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
  id = 'block-rsvp',
  title = 'Confirmación de Asistencia',
  subtitle = 'RSVP',
  backgroundImage = '/images/fondo_confirmacion.jpg',
  maxGuests = 2,
  deadlineText = 'Favor de confirmar antes del 15 de Septiembre de 2026',
  submitButtonText = 'Confirmar Asistencia',
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
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center px-4 py-8 md:py-12 text-center select-none bg-black text-potatoes overflow-hidden"
    >
      {/* 1. Fondo de Pantalla Completa: Fotografía + Velo de Cristal Verde Botánico Oscuro */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage}
            alt="Fondo Confirmación"
            className="w-full h-full object-cover origin-center scale-105"
          />
          {/* Velo Botánico Oscuro Oficial */}
          <div className="absolute inset-0 glass-botanical-dark border-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>
      )}

      {/* 2. ENCABEZADO SUPERIOR */}
      <header className="relative z-10 w-full flex flex-col items-center pt-2 md:pt-4 animate-fade-in-up">
        <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] font-bold text-potatoes mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {subtitle || 'RSVP'}
        </span>

        <h2 className="font-serif text-2xl md:text-4xl text-potatoes font-bold tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]">
          {titleWords.length > 1 ? (
            <>
              {titleFirstPart}{' '}
              <span className="italic font-normal font-serif text-potatoes">{titleLastWord}</span>
            </>
          ) : (
            title
          )}
        </h2>

        {/* Divisor Vertical Fino */}
        <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-transparent via-potatoes/60 to-transparent mt-2" />
      </header>

      {/* 3. TARJETA CENTRAL (Cristal Botánico Ahumado con Espacio Reservado Fijo) */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto px-2 py-4 flex flex-col items-center justify-center animate-fade-in-up">
        
        {/* SPOTLIGHT INVISIBLE: Sombra difuminada detrás de la tarjeta para legibilidad absoluta */}
        <div className="absolute inset-0 bg-black/50 blur-[80px] -z-10 rounded-[100%] scale-[1.3] md:scale-[1.8] pointer-events-none" />

        <div className="w-full bg-black/40 backdrop-blur-xl border border-potatoes/25 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-potatoes">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Información del Invitado */}
              <div className="text-center space-y-1 mb-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-potatoes/70 font-semibold block">
                  Invitación para:
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-potatoes font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight leading-snug">
                  {nameWords.length > 1 ? (
                    <>
                      {firstPart} <span className="italic font-normal font-serif text-potatoes">{lastWord}</span>
                    </>
                  ) : (
                    guestName
                  )}
                </h3>
                <p className="font-sans text-xs text-potatoes/80 italic font-medium tracking-wide">
                  {maxGuests} {maxGuests === 1 ? 'pase reservado' : 'pases reservados'}
                </p>
              </div>

              {/* Separador Fino */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-potatoes/35 to-transparent my-1" />

              {/* Selector de Asistencia (3 Opciones) */}
              <div className="space-y-2.5 pt-1">
                <span className="block text-center font-sans text-[10px] uppercase tracking-[0.2em] text-potatoes/80 font-bold mb-1">
                  Confirma tu asistencia
                </span>

                {/* Opción 1: Confirmo mi asistencia */}
                <label className="group relative block cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    className="peer sr-only"
                    checked={status === 'confirm'}
                    onChange={() => handleStatusChange('confirm')}
                  />
                  <div className="w-full flex items-center py-2.5 px-4 rounded-full bg-white/[0.06] border border-potatoes/20 peer-checked:border-potatoes peer-checked:bg-potatoes/20 transition-all hover:bg-white/[0.12] active:scale-[0.99] shadow-sm">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                      status === 'confirm' ? "bg-potatoes text-black" : "bg-white/10 text-potatoes group-hover:bg-white/20"
                    )}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs md:text-sm text-potatoes font-medium tracking-wide text-left flex-1">
                      Confirmo mi asistencia
                    </span>
                  </div>
                </label>

                {/* Opción 2: Asistiré con menos personas */}
                {maxGuests > 1 && (
                  <label className="group relative block cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      className="peer sr-only"
                      checked={status === 'less'}
                      onChange={() => handleStatusChange('less')}
                    />
                    <div className="w-full flex items-center py-2.5 px-4 rounded-full bg-white/[0.06] border border-potatoes/20 peer-checked:border-potatoes peer-checked:bg-potatoes/20 transition-all hover:bg-white/[0.12] active:scale-[0.99] shadow-sm">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                        status === 'less' ? "bg-potatoes text-black" : "bg-white/10 text-potatoes group-hover:bg-white/20"
                      )}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-1.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 19.25a6 6 0 0 1 10.75-3.5" />
                        </svg>
                      </div>
                      <span className="font-sans text-xs md:text-sm text-potatoes font-medium tracking-wide text-left flex-1">
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
                  <div className="w-full flex items-center py-2.5 px-4 rounded-full bg-white/[0.06] border border-potatoes/20 peer-checked:border-potatoes peer-checked:bg-potatoes/20 transition-all hover:bg-white/[0.12] active:scale-[0.99] shadow-sm">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-colors",
                      status === 'decline' ? "bg-potatoes text-black" : "bg-white/10 text-potatoes group-hover:bg-white/20"
                    )}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs md:text-sm text-potatoes font-medium tracking-wide text-left flex-1">
                      No podré asistir
                    </span>
                  </div>
                </label>
              </div>

              {/* 4. CONTENEDOR CON ESPACIO RESERVADO FIJO (Cero Deformaciones / Cero Brincos) */}
              <div className="w-full h-[62px] flex items-center justify-center">
                {status === 'less' && (
                  <div className="flex flex-col items-center gap-1 animate-fade-in-up">
                    <span className="font-sans text-[9.5px] uppercase tracking-[0.15em] text-potatoes/75 font-semibold">
                      ¿Cuántas personas asistirán?
                    </span>
                    <div className="flex items-center gap-6 bg-white/10 border border-potatoes/25 rounded-full py-1 px-4 shadow-sm select-none">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={guestsCount <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-potatoes border border-potatoes/30 hover:bg-potatoes/20 disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all font-bold cursor-pointer"
                        aria-label="Disminuir invitados"
                      >
                        －
                      </button>
                      <span className="font-mono text-base font-bold text-potatoes w-6 text-center">
                        {guestsCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={guestsCount >= maxGuests - 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-potatoes border border-potatoes/30 hover:bg-potatoes/20 disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all font-bold cursor-pointer"
                        aria-label="Aumentar invitados"
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                )}

                {status === 'confirm' && (
                  <div className="text-center px-4 animate-fade-in-up">
                    <p className="font-serif italic text-xs text-potatoes/90 leading-relaxed">
                      ✨ Confirmando asistencia para <strong className="font-bold text-potatoes font-mono">{maxGuests}</strong> {maxGuests === 1 ? 'persona' : 'personas'}.
                    </p>
                  </div>
                )}

                {status === 'decline' && (
                  <div className="text-center px-4 animate-fade-in-up">
                    <p className="font-serif italic text-xs text-potatoes/75 leading-relaxed">
                      Lamentamos que no puedas acompañarnos en nuestro día.
                    </p>
                  </div>
                )}
              </div>

              {/* Botón de Enviar */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full bg-potatoes text-black hover:bg-potatoes/90 font-sans text-xs sm:text-sm font-bold py-3 px-8 rounded-full shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-[0.2em] cursor-pointer"
                >
                  <span>{submitButtonText}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

            </form>
          ) : (
            // Vista de Agradecimiento y Confirmación Exitosa
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-potatoes/15 flex items-center justify-center border border-potatoes/40 mb-1 pulse-soft">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-potatoes">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.748-5.25Z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-serif italic text-3xl text-potatoes drop-shadow-md font-semibold">
                ¡Muchas Gracias!
              </h3>
              {status === 'decline' ? (
                <p className="font-sans text-xs md:text-sm text-potatoes/85 leading-relaxed px-4">
                  Lamentamos que no puedas acompañarnos. ¡Te extrañaremos en nuestro gran día!
                </p>
              ) : (
                <p className="font-sans text-xs md:text-sm text-potatoes/90 leading-relaxed px-4">
                  Tu asistencia ha sido confirmada con éxito para{' '}
                  <strong className="font-bold text-potatoes font-mono underline decoration-potatoes/50">
                    {guestsCount} {guestsCount === 1 ? 'persona' : 'personas'}
                  </strong>.
                  <br />
                  <span className="italic font-serif text-potatoes/80 block mt-2">
                    ¡Estamos muy emocionados de celebrar juntos!
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 4. PIE DE PÁGINA (Fecha límite) */}
      <footer className="relative z-10 w-full flex flex-col items-center pb-2 md:pb-4 text-center animate-fade-in-up">
        <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-transparent via-potatoes/60 to-transparent mb-2" />
        {deadlineText && !isSubmitted && (
          <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-semibold text-potatoes drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {deadlineText}
          </p>
        )}
        {isSubmitted && (
          <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.35em] font-semibold text-potatoes/70">
            With Love, Always
          </p>
        )}
      </footer>
    </section>
  );
}

