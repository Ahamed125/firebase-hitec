import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import ConsultationBooking from './components/ConsultationBooking';
import LocationInfo from './components/LocationInfo';
import FAQ from '../FAQ';

const Contact = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - Hi-Tec College | Get in Touch Today</title>
        <meta 
          name="description" 
          content="Contact Hi-Tec College or admissions, program information, and student support. Multiple ways to connect including phone, email, live chat, and campus visits. Schedule your free consultation today." 
        />
        <meta name="keywords" content="contact EduVision Academy, admissions office, student support, campus visit, consultation booking, education inquiry" />
        <meta property="og:title" content="Contact Us - Hi-Tec College" />
        <meta property="og:description" content="Get in touch with EduVision Academy. Multiple contact methods, free consultations, and personalized support for your educational journey." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://eduvision.edu/contact" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          {/* <ContactHero /> */}
          
          {/* Contact Methods */}
          <ContactMethods />
          
          {/* Contact Form */}
          <ContactForm />
          
          {/* Consultation Booking */}
          {/* <ConsultationBooking /> */}
          
          {/* Location Information */}
          <LocationInfo />
          
          {/* FAQ Section */}
          {/* <FAQ /> */}
        </main>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Contact Info */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p>7/2, waragashinna, Akurana-06</p>
                  <p>Kandy, Sri Lanka, 20850</p>
                  <p>Phone: +94770044268</p>
                  <p>Email: ainudeen@gmail.com</p>
                </div>
              </div> */}
              
              {/* Quick Links */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <p><a href="/about" className="hover:text-accent transition-colors">About Us</a></p>
                  <p><a href="/courses" className="hover:text-accent transition-colors">Programs</a></p>
                  <p><a href="/faculty" className="hover:text-accent transition-colors">Faculty</a></p>
                  <p><a href="/facilities" className="hover:text-accent transition-colors">Facilities</a></p>
                </div>
              </div> */}
              
              {/* Student Resources */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Student Resources</h3>
                <div className="space-y-2 text-sm">
                  <p>Student Portal</p>
                  <p>Library Services</p>
                  <p>Career Services</p>
                  <p>Technical Support</p>
                </div>
              </div>
               */}
              {/* Office Hours */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <p>Monday - Friday: 9.00 A.M to 5.00 P.M</p>
                  <p>Saturday: 9.00 A.M to 5.00 P.M </p>
                  <p>Sunday: 9.00 A.M to 5.00 P.M</p>
                  <p className="text-accent">Emergency: 24/7</p>
                </div>
              </div> */}
            </div>
            
            <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
              <p>&copy; {new Date()?.getFullYear() } Hi-Tec College. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;