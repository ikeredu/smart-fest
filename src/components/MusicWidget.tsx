'use client';

import React, { useEffect, useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MusicWidgetProps {
  url: string;
  autoplay?: boolean;
  coverImage?: string;
}

export default function MusicWidget({ url, autoplay = true, coverImage }: MusicWidgetProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Intentar reproducir música en la primera interacción explícita del usuario
    const startAudioOnInteraction = () => {
      if (autoplay && !hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.log("Autoplay bloqueado esperando interacción explícita:", err);
          });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('click', startAudioOnInteraction, { once: true });
      window.addEventListener('touchstart', startAudioOnInteraction, { once: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', startAudioOnInteraction);
        window.removeEventListener('touchstart', startAudioOnInteraction);
      }
    };
  }, [autoplay, hasInteracted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.error("Error al reproducir audio:", err);
        });
    }
  };

  // Formatear segundos a MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50 select-none flex flex-col items-center">
      {/* Elemento de audio nativo oculto */}
      <audio 
        ref={audioRef} 
        src={url} 
        loop 
        preload="auto" 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Reproductor Ultra-Sutil y Translúcido */}
      <div className="glass-card p-2.5 sm:p-3 rounded-2xl flex flex-col gap-2 sm:gap-2.5 shadow-2xl bg-black/20 backdrop-blur-md border border-white/15 w-[155px] sm:w-[190px] hover:bg-black/30 transition-all duration-500">
        
        {/* Fila Superior: Miniatura + Metadatos */}
        <div className="flex items-center gap-2.5">
          {/* Miniatura cuadrada con imagen o icono de nota musical */}
          <div className="w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden border border-white/15 shadow-sm bg-white/10 flex items-center justify-center">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={coverImage} 
                alt="Miniatura de música" 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 text-potatoes"
              >
                <path d="M13.5 3.75a.75.75 0 0 0-1.5 0v11.25H6a3.75 3.75 0 1 0 0 7.5h6a3.75 3.75 0 0 0 3.75-3.75V3.75Z" />
              </svg>
            )}
          </div>

          {/* Información del tema y tiempo */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-serif text-[11px] text-potatoes font-bold truncate leading-tight">
              Ethereal Melody
            </span>
            <span className="font-sans text-[8px] text-potatoes/60 font-medium tracking-wider truncate uppercase">
              Wedding Ensemble
            </span>
            <span className="font-sans text-[8px] text-potatoes/80 font-mono mt-0.5">
              {formatTime(currentTime)} / {formatTime(duration || 200)}
            </span>
          </div>
        </div>

        {/* Fila Inferior: Único botón de Play/Pause centrado */}
        <div className="flex items-center justify-center pt-0.5">
          <button 
            onClick={togglePlay}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded-full bg-white/20 text-potatoes hover:bg-white/40 transition-all shadow-sm focus:outline-none cursor-pointer border border-white/20",
              !isPlaying && "pulse-soft"
            )}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-potatoes">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75H16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5 text-potatoes">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Leyenda Inferior Animada (Oculta automáticamente al reproducir música) */}
      {!isPlaying && (
        <div className="mt-2 text-center pointer-events-none">
          <span className="font-sans text-[9px] text-potatoes/90 tracking-widest uppercase italic font-medium animate-fade-in-out-fast drop-shadow-sm">
            Presione play para escuchar
          </span>
        </div>
      )}
    </div>
  );
}
