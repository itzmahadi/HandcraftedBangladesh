import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ProfileData {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  location: string | null;
  website: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_artisan: boolean;
  verified: boolean;
  specialties: string[] | null;
}

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProfile = async (targetUserId?: string) => {
    try {
      const profileUserId = targetUserId || user?.id;
      if (!profileUserId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', profileUserId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to update your profile",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });

      // Refresh profile data
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProfile(userId);
  }, [userId, user]);

  return {
    profile,
    loading,
    updateProfile,
    refetch: () => fetchProfile(userId)
  };
}