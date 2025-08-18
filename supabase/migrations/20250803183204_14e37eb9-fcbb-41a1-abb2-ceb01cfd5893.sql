-- Create database functions for incrementing/decrementing counts

-- Gallery likes functions
CREATE OR REPLACE FUNCTION increment_gallery_likes(item_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE gallery_items 
  SET likes_count = likes_count + 1 
  WHERE id = item_id;
END;
$$;

CREATE OR REPLACE FUNCTION decrement_gallery_likes(item_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE gallery_items 
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = item_id;
END;
$$;

-- Story likes functions
CREATE OR REPLACE FUNCTION increment_story_likes(story_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE stories 
  SET likes_count = likes_count + 1 
  WHERE id = story_id;
END;
$$;

CREATE OR REPLACE FUNCTION decrement_story_likes(story_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE stories 
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = story_id;
END;
$$;

-- Event participants function
CREATE OR REPLACE FUNCTION increment_event_participants(event_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE events 
  SET current_participants = current_participants + 1 
  WHERE id = event_id;
END;
$$;