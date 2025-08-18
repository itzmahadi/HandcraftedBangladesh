import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-artisans.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-subtle overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Bangladeshi Artisans at Work"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Celebrating Bengali Heritage
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Where Tradition
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Meets </span>
            Innovation
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A vibrant community platform connecting Bangladesh's talented artisans with art lovers worldwide. 
            Share stories, showcase masterpieces, and preserve our rich cultural heritage.
          </p>

          {/* Bengali Subtitle */}
          <p className="text-lg text-primary font-medium mb-8">
            "হস্তশিল্পের মাধ্যমে বাংলার ঐতিহ্য জিইয়ে রাখুন"
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/gallery')}
            >
              Explore Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="warm" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/artisans')}
            >
              <Users className="w-5 h-5 mr-2" />
              Meet Artisans
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2K+</div>
              <div className="text-sm text-muted-foreground">Masterpieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15K+</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;