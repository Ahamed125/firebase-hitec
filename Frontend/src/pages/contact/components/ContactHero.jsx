import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-primary text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Icon name="MessageCircle" size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">Get in Touch</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-accent leading-tight">
                Start Your Learning Journey Today
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Ready to unlock your potential? Our admissions team is here to guide you through every step of your educational journey. From course selection to enrollment, we're committed to your success.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24hrs</div>
                <div className="text-sm text-white/80">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-white/80">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">15+</div>
                <div className="text-sm text-white/80">Languages Supported</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Icon name="Calendar" size={20} className="mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Icon name="Phone" size={20} className="mr-2" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Contact Cards Preview */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Icon name="MapPin" size={24} className="text-accent mb-3" />
                <h3 className="font-semibold mb-2">Visit Campus</h3>
                <p className="text-sm text-white/80">7/2, waragashinna, Akurana-06, Kandy, Sri Lanka, 20850</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
                <Icon name="Clock" size={24} className="text-accent mb-3" />
                <h3 className="font-semibold mb-2">Office Hours</h3>
                <p className="text-sm text-white/80">Mon-Fri: 9AM-5PM<br />Sat: 9AM-5PM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 -mt-4">
                <Icon name="Mail" size={24} className="text-accent mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-white/80">ainudeen@gmail.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-4">
                <Icon name="Users" size={24} className="text-accent mb-3" />
                <h3 className="font-semibold mb-2">Student Support</h3>
                <p className="text-sm text-white/80">24/7 assistance available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;