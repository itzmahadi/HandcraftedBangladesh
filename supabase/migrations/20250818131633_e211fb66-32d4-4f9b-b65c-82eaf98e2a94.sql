-- Add foreign key constraints to link tables properly
ALTER TABLE gallery_items 
ADD CONSTRAINT gallery_items_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE stories 
ADD CONSTRAINT stories_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE events 
ADD CONSTRAINT events_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE comments 
ADD CONSTRAINT comments_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE likes 
ADD CONSTRAINT likes_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE event_participants 
ADD CONSTRAINT event_participants_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE followers 
ADD CONSTRAINT followers_follower_id_fkey 
FOREIGN KEY (follower_id) REFERENCES profiles(user_id) ON DELETE CASCADE;

ALTER TABLE followers 
ADD CONSTRAINT followers_following_id_fkey 
FOREIGN KEY (following_id) REFERENCES profiles(user_id) ON DELETE CASCADE;