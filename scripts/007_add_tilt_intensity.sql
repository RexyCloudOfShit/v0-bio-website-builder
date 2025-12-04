-- Add tilt intensity column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS card_tilt_intensity INTEGER DEFAULT 10;
