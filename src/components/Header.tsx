import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Plus, FileText, Image as ImageIcon, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CreateContentModal from "./CreateContentModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HB</span>
            </div>
            <span className="font-bold text-xl text-foreground">Handcrafted Bangladesh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link to="/artisans" className="text-foreground hover:text-primary transition-colors">
              Artisans
            </Link>
            <Link to="/events" className="text-foreground hover:text-primary transition-colors">
              Events
            </Link>
            <Link to="/stories" className="text-foreground hover:text-primary transition-colors">
              Stories
            </Link>
          </div>

          {/* Create Content Dropdown */}
          {user && (
            <div className="hidden md:flex items-center space-x-2">
              <CreateContentModal type="story" onSuccess={() => window.location.reload()}>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Story
                </Button>
              </CreateContentModal>
              <CreateContentModal type="gallery" onSuccess={() => window.location.reload()}>
                <Button variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gallery
                </Button>
              </CreateContentModal>
              <CreateContentModal type="event" onSuccess={() => window.location.reload()}>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Event
                </Button>
              </CreateContentModal>
            </div>
          )}

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="warm" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/artisans" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Artisans
              </Link>
              <Link 
                to="/events" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/stories" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </Link>
              
              {user && (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Create Content</div>
                  <div className="space-y-2">
                    <CreateContentModal type="story" onSuccess={() => window.location.reload()}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Create Story
                      </Button>
                    </CreateContentModal>
                    <CreateContentModal type="gallery" onSuccess={() => window.location.reload()}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add to Gallery
                      </Button>
                    </CreateContentModal>
                    <CreateContentModal type="event" onSuccess={() => window.location.reload()}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Event
                      </Button>
                    </CreateContentModal>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="warm" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;