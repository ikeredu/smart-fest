'use client';

import React, { useEffect, useState } from 'react';

interface PetalParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  src: string;
  blur: boolean;
  opacity: number;
  rotation: number;
}

interface PetalShowerProps {
  isActive: boolean;
  onComplete?: () => void;
}

const PETAL_PNG_IMAGES = [
  '/images/petals/gardenia_blossom.png',
  '/images/petals/white_rose_petal.png',
  '/images/petals/peony_petal.png',
  '/images/petals/botanical_leaf.png',
];

export default function PetalShower({ isActive, onComplete }: PetalShowerProps) {
  const [particles, setParticles] = useState<PetalParticle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Generar 44 partículas organizadas en 3 ráfagas/olas de viento consecutivas
    const wave1Count = 16;
    const wave2Count = 16;
    const wave3Count = 12;
    const totalCount = wave1Count + wave2Count + wave3Count;

    const generatedParticles: PetalParticle[] = Array.from({ length: totalCount }).map((_, i) => {
      let delay = 0;

      if (i < wave1Count) {
        // Ráfaga 1 (Inicial): retraso entre 0.0s y 0.8s
        delay = Math.random() * 0.8;
      } else if (i < wave1Count + wave2Count) {
        // Ráfaga 2 (Segunda ola): retraso entre 1.6s y 2.4s
        delay = Math.random() * 0.8 + 1.6;
      } else {
        // Ráfaga 3 (Tercera ola): retraso entre 3.2s y 4.0s
        delay = Math.random() * 0.8 + 3.2;
      }

      return {
        id: i,
        left: Math.random() * 96 + 2, // Amplia dispersión entre 2% y 98%
        size: Math.floor(Math.random() * 26) + 32, // entre 32px y 58px
        duration: Math.random() * 1.8 + 4.2, // Caída pausada entre 4.2s y 6.0s
        delay,
        swayDuration: Math.random() * 1.5 + 3.0, // oscilación suave entre 3.0s y 4.5s
        src: PETAL_PNG_IMAGES[i % PETAL_PNG_IMAGES.length],
        blur: i % 6 === 0, // desenfoque suave de profundidad en ~16% de partículas
        opacity: Math.random() * 0.25 + 0.75,
        rotation: Math.floor(Math.random() * 360),
      };
    });

    const rafId = requestAnimationFrame(() => {
      setParticles(generatedParticles);
    });

    // Limpieza tras completar las 3 ráfagas de viento (8.5s)
    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 8500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.blur ? 'blur(1.5px)' : 'none',
            animation: `petal-fall ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
          }}
        >
          {/* Oscilación de vaivén horizontal y rotación 3D */}
          <div
            className="w-full h-full"
            style={{
              animation: `petal-sway ${p.swayDuration}s ease-in-out infinite alternate`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {/* Imagen PNG transparente sin bordes ni esferas */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt="Flor / Pétalo en Acuarela"
              className="w-full h-full object-contain drop-shadow-sm pointer-events-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
