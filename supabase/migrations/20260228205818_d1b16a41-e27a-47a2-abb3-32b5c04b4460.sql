
-- Profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  email text,
  avatar_url text,
  bio text DEFAULT '',
  city text DEFAULT '',
  latitude double precision,
  longitude double precision,
  verified boolean NOT NULL DEFAULT false,
  park_points integer NOT NULL DEFAULT 0,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_checkin_date date,
  level integer NOT NULL DEFAULT 1,
  subscription_tier text NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'family')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (user_id = auth.uid());

-- Helper function (now profiles table exists)
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_id_input uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = profile_id_input AND user_id = auth.uid()
  );
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Member profiles (kids and dogs)
CREATE TABLE public.member_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('kid', 'dog')),
  name text NOT NULL,
  photo_url text,
  age_months integer,
  breed text,
  size text CHECK (size IS NULL OR size IN ('small', 'medium', 'large')),
  temperament_tags text[] DEFAULT '{}',
  interest_tags text[] DEFAULT '{}',
  vaccination_status boolean,
  vaccination_date date,
  allergy_info text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own member profiles" ON public.member_profiles FOR SELECT USING (public.is_profile_owner(profile_id));
CREATE POLICY "Users can insert own member profiles" ON public.member_profiles FOR INSERT WITH CHECK (public.is_profile_owner(profile_id));
CREATE POLICY "Users can update own member profiles" ON public.member_profiles FOR UPDATE USING (public.is_profile_owner(profile_id));
CREATE POLICY "Users can delete own member profiles" ON public.member_profiles FOR DELETE USING (public.is_profile_owner(profile_id));

-- Parks table
CREATE TABLE public.parks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  city text,
  address text,
  amenities text[] DEFAULT '{}',
  cover_photo_url text,
  average_rating double precision DEFAULT 0,
  total_reviews integer DEFAULT 0,
  leash_required boolean DEFAULT false,
  has_dog_run boolean DEFAULT false,
  has_parking boolean DEFAULT false,
  has_restrooms boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.parks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parks are publicly readable" ON public.parks FOR SELECT USING (true);

-- Check-ins
CREATE TABLE public.checkins (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  park_id uuid NOT NULL REFERENCES public.parks(id) ON DELETE CASCADE,
  member_profile_ids uuid[] DEFAULT '{}',
  note text,
  photo_url text,
  duration_minutes integer DEFAULT 60,
  active boolean NOT NULL DEFAULT true,
  is_public boolean NOT NULL DEFAULT true,
  checked_in_at timestamptz NOT NULL DEFAULT now(),
  checked_out_at timestamptz
);

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public checkins visible" ON public.checkins FOR SELECT USING (is_public = true OR public.is_profile_owner(profile_id));
CREATE POLICY "Users create own checkins" ON public.checkins FOR INSERT WITH CHECK (public.is_profile_owner(profile_id));
CREATE POLICY "Users update own checkins" ON public.checkins FOR UPDATE USING (public.is_profile_owner(profile_id));
CREATE POLICY "Users delete own checkins" ON public.checkins FOR DELETE USING (public.is_profile_owner(profile_id));

ALTER PUBLICATION supabase_realtime ADD TABLE public.checkins;

-- Connections
CREATE TABLE public.connections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_one_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_two_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  park_id uuid REFERENCES public.parks(id),
  met_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT no_self_connection CHECK (user_one_id != user_two_id)
);

ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View own connections" ON public.connections FOR SELECT
  USING (public.is_profile_owner(user_one_id) OR public.is_profile_owner(user_two_id));
CREATE POLICY "Create connections" ON public.connections FOR INSERT
  WITH CHECK (public.is_profile_owner(user_one_id) AND NOT public.is_profile_owner(user_two_id));
CREATE POLICY "Delete own connections" ON public.connections FOR DELETE
  USING (public.is_profile_owner(user_one_id) OR public.is_profile_owner(user_two_id));

-- Messages
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  content text NOT NULL,
  photo_url text,
  sent_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View own messages" ON public.messages FOR SELECT
  USING (public.is_profile_owner(sender_id) OR public.is_profile_owner(receiver_id));
CREATE POLICY "Send messages" ON public.messages FOR INSERT
  WITH CHECK (public.is_profile_owner(sender_id));
CREATE POLICY "Update own messages" ON public.messages FOR UPDATE
  USING (public.is_profile_owner(sender_id));
CREATE POLICY "Delete own messages" ON public.messages FOR DELETE
  USING (public.is_profile_owner(sender_id));

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Badges
CREATE TABLE public.badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon_url text,
  rarity text NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  criteria jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges publicly readable" ON public.badges FOR SELECT USING (true);

-- User badges
CREATE TABLE public.user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (profile_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User badges publicly readable" ON public.user_badges FOR SELECT USING (true);

-- Seed badges
INSERT INTO public.badges (slug, name, description, rarity) VALUES
  ('first-checkin', 'First Check-In', 'Checked in at a park for the first time', 'common'),
  ('social-starter', 'Social Starter', 'Made your first connection', 'common'),
  ('week-warrior', 'Week Warrior', 'Checked in every day for a week', 'rare'),
  ('dog-whisperer', 'Dog Whisperer', 'Connected with 10 dog parents', 'epic'),
  ('playground-hero', 'Playground Hero', 'Connected with 10 kid parents', 'epic'),
  ('park-explorer', 'Park Explorer', 'Visited 5 different parks', 'rare'),
  ('park-legend', 'Park Legend', 'Reached level 6', 'legendary'),
  ('verified-guardian', 'Verified Guardian', 'Completed identity verification', 'common'),
  ('early-adopter', 'Early Adopter', 'Joined during beta', 'rare'),
  ('streak-master', 'Streak Master', 'Maintained a 30-day streak', 'legendary');

-- Seed sample parks
INSERT INTO public.parks (name, latitude, longitude, city, address, amenities, has_dog_run, has_parking, has_restrooms) VALUES
  ('Riverside Park', 40.8010, -73.9724, 'New York', '475 Riverside Dr, New York, NY', ARRAY['playground', 'water_fountain', 'benches'], true, false, true),
  ('Central Bark Dog Park', 40.7829, -73.9654, 'New York', 'Central Park, New York, NY', ARRAY['fenced_area', 'water_fountain', 'shade'], true, false, false),
  ('Willow Creek Park', 40.7580, -73.9855, 'New York', '123 Willow St, New York, NY', ARRAY['playground', 'sandbox', 'swings', 'benches'], false, true, true),
  ('Oakwood Family Park', 40.7488, -73.9856, 'New York', '456 Oak Ave, New York, NY', ARRAY['playground', 'dog_area', 'picnic_tables', 'restrooms'], true, true, true),
  ('Sunset Meadows', 40.7688, -73.9500, 'New York', '789 Sunset Blvd, New York, NY', ARRAY['open_field', 'walking_trail', 'water_fountain'], true, true, false);
