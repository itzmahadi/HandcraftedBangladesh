import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const FeaturedWorks = () => {
  const { items: galleryItems, likeItem } = useGallery();
  const { user } = useAuth();
  
  // Get featured works (first 4 items from gallery)
  const works = galleryItems.slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Masterpieces
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the finest creations from our talented artisan community
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work) => (
            <Card key={work.id} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <Link to="/gallery">
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white hover:bg-white/20 w-8 h-8"
                            onClick={() => likeItem(work.id)}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-8 h-8">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {work.profiles?.full_name || 'Unknown Artist'} • {work.profiles?.location || 'Unknown Location'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {work.description}
                  </p>
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        {work.likes_count}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {work.comments_count}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link to="/gallery">
            <Button variant="warm" size="lg">
              Explore All Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;