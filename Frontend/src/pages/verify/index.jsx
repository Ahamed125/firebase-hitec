// import React, { useState, useEffect } from 'react';
// import Header from '../../components/ui/Header';
// import Input from '../../components/ui/Input';
// import Button from '../../components/ui/Button';
// import Icon from '../../components/AppIcon';
// import { verifyCertificateSimple } from '../../../firebase';
// import { Helmet } from 'react-helmet';

// const Verify = () => {
//   const [certNo, setCertNo] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const onVerify = async (e) => {
//     e.preventDefault();
    
//     if (!certNo.trim()) {
//       setResult({ ok: false, error: 'Please enter a certificate number' });
//       return;
//     }

//     setLoading(true);
//     setResult(null);
//     setImagePreview(null);

//     try {
//       const verificationResult = await verifyCertificateSimple(certNo.trim());

//       if (verificationResult.success) {
//         setResult({ 
//           ok: true, 
//           data: verificationResult.data
//         });
//       } else {
//         setResult({ 
//           ok: false, 
//           error: verificationResult.error || 'Certificate not found'
//         });
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       setResult({ 
//         ok: false, 
//         error: 'Network error. Please try again.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImagePreview = (imageUrl) => {
//     setImagePreview(imageUrl);
//   };

//   const closeImagePreview = () => {
//     setImagePreview(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const getCertificateTypeDisplay = (type) => {
//     const typeMap = {
//       'completion': 'Course Completion',
//       'excellence': 'Excellence Award',
//       'merit': 'Merit Certificate',
//       'honors': 'Honors Diploma'
//     };
//     return typeMap[type] || type || 'Certificate';
//   };

//   const getGradeColor = (grade) => {
//     if (!grade) return 'text-gray-600 bg-gray-100';
    
//     switch (grade.toUpperCase()) {
//       case 'A+': case 'A': return 'text-green-600 bg-green-100';
//       case 'B+': case 'B': return 'text-blue-600 bg-blue-100';
//       case 'C+': case 'C': return 'text-yellow-600 bg-yellow-100';
//       case 'D': return 'text-orange-600 bg-orange-100';
//       case 'F': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   // Generate structured data for SEO
//   const generateStructuredData = () => {
//     const baseStructuredData = {
//       "@context": "https://schema.org",
//       "@type": "WebPage",
//       "name": "Verify Credentials - Hi-tec College",
//       "description": "Verify the authenticity of Hi-tec College certificates and credentials using our secure verification system.",
//       "url": typeof window !== 'undefined' ? window.location.href : '',
//       "mainEntity": {
//         "@type": "Service",
//         "name": "Certificate Verification",
//         "description": "Digital certificate verification service for Hi-tec College credentials",
//         "provider": {
//           "@type": "EducationalOrganization",
//           "name": "Hi-tec College",
//           "url": "https://hiteccollege.com"
//         }
//       }
//     };

//     return JSON.stringify(baseStructuredData);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Verify Credentials | Hi-tec College Certificate Verification</title>
//         <meta 
//           name="description" 
//           content="Verify the authenticity of Hi-tec College certificates. Enter certificate number to validate credentials, check student information, and confirm certification details." 
//         />
//         <meta 
//           name="keywords" 
//           content="certificate verification, verify credentials, Hi-tec College, certificate validation, student certificate, course completion, educational credentials" 
//         />
//         <meta name="robots" content="index, follow" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
        
//         {/* Open Graph Meta Tags */}
//         <meta property="og:title" content="Verify Credentials | Hi-tec College Certificate Verification" />
//         <meta 
//           property="og:description" 
//           content="Secure certificate verification system for Hi-tec College. Validate educational credentials and certificate authenticity." 
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
//         <meta property="og:site_name" content="Hi-tec College" />
        
//         {/* Twitter Card Meta Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Verify Credentials | Hi-tec College" />
//         <meta 
//           name="twitter:description" 
//           content="Verify Hi-tec College certificates with our secure validation system. Ensure credential authenticity instantly." 
//         />
        
//         {/* Canonical URL */}
//         <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
//         {/* Structured Data */}
//         <script type="application/ld+json">
//           {generateStructuredData()}
//         </script>
        
//         {/* Additional SEO Meta Tags */}
//         <meta name="author" content="Hi-tec College" />
//         <meta name="language" content="en" />
//         <meta name="revisit-after" content="7 days" />
//         <meta name="rating" content="General" />
//         <meta name="distribution" content="Global" />
//       </Helmet>

//       <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
//         <Header />
        
//         {/* Image Preview Modal */}
//         {imagePreview && (
//           <div 
//             className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//             onClick={closeImagePreview}
//           >
//             <div className="relative max-w-4xl max-h-full w-full">
//               <button 
//                 className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
//                 onClick={closeImagePreview}
//                 aria-label="Close image preview"
//               >
//                 <Icon name="X" size={24} />
//               </button>
//               <img 
//                 src={imagePreview} 
//                 alt="Student Preview" 
//                 className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//         )}

//         <main className="pt-24 pb-16">
//           <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Centered Verification Card */}
//             <div className="flex flex-col items-center justify-center min-h-[50vh]">
//               <div className="bg-card rounded-brand shadow-brand-lg border border-border overflow-hidden w-full max-w-2xl">
//                 {/* Card Header */}
//                 <div className="bg-primary/10 border-b border-border px-4 sm:px-6 py-5 flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
//                     <Icon name="ShieldCheck" size={20} />
//                   </div>
//                   <div>
//                     <h1 className="text-xl font-semibold text-gray-900">Verify Credentials</h1>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Enter the certificate registration number to verify authenticity.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Card Body */}
//                 <div className="p-4 sm:p-6">
//                   <form onSubmit={onVerify} className="space-y-4">
//                     <div className="space-y-2">
//                       <label htmlFor="certificate-number" className="text-sm text-muted-foreground block">
//                         Certificate Number
//                       </label>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <Input
//                           id="certificate-number"
//                           placeholder="e.g., M/HTC/FIC/825"
//                           value={certNo}
//                           onChange={(e) => setCertNo(e.target.value)}
//                           className="flex-1"
//                           disabled={loading}
//                           aria-describedby="certificate-help"
//                         />
//                         <Button 
//                           type="submit" 
//                           loading={loading} 
//                           iconName="Search"
//                           disabled={loading || !certNo.trim()}
//                           className="w-full sm:w-auto"
//                         >
//                           {loading ? 'Verifying...' : 'Verify'}
//                         </Button>
//                       </div>
//                       <p id="certificate-help" className="text-xs text-muted-foreground">
//                         Case-sensitive. Use the exact format printed on the certificate.
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>

//             {/* Results Section - Appears below the verification card */}
//             <div className="mt-8 space-y-4">
//               {result && result.ok && result.data && (
//                 <div className="rounded-lg border border-green-300 bg-green-50 p-4 sm:p-6 text-green-900" role="alert" aria-live="polite">
//                   <div className="flex items-start gap-3">
//                     <Icon name="BadgeCheck" className="mt-0.5 text-green-600 flex-shrink-0" size={24} />
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
//                         <h2 className="text-xl font-semibold">Certificate Verified</h2>
//                         <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full w-fit">
//                           {getCertificateTypeDisplay(result.data.certificateType)}
//                         </span>
//                       </div>
                      
//                       <p className="mb-6 text-sm bg-green-100 p-3 rounded-lg">
//                         The registration number <strong className="font-semibold">{result.data.registrationNumber}</strong> is valid and 
//                         issued by Hi-tec College. This certificate has been verified through our secure database.
//                       </p>

//                       {/* Student Profile Section */}
//                       <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
//                         <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                           <Icon name="User" size={16} />
//                           Student Information
//                         </h3>
//                         <div className="flex flex-col sm:flex-row items-start gap-4">
//                           {/* Student Profile Picture - Clickable for Preview */}
//                           <div className="flex-shrink-0 mx-auto sm:mx-0">
//                             {result.data.studentProfilePicture ? (
//                               <button
//                                 onClick={() => handleImagePreview(result.data.studentProfilePicture)}
//                                 className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 rounded-full"
//                                 aria-label="View student profile picture"
//                               >
//                                 <img
//                                   src={result.data.studentProfilePicture}
//                                   alt={`Profile picture of ${result.data.studentName}`}
//                                   className="w-20 h-20 rounded-full object-cover border-2 border-green-300 shadow-sm"
//                                   onError={(e) => {
//                                     e.target.src = 'https://via.placeholder.com/80?text=Student';
//                                   }}
//                                 />
//                               </button>
//                             ) : (
//                               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
//                                 <Icon name="User" size={24} className="text-green-600" />
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Student Details */}
//                           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//                             <div className="col-span-2 md:col-span-1">
//                               <label className="text-xs text-gray-500 uppercase font-medium">Full Name</label>
//                               <p className="font-semibold text-gray-900 break-words">{result.data.studentName}</p>
//                             </div>
                            
//                             {result.data.studentEmail && (
//                               <div>
//                                 <label className="text-xs text-gray-500 uppercase font-medium">Email</label>
//                                 <p className="text-sm text-gray-700 break-all">{result.data.studentEmail}</p>
//                               </div>
//                             )}
                            
//                             {result.data.studentPhone && (
//                               <div>
//                                 <label className="text-xs text-gray-500 uppercase font-medium">Phone</label>
//                                 <p className="text-sm text-gray-700">{result.data.studentPhone}</p>
//                               </div>
//                             )}
                            
//                             {result.data.grade && (
//                               <div>
//                                 <label className="text-xs text-gray-500 uppercase font-medium">Grade</label>
//                                 <span className={`text-xs font-medium px-2 py-1 rounded-full ${getGradeColor(result.data.grade)}`}>
//                                   {result.data.grade}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Course Information */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//                         <div className="space-y-4">
//                           <div className="bg-white rounded-lg p-4 border border-green-200">
//                             <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                               <Icon name="BookOpen" size={16} />
//                               Course Details
//                             </h4>
//                             <div className="space-y-3">
//                               <div>
//                                 <div className="text-gray-600 text-xs uppercase font-medium">Course Name</div>
//                                 <div className="font-medium text-gray-900">{result.data.courseName}</div>
//                               </div>
                              
//                               {result.data.courseCategory && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Category</div>
//                                   <div className="font-medium text-gray-900">{result.data.courseCategory}</div>
//                                 </div>
//                               )}
                              
//                               {result.data.duration && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Duration</div>
//                                   <div className="font-medium text-gray-900">{result.data.duration}</div>
//                                 </div>
//                               )}
                              
//                               {result.data.credits && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Credits</div>
//                                   <div className="font-medium text-gray-900">{result.data.credits}</div>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="space-y-4">
//                           <div className="bg-white rounded-lg p-4 border border-green-200">
//                             <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                               <Icon name="Award" size={16} />
//                               Award Information
//                             </h4>
//                             <div className="space-y-3">
//                               <div>
//                                 <div className="text-gray-600 text-xs uppercase font-medium">Date of Award</div>
//                                 <div className="font-medium text-gray-900">{formatDate(result.data.dateOfAward)}</div>
//                               </div>
                              
//                               {result.data.expiryDate && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Expiry Date</div>
//                                   <div className="font-medium text-gray-900">{formatDate(result.data.expiryDate)}</div>
//                                 </div>
//                               )}
                              
//                               {result.data.instructorName && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Instructor</div>
//                                   <div className="font-medium text-gray-900">{result.data.instructorName}</div>
//                                 </div>
//                               )}
                              
//                               {result.data.department && (
//                                 <div>
//                                   <div className="text-gray-600 text-xs uppercase font-medium">Department</div>
//                                   <div className="font-medium text-gray-900">{result.data.department}</div>
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Skills Section */}
//                           {result.data.skills && result.data.skills.length > 0 && (
//                             <div className="bg-white rounded-lg p-4 border border-green-200">
//                               <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                                 <Icon name="Zap" size={16} />
//                                 Skills Acquired
//                               </h4>
//                               <div className="flex flex-wrap gap-2">
//                                 {result.data.skills.map((skill, index) => (
//                                   <span
//                                     key={index}
//                                     className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full border border-green-200"
//                                   >
//                                     {skill}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Verification Details */}
//                       <div className="mt-6 pt-4 border-t border-green-200">
//                         <p className="text-xs text-gray-600">
//                           Verified on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {result && !result.ok && (
//                 <div className="rounded-lg border border-red-300 bg-red-50 p-4 sm:p-6 text-red-900" role="alert" aria-live="polite">
//                   <div className="flex items-start gap-3">
//                     <Icon name="AlertTriangle" className="mt-0.5 text-red-600 flex-shrink-0" size={24} />
//                     <div>
//                       <h2 className="text-lg font-semibold mb-1">Verification Failed</h2>
//                       <p className="text-sm mb-2">{result.error || 'Certificate not found in our records.'}</p>
//                       <p className="text-xs text-red-700">
//                         Please check the certificate number and try again. If the problem persists, 
//                         contact the administration office.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Verify;









import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { verifyCertificateSimple } from '../../../firebase';
import { Helmet } from 'react-helmet';

const Verify = () => {
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onVerify = async (e) => {
    e.preventDefault();
    
    if (!certNo.trim()) {
      setResult({ ok: false, error: 'Please enter a certificate number' });
      return;
    }

    setLoading(true);
    setResult(null);
    setImagePreview(null);

    try {
      const verificationResult = await verifyCertificateSimple(certNo.trim());

      if (verificationResult.success) {
        setResult({ 
          ok: true, 
          data: verificationResult.data
        });
      } else {
        setResult({ 
          ok: false, 
          error: verificationResult.error || 'Certificate not found'
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setResult({ 
        ok: false, 
        error: 'Network error. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  const closeImagePreview = () => {
    setImagePreview(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getCertificateTypeDisplay = (type) => {
    const typeMap = {
      'completion': 'Course Completion',
      'excellence': 'Excellence Award',
      'merit': 'Merit Certificate',
      'honors': 'Honors Diploma'
    };
    return typeMap[type] || type || 'Certificate';
  };

  const getGradeColor = (grade) => {
    if (!grade) return 'text-gray-600 bg-gray-100';
    
    switch (grade.toUpperCase()) {
      case 'A+': case 'A': return 'text-green-600 bg-green-100';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-100';
      case 'C+': case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Verify Credentials - Hi-tec College",
      "description": "Verify the authenticity of Hi-tec College certificates and credentials using our secure verification system.",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "mainEntity": {
        "@type": "Service",
        "name": "Certificate Verification",
        "description": "Digital certificate verification service for Hi-tec College credentials",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Hi-tec College",
          "url": "https://hiteccollege.com"
        }
      }
    };

    return JSON.stringify(baseStructuredData);
  };

  return (
    <>
      <Helmet>
        <title>Verify Credentials | Hi-tec College Certificate Verification</title>
        <meta 
          name="description" 
          content="Verify the authenticity of Hi-tec College certificates. Enter certificate number to validate credentials, check student information, and confirm certification details." 
        />
        <meta 
          name="keywords" 
          content="certificate verification, verify credentials, Hi-tec College, certificate validation, student certificate, course completion, educational credentials" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Verify Credentials | Hi-tec College Certificate Verification" />
        <meta 
          property="og:description" 
          content="Secure certificate verification system for Hi-tec College. Validate educational credentials and certificate authenticity." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:site_name" content="Hi-tec College" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verify Credentials | Hi-tec College" />
        <meta 
          name="twitter:description" 
          content="Verify Hi-tec College certificates with our secure validation system. Ensure credential authenticity instantly." 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {generateStructuredData()}
        </script>
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Hi-tec College" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <Header />
        
        {/* Image Preview Modal */}
        {imagePreview && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeImagePreview}
          >
            <div className="relative max-w-4xl max-h-full w-full">
              <button 
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                onClick={closeImagePreview}
                aria-label="Close image preview"
              >
                <Icon name="X" size={24} />
              </button>
              <img 
                src={imagePreview} 
                alt="Student Preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        <main className="pt-24 pb-16">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Icon name="ShieldCheck" size={16} />
                Secure Verification System
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Verify Your <span className="text-blue-600">Credentials</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Authenticate your Hi-tec College certificates with our secure digital verification platform
              </p>
            </div>

            {/* Verification Card */}
            <div className="flex flex-col items-center justify-center mb-16">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-full max-w-2xl transform hover:shadow-2xl transition-all duration-300">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="ShieldCheck" size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Certificate Verification</h2>
                  <p className="text-blue-100 text-lg">
                    Verify authenticity in seconds
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  <form onSubmit={onVerify} className="space-y-6">
                    <div className="space-y-3">
                      <label htmlFor="certificate-number" className="text-sm font-medium text-gray-700 block">
                        Certificate Registration Number
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                          <Input
                            id="certificate-number"
                            placeholder="e.g., M/HTC/FIC/825"
                            value={certNo}
                            onChange={(e) => setCertNo(e.target.value)}
                            className="pl-12 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                            disabled={loading}
                            aria-describedby="certificate-help"
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Icon name="Search" size={20} />
                          </div>
                        </div>
                        <Button 
                          type="submit" 
                          loading={loading} 
                          iconName="ShieldCheck"
                          disabled={loading || !certNo.trim()}
                          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          {loading ? 'Verifying...' : 'Verify Now'}
                        </Button>
                      </div>
                      <p id="certificate-help" className="text-sm text-gray-500">
                        Enter the exact certificate number as shown on your credential document
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-8">
              {result && result.ok && result.data && (
                <div className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden" role="alert" aria-live="polite">
                  {/* Success Header */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon name="BadgeCheck" size={24} />
                        </div>
                        <div className="text-left">
                          <h2 className="text-2xl font-bold">Certificate Verified</h2>
                          <p className="text-green-100">This credential is authentic and valid</p>
                        </div>
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {getCertificateTypeDisplay(result.data.certificateType)}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Verification Summary */}
                    <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon name="CheckCircle" size={20} className="text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Verification Successful</h3>
                      </div>
                      <p className="text-green-800">
                        The registration number <strong className="font-bold">{result.data.registrationNumber}</strong> has been successfully 
                        verified through our secure database. This certificate was issued by Hi-tec College and is authentic.
                      </p>
                    </div>

                    {/* Student Profile Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                      {/* Student Card */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Icon name="User" size={20} className="text-blue-600" />
                            Student Profile
                          </h3>
                          
                          {/* Profile Picture */}
                          <div className="flex justify-center mb-4">
                            {result.data.studentProfilePicture ? (
                              <button
                                onClick={() => handleImagePreview(result.data.studentProfilePicture)}
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-full"
                                aria-label="View student profile picture"
                              >
                                <img
                                  src={result.data.studentProfilePicture}
                                  alt={`Profile picture of ${result.data.studentName}`}
                                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/96?text=Student';
                                  }}
                                />
                              </button>
                            ) : (
                              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <Icon name="User" size={32} className="text-blue-600" />
                              </div>
                            )}
                          </div>

                          {/* Student Details */}
                          <div className="space-y-4">
                            <div className="text-center">
                              <h4 className="font-bold text-xl text-gray-900 mb-1">{result.data.studentName}</h4>
                              {result.data.grade && (
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getGradeColor(result.data.grade)}`}>
                                  Grade: {result.data.grade}
                                </span>
                              )}
                            </div>

                            <div className="space-y-3">
                              {result.data.studentEmail && (
                                <div className="flex items-center gap-3 text-sm">
                                  <Icon name="Mail" size={16} className="text-gray-400" />
                                  <span className="text-gray-700 break-all">{result.data.studentEmail}</span>
                                </div>
                              )}
                              
                              {result.data.studentPhone && (
                                <div className="flex items-center gap-3 text-sm">
                                  <Icon name="Phone" size={16} className="text-gray-400" />
                                  <span className="text-gray-700">{result.data.studentPhone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course & Award Information */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Course Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Icon name="BookOpen" size={20} className="text-blue-600" />
                              Course Information
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Course Name</div>
                                <div className="font-bold text-gray-900 text-lg">{result.data.courseName}</div>
                              </div>
                              
                              {result.data.courseCategory && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Category</div>
                                  <div className="font-semibold text-gray-900">{result.data.courseCategory}</div>
                                </div>
                              )}
                              
                              {result.data.duration && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Duration</div>
                                  <div className="font-semibold text-gray-900">{result.data.duration}</div>
                                </div>
                              )}
                              
                              {result.data.credits && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Credits</div>
                                  <div className="font-semibold text-gray-900">{result.data.credits}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Award Information */}
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Icon name="Award" size={20} className="text-yellow-600" />
                              Award Details
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Date of Award</div>
                                <div className="font-bold text-gray-900">{formatDate(result.data.dateOfAward)}</div>
                              </div>
                              
                              {result.data.expiryDate && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Expiry Date</div>
                                  <div className="font-semibold text-gray-900">{formatDate(result.data.expiryDate)}</div>
                                </div>
                              )}
                              
                              {result.data.instructorName && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Instructor</div>
                                  <div className="font-semibold text-gray-900">{result.data.instructorName}</div>
                                </div>
                              )}
                              
                              {result.data.department && (
                                <div>
                                  <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide mb-1">Department</div>
                                  <div className="font-semibold text-gray-900">{result.data.department}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Skills Section */}
                        {result.data.skills && result.data.skills.length > 0 && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Icon name="Zap" size={20} className="text-blue-600" />
                              Skills Acquired
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {result.data.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-white text-blue-700 px-4 py-2 rounded-full border border-blue-200 font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Verification Footer */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={16} />
                          <span>Verified on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Shield" size={16} />
                          <span>Secured by Hi-tec College Verification System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result && !result.ok && (
                <div className="bg-white rounded-2xl shadow-xl border border-red-200 overflow-hidden" role="alert" aria-live="polite">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-8 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon name="AlertTriangle" size={24} />
                      </div>
                      <div className="text-left">
                        <h2 className="text-2xl font-bold">Verification Failed</h2>
                        <p className="text-red-100">Unable to verify the provided certificate</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon name="XCircle" size={20} className="text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Certificate Not Found</h3>
                      </div>
                      <p className="text-red-800 mb-4">
                        {result.error || 'The certificate number you entered does not match any records in our database.'}
                      </p>
                      <div className="space-y-2 text-sm text-red-700">
                        <p>Please ensure you have entered the correct certificate number.</p>
                        <p>If you believe this is an error, please contact our administration office for assistance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Shield" size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure Verification</h3>
                <p className="text-gray-600 text-sm">All certificates are verified through our encrypted database</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Clock" size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get immediate verification results within seconds</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Users" size={24} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Trusted Platform</h3>
                <p className="text-gray-600 text-sm">Used by employers and institutions worldwide</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Verify;