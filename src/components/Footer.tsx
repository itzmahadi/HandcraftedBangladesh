import { Heart, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Handcrafted Bangladesh</h3>
                <p className="text-sm text-muted-foreground">শিল্পকলার স্বর্গ</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Preserving and celebrating the rich heritage of Bangladeshi craftsmanship through 
              a vibrant community of talented artisans and art enthusiasts.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/gallery" className="hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="/artisans" className="hover:text-primary transition-colors">Artisans</a></li>
              <li><a href="/events" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="/stories" className="hover:text-primary transition-colors">Stories</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@handcraftedbd.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border py-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news about artisan stories and upcoming events
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button variant="hero">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 Handcrafted Bangladesh. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;