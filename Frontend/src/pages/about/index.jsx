import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
// import MissionValues from './components/MissionValues';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Hi-Tec College | Professional Courses & Career-Focused Education</title>
        <meta name="description" content="Hi-Tec College offers professional courses in IT, Business, Design & Technology. Get industry-recognized certifications and practical skills for career success. Learn about our expert faculty and modern learning approach." />
        <meta name="keywords" content="professional courses, career-focused education, IT courses, business courses, design courses, technology training, industry certifications, practical skills, career development, professional training" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hi-Tec College" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About Hi-Tec College | Professional Courses & Career-Focused Education" />
        <meta property="og:description" content="Transform your career with Hi-Tec College's professional courses in IT, Business, Design & Technology. Industry-recognized certifications and practical skills training." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/about" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" />
        <meta property="og:site_name" content="Hi-Tec College" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Hi-Tec College | Professional Courses & Career-Focused Education" />
        <meta name="twitter:description" content="Professional courses in IT, Business, Design & Technology. Get industry-ready with Hi-Tec College's career-focused education programs." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" />
        
        {/* Additional Meta Tags */}
        <meta name="subject" content="Professional Education & Career Training" />
        <meta name="classification" content="Education, Professional Courses, Career Training" />
        <meta name="topic" content="Professional Courses and Career Development" />
        <meta name="summary" content="Hi-Tec College provides professional courses in IT, Business, Design and Technology with industry-recognized certifications and practical career training." />
        <meta name="url" content="/about" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Hi-Tec College",
              "description": "Professional courses in IT, Business, Design & Technology with industry-recognized certifications and practical career training",
              "url": "/about",
              "logo": "/logo.png",
              "sameAs": [
                "https://web.facebook.com/hiteccollegelk",
                "https://twitter.com/EduVision_Edu",
                "https://linkedin.com/company/eduvision-academy",
                "https://instagram.com/eduvisionacademy",
                "https://youtube.com/@ainudeenizzadeen8915"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+94770044268",
                "contactType": "Admissions and Support",
                "email": "ainudeen@gmail.com",
                "areaServed": "Sri Lanka",
                "availableLanguage": ["English", "Sinhala"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "7/2, Waragashinna, Akurana-06",
                "addressLocality": "Kandy",
                "postalCode": "20850",
                "addressCountry": "Sri Lanka"
              },
              "offers": {
                "@type": "Offer",
                "description": "Professional courses and career training programs"
              }
            }
          `}
        </script>
        
        <link rel="canonical" href="/about" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <HeroSection />
        {/* <MissionValues /> */}
      </main>
    </div>
  );
};

export default About;