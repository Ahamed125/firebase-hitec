import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

const LocationInfo = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data in case Firebase is not available
  const defaultCampusLocations = [
    {
      id: 1,
      name: "Main Campus",
      address: "7/2, Waragashinna, Akurana-06, Kandy, Sri Lanka, 20850",
      phone: "0770044268",
      email: "ainudeen@gmail.com",
      hours: {
        weekdays: "Monday - Friday: 9.00 A.M to 5.00 P.M",
        saturday: "Saturday: 9.00 A.M to 5.00 P.M",
        sunday: "Sunday: Closed"
      },
      services: [
        "Admissions Office",
        "Student Services",
        "Library",
        "Computer Labs",
        "Cafeteria"
      ],
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.444193312178!2d80.6174838!3d7.3654368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3431a62170153%3A0xbd83f5eb0d99c647!2sHi-Tec%20College%20Akurana!5e0!3m2!1sen!2slk!4v1730270000000!5m2!1sen!2slk",
      isPrimary: true
    }
  ];

  const defaultTransportationOptions = [
    {
      icon: "Car",
      title: "Driving",
      description: "Free parking available on campus",
      details: "500+ parking spaces, visitor parking near main entrance"
    },
    {
      icon: "Bus",
      title: "Public Transit",
      description: "Multiple bus routes serve our campus",
      details: "Routes 15, 23, 42 stop directly at campus entrance"
    },
    {
      icon: "Train",
      title: "Metro Rail",
      description: "Education Station - 5 minute walk",
      details: "Blue and Green lines, accessible platform"
    },
    {
      icon: "Bike",
      title: "Cycling",
      description: "Bike-friendly campus with secure storage",
      details: "Covered bike racks and repair station available"
    }
  ];

  useEffect(() => {
    loadLocationData();
  }, []);

  const loadLocationData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load contact data from Firebase (which includes campus locations)
      const contactResult = await loadFromFirebase(COLLECTIONS.CONTACT);

      if (contactResult.success && contactResult.data) {
        setContactData(contactResult.data);
      } else {
        // Use default data if Firebase data is not available
        console.warn('Using default location data:', contactResult.error);
      }

    } catch (err) {
      console.error('Error loading location data:', err);
      setError('Failed to load location information');
    } finally {
      setLoading(false);
    }
  };

  // Get campus locations from Firebase or use default
  const getCampusLocations = () => {
    if (contactData?.campusLocations && contactData.campusLocations.length > 0) {
      return contactData.campusLocations.map((campus, index) => ({
        id: campus.id || index + 1,
        name: campus.name || "Campus Location",
        address: campus.address || "Address not specified",
        phone: campus.phone || "Not available",
        email: campus.email || "Not available",
        hours: {
          weekdays: campus.hours?.weekdays || "Monday - Friday: 9.00 A.M to 5.00 P.M",
          saturday: campus.hours?.saturday || "Saturday: 9.00 A.M to 5.00 P.M",
          sunday: campus.hours?.sunday || "Sunday: Closed"
        },
        services: campus.services || ["Admissions Office", "Student Services"],
        mapEmbedUrl: campus.mapEmbedUrl || defaultCampusLocations[0].mapEmbedUrl,
        isPrimary: campus.isPrimary || false
      }));
    }
    return defaultCampusLocations;
  };

  // Get transportation options from Firebase or use default
  const getTransportationOptions = () => {
    if (contactData?.transportationOptions && contactData.transportationOptions.length > 0) {
      return contactData.transportationOptions.map((transport, index) => ({
        icon: transport.icon || "Car",
        title: transport.title || "Transportation",
        description: transport.description || "Transportation option available",
        details: transport.details || "Details not available"
      }));
    }
    return defaultTransportationOptions;
  };

  const handleGetDirections = (campus) => {
    const encodedAddress = encodeURIComponent(campus.address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleVirtualTour = (campus) => {
    // You can implement virtual tour functionality here
    console.log('Virtual tour for:', campus.name);
    // This could open a modal with 360° images or link to a virtual tour platform
    alert(`Virtual tour for ${campus.name} would open here.`);
  };

  const campusLocations = getCampusLocations();
  const transportationOptions = getTransportationOptions();

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading location information...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <Icon name="AlertCircle" size={48} className="mx-auto mb-4" />
            <p>{error}</p>
            <Button 
              onClick={loadLocationData} 
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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="MapPin" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Visit Us</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Campus Locations & Directions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We have multiple convenient locations to serve you better. Visit us in person or take a virtual tour.
          </p>
        </div>

        {/* Campus Locations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {campusLocations.map((campus) => (
            <div key={campus.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Map */}
              <div className="h-64 bg-muted relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={campus.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={campus.mapEmbedUrl}
                  className="border-0"
                />
                {campus.isPrimary && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Main Campus
                  </div>
                )}
              </div>

              {/* Campus Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">{campus.name}</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Address</p>
                      <p className="text-muted-foreground text-sm">{campus.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Phone" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Phone</p>
                      <p className="text-muted-foreground text-sm">{campus.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Mail" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">{campus.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Clock" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-card-foreground font-medium">Hours</p>
                      <div className="text-muted-foreground text-sm space-y-1">
                        <p>{campus.hours.weekdays}</p>
                        <p>{campus.hours.saturday}</p>
                        <p>{campus.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <p className="text-card-foreground font-medium mb-2">Available Services</p>
                  <div className="flex flex-wrap gap-2">
                    {campus.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => handleGetDirections(campus)}
                  >
                    <Icon name="Navigation" size={16} className="mr-2" />
                    Get Directions
                  </Button>
          
           
                </div>
              </div>
            </div>
          ))}
        </div>

    

        

      </div>
    </section>
  );
};

export default LocationInfo;