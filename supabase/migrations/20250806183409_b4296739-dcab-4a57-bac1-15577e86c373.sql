-- Create followers table
CREATE TABLE public.followers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Enable RLS
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;

-- Create policies for followers
CREATE POLICY "Followers are viewable by everyone" 
ON public.followers 
FOR SELECT 
USING (true);

CREATE POLICY "Users can follow others" 
ON public.followers 
FOR INSERT 
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow others" 
ON public.followers 
FOR DELETE 
USING (auth.uid() = follower_id);

-- Add followers count to profiles
ALTER TABLE public.profiles 
ADD COLUMN followers_count INTEGER DEFAULT 0,
ADD COLUMN following_count INTEGER DEFAULT 0,
ADD COLUMN posts_count INTEGER DEFAULT 0;

-- Add more profile fields for customization
ALTER TABLE public.profiles 
ADD COLUMN phone TEXT,
ADD COLUMN website TEXT,
ADD COLUMN social_links JSONB DEFAULT '{}',
ADD COLUMN cover_image_url TEXT,
ADD COLUMN verified BOOLEAN DEFAULT FALSE;

-- Create function to update follower counts
CREATE OR REPLACE FUNCTION public.update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update following count for follower
  UPDATE public.profiles 
  SET following_count = (
    SELECT COUNT(*) FROM public.followers WHERE follower_id = COALESCE(NEW.follower_id, OLD.follower_id)
  )
  WHERE user_id = COALESCE(NEW.follower_id, OLD.follower_id);
  
  -- Update followers count for following
  UPDATE public.profiles 
  SET followers_count = (
    SELECT COUNT(*) FROM public.followers WHERE following_id = COALESCE(NEW.following_id, OLD.following_id)
  )
  WHERE user_id = COALESCE(NEW.following_id, OLD.following_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for follower count updates
CREATE TRIGGER update_follower_counts_on_insert
  AFTER INSERT ON public.followers
  FOR EACH ROW EXECUTE FUNCTION public.update_follower_counts();

CREATE TRIGGER update_follower_counts_on_delete
  AFTER DELETE ON public.followers
  FOR EACH ROW EXECUTE FUNCTION public.update_follower_counts();

-- Create function to update posts count
CREATE OR REPLACE FUNCTION public.update_posts_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET posts_count = posts_count + 1
    WHERE user_id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.profiles 
    SET posts_count = posts_count - 1
    WHERE user_id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for posts count updates
CREATE TRIGGER update_posts_count_on_gallery_insert
  AFTER INSERT ON public.gallery_items
  FOR EACH ROW EXECUTE FUNCTION public.update_posts_count();

CREATE TRIGGER update_posts_count_on_gallery_delete
  AFTER DELETE ON public.gallery_items
  FOR EACH ROW EXECUTE FUNCTION public.update_posts_count();

CREATE TRIGGER update_posts_count_on_story_insert
  AFTER INSERT ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.update_posts_count();

CREATE TRIGGER update_posts_count_on_story_delete
  AFTER DELETE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.update_posts_count();