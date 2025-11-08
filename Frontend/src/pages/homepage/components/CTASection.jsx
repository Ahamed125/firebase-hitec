import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

// Import all Lucide React icons
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  Users, 
  Eye, 
  Layout, 
  Star, 
  TrendingUp,
  Book,
  Award,
  Phone,
  MapPin,
  FileText,
  Heart,
  CheckCircle,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Download,
  Shield,
  ArrowRight,
  BookOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const [homepageData, setHomepageData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Complete icon mapping for all Lucide React icons
  const iconComponents = {
    // Core icons used in CTASection
    Users: Users,
    GraduationCap: GraduationCap,
    BookOpen: BookOpen,
    TrendingUp: TrendingUp,
    MessageCircle: MessageCircle,
    Download: Download,
    Shield: Shield,
    Award: Award,
    Clock: Clock,
    Phone: Phone,
    Star: Star,
    ArrowRight: ArrowRight,
    
    // Additional icons for comprehensive coverage
    Book: Book,
    MapPin: MapPin,
    FileText: FileText,
    Heart: Heart,
    CheckCircle: CheckCircle,
    Briefcase: Briefcase,
    Calendar: Calendar,
    Layout: Layout,
    Eye: Eye,
    Edit2: Edit2,
    Trash2: Trash2,
    Plus: Plus,
    Save: Save,
    ImageIcon: ImageIcon,

    // Alternative naming conventions
    users: Users,
    'graduation-cap': GraduationCap,
    'book-open': BookOpen,
    'trending-up': TrendingUp,
    'message-circle': MessageCircle,
    download: Download,
    shield: Shield,
    award: Award,
    clock: Clock,
    phone: Phone,
    star: Star,
    'arrow-right': ArrowRight,
    book: Book,
    'map-pin': MapPin,
    'file-text': FileText,
    heart: Heart,
    'check-circle': CheckCircle,
    briefcase: Briefcase,
    calendar: Calendar,
    layout: Layout,
    eye: Eye,
    edit: Edit2,
    trash: Trash2,
    plus: Plus,
    save: Save,
    image: ImageIcon
  };

  // Default data in case Firebase is not available
  const defaultQuickStats = [
    { number: "50,000+", label: "Active Students", icon: "Users" },
    { number: "500+", label: "Expert Instructors", icon: "GraduationCap" },
    { number: "1,200+", label: "Courses Available", icon: "BookOpen" },
    { number: "95%", label: "Job Placement Rate", icon: "TrendingUp" }
  ];

  const defaultCTACards = [
    {
      title: "Start Learning Today",
      description: "Browse our comprehensive course catalog and begin your transformation journey",
      icon: "BookOpen",
      buttonText: "Explore Courses",
      buttonVariant: "default",
      path: "/courses",
      highlight: true
    },
    {
      title: "Schedule a Consultation",
      description: "Get personalized guidance from our education counselors",
      icon: "MessageCircle",
      buttonText: "Book Consultation",
      buttonVariant: "outline",
      path: "/contact",
      highlight: false
    },
    {
      title: "Download Brochure",
      description: "Get detailed information about our programs and facilities",
      icon: "Download",
      buttonText: "Get Brochure",
      buttonVariant: "ghost",
      path: "#",
      highlight: false
    }
  ];

  const defaultTrustIndicators = [
    { text: "Accredited Institution", icon: "Shield" },
    { text: "Industry Recognized", icon: "Award" },
    { text: "50,000+ Alumni Network", icon: "Users" },
    { text: "24/7 Support", icon: "Clock" }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load homepage data for CTA section and quick stats
      const homepageResult = await loadFromFirebase(COLLECTIONS.HOMEPAGE);
      const contactResult = await loadFromFirebase(COLLECTIONS.CONTACT);

      if (homepageResult.success) {
        setHomepageData(homepageResult.data);
      }

      if (contactResult.success) {
        setContactData(contactResult.data);
      }

    } catch (error) {
      console.error('Error loading CTA section data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Helper function to render icons properly
  const renderIcon = (iconName, size = 24, color = "currentColor") => {
    if (!iconName) {
      // Default fallback icon
      return <BookOpen size={size} color={color} />;
    }

    // Normalize icon name (handle different naming conventions)
    const normalizedIconName = iconName
      .replace(/\s+/g, '') // Remove spaces
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
      .toLowerCase();

    // Find the icon component
    const IconComponent = iconComponents[iconName] || 
                         iconComponents[normalizedIconName];

    if (IconComponent) {
      return <IconComponent size={size} color={color} />;
    }
    
    // Fallback to your Icon component if Lucide icon not found
    console.warn(`Icon not found: ${iconName}, using fallback`);
    return <Icon name={iconName} size={size} color={color} />;
  };

  // Get CTA header data from Firebase or use default
  const getCTAHeader = () => {
    if (homepageData?.cta?.header) {
      return homepageData.cta.header;
    }
    return {
      h1: "Your Success Journey Starts Here",
      h2: "Ready to Transform Your Future?",
      h3: "Join thousands of successful graduates who have transformed their careers through our world-class education programs. Take the first step towards unlocking your potential today."
    };
  };

  // Get CTA cards from Firebase or use default
  const getCTACards = () => {
    if (homepageData?.cta?.cards && homepageData.cta.cards.length > 0) {
      return homepageData.cta.cards.map((card, index) => ({
        id: card.id || index,
        title: card.h3 || card.title,
        description: card.description || "Discover our comprehensive programs and start your journey today.",
        icon: card.icon || "BookOpen",
        buttonText: card.buttonName || "Learn More",
        buttonVariant: index === 0 ? "default" : "outline",
        path: card.path || "/courses",
        highlight: index === 0
      }));
    }
    return defaultCTACards;
  };

  // Get quick stats from Firebase or use default
  const getQuickStats = () => {
    if (homepageData?.quickStats && homepageData.quickStats.length > 0) {
      return homepageData.quickStats.map((stat, index) => ({
        id: stat.id || index,
        number: stat.number || "0",
        label: stat.text || stat.label || "Statistic",
        icon: stat.icon || "Users"
      }));
    }
    return defaultQuickStats;
  };

  // Get trust indicators from Firebase or use default
  const getTrustIndicators = () => {
    // You can extend this to load from Firebase if needed
    return defaultTrustIndicators;
  };

  // Get phone number from contact data or use default
  const getPhoneNumber = () => {
    if (contactData?.methods) {
      const phoneMethod = contactData.methods.find(method => method.type === 'phone');
      return phoneMethod?.primary || "+94770044268";
    }
    return "+94770044268";
  };

  const ctaHeader = getCTAHeader();
  const ctaCards = getCTACards();
  const quickStats = getQuickStats();
  const trustIndicators = getTrustIndicators();
  const phoneNumber = getPhoneNumber();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/80">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div ref={contentRef} className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-white/50 rounded-full"></div>
            <span className="text-sm font-semibold text-white/90 tracking-wider uppercase">
              {ctaHeader.h2 || "Ready to Transform Your Future?"}
            </span>
            <div className="w-12 h-1 bg-white/50 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="font-accent">{ctaHeader.h1?.split(' ').slice(0, -2).join(' ') || "Your Success Journey"}</span>
            <br />
            <span className="text-accent">{ctaHeader.h1?.split(' ').slice(-2).join(' ') || "Starts Here"}</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
            {ctaHeader.h3 || "Join thousands of successful graduates who have transformed their careers through our world-class education programs. Take the first step towards unlocking your potential today."}
          </p>

          {/* CTA Options Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {ctaCards.map((option, index) => (
              <div
                key={option.id || index}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover-lift ${
                  option.highlight 
                    ? 'bg-white text-foreground border-white shadow-brand-lg' 
                    : 'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${
                    option.highlight ? 'bg-gradient-primary' : 'bg-white/20'
                  }`}>
                    {renderIcon(
                      option.icon, 
                      24, 
                      option.highlight ? "white" : "white"
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-bold ${
                    option.highlight ? 'text-foreground' : 'text-white'
                  }`}>
                    {option.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${
                    option.highlight ? 'text-muted-foreground' : 'text-white/80'
                  }`}>
                    {option.description}
                  </p>
                  
                  <Button
                    variant={option.highlight ? "default" : option.buttonVariant}
                    size="sm"
                    fullWidth
                    className={`${
                      option.highlight 
                        ? "bg-gradient-accent hover:bg-gradient-accent/90" 
                        : "border-white text-white hover:bg-white/10"
                    } transition-all duration-300`}
                    icon={renderIcon("ArrowRight", 16, option.highlight ? "white" : "white")}
                  >
                    {option.path.startsWith('/') ? (
                      <Link to={option.path} className="flex items-center justify-center w-full">
                        {option.buttonText}
                      </Link>
                    ) : (
                      <a href={option.path} className="flex items-center justify-center w-full">
                        {option.buttonText}
                      </a>
                    )}
                  </Button>
                </div>

                {option.highlight && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    {renderIcon("Star", 14, "white")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          {/* <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-2">
                {renderIcon(indicator.icon, 20, "currentColor")}
                <span className="text-sm font-medium">{indicator.text}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={stat.id || index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                {renderIcon(stat.icon, 24, "white")}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {stat.number}
              </div>
              <div className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
            {renderIcon("Phone", 16, "white")}
            <span className="text-white font-medium">Need help choosing? Call us at</span>
            <a 
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`} 
              className="text-accent font-bold hover:text-white transition-colors duration-300"
            >
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;