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
    if (!isActive) {
      setParticles([]);
      return;
    }

    // Generar 22 partículas botánicas con las imágenes PNG transparentes reales
    const generatedParticles: PetalParticle[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4, // 4% a 96%
      size: Math.floor(Math.random() * 26) + 32, // entre 32px y 58px
      duration: Math.random() * 2.0 + 4.5, // Caída pausada y elegante entre 4.5s y 6.5s
      delay: Math.random() * 0.6, // 0s a 0.6s
      swayDuration: Math.random() * 1.5 + 3.0, // oscilación suave entre 3.0s y 4.5s
      src: PETAL_PNG_IMAGES[i % PETAL_PNG_IMAGES.length],
      blur: i % 6 === 0, // desenfoque suave de profundidad en 15% de partículas
      opacity: Math.random() * 0.25 + 0.75,
      rotation: Math.floor(Math.random() * 360),
    }));

    setParticles(generatedParticles);

    // Limpieza tras completar la caída (7s)
    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 7000);

    return () => clearTimeout(timer);
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
