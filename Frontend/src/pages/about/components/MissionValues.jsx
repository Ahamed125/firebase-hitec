import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MissionValues = () => {
  const values = [
  {
    icon: "Target",
    title: "Excellence",
    description: "We strive for the highest standards in education, ensuring every student receives world-class learning experiences that prepare them for success."
  },
  {
    icon: "Heart",
    title: "Empowerment",
    description: "We believe in unlocking each student's potential, providing them with the tools, confidence, and support to achieve their dreams."
  },
  {
    icon: "Lightbulb",
    title: "Innovation",
    description: "We embrace cutting-edge teaching methods and technology to create engaging, effective, and future-ready learning environments."
  },
  {
    icon: "Users",
    title: "Community",
    description: "We foster a collaborative learning ecosystem where students, faculty, and industry partners work together to create meaningful impact."
  },
  {
    icon: "Shield",
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our interactions, building trust through transparency and authentic relationships."
  },
  {
    icon: "Globe",
    title: "Accessibility",
    description: "We make quality education accessible to learners from all backgrounds, breaking down barriers to knowledge and opportunity."
  }];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8">

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-1 bg-accent rounded-full"></div>
                <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Mission</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Illuminating Pathways to
                <span className="block text-primary font-accent">Success</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to transform lives through exceptional education that bridges the gap between academic knowledge and real-world application. We create an environment where learning becomes an adventure, innovation thrives, and every student discovers their unique potential.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Personalized Learning Journeys</h4>
                  <p className="text-muted-foreground">Tailored educational experiences that adapt to individual learning styles and career aspirations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Industry-Relevant Curriculum</h4>
                  <p className="text-muted-foreground">Programs designed in collaboration with industry leaders to ensure graduates are job-ready.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Lifelong Learning Support</h4>
                  <p className="text-muted-foreground">Continuous support and resources that extend beyond graduation into professional careers.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative">

            <Image
              src="https://images.unsplash.com/photo-1653565685072-adcf967db6b7"
              alt="Modern classroom with students using laptops and tablets for interactive learning, teacher facilitating discussion in bright, technology-enabled environment"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl" />

            
            {/* Overlay Stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent rounded-2xl flex items-end">
              <div className="p-8 text-white w-full">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">500+</div>
                    <div className="text-sm opacity-90">Industry Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">95%</div>
                    <div className="text-sm opacity-90">Job Placement</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4">

            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-1 bg-accent rounded-full"></div>
              <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Values</span>
              <div className="w-12 h-1 bg-accent rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Principles That Guide Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values shape every decision we make and every interaction we have, ensuring we remain true to our commitment to educational excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values?.map((value, index) =>
            <motion.div
              key={value?.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-border">

                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name={value?.icon} size={24} color="white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {value?.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default MissionValues;