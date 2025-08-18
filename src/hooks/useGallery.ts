import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string | null;
    username: string | null;
    location: string | null;
  } | null;
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      
      // First get gallery items with pagination to avoid timeout
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery_items')
        .select('id, user_id, title, description, category, tags, likes_count, comments_count, created_at, updated_at')
        .order('created_at', { ascending: false })
        .limit(20); // Limit to prevent timeout

      if (galleryError) {
        console.error('Gallery error:', galleryError);
        throw galleryError;
      }

      if (!galleryData || galleryData.length === 0) {
        setItems([]);
        return;
      }

      // Then get profiles for the users
      const userIds = galleryData.map(item => item.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, username, location')
        .in('user_id', userIds);

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      // Get image URLs separately to avoid timeout
      const { data: imageData, error: imageError } = await supabase
        .from('gallery_items')
        .select('id, image_url')
        .in('id', galleryData.map(item => item.id));

      if (imageError) {
        console.error('Image error:', imageError);
        // Don't throw, just continue without images
      }

      // Manually join the data
      const itemsWithProfiles = galleryData.map(item => ({
        ...item,
        image_url: imageData?.find(img => img.id === item.id)?.image_url || '',
        profiles: profilesData?.find(profile => profile.user_id === item.user_id) || null
      }));

      setItems(itemsWithProfiles);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive"
      });
      setItems([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const likeItem = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like items",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from('likes')
        .select('id')
        .eq('gallery_item_id', itemId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('gallery_item_id', itemId)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update likes count
        await supabase.rpc('decrement_gallery_likes', { item_id: itemId });
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ gallery_item_id: itemId, user_id: user.id });

        if (error) throw error;

        // Update likes count
        await supabase.rpc('increment_gallery_likes', { item_id: itemId });
      }

      // Refresh gallery items
      fetchGalleryItems();
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
    fetchGalleryItems();
  }, []);

  return {
    items,
    loading,
    likeItem,
    refetch: fetchGalleryItems
  };
}