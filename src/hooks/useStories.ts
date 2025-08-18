import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Story {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category?: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchStories = async () => {
    try {
      // First get stories
      const { data: storiesData, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (storiesError) throw storiesError;

      // Then get profiles for the users
      const userIds = storiesData?.map(story => story.user_id) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, username, avatar_url')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Manually join the data
      const storiesWithProfiles = storiesData?.map(story => ({
        ...story,
        profiles: profilesData?.find(profile => profile.user_id === story.user_id) || null
      })) || [];

      setStories(storiesWithProfiles);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: "Error",
        description: "Failed to load stories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const likeStory = async (storyId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like stories",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('story_id', storyId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('story_id', storyId)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update likes count
        await supabase.rpc('decrement_story_likes', { story_id: storyId });
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ story_id: storyId, user_id: user.id });

        if (error) throw error;

        // Update likes count
        await supabase.rpc('increment_story_likes', { story_id: storyId });
      }

      // Refresh stories
      fetchStories();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
    likeStory,
    refetch: fetchStories
  };
}