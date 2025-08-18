import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, FileText, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  onPostCreated?: () => void;
}

const CreatePostModal = ({ onPostCreated }: CreatePostModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Gallery post state
  const [galleryData, setGalleryData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    tags: [] as string[]
  });
  
  // Story post state
  const [storyData, setStoryData] = useState({
    title: '',
    content: '',
    image_url: '',
    tags: [] as string[]
  });
  
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Kantha Embroidery', 'Traditional Pottery', 'Handloom Weaving', 
    'Metal Crafts', 'Wood Carving', 'Jewelry Making', 'Leather Work', 'Other'
  ];

  const addTag = (tags: string[], setData: any, data: any) => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setData({ ...data, tags: [...tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string, tags: string[], setData: any, data: any) => {
    setData({ ...data, tags: tags.filter(tag => tag !== tagToRemove) });
  };

  const handleCreateGalleryPost = async () => {
    if (!user || !galleryData.title || !galleryData.category || !galleryData.image_url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery_items')
        .insert({
          user_id: user.id,
          title: galleryData.title,
          description: galleryData.description,
          category: galleryData.category,
          image_url: galleryData.image_url,
          tags: galleryData.tags
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your artwork has been posted to the gallery."
      });

      setGalleryData({ title: '', description: '', category: '', image_url: '', tags: [] });
      setOpen(false);
      onPostCreated?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStoryPost = async () => {
    if (!user || !storyData.title || !storyData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title: storyData.title,
          content: storyData.content,
          image_url: storyData.image_url,
          tags: storyData.tags
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your story has been published."
      });

      setStoryData({ title: '', content: '', image_url: '', tags: [] });
      setOpen(false);
      onPostCreated?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="shadow-glow hover:shadow-elegant transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Artwork
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Story
            </TabsTrigger>
          </TabsList>
          
          {/* Gallery Post Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="gallery-title">Title *</Label>
                <Input
                  id="gallery-title"
                  value={galleryData.title}
                  onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                  placeholder="Enter artwork title"
                />
              </div>
              
              <div>
                <Label htmlFor="gallery-category">Category *</Label>
                <select
                  id="gallery-category"
                  value={galleryData.category}
                  onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="gallery-image">Image URL *</Label>
                <Input
                  id="gallery-image"
                  value={galleryData.image_url}
                  onChange={(e) => setGalleryData({ ...galleryData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor="gallery-description">Description</Label>
                <Textarea
                  id="gallery-description"
                  value={galleryData.description}
                  onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
                  placeholder="Describe your artwork, techniques used, inspiration..."
                  rows={4}
                />
              </div>
              
              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(galleryData.tags, setGalleryData, galleryData);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => addTag(galleryData.tags, setGalleryData, galleryData)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {galleryData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTag(tag, galleryData.tags, setGalleryData, galleryData)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCreateGalleryPost} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Post Artwork'}
            </Button>
          </TabsContent>
          
          {/* Story Post Tab */}
          <TabsContent value="story" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="story-title">Title *</Label>
                <Input
                  id="story-title"
                  value={storyData.title}
                  onChange={(e) => setStoryData({ ...storyData, title: e.target.value })}
                  placeholder="Enter story title"
                />
              </div>
              
              <div>
                <Label htmlFor="story-image">Cover Image URL (Optional)</Label>
                <Input
                  id="story-image"
                  value={storyData.image_url}
                  onChange={(e) => setStoryData({ ...storyData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor="story-content">Story Content *</Label>
                <Textarea
                  id="story-content"
                  value={storyData.content}
                  onChange={(e) => setStoryData({ ...storyData, content: e.target.value })}
                  placeholder="Share your story, experiences, techniques, or cultural insights..."
                  rows={8}
                />
              </div>
              
              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(storyData.tags, setStoryData, storyData);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => addTag(storyData.tags, setStoryData, storyData)}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {storyData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTag(tag, storyData.tags, setStoryData, storyData)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCreateStoryPost} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Publishing...' : 'Publish Story'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;