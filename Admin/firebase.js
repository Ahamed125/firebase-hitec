


















// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

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

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// // Initialize Firestore
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

// // Firebase operations
// export const saveToFirebase = async (collection, data) => {
//   try {
//     await setDoc(doc(db, collection, 'data'), data);
//     return { success: true };
//   } catch (error) {
//     console.error('Error saving to Firebase:', error);
//     return { success: false, error };
//   }
// };

// export const loadFromFirebase = async (collection) => {
//   try {
//     const docRef = doc(db, collection, 'data');
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       return { success: true, data: docSnap.data() };
//     } else {
//       return { success: false, error: 'No data found' };
//     }
//   } catch (error) {
//     console.error('Error loading from Firebase:', error);
//     return { success: false, error };
//   }
// };

// export const updateInFirebase = async (collection, updates) => {
//   try {
//     await updateDoc(doc(db, collection, 'data'), updates);
//     return { success: true };
//   } catch (error) {
//     console.error('Error updating in Firebase:', error);
//     return { success: false, error };
//   }
// };

// export default app;




















import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
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

// Firebase operations
export const saveToFirebase = async (collection, data) => {
  try {
    await setDoc(doc(db, collection, 'data'), data);
    return { success: true };
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    return { success: false, error };
  }
};

export const loadFromFirebase = async (collection) => {
  try {
    const docRef = doc(db, collection, 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'No data found' };
    }
  } catch (error) {
    console.error('Error loading from Firebase:', error);
    return { success: false, error };
  }
};

export const updateInFirebase = async (collection, updates) => {
  try {
    await updateDoc(doc(db, collection, 'data'), updates);
    return { success: true };
  } catch (error) {
    console.error('Error updating in Firebase:', error);
    return { success: false, error };
  }
};

export default app;