-- Create profiles table for user bio pages
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  
  -- Background settings
  background_type TEXT DEFAULT 'color', -- 'color', 'image', 'video'
  background_color TEXT DEFAULT '#0a0a0a',
  background_image_url TEXT,
  background_video_url TEXT,
  
  -- Audio settings
  audio_url TEXT,
  audio_autoplay BOOLEAN DEFAULT false,
  audio_loop BOOLEAN DEFAULT true,
  show_volume_slider BOOLEAN DEFAULT true,
  show_bass_boost BOOLEAN DEFAULT false,
  show_tempo_slider BOOLEAN DEFAULT false,
  
  -- Snow effect settings
  snow_enabled BOOLEAN DEFAULT false,
  snow_count INTEGER DEFAULT 100,
  snow_speed REAL DEFAULT 1.0,
  snow_wind REAL DEFAULT 0.0,
  snow_size REAL DEFAULT 1.0,
  snow_color TEXT DEFAULT '#ffffff',
  snow_opacity REAL DEFAULT 0.8,
  
  -- Card settings
  card_position_x REAL DEFAULT 50, -- percentage from left
  card_position_y REAL DEFAULT 50, -- percentage from top
  card_padding INTEGER DEFAULT 24,
  card_background TEXT DEFAULT 'rgba(20, 20, 20, 0.8)',
  card_border_radius INTEGER DEFAULT 16,
  card_blur INTEGER DEFAULT 10,
  card_tilt_enabled BOOLEAN DEFAULT true,
  card_glow_enabled BOOLEAN DEFAULT false,
  card_glow_color TEXT DEFAULT '#ffffff',
  
  -- Mouse effects
  cursor_type TEXT DEFAULT 'default', -- 'default', 'custom', 'hidden'
  cursor_image_url TEXT,
  cursor_color TEXT DEFAULT '#ffffff',
  mouse_trail_enabled BOOLEAN DEFAULT false,
  mouse_trail_color TEXT DEFAULT '#ffffff',
  mouse_trail_length INTEGER DEFAULT 20,
  click_effect_enabled BOOLEAN DEFAULT false,
  click_effect_type TEXT DEFAULT 'ripple', -- 'ripple', 'particles', 'ring'
  click_effect_color TEXT DEFAULT '#ffffff',
  
  -- Badges
  badges JSONB DEFAULT '[]'::jsonb,
  
  -- Stats
  visit_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view profiles (public pages)
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (true);

-- Allow users to insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Create index for username lookups
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles(username);
