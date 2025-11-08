import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

const ContactMethods = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data in case Firebase is not available
  const defaultContactData = {
    methods: [
      {
        id: 1,
        icon: "Phone",
        title: "Call Us Directly",
        description: "Speak with our admissions counselors for immediate assistance",
        primary: "+94770044268",
        secondary: "0773066411",
        hours: "Mon-Fri: (9AM-5PM)",
        action: "Call Now",
        color: "bg-blue-50 border-blue-200 text-blue-700",
        actionType: "phone"
      },
      {
        id: 2,
        icon: "Mail",
        title: "Email Support",
        description: "Get detailed responses to your questions within 24 hours",
        primary: "ainudeen@gmail.com",
        hours: "Response within 24 hours",
        action: "Send Email",
        color: "bg-green-50 border-green-200 text-green-700",
        actionType: "email"
      },
      {
        id: 3,
        icon: "MapPin",
        title: "Visit Campus",
        description: "Schedule a campus tour and meet our team in person",
        primary: "7/2, Waragashinna, Akurana-06, Kandy",
        hours: "Mon-Sat: 9AM-5PM",
        action: "Get Directions",
        color: "bg-purple-50 border-purple-200 text-purple-700",
        actionType: "location"
      },
      {
        id: 4,
        icon: "MessageCircle",
        title: "Live Chat",
        description: "Instant messaging support during business hours",
        primary: "Available on website",
        hours: "Mon-Fri: 9AM-5PM",
        action: "Start Chat",
        color: "bg-orange-50 border-orange-200 text-orange-700",
        actionType: "chat"
      }
    ],
    socialChannels: [
      { 
        name: "Facebook", 
        icon: "Facebook", 
        handle: "@Hi-Tec College", 
        color: "text-blue-600",
        url: "https://web.facebook.com/hiteccollegelk" 
      },
      { 
        name: "Twitter", 
        icon: "Twitter", 
        handle: "@EduVision_Edu", 
        color: "text-blue-400",
        url: "https://twitter.com/hiteccollegelk" 
      },
      { 
        name: "LinkedIn", 
        icon: "Linkedin", 
        handle: "EduVision Academy", 
        color: "text-blue-700",
        url: "https://linkedin.com/company/hiteccollegelk" 
      },
      { 
        name: "Instagram", 
        icon: "Instagram", 
        handle: "@eduvisionacademy", 
        color: "text-pink-600",
        url: "https://instagram.com/hiteccollegelk" 
      },
      { 
        name: "YouTube", 
        icon: "Youtube", 
        handle: "@Hi-Tec College", 
        color: "text-red-600",
        url: "https://youtube.com/@ainudeenizzadeen8915?si=99dW00Y2gQL4y0mt" 
      }
    ]
  };

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load contact data from Firebase
      const contactResult = await loadFromFirebase(COLLECTIONS.CONTACT);

      if (contactResult.success && contactResult.data) {
        setContactData(contactResult.data);
      } else {
        // Use default data if Firebase data is not available
        setContactData(defaultContactData);
        console.warn('Using default contact data:', contactResult.error);
      }

    } catch (err) {
      console.error('Error loading contact data:', err);
      setError('Failed to load contact information');
      setContactData(defaultContactData);
    } finally {
      setLoading(false);
    }
  };

  // Get contact methods from Firebase or use default
  const getContactMethods = () => {
    if (contactData?.methods && contactData.methods.length > 0) {
      return contactData.methods.map((method, index) => ({
        id: method.id || index + 1,
        icon: method.icon || "Phone",
        title: method.title || "Contact Method",
        description: method.description || "Get in touch with us",
        primary: method.primary || "Not specified",
        secondary: method.secondary || "",
        hours: method.hours || "Mon-Fri: 9AM-5PM",
        action: method.action || "Contact",
        color: method.color || "bg-blue-50 border-blue-200 text-blue-700",
        actionType: method.actionType || "phone"
      }));
    }
    return defaultContactData.methods;
  };

  // Get social channels from Firebase or use default
  const getSocialChannels = () => {
    if (contactData?.socialChannels && contactData.socialChannels.length > 0) {
      return contactData.socialChannels.map((social, index) => ({
        name: social.name || "Social Media",
        icon: social.icon || "Globe",
        handle: social.handle || "@handle",
        color: social.color || "text-gray-600",
        url: social.url || "#"
      }));
    }
    return defaultContactData.socialChannels;
  };

  // Handle contact method actions
  const handleContactAction = (method) => {
    switch (method.actionType) {
      case 'phone':
        window.open(`tel:${method.primary}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${method.primary}`, '_self');
        break;
      case 'location':
        // Open Google Maps with the address
        const encodedAddress = encodeURIComponent(method.primary);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank', 'noopener,noreferrer');
        break;
      case 'chat':
        // For live chat, you might want to trigger your chat widget
        console.log('Live chat initiated');
        // Implement your chat widget trigger here
        break;
      default:
        console.log('Contact action:', method.actionType);
        break;
    }
  };

  // Handle social media navigation
  const handleSocialClick = (social) => {
    if (social.url && social.url !== '#') {
      window.open(social.url, '_blank', 'noopener,noreferrer');
    }
  };

  const contactMethods = getContactMethods();
  const socialChannels = getSocialChannels();

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <Icon name="AlertCircle" size={48} className="mx-auto mb-4" />
            <p>{error}</p>
            <Button 
              onClick={loadContactData} 
              variant="outline" 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="Headphones" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Multiple Ways to Connect</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Preferred Contact Method
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in making communication easy and accessible. Reach out through any channel that works best for you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods?.map((method) => (
            <div 
              key={method?.id} 
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover-lift group"
            >
              <div className={`w-12 h-12 rounded-lg ${method?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={method?.icon} size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{method?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{method?.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium text-card-foreground">{method?.primary}</div>
                {method?.secondary && (
                  <div className="text-sm text-muted-foreground">{method?.secondary}</div>
                )}
                <div className="text-xs text-muted-foreground flex items-center">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {method?.hours}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                onClick={() => handleContactAction(method)}
                className="group-hover:bg-primary group-hover:text-white transition-all duration-300"
              >
                {method?.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="Share2" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Stay Connected</span>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-6">Follow Us on Social Media</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news, events, and announcements from Hi-Tec College.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialChannels?.map((social) => (
              <div 
                key={social?.name} 
                className="flex items-center space-x-3 bg-card rounded-lg px-4 py-3 border border-border hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 hover:bg-primary/5 min-w-[160px]"
                onClick={() => handleSocialClick(social)}
              >
                <Icon name={social?.icon} size={20} className={social?.color} />
                <div className="text-left">
                  <div className="text-sm font-medium text-card-foreground">{social?.name}</div>
                  <div className="text-xs text-muted-foreground">{social?.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Need immediate assistance? Our support team is available during business hours to help you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;