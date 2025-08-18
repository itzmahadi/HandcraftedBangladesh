import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X, Image as ImageIcon, FileText, Calendar as CalendarIconType } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface CreateContentModalProps {
  children: React.ReactNode;
  type: "story" | "gallery" | "event";
  onSuccess?: () => void;
}

const CreateContentModal = ({ children, type, onSuccess }: CreateContentModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
    category: "",
    tags: [] as string[],
    location: "",
    event_date: null as Date | null,
    max_participants: "",
    is_online: false,
  });
  const [tagInput, setTagInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = {
    story: ["Personal", "Traditional", "Modern", "Historical", "Educational"],
    gallery: ["Textiles", "Pottery", "Metalwork", "Woodcraft", "Jewelry", "Paintings"],
    event: ["Workshop", "Exhibition", "Market", "Festival", "Competition", "Learning"]
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadingImage(true);
    try {
      // For demo purposes, we'll use a placeholder service or local URL
      // In a real app, you'd upload to your storage service
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image_url: reader.result as string
        }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload failed:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create content",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error", 
        description: "Description is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Validation Error",
        description: "Category is required", 
        variant: "destructive"
      });
      return;
    }

    if (type === "story" && !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required for stories",
        variant: "destructive"
      });
      return;
    }

    if (type === "event") {
      if (!formData.location.trim()) {
        toast({
          title: "Validation Error",
          description: "Location is required for events",
          variant: "destructive"
        });
        return;
      }

      if (!formData.event_date) {
        toast({
          title: "Validation Error",
          description: "Event date is required",
          variant: "destructive"
        });
        return;
      }
    }

    setLoading(true);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Timeout",
        description: "Request took too long. Please try again.",
        variant: "destructive"
      });
    }, 30000); // 30 second timeout

    try {
      let table = "";
      let data: any = {
        user_id: user.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        tags: formData.tags,
      };

      // Handle image URL - if it's a data URL, skip it for now to avoid timeout
      if (formData.image_url && !formData.image_url.startsWith('data:')) {
        data.image_url = formData.image_url;
      } else if (formData.image_url && formData.image_url.startsWith('data:')) {
        // For now, skip large data URLs to prevent timeout
        toast({
          title: "Note",
          description: "Large images may cause delays. Consider using image URLs instead.",
        });
        data.image_url = null;
      } else {
        data.image_url = null;
      }

      switch (type) {
        case "story":
          table = "stories";
          data.content = formData.content.trim();
          break;
        case "gallery":
          table = "gallery_items";
          break;
        case "event":
          table = "events";
          data.location = formData.location.trim();
          data.event_date = formData.event_date?.toISOString();
          data.max_participants = formData.max_participants ? parseInt(formData.max_participants) : null;
          data.is_online = formData.is_online;
          break;
      }

      console.log(`Creating ${type}:`, { ...data, image_url: data.image_url ? 'present' : 'null' });
      
      const { error } = await supabase
        .from(table as any)
        .insert(data);

      if (error) {
        console.error(`Error creating ${type}:`, error);
        throw error;
      }

      clearTimeout(timeoutId);

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`,
      });

      setOpen(false);
      setFormData({
        title: "",
        description: "",
        content: "",
        image_url: "",
        category: "",
        tags: [],
        location: "",
        event_date: null,
        max_participants: "",
        is_online: false,
      });
      onSuccess?.();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: `Failed to create ${type}. ${error?.message || 'Please try again.'}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case "story": return <FileText className="w-4 h-4" />;
      case "gallery": return <ImageIcon className="w-4 h-4" />;
      case "event": return <CalendarIconType className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            Create {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={3}
            />
          </div>

          {type === "story" && (
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={4}
              />
            </div>
          )}

          <div>
            <Label>Image</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="Enter image URL or upload file"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  {uploadingImage ? "Uploading..." : "Upload"}
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {formData.image_url && (
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 bg-background/80"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category *" />
              </SelectTrigger>
              <SelectContent>
                {categories[type].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === "event" && (
            <>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label>Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.event_date ? format(formData.event_date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.event_date || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, event_date: date || null }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="max_participants">Max Participants (optional)</Label>
                <Input
                  id="max_participants"
                  type="number"
                  value={formData.max_participants}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
                  min="1"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContentModal;