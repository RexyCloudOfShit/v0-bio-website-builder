-- Add new columns for enhanced features
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_image_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_use_image BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_rotation BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS snow_sway REAL DEFAULT 1.0;

-- Add more click effect types
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_click_effect_type_check;

-- Add text effects
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_glow_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name_glow_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio_color TEXT DEFAULT 'rgba(255,255,255,0.8)';

-- Add card border
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_color TEXT DEFAULT 'rgba(255,255,255,0.2)';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_border_width INTEGER DEFAULT 1;

-- Add link color to social_links
ALTER TABLE public.social_links ADD COLUMN IF NOT EXISTS icon_color TEXT;
ALTER TABLE public.social_links ADD COLUMN IF NOT EXISTS background_color TEXT;
