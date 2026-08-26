import { createClient } from '@/lib/supabase/server';
import DashboardClient from '@/components/dashboard/DashboardClient';

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

  // Resolve user display name with robust fallbacks
  const userName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Anfitrión';

  const userEmail = profile?.email || user?.email || '';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const userRole = profile?.role === 'admin' ? 'Administrador' : profile?.role === 'planner' ? 'Planner' : 'Anfitrión';

  // Fetch user events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false });

  return (
    <DashboardClient
      userEmail={userEmail}
      userName={userName}
      userRole={userRole}
      avatarUrl={avatarUrl}
      events={events || []}
    />
  );
}
