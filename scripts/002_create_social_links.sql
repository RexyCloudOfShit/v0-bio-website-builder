-- Create social links table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_type TEXT DEFAULT 'custom', -- 'discord', 'steam', 'xbox', 'twitter', 'instagram', 'youtube', 'tiktok', 'github', 'custom'
  custom_icon_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view social links (public)
CREATE POLICY "social_links_public_read" ON public.social_links
  FOR SELECT USING (true);

-- Allow users to manage their own social links
CREATE POLICY "social_links_insert_own" ON public.social_links
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id)
  );

CREATE POLICY "social_links_update_own" ON public.social_links
  FOR UPDATE USING (
    auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id)
  );

CREATE POLICY "social_links_delete_own" ON public.social_links
  FOR DELETE USING (
    auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id)
  );
