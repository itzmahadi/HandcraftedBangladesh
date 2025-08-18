import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  location: string;
  category: string;
  max_participants: number;
  current_participants: number;
  contact_info: any;
  is_online: boolean;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      // First get events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (eventsError) throw eventsError;

      // Then get profiles for the users
      const userIds = eventsData?.map(event => event.user_id) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, username, avatar_url')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Manually join the data
      const eventsWithProfiles = eventsData?.map(event => ({
        ...event,
        profiles: profilesData?.find(profile => profile.user_id === event.user_id) || null
      })) || [];

      setEvents(eventsWithProfiles);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const joinEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join events",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if already registered
      const { data: existingRegistration } = await supabase
        .from('event_participants')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .single();

      if (existingRegistration) {
        toast({
          title: "Already registered",
          description: "You are already registered for this event",
          variant: "destructive"
        });
        return;
      }

      // Register for event
      const { error } = await supabase
        .from('event_participants')
        .insert({ event_id: eventId, user_id: user.id });

      if (error) throw error;

      // Update participant count
      await supabase.rpc('increment_event_participants', { event_id: eventId });

      toast({
        title: "Registration successful",
        description: "You have been registered for this event"
      });

      // Refresh events
      fetchEvents();
    } catch (error) {
      console.error('Error joining event:', error);
      toast({
        title: "Error",
        description: "Failed to join event",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    joinEvent,
    refetch: fetchEvents
  };
}