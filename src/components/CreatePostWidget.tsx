import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, FileText, Calendar, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import CreateContentModal from "./CreateContentModal";

const CreatePostWidget = ({ onPostCreated }: { onPostCreated?: () => void }) => {
  const { user } = useAuth();
  const { profile } = useProfile();

  if (!user) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback>
              {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">
              What's on your mind, {profile?.full_name || user.email?.split('@')[0]}?
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <CreateContentModal type="gallery" onSuccess={onPostCreated}>
            <Button variant="ghost" className="flex-1 justify-start h-auto p-3">
              <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
              <div className="text-left">
                <div className="font-medium text-sm">Photo/Art</div>
                <div className="text-xs text-muted-foreground">Share your work</div>
              </div>
            </Button>
          </CreateContentModal>

          <CreateContentModal type="story" onSuccess={onPostCreated}>
            <Button variant="ghost" className="flex-1 justify-start h-auto p-3">
              <FileText className="w-5 h-5 mr-2 text-green-500" />
              <div className="text-left">
                <div className="font-medium text-sm">Story</div>
                <div className="text-xs text-muted-foreground">Tell your tale</div>
              </div>
            </Button>
          </CreateContentModal>

          <CreateContentModal type="event" onSuccess={onPostCreated}>
            <Button variant="ghost" className="flex-1 justify-start h-auto p-3">
              <Calendar className="w-5 h-5 mr-2 text-purple-500" />
              <div className="text-left">
                <div className="font-medium text-sm">Event</div>
                <div className="text-xs text-muted-foreground">Organize meet</div>
              </div>
            </Button>
          </CreateContentModal>
        </div>

        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 mr-1" />
            Share your creativity with the artisan community
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostWidget;