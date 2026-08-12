import { createClient } from '@/lib/supabase/server';
import { logoutAction } from '../(auth)/actions';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch user profile from DB
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single();

  // Fetch user events count
  const { data: events, count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id || '');

  return (
    <div className="min-h-screen bg-black text-potatoes flex flex-col font-sans relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 glass-botanical-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full px-6 py-4 border-b border-potatoes/20 flex justify-between items-center glass-crystalline">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-xl font-bold tracking-wide">Smart-Fest</span>
          <span className="text-[10px] uppercase tracking-[0.2em] bg-potatoes/10 px-2 py-1 rounded-md text-potatoes/80 border border-potatoes/20">
            {profile?.role || 'Anfitrión'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs text-potatoes/80 hidden sm:inline">
            {profile?.full_name || user?.email}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="py-1.5 px-4 rounded-xl bg-cranberry/40 hover:bg-cranberry border border-cranberry/60 text-potatoes text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col space-y-8">
        {/* Welcome Section */}
        <section className="glass-dark rounded-2xl p-6 md:p-8 border border-potatoes/20">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-potatoes/70 block">
            Panel de Control
          </span>
          <h1 className="font-serif text-2xl md:text-4xl text-potatoes mt-1">
            ¡Hola, <span className="italic font-normal">{profile?.full_name || 'Anfitrión'}</span>!
          </h1>
          <p className="text-xs md:text-sm text-potatoes/80 mt-2 max-w-xl">
            Bienvenido a tu panel de administración. Desde aquí podrás gestionar tus eventos, personalizar tus invitaciones modulares y administrar a tus invitados.
          </p>
        </section>

        {/* Status Metrics (Hito 1 Preview) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-crystalline rounded-2xl p-5 border border-potatoes/20 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-potatoes/70">Mis Eventos</span>
            <div className="text-3xl font-serif mt-2 font-bold">{eventsCount || 0}</div>
            <span className="text-[11px] text-potatoes/50 mt-2">Eventos activos registrados</span>
          </div>

          <div className="glass-crystalline rounded-2xl p-5 border border-potatoes/20 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-potatoes/70">Invitados Confirmados</span>
            <div className="text-3xl font-serif mt-2 font-bold text-potatoes">0</div>
            <span className="text-[11px] text-potatoes/50 mt-2">Próximamente en Hito 2</span>
          </div>

          <div className="glass-crystalline rounded-2xl p-5 border border-potatoes/20 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-potatoes/70">Estado del Sistema</span>
            <div className="text-xs font-semibold text-green-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Supabase Auth & RLS Activo
            </div>
            <span className="text-[11px] text-potatoes/50 mt-2">Hito 1 Completado</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-[10px] uppercase tracking-[0.2em] text-potatoes/40 border-t border-potatoes/10">
        Smart-Fest &copy; {new Date().getFullYear()} — Fullstack Event Platform
      </footer>
    </div>
  );
}
