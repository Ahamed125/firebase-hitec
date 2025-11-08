// import { initializeApp } from 'firebase/app';
// import { 
//   getFirestore, 
//   doc, 
//   setDoc, 
//   getDoc, 
//   updateDoc, 
//   collection, 
//   query, 
//   where, 
//   getDocs 
// } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCu7QUDuwKiXTMHtaeeIITta57pIcKZvpI",
//   authDomain: "hitec-b93c4.firebaseapp.com",
//   projectId: "hitec-b93c4",
//   storageBucket: "hitec-b93c4.firebasestorage.app",
//   messagingSenderId: "990873279132",
//   appId: "1:990873279132:web:f787439569bc8fe0daab59",
//   measurementId: "G-5BE6HZLVES"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// // Collection names
// export const COLLECTIONS = {
//   SETTINGS: 'settings',
//   HOMEPAGE: 'homepage',
//   COURSES: 'courses',
//   FAQS: 'faqs',
//   CERTIFICATES: 'certificates',
//   ABOUT: 'about',
//   CONTACT: 'contact'
// };

// // Default data structures
// export const DEFAULT_DATA = {
//   SETTINGS: {
//     trustStats: {
//       studentsCount: '50,000+',
//       coursesAvailable: '200+',
//       expertInstructors: '150+',
//       successRate: '95%'
//     },
//     siteTitle: 'Hi-tec College',
//     siteDescription: 'Quality Education for Tomorrow\'s Leaders',
//     contactEmail: 'info@hitec.edu',
//     phoneNumber: '+1 (555) 123-4567'
//   },
//   HOMEPAGE: {
//     hero: {
//       slides: [
//         {
//           id: 1,
//           h1: 'Welcome to Hi-tec College',
//           h2: 'Excellence in Education Since 1990',
//           h3: 'Join our community of learners and discover endless opportunities for growth and success.',
//           image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
//         }
//       ]
//     },
//     cta: {
//       header: {
//         h1: 'Transform Your Future Today',
//         h2: 'Join thousands of successful students',
//         h3: 'Start your journey with our world-class programs and expert instructors'
//       },
//       cards: [
//         {
//           id: 1,
//           icon: 'book',
//           h3: 'Explore Our Programs',
//           buttonName: 'Learn More',
//           path: '/programs'
//         },
//         {
//           id: 2,
//           icon: 'users',
//           h3: 'Meet Our Faculty',
//           buttonName: 'View Team',
//           path: '/faculty'
//         }
//       ]
//     },
//     quickStats: [
//       {
//         id: 1,
//         text: 'Students Enrolled',
//         icon: 'users',
//         number: '50,000+'
//       },
//       {
//         id: 2,
//         text: 'Courses Available',
//         icon: 'book',
//         number: '200+'
//       }
//     ],
//     news: {
//       header: {
//         title: 'Join Our Events',
//         subtitle: 'Upcoming Events & Announcements',
//         description: 'Discover upcoming workshops, webinars, and networking events designed to help you grow professionally and personally.'
//       },
//       events: [
//         {
//           id: 1,
//           title: 'Virtual Career Fair 2024',
//           date: '2024-03-15',
//           time: '10:00 AM - 4:00 PM EST',
//           type: 'Virtual Event',
//           description: 'Connect with top employers and explore career opportunities in this virtual career fair. Network with industry professionals and discover your next career move.',
//           registrations: 2847,
//           image: 'https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a',
//           imageAlt: 'Virtual career fair with professionals networking online'
//         }
//       ]
//     }
//   },
//   COURSES: {
//     courses: [
//       {
//         id: 1,
//         title: 'Foundations in Computing',
//         category: 'Technology',
//         duration: '6 Months',
//         level: 'Beginner',
//         instructor: 'Dr. Sarah Johnson',
//         price: 1200,
//         image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
//         description: 'Comprehensive foundation course covering computing fundamentals, programming basics, and IT concepts.',
//         objectives: [
//           'Understand basic computing concepts',
//           'Learn programming fundamentals',
//           'Develop problem-solving skills'
//         ],
//         modules: [
//           'Introduction to Computing',
//           'Programming Basics',
//           'Data Structures'
//         ],
//         isActive: true,
//         createdAt: new Date().toISOString()
//       }
//     ]
//   },
//   FAQS: {
//     categories: [
//       {
//         id: 1,
//         name: 'Admissions',
//         description: 'Questions about the application process and requirements',
//         questions: [
//           {
//             id: 1,
//             question: 'What are the admission requirements?',
//             answer: 'Our admission requirements include a high school diploma or equivalent, completed application form, and relevant documentation. Some programs may have additional prerequisites.'
//           }
//         ]
//       }
//     ]
//   },
//   CERTIFICATES: {
//     records: [
//       {
//         id: 1,
//         registrationNumber: 'M/HTC/FIC/825',
//         studentName: 'John Smith',
//         studentProfilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
//         studentEmail: 'john.smith@student.hitec.edu',
//         studentPhone: '+1 (555) 123-4567',
//         courseName: 'Foundations in Computing',
//         courseCategory: 'Technology',
//         duration: '6 Months',
//         grade: 'A',
//         score: '95%',
//         instructorName: 'Dr. Sarah Johnson',
//         dateOfAward: '2024-08-15',
//         expiryDate: '2026-08-15',
//         certificateType: 'completion',
//         description: 'Comprehensive foundation course in computing fundamentals',
//         skills: ['Programming', 'Algorithms', 'Data Structures', 'Web Development'],
//         credits: '4.5',
//         department: 'Computer Science',
//         campusLocation: 'Main Campus',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 2,
//         registrationNumber: 'M/HTC/BUS/456',
//         studentName: 'Sarah Wilson',
//         studentProfilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
//         studentEmail: 'sarah.wilson@student.hitec.edu',
//         studentPhone: '+1 (555) 987-6543',
//         courseName: 'Business Management',
//         courseCategory: 'Business',
//         duration: '1 Year',
//         grade: 'A+',
//         score: '98%',
//         instructorName: 'Prof. Michael Brown',
//         dateOfAward: '2024-07-20',
//         expiryDate: '2027-07-20',
//         certificateType: 'excellence',
//         description: 'Advanced business management and leadership course',
//         skills: ['Leadership', 'Strategic Planning', 'Financial Management', 'Marketing'],
//         credits: '6.0',
//         department: 'Business Administration',
//         campusLocation: 'Downtown Campus',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//     ]
//   },
//   ABOUT: {
//     title: 'About Hi-tec College',
//     description: 'Leading institution in quality education and career development',
//     mission: 'To provide accessible, high-quality education that empowers students to achieve their career goals and make positive contributions to society.',
//     vision: 'To be the premier institution for career-focused education, recognized for innovation, excellence, and student success.',
//     values: [
//       'Excellence in Education',
//       'Student Success',
//       'Innovation',
//       'Integrity',
//       'Community Engagement'
//     ],
//     history: 'Founded in 1990, Hi-tec College has been at the forefront of career education, helping thousands of students achieve their professional dreams.',
//     team: [
//       {
//         id: 1,
//         name: 'Dr. Sarah Johnson',
//         position: 'Dean of Technology',
//         bio: 'Expert in computer science with 15 years of teaching experience.',
//         image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
//       }
//     ]
//   },
//   CONTACT: {
//     methods: [
//       {
//         id: 1,
//         type: 'phone',
//         title: 'Phone Support',
//         description: 'Get immediate assistance from our support team',
//         primary: '+1 (555) 123-4567',
//         secondary: '+1 (555) 123-4568',
//         hours: 'Monday - Friday: 9 AM - 5 PM EST',
//         action: 'Call Now'
//       },
//       {
//         id: 2,
//         type: 'email',
//         title: 'Email Support',
//         description: 'Send us your queries and we\'ll respond within 24 hours',
//         primary: 'admissions@college.edu',
//         secondary: 'support@college.edu',
//         hours: '24/7 Email Support',
//         action: 'Send Email'
//       },
//       {
//         id: 3,
//         type: 'visit',
//         title: 'Campus Visit',
//         description: 'Schedule a campus tour and meet our faculty',
//         primary: 'Admissions Office, Main Campus',
//         hours: 'Monday - Saturday: 10 AM - 4 PM',
//         action: 'Schedule Visit'
//       }
//     ],
//     socialChannels: [
//       {
//         id: 1,
//         name: 'Facebook',
//         platform: 'facebook',
//         handle: '@CollegeOfficial',
//         url: 'https://facebook.com/collegeofficial',
//         icon: 'facebook',
//         isActive: true
//       },
//       {
//         id: 2,
//         name: 'Twitter',
//         platform: 'twitter',
//         handle: '@CollegeNews',
//         url: 'https://twitter.com/collegenews',
//         icon: 'twitter',
//         isActive: true
//       },
//       {
//         id: 3,
//         name: 'Instagram',
//         platform: 'instagram',
//         handle: '@CollegeLife',
//         url: 'https://instagram.com/collegelife',
//         icon: 'instagram',
//         isActive: true
//       },
//       {
//         id: 4,
//         name: 'LinkedIn',
//         platform: 'linkedin',
//         handle: 'College University',
//         url: 'https://linkedin.com/school/college-university',
//         icon: 'linkedin',
//         isActive: true
//       },
//       {
//         id: 5,
//         name: 'YouTube',
//         platform: 'youtube',
//         handle: 'College Channel',
//         url: 'https://youtube.com/c/collegechannel',
//         icon: 'youtube',
//         isActive: true
//       }
//     ],
//     campusLocations: [
//       {
//         id: 1,
//         name: 'Main Campus',
//         address: '123 Education Boulevard, City, State 12345',
//         phone: '+1 (555) 123-4567',
//         email: 'maincampus@college.edu',
//         hours: {
//           weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
//           saturday: 'Saturday: 9:00 AM - 2:00 PM',
//           sunday: 'Sunday: Closed'
//         },
//         services: [
//           'Admissions Office',
//           'Library',
//           'Student Center',
//           'Cafeteria',
//           'Sports Complex'
//         ],
//         mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
//         isPrimary: true
//       }
//     ]
//   }
// };

// // Firebase operations
// export const saveToFirebase = async (collectionName, data) => {
//   try {
//     await setDoc(doc(db, collectionName, 'data'), data);
//     console.log(`Successfully saved data to ${collectionName}`);
//     return { success: true };
//   } catch (error) {
//     console.error(`Error saving to ${collectionName}:`, error);
//     return { success: false, error: error.message };
//   }
// };

// export const loadFromFirebase = async (collectionName) => {
//   try {
//     const docRef = doc(db, collectionName, 'data');
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       console.log(`Successfully loaded data from ${collectionName}`);
//       return { success: true, data: docSnap.data() };
//     } else {
//       console.log(`No data found in ${collectionName}, returning default data`);
//       return { 
//         success: true, 
//         data: DEFAULT_DATA[collectionName.toUpperCase()] || {} 
//       };
//     }
//   } catch (error) {
//     console.error(`Error loading from ${collectionName}:`, error);
//     return { 
//       success: false, 
//       error: error.message,
//       data: DEFAULT_DATA[collectionName.toUpperCase()] || {}
//     };
//   }
// };

// export const updateInFirebase = async (collectionName, updates) => {
//   try {
//     await updateDoc(doc(db, collectionName, 'data'), updates);
//     console.log(`Successfully updated ${collectionName}`);
//     return { success: true };
//   } catch (error) {
//     console.error(`Error updating ${collectionName}:`, error);
//     return { success: false, error: error.message };
//   }
// };

// export const initializeFirebaseData = async () => {
//   try {
//     const collections = Object.values(COLLECTIONS);
//     const results = [];
    
//     for (const collectionName of collections) {
//       const docRef = doc(db, collectionName, 'data');
//       const docSnap = await getDoc(docRef);
      
//       if (!docSnap.exists()) {
//         const defaultData = DEFAULT_DATA[collectionName.toUpperCase()];
//         if (defaultData) {
//           await setDoc(docRef, defaultData);
//           results.push({ collection: collectionName, status: 'initialized' });
//         }
//       } else {
//         results.push({ collection: collectionName, status: 'exists' });
//       }
//     }
    
//     console.log('Firebase initialization completed:', results);
//     return { success: true, results };
//   } catch (error) {
//     console.error('Error initializing Firebase data:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Certificate verification
// export const verifyCertificateSimple = async (registrationNumber) => {
//   try {
//     console.log('Verifying certificate:', registrationNumber);
    
//     const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
//     if (certDoc.exists()) {
//       const certificatesData = certDoc.data();
//       const certificate = certificatesData.records?.find(
//         cert => cert.registrationNumber === registrationNumber
//       );
      
//       if (certificate) {
//         console.log('Certificate found:', certificate.studentName);
//         return { 
//           success: true, 
//           data: certificate 
//         };
//       } else {
//         console.log('Certificate not found for number:', registrationNumber);
//       }
//     } else {
//       console.log('Certificates collection does not exist');
//     }
    
//     return { 
//       success: false, 
//       error: 'Certificate not found in our records. Please check the registration number and try again.' 
//     };
//   } catch (error) {
//     console.error('Error verifying certificate:', error);
//     return { 
//       success: false, 
//       error: 'Verification service temporarily unavailable. Please try again later.' 
//     };
//   }
// };

// // Advanced certificate verification with multiple approaches
// export const verifyCertificateAdvanced = async (registrationNumber) => {
//   try {
//     // Try direct document access first
//     const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
//     if (certDoc.exists()) {
//       const certificatesData = certDoc.data();
//       const certificate = certificatesData.records?.find(
//         cert => cert.registrationNumber === registrationNumber
//       );
      
//       if (certificate) {
//         return { 
//           success: true, 
//           data: certificate,
//           source: 'direct_document'
//         };
//       }
//     }

//     // Try collection query as fallback
//     try {
//       const certificatesRef = collection(db, COLLECTIONS.CERTIFICATES);
//       const q = query(certificatesRef);
//       const querySnapshot = await getDocs(q);
      
//       for (const doc of querySnapshot.docs) {
//         const data = doc.data();
//         if (data.records) {
//           const certificate = data.records.find(
//             cert => cert.registrationNumber === registrationNumber
//           );
//           if (certificate) {
//             return { 
//               success: true, 
//               data: certificate,
//               source: 'collection_query'
//             };
//           }
//         }
//       }
//     } catch (queryError) {
//       console.log('Collection query failed:', queryError);
//     }

//     return { 
//       success: false, 
//       error: 'Certificate not found',
//       source: 'not_found'
//     };
    
//   } catch (error) {
//     console.error('Error in advanced certificate verification:', error);
//     return { 
//       success: false, 
//       error: 'Verification failed',
//       source: 'error'
//     };
//   }
// };

// // Bulk operations
// export const saveAllToFirebase = async (data) => {
//   try {
//     const operations = Object.keys(data).map(collectionName => 
//       saveToFirebase(collectionName, data[collectionName])
//     );
    
//     const results = await Promise.all(operations);
//     const allSuccess = results.every(result => result.success);
    
//     return { 
//       success: allSuccess, 
//       results: results.map((result, index) => ({
//         collection: Object.keys(data)[index],
//         success: result.success,
//         error: result.error
//       }))
//     };
//   } catch (error) {
//     console.error('Error in bulk save:', error);
//     return { success: false, error: error.message };
//   }
// };

// export const loadAllFromFirebase = async () => {
//   try {
//     const collections = Object.values(COLLECTIONS);
//     const results = {};
    
//     for (const collectionName of collections) {
//       const result = await loadFromFirebase(collectionName);
//       results[collectionName] = result;
//     }
    
//     return { success: true, data: results };
//   } catch (error) {
//     console.error('Error in bulk load:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Utility functions
// export const generateCertificateNumber = (department = 'HTC', courseCode = 'FIC', sequence = '001') => {
//   const timestamp = new Date().getTime().toString().slice(-3);
//   return `M/${department}/${courseCode}/${sequence}`;
// };

// export const validateCertificateData = (certificate) => {
//   const requiredFields = ['registrationNumber', 'studentName', 'courseName', 'dateOfAward'];
//   const missingFields = requiredFields.filter(field => !certificate[field]);
  
//   if (missingFields.length > 0) {
//     return {
//       valid: false,
//       missingFields,
//       error: `Missing required fields: ${missingFields.join(', ')}`
//     };
//   }
  
//   return { valid: true };
// };

// // Export default for easier imports
// export default {
//   db,
//   COLLECTIONS,
//   DEFAULT_DATA,
//   saveToFirebase,
//   loadFromFirebase,
//   updateInFirebase,
//   initializeFirebaseData,
//   verifyCertificateSimple,
//   verifyCertificateAdvanced,
//   saveAllToFirebase,
//   loadAllFromFirebase,
//   generateCertificateNumber,
//   validateCertificateData
// };















// import { initializeApp } from 'firebase/app';
// import { 
//   getFirestore, 
//   doc, 
//   setDoc, 
//   getDoc, 
//   updateDoc, 
//   collection, 
//   query, 
//   where, 
//   getDocs 
// } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCu7QUDuwKiXTMHtaeeIITta57pIcKZvpI",
//   authDomain: "hitec-b93c4.firebaseapp.com",
//   projectId: "hitec-b93c4",
//   storageBucket: "hitec-b93c4.firebasestorage.app",
//   messagingSenderId: "990873279132",
//   appId: "1:990873279132:web:f787439569bc8fe0daab59",
//   measurementId: "G-5BE6HZLVES"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// // Collection names
// export const COLLECTIONS = {
//   SETTINGS: 'settings',
//   HOMEPAGE: 'homepage',
//   COURSES: 'courses',
//   FAQS: 'faqs',
//   CERTIFICATES: 'certificates',
//   ABOUT: 'about',
//   CONTACT: 'contact'
// };

// // Default data structures
// export const DEFAULT_DATA = {
//   SETTINGS: {
//     trustStats: {
//       studentsCount: '50,000+',
//       coursesAvailable: '200+',
//       expertInstructors: '150+',
//       successRate: '95%'
//     },
//     siteTitle: 'Hi-tec College',
//     siteDescription: 'Quality Education for Tomorrow\'s Leaders',
//     contactEmail: 'info@hitec.edu',
//     phoneNumber: '+1 (555) 123-4567'
//   },
//   HOMEPAGE: {
//     hero: {
//       slides: [
//         {
//           id: 1,
//           h1: 'Welcome to Hi-tec College',
//           h2: 'Excellence in Education Since 1990',
//           h3: 'Join our community of learners and discover endless opportunities for growth and success.',
//           image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
//         }
//       ]
//     },
//     cta: {
//       header: {
//         h1: 'Transform Your Future Today',
//         h2: 'Join thousands of successful students',
//         h3: 'Start your journey with our world-class programs and expert instructors'
//       },
//       cards: [
//         {
//           id: 1,
//           icon: 'book',
//           h3: 'Explore Our Programs',
//           buttonName: 'Learn More',
//           path: '/programs'
//         },
//         {
//           id: 2,
//           icon: 'users',
//           h3: 'Meet Our Faculty',
//           buttonName: 'View Team',
//           path: '/faculty'
//         }
//       ]
//     },
//     quickStats: [
//       {
//         id: 1,
//         text: 'Students Enrolled',
//         icon: 'users',
//         number: '50,000+'
//       },
//       {
//         id: 2,
//         text: 'Courses Available',
//         icon: 'book',
//         number: '200+'
//       }
//     ],
//     news: {
//       header: {
//         title: 'Join Our Events',
//         subtitle: 'Upcoming Events & Announcements',
//         description: 'Discover upcoming workshops, webinars, and networking events designed to help you grow professionally and personally.'
//       },
//       events: [
//         {
//           id: 1,
//           title: 'Virtual Career Fair 2024',
//           date: '2024-03-15',
//           time: '10:00 AM - 4:00 PM EST',
//           type: 'Virtual Event',
//           description: 'Connect with top employers and explore career opportunities in this virtual career fair. Network with industry professionals and discover your next career move.',
//           registrations: 2847,
//           image: 'https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a',
//           imageAlt: 'Virtual career fair with professionals networking online'
//         }
//       ]
//     }
//   },
//   COURSES: {
//     courses: [
//       {
//         id: 1,
//         title: 'Foundations in Computing',
//         category: 'Technology',
//         duration: '6 Months',
//         level: 'Beginner',
//         instructor: 'Dr. Sarah Johnson',
//         price: 1200,
//         image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
//         description: 'Comprehensive foundation course covering computing fundamentals, programming basics, and IT concepts.',
//         objectives: [
//           'Understand basic computing concepts',
//           'Learn programming fundamentals',
//           'Develop problem-solving skills'
//         ],
//         modules: [
//           'Introduction to Computing',
//           'Programming Basics',
//           'Data Structures'
//         ],
//         isActive: true,
//         createdAt: new Date().toISOString()
//       }
//     ]
//   },
//   FAQS: {
//     categories: [
//       {
//         id: 1,
//         name: 'Admissions',
//         description: 'Questions about the application process and requirements',
//         questions: [
//           {
//             id: 1,
//             question: 'What are the admission requirements?',
//             answer: 'Our admission requirements include a high school diploma or equivalent, completed application form, and relevant documentation. Some programs may have additional prerequisites.'
//           }
//         ]
//       }
//     ]
//   },
//   CERTIFICATES: {
//     records: [
//       {
//         id: 1,
//         registrationNumber: 'M/HTC/FIC/825',
//         studentName: 'John Smith',
//         studentProfilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
//         studentEmail: 'john.smith@student.hitec.edu',
//         studentPhone: '+1 (555) 123-4567',
//         courseName: 'Foundations in Computing',
//         courseCategory: 'Technology',
//         duration: '6 Months',
//         grade: 'A',
//         score: '95%',
//         instructorName: 'Dr. Sarah Johnson',
//         dateOfAward: '2024-08-15',
//         expiryDate: '2026-08-15',
//         certificateType: 'completion',
//         description: 'Comprehensive foundation course in computing fundamentals',
//         skills: ['Programming', 'Algorithms', 'Data Structures', 'Web Development'],
//         credits: '4.5',
//         department: 'Computer Science',
//         campusLocation: 'Main Campus',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       },
//       {
//         id: 2,
//         registrationNumber: 'M/HTC/BUS/456',
//         studentName: 'Sarah Wilson',
//         studentProfilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
//         studentEmail: 'sarah.wilson@student.hitec.edu',
//         studentPhone: '+1 (555) 987-6543',
//         courseName: 'Business Management',
//         courseCategory: 'Business',
//         duration: '1 Year',
//         grade: 'A+',
//         score: '98%',
//         instructorName: 'Prof. Michael Brown',
//         dateOfAward: '2024-07-20',
//         expiryDate: '2027-07-20',
//         certificateType: 'excellence',
//         description: 'Advanced business management and leadership course',
//         skills: ['Leadership', 'Strategic Planning', 'Financial Management', 'Marketing'],
//         credits: '6.0',
//         department: 'Business Administration',
//         campusLocation: 'Downtown Campus',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//     ]
//   },
//   ABOUT: {
//     title: 'About Hi-tec College',
//     description: 'Leading institution in quality education and career development',
//     mission: 'To provide accessible, high-quality education that empowers students to achieve their career goals and make positive contributions to society.',
//     vision: 'To be the premier institution for career-focused education, recognized for innovation, excellence, and student success.',
//     values: [
//       'Excellence in Education',
//       'Student Success',
//       'Innovation',
//       'Integrity',
//       'Community Engagement'
//     ],
//     history: 'Founded in 1990, Hi-tec College has been at the forefront of career education, helping thousands of students achieve their professional dreams.',
//     team: [
//       {
//         id: 1,
//         name: 'Dr. Sarah Johnson',
//         position: 'Dean of Technology',
//         bio: 'Expert in computer science with 15 years of teaching experience.',
//         image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
//       }
//     ]
//   },
//   CONTACT: {
//     methods: [
//       {
//         id: 1,
//         type: 'phone',
//         title: 'Phone Support',
//         description: 'Get immediate assistance from our support team',
//         primary: '+1 (555) 123-4567',
//         secondary: '+1 (555) 123-4568',
//         hours: 'Monday - Friday: 9 AM - 5 PM EST',
//         action: 'Call Now'
//       },
//       {
//         id: 2,
//         type: 'email',
//         title: 'Email Support',
//         description: 'Send us your queries and we\'ll respond within 24 hours',
//         primary: 'admissions@college.edu',
//         secondary: 'support@college.edu',
//         hours: '24/7 Email Support',
//         action: 'Send Email'
//       },
//       {
//         id: 3,
//         type: 'visit',
//         title: 'Campus Visit',
//         description: 'Schedule a campus tour and meet our faculty',
//         primary: 'Admissions Office, Main Campus',
//         hours: 'Monday - Saturday: 10 AM - 4 PM',
//         action: 'Schedule Visit'
//       }
//     ],
//     socialChannels: [
//       {
//         id: 1,
//         name: 'Facebook',
//         platform: 'facebook',
//         handle: '@CollegeOfficial',
//         url: 'https://facebook.com/collegeofficial',
//         icon: 'facebook',
//         isActive: true
//       },
//       {
//         id: 2,
//         name: 'Twitter',
//         platform: 'twitter',
//         handle: '@CollegeNews',
//         url: 'https://twitter.com/collegenews',
//         icon: 'twitter',
//         isActive: true
//       },
//       {
//         id: 3,
//         name: 'Instagram',
//         platform: 'instagram',
//         handle: '@CollegeLife',
//         url: 'https://instagram.com/collegelife',
//         icon: 'instagram',
//         isActive: true
//       },
//       {
//         id: 4,
//         name: 'LinkedIn',
//         platform: 'linkedin',
//         handle: 'College University',
//         url: 'https://linkedin.com/school/college-university',
//         icon: 'linkedin',
//         isActive: true
//       },
//       {
//         id: 5,
//         name: 'YouTube',
//         platform: 'youtube',
//         handle: 'College Channel',
//         url: 'https://youtube.com/c/collegechannel',
//         icon: 'youtube',
//         isActive: true
//       }
//     ],
//     campusLocations: [
//       {
//         id: 1,
//         name: 'Main Campus',
//         address: '123 Education Boulevard, City, State 12345',
//         phone: '+1 (555) 123-4567',
//         email: 'maincampus@college.edu',
//         hours: {
//           weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
//           saturday: 'Saturday: 9:00 AM - 2:00 PM',
//           sunday: 'Sunday: Closed'
//         },
//         services: [
//           'Admissions Office',
//           'Library',
//           'Student Center',
//           'Cafeteria',
//           'Sports Complex'
//         ],
//         mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
//         isPrimary: true
//       }
//     ],
//     contactForm: [
//       {
       
//       }
//     ]
//   }
// };

// // Firebase operations
// export const saveToFirebase = async (collectionName, data) => {
//   try {
//     await setDoc(doc(db, collectionName, 'data'), data);
//     console.log(`Successfully saved data to ${collectionName}`);
//     return { success: true };
//   } catch (error) {
//     console.error(`Error saving to ${collectionName}:`, error);
//     return { success: false, error: error.message };
//   }
// };

// export const loadFromFirebase = async (collectionName) => {
//   try {
//     const docRef = doc(db, collectionName, 'data');
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       console.log(`Successfully loaded data from ${collectionName}`);
//       return { success: true, data: docSnap.data() };
//     } else {
//       console.log(`No data found in ${collectionName}, returning default data`);
//       return { 
//         success: true, 
//         data: DEFAULT_DATA[collectionName.toUpperCase()] || {} 
//       };
//     }
//   } catch (error) {
//     console.error(`Error loading from ${collectionName}:`, error);
//     return { 
//       success: false, 
//       error: error.message,
//       data: DEFAULT_DATA[collectionName.toUpperCase()] || {}
//     };
//   }
// };

// export const updateInFirebase = async (collectionName, updates) => {
//   try {
//     await updateDoc(doc(db, collectionName, 'data'), updates);
//     console.log(`Successfully updated ${collectionName}`);
//     return { success: true };
//   } catch (error) {
//     console.error(`Error updating ${collectionName}:`, error);
//     return { success: false, error: error.message };
//   }
// };

// export const initializeFirebaseData = async () => {
//   try {
//     const collections = Object.values(COLLECTIONS);
//     const results = [];
    
//     for (const collectionName of collections) {
//       const docRef = doc(db, collectionName, 'data');
//       const docSnap = await getDoc(docRef);
      
//       if (!docSnap.exists()) {
//         const defaultData = DEFAULT_DATA[collectionName.toUpperCase()];
//         if (defaultData) {
//           await setDoc(docRef, defaultData);
//           results.push({ collection: collectionName, status: 'initialized' });
//         }
//       } else {
//         results.push({ collection: collectionName, status: 'exists' });
//       }
//     }
    
//     console.log('Firebase initialization completed:', results);
//     return { success: true, results };
//   } catch (error) {
//     console.error('Error initializing Firebase data:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Certificate verification
// export const verifyCertificateSimple = async (registrationNumber) => {
//   try {
//     console.log('Verifying certificate:', registrationNumber);
    
//     const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
//     if (certDoc.exists()) {
//       const certificatesData = certDoc.data();
//       const certificate = certificatesData.records?.find(
//         cert => cert.registrationNumber === registrationNumber
//       );
      
//       if (certificate) {
//         console.log('Certificate found:', certificate.studentName);
//         return { 
//           success: true, 
//           data: certificate 
//         };
//       } else {
//         console.log('Certificate not found for number:', registrationNumber);
//       }
//     } else {
//       console.log('Certificates collection does not exist');
//     }
    
//     return { 
//       success: false, 
//       error: 'Certificate not found in our records. Please check the registration number and try again.' 
//     };
//   } catch (error) {
//     console.error('Error verifying certificate:', error);
//     return { 
//       success: false, 
//       error: 'Verification service temporarily unavailable. Please try again later.' 
//     };
//   }
// };

// // Advanced certificate verification with multiple approaches
// export const verifyCertificateAdvanced = async (registrationNumber) => {
//   try {
//     // Try direct document access first
//     const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
//     if (certDoc.exists()) {
//       const certificatesData = certDoc.data();
//       const certificate = certificatesData.records?.find(
//         cert => cert.registrationNumber === registrationNumber
//       );
      
//       if (certificate) {
//         return { 
//           success: true, 
//           data: certificate,
//           source: 'direct_document'
//         };
//       }
//     }

//     // Try collection query as fallback
//     try {
//       const certificatesRef = collection(db, COLLECTIONS.CERTIFICATES);
//       const q = query(certificatesRef);
//       const querySnapshot = await getDocs(q);
      
//       for (const doc of querySnapshot.docs) {
//         const data = doc.data();
//         if (data.records) {
//           const certificate = data.records.find(
//             cert => cert.registrationNumber === registrationNumber
//           );
//           if (certificate) {
//             return { 
//               success: true, 
//               data: certificate,
//               source: 'collection_query'
//             };
//           }
//         }
//       }
//     } catch (queryError) {
//       console.log('Collection query failed:', queryError);
//     }

//     return { 
//       success: false, 
//       error: 'Certificate not found',
//       source: 'not_found'
//     };
    
//   } catch (error) {
//     console.error('Error in advanced certificate verification:', error);
//     return { 
//       success: false, 
//       error: 'Verification failed',
//       source: 'error'
//     };
//   }
// };

// // Bulk operations
// export const saveAllToFirebase = async (data) => {
//   try {
//     const operations = Object.keys(data).map(collectionName => 
//       saveToFirebase(collectionName, data[collectionName])
//     );
    
//     const results = await Promise.all(operations);
//     const allSuccess = results.every(result => result.success);
    
//     return { 
//       success: allSuccess, 
//       results: results.map((result, index) => ({
//         collection: Object.keys(data)[index],
//         success: result.success,
//         error: result.error
//       }))
//     };
//   } catch (error) {
//     console.error('Error in bulk save:', error);
//     return { success: false, error: error.message };
//   }
// };

// export const loadAllFromFirebase = async () => {
//   try {
//     const collections = Object.values(COLLECTIONS);
//     const results = {};
    
//     for (const collectionName of collections) {
//       const result = await loadFromFirebase(collectionName);
//       results[collectionName] = result;
//     }
    
//     return { success: true, data: results };
//   } catch (error) {
//     console.error('Error in bulk load:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Utility functions
// export const generateCertificateNumber = (department = 'HTC', courseCode = 'FIC', sequence = '001') => {
//   const timestamp = new Date().getTime().toString().slice(-3);
//   return `M/${department}/${courseCode}/${sequence}`;
// };

// export const validateCertificateData = (certificate) => {
//   const requiredFields = ['registrationNumber', 'studentName', 'courseName', 'dateOfAward'];
//   const missingFields = requiredFields.filter(field => !certificate[field]);
  
//   if (missingFields.length > 0) {
//     return {
//       valid: false,
//       missingFields,
//       error: `Missing required fields: ${missingFields.join(', ')}`
//     };
//   }
  
//   return { valid: true };
// };

// // Export default for easier imports
// export default {
//   db,
//   COLLECTIONS,
//   DEFAULT_DATA,
//   saveToFirebase,
//   loadFromFirebase,
//   updateInFirebase,
//   initializeFirebaseData,
//   verifyCertificateSimple,
//   verifyCertificateAdvanced,
//   saveAllToFirebase,
//   loadAllFromFirebase,
//   generateCertificateNumber,
//   validateCertificateData
// };



















import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCu7QUDuwKiXTMHtaeeIITta57pIcKZvpI",
  authDomain: "hitec-b93c4.firebaseapp.com",
  projectId: "hitec-b93c4",
  storageBucket: "hitec-b93c4.firebasestorage.app",
  messagingSenderId: "990873279132",
  appId: "1:990873279132:web:f787439569bc8fe0daab59",
  measurementId: "G-5BE6HZLVES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection names
export const COLLECTIONS = {
  SETTINGS: 'settings',
  HOMEPAGE: 'homepage',
  COURSES: 'courses',
  FAQS: 'faqs',
  CERTIFICATES: 'certificates',
  ABOUT: 'about',
  CONTACT: 'contact',
  MESSAGES: 'messages', // New collection for active messages
  OLD_MESSAGES: 'old_messages' // New collection for archived messages
};

// Default data structures
export const DEFAULT_DATA = {
  SETTINGS: {
    trustStats: {
      studentsCount: '50,000+',
      coursesAvailable: '200+',
      expertInstructors: '150+',
      successRate: '95%'
    },
    siteTitle: 'Hi-tec College',
    siteDescription: 'Quality Education for Tomorrow\'s Leaders',
    contactEmail: 'info@hitec.edu',
    phoneNumber: '+1 (555) 123-4567'
  },
  HOMEPAGE: {
    hero: {
      slides: [
        {
          id: 1,
          h1: 'Welcome to Hi-tec College',
          h2: 'Excellence in Education Since 1990',
          h3: 'Join our community of learners and discover endless opportunities for growth and success.',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
        }
      ]
    },
    cta: {
      header: {
        h1: 'Transform Your Future Today',
        h2: 'Join thousands of successful students',
        h3: 'Start your journey with our world-class programs and expert instructors'
      },
      cards: [
        {
          id: 1,
          icon: 'book',
          h3: 'Explore Our Programs',
          buttonName: 'Learn More',
          path: '/programs'
        },
        {
          id: 2,
          icon: 'users',
          h3: 'Meet Our Faculty',
          buttonName: 'View Team',
          path: '/faculty'
        }
      ]
    },
    quickStats: [
      {
        id: 1,
        text: 'Students Enrolled',
        icon: 'users',
        number: '50,000+'
      },
      {
        id: 2,
        text: 'Courses Available',
        icon: 'book',
        number: '200+'
      }
    ],
    news: {
      header: {
        title: 'Join Our Events',
        subtitle: 'Upcoming Events & Announcements',
        description: 'Discover upcoming workshops, webinars, and networking events designed to help you grow professionally and personally.'
      },
      events: [
        {
          id: 1,
          title: 'Virtual Career Fair 2024',
          date: '2024-03-15',
          time: '10:00 AM - 4:00 PM EST',
          type: 'Virtual Event',
          description: 'Connect with top employers and explore career opportunities in this virtual career fair. Network with industry professionals and discover your next career move.',
          registrations: 2847,
          image: 'https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a',
          imageAlt: 'Virtual career fair with professionals networking online'
        }
      ]
    }
  },
  COURSES: {
    courses: [
      {
        id: 1,
        title: 'Foundations in Computing',
        category: 'Technology',
        duration: '6 Months',
        level: 'Beginner',
        instructor: 'Dr. Sarah Johnson',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
        description: 'Comprehensive foundation course covering computing fundamentals, programming basics, and IT concepts.',
        objectives: [
          'Understand basic computing concepts',
          'Learn programming fundamentals',
          'Develop problem-solving skills'
        ],
        modules: [
          'Introduction to Computing',
          'Programming Basics',
          'Data Structures'
        ],
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ]
  },
  FAQS: {
    categories: [
      {
        id: 1,
        name: 'Admissions',
        description: 'Questions about the application process and requirements',
        questions: [
          {
            id: 1,
            question: 'What are the admission requirements?',
            answer: 'Our admission requirements include a high school diploma or equivalent, completed application form, and relevant documentation. Some programs may have additional prerequisites.'
          }
        ]
      }
    ]
  },
  CERTIFICATES: {
    records: [
      {
        id: 1,
        registrationNumber: 'M/HTC/FIC/825',
        studentName: 'John Smith',
        studentProfilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        studentEmail: 'john.smith@student.hitec.edu',
        studentPhone: '+1 (555) 123-4567',
        courseName: 'Foundations in Computing',
        courseCategory: 'Technology',
        duration: '6 Months',
        grade: 'A',
        score: '95%',
        instructorName: 'Dr. Sarah Johnson',
        dateOfAward: '2024-08-15',
        expiryDate: '2026-08-15',
        certificateType: 'completion',
        description: 'Comprehensive foundation course in computing fundamentals',
        skills: ['Programming', 'Algorithms', 'Data Structures', 'Web Development'],
        credits: '4.5',
        department: 'Computer Science',
        campusLocation: 'Main Campus',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },
  ABOUT: {
    title: 'About Hi-tec College',
    description: 'Leading institution in quality education and career development',
    mission: 'To provide accessible, high-quality education that empowers students to achieve their career goals and make positive contributions to society.',
    vision: 'To be the premier institution for career-focused education, recognized for innovation, excellence, and student success.',
    values: [
      'Excellence in Education',
      'Student Success',
      'Innovation',
      'Integrity',
      'Community Engagement'
    ],
    history: 'Founded in 1990, Hi-tec College has been at the forefront of career education, helping thousands of students achieve their professional dreams.',
    team: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        position: 'Dean of Technology',
        bio: 'Expert in computer science with 15 years of teaching experience.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
      }
    ]
  },
  CONTACT: {
    methods: [
      {
        id: 1,
        type: 'phone',
        title: 'Phone Support',
        description: 'Get immediate assistance from our support team',
        primary: '+1 (555) 123-4567',
        secondary: '+1 (555) 123-4568',
        hours: 'Monday - Friday: 9 AM - 5 PM EST',
        action: 'Call Now'
      },
      {
        id: 2,
        type: 'email',
        title: 'Email Support',
        description: 'Send us your queries and we\'ll respond within 24 hours',
        primary: 'admissions@college.edu',
        secondary: 'support@college.edu',
        hours: '24/7 Email Support',
        action: 'Send Email'
      },
      {
        id: 3,
        type: 'visit',
        title: 'Campus Visit',
        description: 'Schedule a campus tour and meet our faculty',
        primary: 'Admissions Office, Main Campus',
        hours: 'Monday - Saturday: 10 AM - 4 PM',
        action: 'Schedule Visit'
      }
    ],
    socialChannels: [
      {
        id: 1,
        name: 'Facebook',
        platform: 'facebook',
        handle: '@CollegeOfficial',
        url: 'https://facebook.com/collegeofficial',
        icon: 'facebook',
        isActive: true
      },
      {
        id: 2,
        name: 'Twitter',
        platform: 'twitter',
        handle: '@CollegeNews',
        url: 'https://twitter.com/collegenews',
        icon: 'twitter',
        isActive: true
      },
      {
        id: 3,
        name: 'Instagram',
        platform: 'instagram',
        handle: '@CollegeLife',
        url: 'https://instagram.com/collegelife',
        icon: 'instagram',
        isActive: true
      },
      {
        id: 4,
        name: 'LinkedIn',
        platform: 'linkedin',
        handle: 'College University',
        url: 'https://linkedin.com/school/college-university',
        icon: 'linkedin',
        isActive: true
      },
      {
        id: 5,
        name: 'YouTube',
        platform: 'youtube',
        handle: 'College Channel',
        url: 'https://youtube.com/c/collegechannel',
        icon: 'youtube',
        isActive: true
      }
    ],
    campusLocations: [
      {
        id: 1,
        name: 'Main Campus',
        address: '123 Education Boulevard, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'maincampus@college.edu',
        hours: {
          weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
          saturday: 'Saturday: 9:00 AM - 2:00 PM',
          sunday: 'Sunday: Closed'
        },
        services: [
          'Admissions Office',
          'Library',
          'Student Center',
          'Cafeteria',
          'Sports Complex'
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
        isPrimary: true
      }
    ],
    // Contact Form Configuration - Added under CONTACT collection
    contactForm: {
      enabled: true,
      inquiryTypes: [
        { value: 'admission', label: 'Admission Information' },
        { value: 'program', label: 'Program Details' },
        { value: 'financial', label: 'Financial Aid & Scholarships' },
        { value: 'transfer', label: 'Transfer Credits' },
        { value: 'international', label: 'International Students' },
        { value: 'corporate', label: 'Corporate Training' },
        { value: 'support', label: 'Student Support Services' },
        { value: 'other', label: 'Other Inquiry' }
      ],
      programs: [
        { value: 'business', label: 'Business Administration' },
        { value: 'technology', label: 'Information Technology' },
        { value: 'healthcare', label: 'Healthcare Management' },
        { value: 'education', label: 'Education & Teaching' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'arts', label: 'Liberal Arts' },
        { value: 'science', label: 'Applied Sciences' },
        { value: 'undecided', label: 'Undecided / Exploring Options' }
      ],
      successMessage: 'Thank you for your inquiry! We will contact you within 24 hours.',
      submitButtonText: 'Send Inquiry',
      showNewsletter: true,
      requireTerms: true,
      formTitle: 'Send Us Your Inquiry',
      formDescription: 'Fill out the form below and our admissions team will get back to you within 24 hours.',
      sectionTitle: 'Get Started'
    }
  }
};

// Firebase operations
export const saveToFirebase = async (collectionName, data) => {
  try {
    await setDoc(doc(db, collectionName, 'data'), data);
    console.log(`Successfully saved data to ${collectionName}`);
    return { success: true };
  } catch (error) {
    console.error(`Error saving to ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const loadFromFirebase = async (collectionName) => {
  try {
    const docRef = doc(db, collectionName, 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log(`Successfully loaded data from ${collectionName}`);
      return { success: true, data: docSnap.data() };
    } else {
      console.log(`No data found in ${collectionName}, returning default data`);
      return { 
        success: true, 
        data: DEFAULT_DATA[collectionName.toUpperCase()] || {} 
      };
    }
  } catch (error) {
    console.error(`Error loading from ${collectionName}:`, error);
    return { 
      success: false, 
      error: error.message,
      data: DEFAULT_DATA[collectionName.toUpperCase()] || {}
    };
  }
};

export const updateInFirebase = async (collectionName, updates) => {
  try {
    await updateDoc(doc(db, collectionName, 'data'), updates);
    console.log(`Successfully updated ${collectionName}`);
    return { success: true };
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const initializeFirebaseData = async () => {
  try {
    const collections = Object.values(COLLECTIONS);
    const results = [];
    
    for (const collectionName of collections) {
      const docRef = doc(db, collectionName, 'data');
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        const defaultData = DEFAULT_DATA[collectionName.toUpperCase()];
        if (defaultData) {
          await setDoc(docRef, defaultData);
          results.push({ collection: collectionName, status: 'initialized' });
        }
      } else {
        results.push({ collection: collectionName, status: 'exists' });
      }
    }
    
    console.log('Firebase initialization completed:', results);
    return { success: true, results };
  } catch (error) {
    console.error('Error initializing Firebase data:', error);
    return { success: false, error: error.message };
  }
};

// Certificate verification
export const verifyCertificateSimple = async (registrationNumber) => {
  try {
    console.log('Verifying certificate:', registrationNumber);
    
    const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
    if (certDoc.exists()) {
      const certificatesData = certDoc.data();
      const certificate = certificatesData.records?.find(
        cert => cert.registrationNumber === registrationNumber
      );
      
      if (certificate) {
        console.log('Certificate found:', certificate.studentName);
        return { 
          success: true, 
          data: certificate 
        };
      } else {
        console.log('Certificate not found for number:', registrationNumber);
      }
    } else {
      console.log('Certificates collection does not exist');
    }
    
    return { 
      success: false, 
      error: 'Certificate not found in our records. Please check the registration number and try again.' 
    };
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return { 
      success: false, 
      error: 'Verification service temporarily unavailable. Please try again later.' 
    };
  }
};

// Advanced certificate verification with multiple approaches
export const verifyCertificateAdvanced = async (registrationNumber) => {
  try {
    // Try direct document access first
    const certDoc = await getDoc(doc(db, COLLECTIONS.CERTIFICATES, 'data'));
    
    if (certDoc.exists()) {
      const certificatesData = certDoc.data();
      const certificate = certificatesData.records?.find(
        cert => cert.registrationNumber === registrationNumber
      );
      
      if (certificate) {
        return { 
          success: true, 
          data: certificate,
          source: 'direct_document'
        };
      }
    }

    // Try collection query as fallback
    try {
      const certificatesRef = collection(db, COLLECTIONS.CERTIFICATES);
      const q = query(certificatesRef);
      const querySnapshot = await getDocs(q);
      
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data.records) {
          const certificate = data.records.find(
            cert => cert.registrationNumber === registrationNumber
          );
          if (certificate) {
            return { 
              success: true, 
              data: certificate,
              source: 'collection_query'
            };
          }
        }
      }
    } catch (queryError) {
      console.log('Collection query failed:', queryError);
    }

    return { 
      success: false, 
      error: 'Certificate not found',
      source: 'not_found'
    };
    
  } catch (error) {
    console.error('Error in advanced certificate verification:', error);
    return { 
      success: false, 
      error: 'Verification failed',
      source: 'error'
    };
  }
};

// Bulk operations
export const saveAllToFirebase = async (data) => {
  try {
    const operations = Object.keys(data).map(collectionName => 
      saveToFirebase(collectionName, data[collectionName])
    );
    
    const results = await Promise.all(operations);
    const allSuccess = results.every(result => result.success);
    
    return { 
      success: allSuccess, 
      results: results.map((result, index) => ({
        collection: Object.keys(data)[index],
        success: result.success,
        error: result.error
      }))
    };
  } catch (error) {
    console.error('Error in bulk save:', error);
    return { success: false, error: error.message };
  }
};

export const loadAllFromFirebase = async () => {
  try {
    const collections = Object.values(COLLECTIONS);
    const results = {};
    
    for (const collectionName of collections) {
      const result = await loadFromFirebase(collectionName);
      results[collectionName] = result;
    }
    
    return { success: true, data: results };
  } catch (error) {
    console.error('Error in bulk load:', error);
    return { success: false, error: error.message };
  }
};

// Utility functions
export const generateCertificateNumber = (department = 'HTC', courseCode = 'FIC', sequence = '001') => {
  const timestamp = new Date().getTime().toString().slice(-3);
  return `M/${department}/${courseCode}/${sequence}`;
};

export const validateCertificateData = (certificate) => {
  const requiredFields = ['registrationNumber', 'studentName', 'courseName', 'dateOfAward'];
  const missingFields = requiredFields.filter(field => !certificate[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      missingFields,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  return { valid: true };
};

// Add to your firebase.js file
export const saveMessage = async (messageData) => {
  try {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const messageDoc = {
      id: messageId,
      ...messageData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    await saveToFirebase(COLLECTIONS.MESSAGES, {
      [messageId]: messageDoc
    });

    return { success: true, messageId };
  } catch (error) {
    console.error('Error saving message:', error);
    return { success: false, error: error.message };
  }
};

export const archiveMessage = async (messageId) => {
  try {
    // Load the message
    const messagesResult = await loadFromFirebase(COLLECTIONS.MESSAGES);
    if (!messagesResult.success || !messagesResult.data || !messagesResult.data[messageId]) {
      return { success: false, error: 'Message not found' };
    }

    const message = messagesResult.data[messageId];
    const archivedMessage = {
      ...message,
      status: 'archived',
      archivedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to old_messages
    await saveToFirebase(COLLECTIONS.OLD_MESSAGES, {
      [messageId]: archivedMessage
    });

    // Remove from active messages
    const updatedMessages = { ...messagesResult.data };
    delete updatedMessages[messageId];
    await saveToFirebase(COLLECTIONS.MESSAGES, updatedMessages);

    return { success: true };
  } catch (error) {
    console.error('Error archiving message:', error);
    return { success: false, error: error.message };
  }
};

// Export default for easier imports
export default {
  db,
  COLLECTIONS,
  DEFAULT_DATA,
  saveToFirebase,
  loadFromFirebase,
  updateInFirebase,
  initializeFirebaseData,
  verifyCertificateSimple,
  verifyCertificateAdvanced,
  saveAllToFirebase,
  loadAllFromFirebase,
  generateCertificateNumber,
  validateCertificateData
};