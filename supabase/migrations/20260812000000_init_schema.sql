-- ===================================================
-- SMART-FEST INITIAL DATABASE SCHEMA MIGRATION
-- Database-As-Code: Supabase + GitHub Integration
-- ===================================================

-- 1. PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'host' NOT NULL CHECK (role IN ('host', 'planner', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Trigger function to automatically create profile record upon user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. EVENTS TABLE (Supports 1-to-N events per profile for hosts/planners)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  event_date TIMESTAMPTZ,
  config JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index on event slug for fast public invitation lookup
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);

-- 3. GUESTS TABLE (Isolated guest lists per event)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  passes_allocated INT DEFAULT 1 NOT NULL CHECK (passes_allocated >= 1),
  passes_confirmed INT DEFAULT 0 NOT NULL CHECK (passes_confirmed >= 0),
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'confirmed', 'declined')),
  notes TEXT,
  access_code TEXT,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_guests_event_id ON public.guests(event_id);
CREATE INDEX IF NOT EXISTS idx_guests_user_id ON public.guests(user_id);
CREATE INDEX IF NOT EXISTS idx_guests_access_code ON public.guests(access_code);

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES
-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Events Policies
DROP POLICY IF EXISTS "Event owners have full access" ON public.events;
CREATE POLICY "Event owners have full access" ON public.events FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view event by slug" ON public.events;
CREATE POLICY "Public can view event by slug" ON public.events FOR SELECT USING (true);

-- Guests Policies
DROP POLICY IF EXISTS "Event owners have full access to guests" ON public.guests;
CREATE POLICY "Event owners have full access to guests" ON public.guests FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can update RSVP status" ON public.guests;
CREATE POLICY "Public can update RSVP status" ON public.guests FOR UPDATE USING (true) WITH CHECK (true);
