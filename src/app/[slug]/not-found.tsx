import Link from 'next/link';

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-black text-potatoes flex flex-col items-center justify-center p-6 text-center select-none font-sans relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 glass-botanical-dark pointer-events-none" />

      <div className="relative z-10 max-w-md w-full glass-crystalline rounded-2xl p-8 border border-potatoes/30 shadow-2xl flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-potatoes/10 border border-potatoes/20 flex items-center justify-center text-3xl">
          💌
        </div>

        <h1 className="font-serif text-2xl md:text-3xl text-potatoes font-bold mt-2">
          Invitación No Encontrada
        </h1>

        <p className="text-xs text-potatoes/70 leading-relaxed max-w-xs">
          Lo sentimos, la dirección web de esta invitación no existe o ha sido eliminada por el anfitrión.
        </p>

        <Link
          href="/"
          className="mt-4 py-2.5 px-6 rounded-xl bg-potatoes/20 hover:bg-potatoes hover:text-black border border-potatoes/40 text-potatoes text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 active:scale-95"
        >
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
}
