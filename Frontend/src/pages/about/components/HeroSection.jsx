// import React from 'react';
// import { motion } from 'framer-motion';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-accent rounded-full blur-lg"></div>
//         <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-secondary rounded-full blur-2xl"></div>
//       </div>
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-white space-y-8">

//             <div className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="flex items-center space-x-3">

//                 <div className="w-12 h-1 bg-accent rounded-full"></div>
//                 <span className="text-accent font-semibold tracking-wider uppercase text-sm">About Hi-tec College</span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.8 }}
//                 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

//                 Where Knowledge Meets
//                 <span className="block text-accent font-accent">Innovation</span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className="text-xl text-white/90 leading-relaxed max-w-2xl">

//                 At Hi-Tec College,we believe education is not just about acquiring knowledge—it's about transformation, empowerment, and unlocking the extraordinary potential within every learner.
//               </motion.p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               className="flex flex-col sm:flex-row gap-4">

//               <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold">
//                 <Icon name="Play" size={20} className="mr-2" />
//                 Watch Our Story
//               </Button>
//               <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
//                 <Icon name="ArrowDown" size={20} className="mr-2" />
//                 Explore More
//               </Button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1, duration: 0.6 }}
//               className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">

//               <div className="text-center">
//                 <div className="text-3xl font-bold text-accent">15+</div>
//                 <div className="text-sm text-white/80">Years Excellence</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-accent">50K+</div>
//                 <div className="text-sm text-white/80">Students Graduated</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-accent">98%</div>
//                 <div className="text-sm text-white/80">Success Rate</div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Hero Image */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className="relative">

//             <div className="relative z-10">
//               <Image
//                 src="https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb"
//                 alt="Diverse group of students collaborating in modern classroom with laptops and books, engaged in active learning discussion"
//                 className="w-full h-[600px] object-cover rounded-2xl shadow-2xl" />

              
//               {/* Floating Cards */}
//               <motion.div
//                 animate={{ y: [-10, 10, -10] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">

//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
//                     <Icon name="Award" size={20} color="white" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-primary">Accredited</div>
//                     <div className="text-sm text-muted-foreground">Excellence</div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [10, -10, 10] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">

//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
//                     <Icon name="Users" size={20} color="white" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-primary">Global</div>
//                     <div className="text-sm text-muted-foreground">Community</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Background Decoration */}
//             <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
//           </motion.div>
//         </div>
//       </div>
//       {/* Scroll Indicator */}
//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">

//         <Icon name="ChevronDown" size={24} />
//       </motion.div>
//     </section>);

// };

// export default HeroSection;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const aboutRef = doc(db, 'about', 'data');
        const docSnap = await getDoc(aboutRef);

        if (docSnap.exists()) {
          setHeroData(docSnap.data().hero);
        } else {
          // Fallback to default data if no data exists
          setHeroData({
            badgeText: 'About Hi-tec College',
            mainTitle1: 'Where Knowledge Meets',
            accentTitle: 'Innovation',
            description: 'At Hi-Tec College, we believe education is not just about acquiring knowledge—it\'s about transformation, empowerment, and unlocking the extraordinary potential within every learner.',
            heroImage: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb',
            imageAlt: 'Diverse group of students collaborating in modern classroom with laptops and books, engaged in active learning discussion',
            watchVideoText: 'Watch Our Story',
            watchVideoLink: '#',
            exploreButtonText: 'Explore More',
            stats: [
              { number: '15+', label: 'Years Excellence' },
              { number: '50K+', label: 'Students Graduated' },
              { number: '98%', label: 'Success Rate' }
            ],
            floatingCards: [
              { title: 'Accredited', subtitle: 'Excellence', icon: 'Award' },
              { title: 'Global', subtitle: 'Community', icon: 'Users' }
            ]
          });
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError('Failed to load hero section data');
        // Set default data on error
        setHeroData({
          badgeText: 'About Hi-tec College',
          mainTitle1: 'Where Knowledge Meets',
          accentTitle: 'Innovation',
          description: 'At Hi-Tec College, we believe education is not just about acquiring knowledge—it\'s about transformation, empowerment, and unlocking the extraordinary potential within every learner.',
          heroImage: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb',
          imageAlt: 'Diverse group of students collaborating in modern classroom with laptops and books, engaged in active learning discussion',
          watchVideoText: 'Watch Our Story',
          watchVideoLink: '#',
          exploreButtonText: 'Explore More',
          stats: [
            { number: '15+', label: 'Years Excellence' },
            { number: '50K+', label: 'Students Graduated' },
            { number: '98%', label: 'Success Rate' }
          ],
          floatingCards: [
            { title: 'Accredited', subtitle: 'Excellence', icon: 'Award' },
            { title: 'Global', subtitle: 'Community', icon: 'Users' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error && !heroData) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-300">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-secondary rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8">

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-3">

                <div className="w-12 h-1 bg-accent rounded-full"></div>
                <span className="text-accent font-semibold tracking-wider uppercase text-sm">
                  {heroData?.badgeText || 'About Hi-tec College'}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">

                {heroData?.mainTitle1 || 'Where Knowledge Meets'}
                <span className="block text-accent font-accent">
                  {heroData?.accentTitle || 'Innovation'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-white/90 leading-relaxed max-w-2xl">

                {heroData?.description || 'At Hi-Tec College, we believe education is not just about acquiring knowledge—it\'s about transformation, empowerment, and unlocking the extraordinary potential within every learner.'}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4">

              <Button 
                variant="default" 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                onClick={() => window.open(heroData?.watchVideoLink || '#', '_blank')}
              >
                <Icon name="Play" size={20} className="mr-2" />
                {heroData?.watchVideoText || 'Watch Our Story'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Icon name="ArrowDown" size={20} className="mr-2" />
                {heroData?.exploreButtonText || 'Explore More'}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">

              {(heroData?.stats || [
                { number: '15+', label: 'Years Excellence' },
                { number: '50K+', label: 'Students Graduated' },
                { number: '98%', label: 'Success Rate' }
              ]).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative">

            <div className="relative z-10">
              <Image
                src={heroData?.heroImage || 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb'}
                alt={heroData?.imageAlt || 'Diverse group of students collaborating in modern classroom with laptops and books, engaged in active learning discussion'}
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl" />

              {/* Floating Cards */}
              
             
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}

    </section>
  );
};

export default HeroSection;