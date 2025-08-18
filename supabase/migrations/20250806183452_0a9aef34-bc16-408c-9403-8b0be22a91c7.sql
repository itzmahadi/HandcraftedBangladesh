-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.update_follower_counts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.update_posts_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;