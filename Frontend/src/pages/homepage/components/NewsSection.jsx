import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

// Import Lucide React icons
import { 
  Calendar, 
  Users, 
  Clock,
  ArrowRight,
  X,
  MapPin
} from 'lucide-react';

gsap?.registerPlugin(ScrollTrigger);

const NewsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [homepageData, setHomepageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Default events in case Firebase is not available
  const defaultEvents = [
    {
      id: 1,
      title: "Virtual Career Fair 2024",
      date: "2025-11-15",
      time: "10:00 AM - 4:00 PM EST",
      type: "Virtual Event",
      description: "Connect with top employers and explore career opportunities across various industries. This virtual event brings together leading companies and talented professionals in an interactive online environment.",
      registrations: 2847,
      image: "https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a",
      imageAlt: "Virtual career fair with professionals networking online",
      location: "Online Platform",
      agenda: [
        "10:00 AM - Opening Keynote",
        "11:00 AM - Company Presentations",
        "1:00 PM - Networking Sessions",
        "3:00 PM - Career Workshops"
      ]
    },
    {
      id: 2,
      title: "AI in Education Webinar",
      date: "2025-11-08",
      time: "2:00 PM - 3:30 PM EST",
      type: "Webinar",
      description: "Learn how artificial intelligence is transforming modern education and career development. Discover the latest trends and tools that are shaping the future of learning.",
      registrations: 1523,
      image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4",
      imageAlt: "AI technology presentation in educational setting",
      location: "Zoom Webinar",
      agenda: [
        "2:00 PM - Introduction to AI in Education",
        "2:30 PM - Case Studies & Best Practices",
        "3:00 PM - Q&A Session"
      ]
    },
    {
      id: 3,
      title: "Campus Open House",
      date: "2025-11-22",
      time: "9:00 AM - 3:00 PM EST",
      type: "In-Person",
      description: "Experience our campus facilities and meet with faculty and current students. Tour our state-of-the-art labs, libraries, and student centers.",
      registrations: 892,
      image: "https://images.unsplash.com/photo-1562774053-701939374585",
      imageAlt: "Modern university campus building with students",
      location: "Main Campus, Building A",
      agenda: [
        "9:00 AM - Welcome Session",
        "10:00 AM - Campus Tours",
        "1:00 PM - Faculty Meet & Greet",
        "2:00 PM - Student Panel Discussion"
      ]
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load homepage data for news section
      const homepageResult = await loadFromFirebase(COLLECTIONS.HOMEPAGE);

      if (homepageResult.success) {
        setHomepageData(homepageResult.data);
      }

    } catch (error) {
      console.error('Error loading news section data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get events from Firebase or use default
  const getEvents = () => {
    if (homepageData?.news?.events && homepageData.news.events.length > 0) {
      return homepageData.news.events.map((event, index) => ({
        id: event.id || index + 1,
        title: event.title || "Upcoming Event",
        date: event.date || new Date().toISOString().split('T')[0],
        time: event.time || "10:00 AM - 12:00 PM",
        type: event.type || "Virtual Event",
        description: event.description || "Join us for this exciting event designed to enhance your learning experience.",
        registrations: event.registrations || 0,
        image: event.image || "https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a",
        imageAlt: event.imageAlt || "Event image",
        location: event.location || "Online",
        agenda: event.agenda || ["Full event details available upon registration"]
      }));
    }
    return defaultEvents;
  };

  // Get header data from Firebase or use default
  const getHeaderData = () => {
    if (homepageData?.news?.header) {
      return {
        title: homepageData.news.header.title || "Join Our Events",
        subtitle: homepageData.news.header.subtitle || "Upcoming Events & Announcements",
        description: homepageData.news.header.description || "Discover upcoming workshops, webinars, and networking events designed to enhance your learning experience and career growth."
      };
    }
    return {
      title: "Join Our Events",
      subtitle: "Upcoming Events & Announcements",
      description: "Discover upcoming workshops, webinars, and networking events designed to enhance your learning experience and career growth."
    };
  };

  const events = getEvents();
  const headerData = getHeaderData();

  useEffect(() => {
    if (loading) return;

    const ctx = gsap?.context(() => {
      gsap?.fromTo(titleRef?.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef?.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      cardsRef?.current?.forEach((card, index) => {
        if (card) {
          gsap?.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, [loading]);

  const addToRefs = (el) => {
    if (el && !cardsRef?.current?.includes(el)) {
      cardsRef?.current?.push(el);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Virtual Event':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Webinar':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In-Person':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Hybrid Event':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeEventModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeEventModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                {headerData.subtitle}
              </span>
              <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient font-accent">{headerData.title}</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {headerData.description}
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event, index) => (
              <div
                key={event?.id}
                ref={addToRefs}
                className="bg-card rounded-2xl overflow-hidden shadow-brand-md border border-border hover:shadow-brand-lg transition-all duration-300 hover-lift group"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={event?.image}
                    alt={event?.imageAlt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getEventTypeColor(event?.type)}`}>
                      {event?.type}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{formatDate(event?.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} className="text-primary" />
                      <span>{event?.registrations} registered</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-2">
                    {event?.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    {event?.description}
                  </p>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary" />
                    <span>{event?.time}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-primary" />
                    <span>{event?.location}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                    onClick={() => openEventModal(event)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-gradient-primary text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              onClick={() => setIsModalOpen(true)}
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Modal for All Events */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-foreground">All Upcoming Events</h2>
              <button
                onClick={closeEventModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users size={16} />
                          <span>{event.registrations} registered</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Event Agenda:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {event.agenda.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      onClick={() => {
                        closeEventModal();
                        openEventModal(event);
                      }}
                    >
                      View Full Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={closeEventModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal for Single Event Details */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-foreground">{selectedEvent.title}</h2>
              <button
                onClick={closeEventModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getEventTypeColor(selectedEvent.type)}`}>
                    {selectedEvent.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {selectedEvent.registrations} people registered
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedEvent.image}
                      alt={selectedEvent.imageAlt}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a';
                      }}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Date & Time</p>
                          <p className="text-muted-foreground">{formatDate(selectedEvent.date)}</p>
                          <p className="text-muted-foreground">{selectedEvent.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Location</p>
                          <p className="text-muted-foreground">{selectedEvent.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Event Description</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Event Agenda</h4>
                  <ul className="space-y-2">
                    {selectedEvent.agenda.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={closeEventModal}>
                Close
              </Button>
       
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsSection;