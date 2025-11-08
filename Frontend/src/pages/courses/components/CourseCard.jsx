// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';

// const CourseCard = ({ course, onWishlistToggle, onCompareToggle, isInWishlist, isInComparison }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const formatDuration = (duration) => {
//     if (duration < 60) return `${duration} hours`;
//     const months = Math.floor(duration / 30);
//     const weeks = Math.floor((duration % 30) / 7);
//     return `${months}${months > 1 ? ' months' : ' month'}${weeks > 0 ? ` ${weeks}w` : ''}`;
//   };

//   const getDifficultyColor = (level) => {
//     switch (level?.toLowerCase()) {
//       case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
//       case 'intermediate': return 'text-amber-600 bg-amber-50 border-amber-200';
//       case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
//       default: return 'text-gray-600 bg-gray-50 border-gray-200';
//     }
//   };

//   return (
//     <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover-lift group overflow-hidden">
//       {/* Course Image */}
//       <div className="relative h-48 overflow-hidden bg-muted">
//         <Image
//           src={course?.image}
//           alt={course?.imageAlt}
//           className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
//             imageLoaded ? 'opacity-100' : 'opacity-0'
//           }`}
//           onLoad={() => setImageLoaded(true)}
//         />
        
//         {/* Overlay Actions */}
//         <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button
//             onClick={() => onWishlistToggle(course?.id)}
//             className={`p-2 rounded-full backdrop-blur-sm border transition-colors duration-200 ${
//               isInWishlist 
//                 ? 'bg-red-500 text-white border-red-500' :'bg-white/90 text-gray-600 border-white/50 hover:bg-red-50 hover:text-red-500'
//             }`}
//             aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             <Icon name="Heart" size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
//           </button>
          
//           <button
//             onClick={() => onCompareToggle(course?.id)}
//             className={`p-2 rounded-full backdrop-blur-sm border transition-colors duration-200 ${
//               isInComparison 
//                 ? 'bg-primary text-white border-primary' :'bg-white/90 text-gray-600 border-white/50 hover:bg-primary/10 hover:text-primary'
//             }`}
//             aria-label={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
//           >
//             <Icon name="GitCompare" size={16} />
//           </button>
//         </div>

//         {/* Course Badge */}
//         {course?.isNew && (
//           <div className="absolute top-3 left-3">
//             <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
//               New
//             </span>
//           </div>
//         )}

//         {/* Difficulty Level */}
//         <div className="absolute bottom-3 left-3">
//           <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(course?.level)}`}>
//             {course?.level}
//           </span>
//         </div>
//       </div>
//       {/* Course Content */}
//       <div className="p-6">
//         {/* Category & Rating */}
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-sm text-primary font-medium">{course?.category}</span>
//           <div className="flex items-center space-x-1">
//             <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
//             <span className="text-sm font-medium text-foreground">{course?.rating}</span>
//             <span className="text-sm text-muted-foreground">({course?.reviews})</span>
//           </div>
//         </div>

//         {/* Course Title */}
//         <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
//           {course?.title}
//         </h3>

//         {/* Course Description */}
//         <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
//           {course?.description}
//         </p>

//         {/* Instructor */}
//         <div className="flex items-center space-x-3 mb-4">
//           <Image
//             src={course?.instructor?.avatar}
//             alt={course?.instructor?.avatarAlt}
//             className="w-8 h-8 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-sm font-medium text-foreground">{course?.instructor?.name}</p>
//             <p className="text-xs text-muted-foreground">{course?.instructor?.title}</p>
//           </div>
//         </div>

//         {/* Course Stats */}
//         <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
//           <div className="flex items-center space-x-1">
//             <Icon name="Clock" size={14} />
//             <span>{formatDuration(course?.duration)}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="Users" size={14} />
//             <span>{course?.enrolled?.toLocaleString()} students</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Icon name="BookOpen" size={14} />
//             <span>{course?.lessons} lessons</span>
//           </div>
//         </div>

//         {/* Learning Outcomes */}
//         <div className="mb-4">
//           <p className="text-xs font-medium text-muted-foreground mb-2">You'll learn:</p>
//           <div className="flex flex-wrap gap-1">
//             {course?.outcomes?.slice(0, 3)?.map((outcome, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
//               >
//                 {outcome}
//               </span>
//             ))}
//             {course?.outcomes?.length > 3 && (
//               <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
//                 +{course?.outcomes?.length - 3} more
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Price & CTA */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             {course?.originalPrice && (
//               <span className="text-sm text-muted-foreground line-through">
//                 ${course?.originalPrice}
//               </span>
//             )}
//             <span className="text-lg font-bold text-foreground">
//               {course?.price === 0 ? 'Free' : `$${course?.price}`}
//             </span>
//           </div>
          
//           <Link to={`/courses/${course?.id}`}>
//             <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-glow-blue">
//               View Course
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;




















import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onWishlistToggle, onCompareToggle, isInWishlist, isInComparison }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Safely access course properties with fallbacks
  const courseData = course || {};
  const instructor = courseData.instructor || {};
  const outcomes = courseData.outcomes || [];

  const formatDuration = (course) => {
    if (!course) return 'N/A';
    
    // Handle different duration formats
    if (course.durationUnit === 'hours') {
      return `${course.duration || 0}h`;
    } else if (course.durationUnit === 'months') {
      const months = course.months || 0;
      if (months === 1) return '1 month';
      if (months === 0.5) return '2 weeks';
      return `${months} months`;
    } else if (course.durationUnit === 'years') {
      const years = course.years || 0;
      if (years === 1) return '1 year';
      if (years === 1.5) return '1.5 years';
      if (years === 0.5) return '6 months';
      return `${years} years`;
    }
    
    // Fallback for old format
    const duration = course.duration || 0;
    if (duration < 60) return `${duration} hours`;
    const months = Math.floor(duration / 30);
    const weeks = Math.floor((duration % 30) / 7);
    return `${months}${months > 1 ? ' months' : ' month'}${weeks > 0 ? ` ${weeks}w` : ''}`;
  };

  const getDifficultyColor = (level) => {
    if (!level) return 'text-gray-600 bg-gray-50 border-gray-200';
    
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatPrice = (price) => {
    if (price === 0 || price === '0') return 'Free';
    return `RS${price}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover-lift group overflow-hidden">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={courseData.image}
          alt={courseData.imageAlt || 'Course image'}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Course+Image';
            setImageLoaded(true);
          }}
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onWishlistToggle(courseData.id)}
            className={`p-2 rounded-full backdrop-blur-sm border transition-colors duration-200 ${
              isInWishlist 
                ? 'bg-red-500 text-white border-red-500' 
                : 'bg-white/90 text-gray-600 border-white/50 hover:bg-red-50 hover:text-red-500'
            }`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon name="Heart" size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={() => onCompareToggle(courseData.id)}
            className={`p-2 rounded-full backdrop-blur-sm border transition-colors duration-200 ${
              isInComparison 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white/90 text-gray-600 border-white/50 hover:bg-primary/10 hover:text-primary'
            }`}
            aria-label={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Icon name="GitCompare" size={16} />
          </button>
        </div>

        {/* Course Badge */}
        {courseData.isNew && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              New
            </span>
          </div>
        )}

        {/* Difficulty Level */}
        {courseData.level && (
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(courseData.level)}`}>
              {courseData.level}
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-primary font-medium">
            {courseData.category || 'Uncategorized'}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
            <span className="text-sm font-medium text-foreground">
              {courseData.rating || '0.0'}
            </span>
            <span className="text-sm text-muted-foreground">
              ({courseData.reviews || 0})
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {courseData.title || 'Untitled Course'}
        </h3>

        {/* Course Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {courseData.description || 'No description available.'}
        </p>

        {/* Instructor */}
        {instructor.name && (
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src={instructor.avatar}
              alt={instructor.avatarAlt || 'Instructor avatar'}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/32?text=Instructor';
              }}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{instructor.name}</p>
              <p className="text-xs text-muted-foreground">{instructor.title || 'Instructor'}</p>
            </div>
          </div>
        )}

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{formatDuration(courseData)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{(courseData.enrolled || 0).toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} />
            <span>{courseData.lessons } lessons</span>
          </div>
        </div>

        {/* Learning Outcomes */}
        {outcomes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">You'll learn:</p>
            <div className="flex flex-wrap gap-1">
              {outcomes.slice(0, 3).map((outcome, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                >
                  {outcome}
                </span>
              ))}
              {outcomes.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                  +{outcomes.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {courseData.originalPrice && courseData.originalPrice > courseData.price && (
              <span className="text-sm text-muted-foreground line-through">
                RS{courseData.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              {formatPrice(courseData.price)}
            </span>
          </div>
          
         <Link 
            to={{
              pathname: '/contact',
              search: `?course=${encodeURIComponent(courseData.title)}&courseId=${courseData.id}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-primary hover:shadow-glow-blue"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;