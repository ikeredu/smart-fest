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
}

export default function MusicWidget({ url, autoplay = true }: MusicWidgetProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Intentar reproducir música en la primera interacción del usuario con la página
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

  // Actualización del progreso de la canción
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

  // Adelantar o retroceder 10 segundos
  const skipForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const skipBackward = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  // Formatear segundos a MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed top-6 right-6 z-50 select-none">
      {/* Elemento de audio nativo oculto */}
      <audio 
        ref={audioRef} 
        src={url} 
        loop 
        preload="auto" 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Reproductor Estilo Glassmorphic Tarjeta de Stitch */}
      <div className="glass-card p-4 rounded-2xl flex flex-col gap-4 shadow-2xl bg-white/30 backdrop-blur-xl border border-white/40 w-[180px] hover:bg-white/45 transition-all duration-500">
        
        {/* Fila Superior: Icono de nota + Metadatos */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20 shadow-sm animate-pulse-slow">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-[#D4AF37]"
            >
              <path d="M13.5 3.75a.75.75 0 0 0-1.5 0v11.25H6a3.75 3.75 0 1 0 0 7.5h6a3.75 3.75 0 0 0 3.75-3.75V3.75Z" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-[12px] text-[#5d5f5f] font-bold truncate leading-tight">
              Ethereal Melody
            </span>
            <span className="font-sans text-[8px] text-[#1c1b1b]/60 font-semibold tracking-wider truncate uppercase">
              Wedding Ensemble
            </span>
          </div>
        </div>

        {/* Fila Media: Controles (Skip Back, Play/Pause, Skip Forward) */}
        <div className="flex items-center justify-center gap-3">
          {/* Retroceder */}
          <button 
            onClick={skipBackward}
            className="text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer group"
            title="Retroceder 10s"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform group-hover:scale-110">
              <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V7.188c0-1.44-1.555-2.342-2.805-1.628L12 9.53V7.188c0-1.44-1.555-2.342-2.805-1.628L2.25 9.529c-1.25.714-1.25 2.522 0 3.235l6.945 3.968Z" />
            </svg>
          </button>

          {/* Play / Pause con el efecto pulsante pulse-soft de Stitch cuando está en pausa */}
          <button 
            onClick={togglePlay}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full bg-white/60 text-[#D4AF37] hover:bg-white transition-all shadow-sm focus:outline-none cursor-pointer",
              !isPlaying && "pulse-soft"
            )}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#D4AF37]">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75H16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5 text-[#D4AF37]">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Adelantar */}
          <button 
            onClick={skipForward}
            className="text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors focus:outline-none cursor-pointer group"
            title="Adelantar 10s"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform group-hover:scale-110">
              <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l6.945-3.968c1.25-.714 1.25-2.522 0-3.236L14.805 7.06c-1.25-.713-2.805.19-2.805 1.629v2.34L5.055 7.06Z" />
            </svg>
          </button>
        </div>

        {/* Fila Inferior: Progreso Real */}
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-0.5 bg-[#1c1b1b]/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4AF37]/70 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between font-sans text-[8px] text-[#1c1b1b]/40 font-semibold uppercase tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 200)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
