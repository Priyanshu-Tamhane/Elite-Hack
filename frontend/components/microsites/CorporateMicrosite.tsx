import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Building,
  Target,
  Users2,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Mic,
  Coffee,
  Wifi,
  Car,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

interface CorporateMicrositeProps {
  event: {
    title: string;
    description: string;
    date: string | Date;
    location: string;
    bannerUrl?: string;
    category: string;
    maxParticipants: number;
    registeredCount: number;
    organizer: {
      name: string;
      company?: string;
      logo?: string;
    };
    corporateDetails?: {
      companyMission?: string;
      eventObjectives?: string[] | string;
      targetAudience?: string;
      dressCode?: string;
      parkingInfo?: string;
      contactPerson?: string;
      contactEmail?: string;
    };
    branding?: {
      primaryColor?: string;
      secondaryColor?: string;
      logoUrl?: string;
    };
  };
  onRegister: () => void;
}

export default function CorporateMicrosite({ event, onRegister }: CorporateMicrositeProps) {
  const primaryColor = event.branding?.primaryColor || '#1e40af';
  const secondaryColor = event.branding?.secondaryColor || '#3b82f6';

  // Parse date if it's a string
  const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date;

  // Helper function to parse objectives
  const getObjectives = () => {
    if (!event.corporateDetails?.eventObjectives) return [];
    if (typeof event.corporateDetails.eventObjectives === 'string') {
      return event.corporateDetails.eventObjectives.split('\n').filter(obj => obj.trim());
    }
    return event.corporateDetails.eventObjectives;
  };

  // Sample speakers for demo
  const speakers = [
    { name: "Dr. Sarah Chen", title: "CTO, TechCorp", image: "https://via.placeholder.com/150x150/1e40af/white?text=SC" },
    { name: "Marcus Rodriguez", title: "VP Innovation, GlobalTech", image: "https://via.placeholder.com/150x150/3b82f6/white?text=MR" },
    { name: "Dr. Emily Watson", title: "AI Research Director, FutureLabs", image: "https://via.placeholder.com/150x150/1e40af/white?text=EW" }
  ];

  // Sample agenda
  const agenda = [
    { time: "9:00 AM", title: "Registration & Networking Breakfast", type: "networking" },
    { time: "10:00 AM", title: "Opening Keynote: Future of Technology", type: "keynote" },
    { time: "11:30 AM", title: "Panel: AI & Machine Learning Trends", type: "panel" },
    { time: "1:00 PM", title: "Lunch & Networking", type: "networking" },
    { time: "2:30 PM", title: "Workshop: Building Scalable Solutions", type: "workshop" },
    { time: "4:00 PM", title: "Closing Ceremony & Awards", type: "ceremony" }
  ];

  // Sample testimonials
  const testimonials = [
    { name: "John Smith", company: "InnovateCorp", text: "This conference exceeded all expectations. The insights were invaluable." },
    { name: "Lisa Chen", company: "TechStart", text: "Incredible networking opportunities and cutting-edge content." },
    { name: "David Kumar", company: "GlobalTech", text: "Best corporate event I've attended. Highly recommended!" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header with Glass Effect */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {(event.branding?.logoUrl || event.organizer.logo) && (
                <div className="relative">
                  <img
                    src={event.branding?.logoUrl || event.organizer.logo}
                    alt="Company Logo"
                    className="h-14 w-auto drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20"></div>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {event.organizer.company || event.organizer.name}
                </h1>
                <p className="text-sm text-gray-500 font-medium">Premium Corporate Events</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                <Star className="w-3 h-3 mr-1" />
                Premium Event
              </Badge>
              <Button
                onClick={onRegister}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Advanced Design */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Award className="w-5 h-5 text-yellow-300" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 font-medium">
                {event.category}
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {event.title.split(' ').map((word, index) => (
                <span key={index} className="inline-block animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {event.description}
            </p>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                <Calendar className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-blue-200 text-sm">Conference Day</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                <MapPin className="w-8 h-8 text-green-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {event.location.split(',')[0]}
                </div>
                <div className="text-blue-200 text-sm">Venue</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                <Users className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {event.registeredCount}/{event.maxParticipants}
                </div>
                <div className="text-blue-200 text-sm">Attendees</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onRegister}
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Register Now - Limited Seats
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
              >
                View Agenda
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Attend?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join industry leaders and innovators for an unforgettable experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Speakers</h3>
              <p className="text-gray-600">Learn from industry pioneers and thought leaders shaping the future</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Networking</h3>
              <p className="text-gray-600">Connect with peers, partners, and potential collaborators</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Experience</h3>
              <p className="text-gray-600">World-class venue, catering, and professional organization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Speakers</h2>
            <p className="text-xl text-gray-600">Meet the visionaries shaping our industry</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{speaker.name}</h3>
                    <p className="text-blue-200 text-sm">{speaker.title}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">Renowned expert in technology innovation and digital transformation.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Agenda */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Agenda</h2>
            <p className="text-xl text-gray-600">A full day of insights, networking, and innovation</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {agenda.map((item, index) => (
              <div key={index} className="flex items-center space-x-6 mb-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    item.type === 'keynote' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'panel' ? 'bg-purple-100 text-purple-600' :
                    item.type === 'workshop' ? 'bg-green-100 text-green-600' :
                    item.type === 'networking' ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium text-gray-500 mb-1">{item.time}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <Badge variant="outline" className="capitalize">
                  {item.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company & Event Details */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Company Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About {event.organizer.company || event.organizer.name}</h2>
              <div className="space-y-6">
                {event.corporateDetails?.companyMission && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-900">
                        <Building className="w-6 h-6 mr-3" />
                        Our Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{event.corporateDetails.companyMission}</p>
                    </CardContent>
                  </Card>
                )}

                {getObjectives().length > 0 && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-900">
                        <Target className="w-6 h-6 mr-3" />
                        Event Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {getObjectives().map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {event.corporateDetails?.targetAudience && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-900">
                        <Users2 className="w-6 h-6 mr-3" />
                        Target Audience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{event.corporateDetails.targetAudience}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Event Logistics */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Event Information</h2>
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <Clock className="w-6 h-6 mr-3" />
                      Schedule & Venue
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3 text-green-500" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                  </CardContent>
                </Card>

                {event.corporateDetails?.dressCode && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Dress Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{event.corporateDetails.dressCode}</p>
                    </CardContent>
                  </Card>
                )}

                {event.corporateDetails?.parkingInfo && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-900">
                        <Car className="w-5 h-5 mr-2" />
                        Parking Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{event.corporateDetails.parkingInfo}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Venue Amenities</h2>
            <p className="text-xl text-gray-600">Everything you need for a productive and comfortable experience</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, title: "High-Speed WiFi", desc: "Complimentary internet access throughout the venue" },
              { icon: Coffee, title: "Premium Catering", desc: "Gourmet meals and refreshments all day" },
              { icon: Car, title: "Valet Parking", desc: "Convenient parking with professional valet service" },
              { icon: Users, title: "Networking Spaces", desc: "Dedicated areas for informal conversations" }
            ].map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm">{amenity.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Attendees Say</h2>
            <p className="text-xl text-gray-600">Hear from past participants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      {(event.corporateDetails?.contactPerson || event.corporateDetails?.contactEmail) && (
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-300">Have questions? We're here to help</p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  {event.corporateDetails?.contactPerson && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.corporateDetails.contactPerson}</h3>
                      <p className="text-blue-300">Event Coordinator</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {event.corporateDetails?.contactEmail && (
                      <div className="flex items-center justify-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-300" />
                        <a
                          href={`mailto:${event.corporateDetails.contactEmail}`}
                          className="text-white hover:text-blue-300 transition-colors font-medium"
                        >
                          {event.corporateDetails.contactEmail}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-300" />
                      <span className="text-white">+1 (555) 123-4567</span>
                    </div>

                    <div className="flex items-center justify-center space-x-3">
                      <Globe className="w-5 h-5 text-blue-300" />
                      <span className="text-white">www.techcorp-events.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable day of innovation, networking, and professional growth
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={onRegister}
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 px-10 py-4 text-lg font-semibold"
            >
              <Award className="w-5 h-5 mr-2" />
              Secure Your Spot Now
            </Button>
            <div className="text-blue-200">
              <span className="font-semibold">{event.maxParticipants - event.registeredCount}</span> seats remaining
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Premium Networking
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Expert Speakers
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Gourmet Catering
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Certificate of Attendance
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
