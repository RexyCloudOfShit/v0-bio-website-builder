-- Full schema update for enhanced features
-- Run this to add all new columns

-- Visit counter toggle
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS show_visit_counter BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visit_counter_position TEXT DEFAULT 'bottom-left';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visit_counter_docked BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visit_counter_dock_position TEXT DEFAULT 'bottom';

-- Audio player position
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS audio_player_position TEXT DEFAULT 'bottom-left';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS audio_player_docked BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS audio_player_dock_position TEXT DEFAULT 'bottom';

-- OG/Embed customization
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS og_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS og_image_url TEXT;

-- Text animation
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS site_title_animated BOOLEAN DEFAULT true;

-- Particles / Snow enhancements
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_image_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_use_image BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_rotation BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_sway REAL DEFAULT 1.0;

-- Text effects
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_glow_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_glow_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio_color TEXT DEFAULT 'rgba(255,255,255,0.8)';

-- Card border
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_color TEXT DEFAULT 'rgba(255,255,255,0.2)';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_width INTEGER DEFAULT 1;

-- Link colors
ALTER TABLE public.social_links ADD COLUMN IF NOT EXISTS icon_color TEXT;
ALTER TABLE public.social_links ADD COLUMN IF NOT EXISTS background_color TEXT;
