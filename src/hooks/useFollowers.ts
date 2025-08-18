import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useFollowers = (userId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && userId && user.id !== userId) {
      checkFollowStatus();
    }
  }, [user, userId]);

  const checkFollowStatus = async () => {
    if (!user || !userId) return;

    try {
      const { data, error } = await supabase
        .from('followers')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', userId)
        .maybeSingle();

      if (error) throw error;
      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const toggleFollow = async () => {
    if (!user || !userId || user.id === userId) return;

    setLoading(true);
    try {
      if (isFollowing) {
        const { error } = await supabase
          .from('followers')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId);

        if (error) throw error;
        setIsFollowing(false);
        toast({
          title: "Unfollowed",
          description: "You are no longer following this user."
        });
      } else {
        const { error } = await supabase
          .from('followers')
          .insert({
            follower_id: user.id,
            following_id: userId
          });

        if (error) throw error;
        setIsFollowing(true);
        toast({
          title: "Following",
          description: "You are now following this user."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isFollowing,
    loading,
    toggleFollow,
    canFollow: user && userId && user.id !== userId
  };
};