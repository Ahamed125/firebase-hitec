import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

// Import Lucide React icons
import { 
  Users, 
  Award, 
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const [homepageData, setHomepageData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default hero slides in case Firebase is not available
  const defaultHeroSlides = [
    {
      id: 1,
      h1: "Unlock Your Potential",
      h2: "Transform your future with world-class education",
      h3: "Join thousands of successful graduates who have accelerated their careers through our innovative programs designed for the modern learner.",
      image: "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb",
      imageAlt: "Diverse group of students collaborating on laptops in modern classroom with natural lighting",
    },
    {
      id: 2,
      h1: "Excellence in Education",
      h2: "Learn from industry experts and world-renowned faculty members",
      h3: "Our distinguished faculty brings real-world experience and academic excellence to create transformative learning experiences that prepare you for success.",
      image: "https://images.unsplash.com/photo-1701777508358-833de8c614ec",
      imageAlt: "Professional instructor teaching engaged students in modern lecture hall with interactive whiteboard",
    },
    {
      id: 3,
      h1: "Your Success is Our Mission",
      h2: "Join a community of achievers and unlock limitless possibilities",
      h3: "With 95% job placement rate and alumni working at top companies worldwide, we're committed to your success every step of the way.",
      image: "https://images.unsplash.com/photo-1665567031505-49c536110178",
      imageAlt: "Happy graduates in caps and gowns celebrating at outdoor graduation ceremony with university building in background",
    }
  ];

  // Default trust stats in case Firebase is not available
  const defaultTrustStats = {
    studentsCount: '50,000+',
    successRate: '95%',
    rating: '4.9/5',
    expertInstructors: '500+',
    coursesAvailable: '1,200+',
    jobPlacementRate: '95%',
    alumniNetwork: '50,000+'
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load homepage data for hero section
      const homepageResult = await loadFromFirebase(COLLECTIONS.HOMEPAGE);
      // Load settings data for trust stats
      const settingsResult = await loadFromFirebase(COLLECTIONS.SETTINGS);

      if (homepageResult.success) {
        setHomepageData(homepageResult.data);
      }

      if (settingsResult.success) {
        setSettingsData(settingsResult.data);
      }

    } catch (error) {
      console.error('Error loading hero section data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get hero slides from Firebase or use default
  const getHeroSlides = () => {
    if (homepageData?.hero?.slides && homepageData.hero.slides.length > 0) {
      return homepageData.hero.slides.map((slide, index) => ({
        id: slide.id || index + 1,
        h1: slide.h1 || "Unlock Your Potential",
        h2: slide.h2 || "Transform your future with world-class education",
        h3: slide.h3 || "Join thousands of successful graduates who have accelerated their careers through our innovative programs.",
        image: slide.image || "https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb",
        imageAlt: slide.imageAlt || "Students collaborating in modern classroom"
      }));
    }
    return defaultHeroSlides;
  };

  // Get trust stats from Firebase or use default
  const getTrustStats = () => {
    if (settingsData?.trustStats) {
      return settingsData.trustStats;
    }
    return defaultTrustStats;
  };

  const heroSlides = getHeroSlides();
  const trustStats = getTrustStats();

  useEffect(() => {
    if (loading) return;

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, loading, heroSlides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading hero section...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Transform Your Future
                </span>
              </div>
              
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-gradient font-accent">{currentSlideData.h1}</span>
              </h1>
              
              <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                {currentSlideData.h2}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {currentSlideData.h3}
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                icon={<ChevronRight size={20} />}
                iconPosition="right"
              >
                <Link to="/courses">
                  Explore Programs
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Link to="/contact">
                  Get More Info
                </Link>
              </Button>
            </div>

            {/* Trust Indicators - Now fetched from Firebase */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <Users size={20} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">{trustStats.studentsCount} Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award size={20} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">{trustStats.successRate} Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={20} className="text-accent" />
                <span className="text-sm font-semibold text-foreground">{trustStats.rating} Rating</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.imageAlt}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
                aria-label="Next slide"
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;