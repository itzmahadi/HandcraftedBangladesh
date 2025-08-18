import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Award } from "lucide-react";

const CommunitySection = () => {
  const artisans = [
    {
      id: 1,
      name: "Rashida Begum",
      craft: "Kantha Embroidery",
      location: "Rajshahi",
      experience: "25 years",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialties: ["Traditional Patterns", "Cotton Work"],
      rating: 4.9
    },
    {
      id: 2,
      name: "Mohammad Rahman",
      craft: "Jamdani Weaving",
      location: "Dhaka",
      experience: "30 years",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specialties: ["Geometric Patterns", "Silk Work"],
      rating: 4.8
    },
    {
      id: 3,
      name: "Salma Khatun",
      craft: "Pottery",
      location: "Bogura",
      experience: "20 years",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      specialties: ["Terracotta", "Decorative Vessels"],
      rating: 4.7
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Traditional Craft Fair 2024",
      date: "March 15-17, 2024",
      location: "Dhaka Exhibition Center",
      participants: 150,
      type: "Exhibition"
    },
    {
      id: 2,
      title: "Kantha Workshop for Beginners",
      date: "March 22, 2024",
      location: "Community Center, Rajshahi",
      participants: 25,
      type: "Workshop"
    },
    {
      id: 3,
      title: "Digital Photography for Artisans",
      date: "April 5, 2024",
      location: "Online Event",
      participants: 100,
      type: "Training"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Featured Artisans */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet Our Master Artisans
              </h2>
              <p className="text-muted-foreground">
                Connect with skilled craftspeople preserving Bangladesh's cultural heritage
              </p>
            </div>

            <div className="space-y-4">
              {artisans.map((artisan) => (
                <Card key={artisan.id} className="hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={artisan.avatar} alt={artisan.name} />
                        <AvatarFallback>{artisan.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{artisan.name}</h3>
                          <div className="flex items-center text-sm text-accent-foreground">
                            <Award className="w-4 h-4 mr-1" />
                            {artisan.rating}
                          </div>
                        </div>
                        
                        <p className="text-primary font-medium mb-2">{artisan.craft}</p>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {artisan.location} • {artisan.experience} experience
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {artisan.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="warm">
                <Users className="w-4 h-4 mr-2" />
                View All Artisans
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Join workshops, exhibitions, and cultural celebrations
              </p>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-elegant transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} participants
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="hero">
                <Calendar className="w-4 h-4 mr-2" />
                View All Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;