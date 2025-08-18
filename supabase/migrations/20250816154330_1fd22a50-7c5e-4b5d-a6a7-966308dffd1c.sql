-- Fix the database schema issues

-- Add missing category column to stories table
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS category text;

-- Create foreign key relationships (these are implicit relationships for supabase queries)
-- No actual foreign key constraints needed since we reference user_id directly

-- Add proper indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_user_id ON public.gallery_items(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON public.stories(user_id);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_gallery_item_id ON public.likes(gallery_item_id);
CREATE INDEX IF NOT EXISTS idx_likes_story_id ON public.likes(story_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_user_id ON public.event_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_event_id ON public.event_participants(event_id);
CREATE INDEX IF NOT EXISTS idx_followers_follower_id ON public.followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON public.followers(following_id);

-- Ensure RLS is enabled on all tables
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;