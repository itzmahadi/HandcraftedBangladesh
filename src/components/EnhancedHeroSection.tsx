import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Heart, Star, Globe, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-artisans.jpg";

const EnhancedHeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Bangladeshi Artisans at Work"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary/5 rounded-lg rotate-45 animate-float"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Premium Badge */}
          <div className="inline-flex items-center bg-gradient-primary/10 border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-warm animate-fade-in">
            <Star className="w-4 h-4 mr-2 text-accent" />
            Celebrating Bengali Heritage Since 2024
            <Sparkles className="w-4 h-4 ml-2 text-accent" />
          </div>

          {/* Main Heading with gradient text */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-slide-up">
            <span className="text-foreground">Where </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Tradition</span>
            <br />
            <span className="text-foreground">Meets </span>
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Innovation</span>
          </h1>

          {/* Enhanced Description */}
          <div className="space-y-4 mb-8 animate-slide-up delay-200">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              A vibrant community platform connecting Bangladesh's most talented artisans with art enthusiasts worldwide.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Share stories, showcase masterpieces, and preserve our rich cultural heritage in the digital age.
            </p>
          </div>

          {/* Bengali Subtitle with enhanced styling */}
          <div className="mb-10 animate-slide-up delay-300">
            <p className="text-xl md:text-2xl text-primary font-medium border-l-4 border-primary pl-6">
              "হস্তশিল্পের মাধ্যমে বাংলার ঐতিহ্য জিইয়ে রাখুন"
            </p>
            <p className="text-sm text-muted-foreground mt-2 pl-6">
              Preserve Bengal's traditions through handcrafts
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-slide-up delay-400">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-10 py-6 shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/gallery')}
            >
              Explore Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="warm" 
              size="lg" 
              className="text-lg px-10 py-6 shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/artisans')}
            >
              <Users className="w-5 h-5 mr-2" />
              Meet Artisans
            </Button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 pt-10 border-t border-border/50 animate-slide-up delay-500">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Artisans</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2K+</div>
              <div className="text-sm text-muted-foreground">Masterpieces</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Districts</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Art Forms</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Awards</div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 animate-slide-up delay-600">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Global Reach</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span className="text-sm">Award Winning</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Community Driven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;