-- Add click to enter column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS click_to_enter BOOLEAN DEFAULT false;
