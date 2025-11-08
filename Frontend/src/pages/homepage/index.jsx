import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';
import NewsSection from './components/NewsSection';
import { loadFromFirebase, COLLECTIONS } from '../../../firebase';

const Homepage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      const result = await loadFromFirebase(COLLECTIONS.SETTINGS);
      
      if (result.success) {
        setSettings(result.data);
      } else {
        setError('Failed to load settings data');
        console.error('Error loading settings:', result.error);
      }
    } catch (err) {
      setError('Error fetching data from Firebase');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Default values in case Firebase data is not available
  const defaultSettings = {
    general: {
      siteName: 'Hi-Tec College',
      siteDescription: 'Leading institution for technical education and professional development',
      metaDescription: 'Hi-Tec College offers quality technical education with expert instructors and modern facilities.'
    },
    contact: {
      address: '7/2, waragashinna, Akurana-06, Kandy, Sri Lanka, 20850',
      verificationPhone: '0773066411',
      generalPhone: '0770044268',
      email: 'ainudeen@gmail.com',
      operatingHours: 'Mon-Sun: 9.00 A.M to 5.00 P.M',
      supportPhone: '+94770044268'
    },
    socialMedia: {
      facebook: 'https://web.facebook.com/hiteccollegelk',
      twitter: 'https://twitter.com/EduVision_Edu',
      linkedin: 'https://linkedin.com/company/eduvision-academy',
      instagram: 'https://instagram.com/eduvisionacademy',
      youtube: 'https://youtube.com/@ainudeenizzadeen8915?si=99dW00Y2gQL4y0mt'
    },
    footerLinks: {
      quickLinks: [
        { id: 1, name: 'All Courses', url: '/courses' },
        { id: 2, name: 'Our Faculty', url: '/faculty' },
        { id: 3, name: 'Facilities', url: '/facilities' },
        { id: 4, name: 'About Us', url: '/about' }
      ],
      supportLinks: [
        { id: 1, name: 'Contact Us', url: '/contact' },
        { id: 2, name: 'Help Center', url: '/help' },
        { id: 3, name: 'Student Portal', url: '/portal' },
        { id: 4, name: 'Career Services', url: '/careers' }
      ]
    },
    footer: {
      privacyPolicyUrl: '/privacy',
      termsOfServiceUrl: '/terms',
      accessibilityUrl: '/accessibility'
    },
    trustStats: {
      studentsCount: '50,000+',
      successRate: '95%',
      rating: '4.9/5',
      expertInstructors: '500+',
      coursesAvailable: '1,200+',
      jobPlacementRate: '95%',
      alumniNetwork: '50,000+'
    }
  };

  // Use Firebase data if available, otherwise use defaults
  const data = settings || defaultSettings;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">Error loading content</div>
          <button 
            onClick={fetchSettingsData}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.general.siteName} - Unlock Your Potential | Excellence in Education</title>
        <meta name="description" content={data.general.metaDescription} />
        <meta name="keywords" content="technical education, career development, professional courses, skill training, certification programs, Hi-Tec College" />
        <meta property="og:title" content={`${data.general.siteName} - Unlock Your Potential`} />
        <meta property="og:description" content={data.general.siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hiteccollege.lk" />
        <link rel="canonical" href="https://hiteccollege.lk" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />

        <main className="relative">
          {/* Hero Section - Multi-layered entry experience */}
          <HeroSection />
          <NewsSection />
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gradient font-accent">{data.general.siteName}</div>
                    <div className="text-xs text-muted-foreground tracking-wider">College</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.general.siteDescription}
                </p>
                <div className="flex space-x-4">
                  {data.socialMedia.facebook && (
                    <a 
                      href={data.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    >
                      {/* <span className="text-primary text-sm font-bold">f</span> */}
                    </a>
                  )}
                  {data.socialMedia.twitter && (
                    <a 
                      href={data.socialMedia.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    >
                      {/* <span className="text-primary text-sm font-bold">t</span> */}
                    </a>
                  )}
                  {data.socialMedia.linkedin && (
                    <a 
                      href={data.socialMedia.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    >
                      {/* <span className="text-primary text-sm font-bold">in</span> */}
                    </a>
                  )}
                  {data.socialMedia.instagram && (
                    <a 
                      href={data.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    >
                      {/* <span className="text-primary text-sm font-bold">ig</span> */}
                    </a>
                  )}
                  {data.socialMedia.youtube && (
                    <a 
                      href={data.socialMedia.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer"
                    >
                      {/* <span className="text-primary text-sm font-bold">yt</span> */}
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  {data.footerLinks.quickLinks.map((link) => (
                    <li key={link.id}>
                      <a 
                        href={link.url} 
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  {data.footerLinks.supportLinks.map((link) => (
                    <li key={link.id}>
                      <a 
                        href={link.url} 
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>📍 {data.contact.address}</div>
                  <div>📞 Verification: {data.contact.verificationPhone}</div>
                  <div>📞 General: {data.contact.generalPhone}</div>
                  <div>📞 Support: {data.contact.supportPhone}</div>
                  <div>✉️ {data.contact.email}</div>
                  <div>🕒 {data.contact.operatingHours}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {data.general.siteName}. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
                <a 
                  href={data.footer.privacyPolicyUrl} 
                  className="hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href={data.footer.termsOfServiceUrl} 
                  className="hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a 
                  href={data.footer.accessibilityUrl} 
                  className="hover:text-primary transition-colors duration-300"
                >
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;