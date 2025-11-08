// import React from 'react';
// import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
// import Button from '../../../components/ui/Button';

// const CourseComparison = ({ courses, onRemoveCourse, onClearComparison, isOpen, onToggle }) => {
//   if (!courses || courses?.length === 0) return null;

//   const formatDuration = (duration) => {
//     if (duration < 60) return `${duration} hours`;
//     const months = Math.floor(duration / 30);
//     const weeks = Math.floor((duration % 30) / 7);
//     return `${months}${months > 1 ? ' months' : ' month'}${weeks > 0 ? ` ${weeks}w` : ''}`;
//   };

//   const comparisonFeatures = [
//     { key: 'price', label: 'Price', icon: 'DollarSign' },
//     { key: 'duration', label: 'Duration', icon: 'Clock' },
//     { key: 'level', label: 'Level', icon: 'BarChart3' },
//     { key: 'lessons', label: 'Lessons', icon: 'BookOpen' },
//     { key: 'enrolled', label: 'Students', icon: 'Users' },
//     { key: 'rating', label: 'Rating', icon: 'Star' },
//     { key: 'certificate', label: 'Certificate', icon: 'Award' },
//     { key: 'lifetime', label: 'Lifetime Access', icon: 'Infinity' },
//     { key: 'mobile', label: 'Mobile Access', icon: 'Smartphone' },
//     { key: 'support', label: 'Support', icon: 'MessageCircle' }
//   ];

//   const getFeatureValue = (course, feature) => {
//     switch (feature) {
//       case 'price':
//         return course?.price === 0 ? 'Free' : `$${course?.price}`;
//       case 'duration':
//         return formatDuration(course?.duration);
//       case 'enrolled':
//         return course?.enrolled?.toLocaleString();
//       case 'rating':
//         return `${course?.rating} (${course?.reviews})`;
//       case 'certificate':
//       case 'lifetime': case'mobile': case'support':
//         return course?.features && course?.features?.includes(feature) ? 'Yes' : 'No';
//       default:
//         return course?.[feature] || 'N/A';
//     }
//   };

//   const getBestValue = (feature) => {
//     if (courses?.length < 2) return null;
    
//     switch (feature) {
//       case 'price':
//         return Math.min(...courses?.map(c => c?.price));
//       case 'duration':
//         return Math.max(...courses?.map(c => c?.duration));
//       case 'lessons':
//         return Math.max(...courses?.map(c => c?.lessons));
//       case 'enrolled':
//         return Math.max(...courses?.map(c => c?.enrolled));
//       case 'rating':
//         return Math.max(...courses?.map(c => c?.rating));
//       default:
//         return null;
//     }
//   };

//   const isBestValue = (course, feature) => {
//     const bestValue = getBestValue(feature);
//     if (bestValue === null) return false;
    
//     switch (feature) {
//       case 'price':
//         return course?.price === bestValue;
//       case 'duration': case'lessons': case'enrolled': case'rating':
//         return course?.[feature] === bestValue;
//       default:
//         return false;
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={onToggle}
//         />
//       )}
//       {/* Comparison Panel */}
//       <div className={`fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto bg-background border-t lg:border border-border z-50 lg:z-auto transform transition-transform duration-300 lg:transform-none rounded-t-xl lg:rounded-xl shadow-lg ${
//         isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
//       }`}>
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-border">
//           <div className="flex items-center space-x-3">
//             <Icon name="GitCompare" size={20} className="text-primary" />
//             <h3 className="text-lg font-semibold text-foreground">
//               Compare Courses ({courses?.length})
//             </h3>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClearComparison}
//               className="text-muted-foreground hover:text-foreground"
//             >
//               <Icon name="Trash2" size={16} className="mr-2" />
//               Clear All
//             </Button>
            
//             <button
//               onClick={onToggle}
//               className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 lg:hidden"
//             >
//               <Icon name={isOpen ? "ChevronDown" : "ChevronUp"} size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Comparison Content */}
//         <div className="p-4 max-h-96 lg:max-h-none overflow-y-auto">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-max">
//               <thead>
//                 <tr>
//                   <th className="text-left p-3 w-32">
//                     <span className="text-sm font-medium text-muted-foreground">Feature</span>
//                   </th>
//                   {courses?.map((course) => (
//                     <th key={course?.id} className="text-left p-3 min-w-64">
//                       <div className="space-y-3">
//                         {/* Course Image */}
//                         <div className="relative">
//                           <Image
//                             src={course?.image}
//                             alt={course?.imageAlt}
//                             className="w-full h-32 object-cover rounded-lg"
//                           />
//                           <button
//                             onClick={() => onRemoveCourse(course?.id)}
//                             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
//                             aria-label="Remove from comparison"
//                           >
//                             <Icon name="X" size={14} />
//                           </button>
//                         </div>
                        
//                         {/* Course Info */}
//                         <div>
//                           <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
//                             {course?.title}
//                           </h4>
//                           <p className="text-xs text-muted-foreground">
//                             {course?.instructor?.name}
//                           </p>
//                         </div>
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
              
//               <tbody>
//                 {comparisonFeatures?.map((feature) => (
//                   <tr key={feature?.key} className="border-t border-border">
//                     <td className="p-3">
//                       <div className="flex items-center space-x-2">
//                         <Icon name={feature?.icon} size={16} className="text-muted-foreground" />
//                         <span className="text-sm font-medium text-foreground">
//                           {feature?.label}
//                         </span>
//                       </div>
//                     </td>
//                     {courses?.map((course) => {
//                       const value = getFeatureValue(course, feature?.key);
//                       const isBest = isBestValue(course, feature?.key);
                      
//                       return (
//                         <td key={course?.id} className="p-3">
//                           <div className={`text-sm ${
//                             isBest 
//                               ? 'text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md' :'text-foreground'
//                           }`}>
//                             {feature?.key === 'rating' && (
//                               <div className="flex items-center space-x-1">
//                                 <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
//                                 <span>{value}</span>
//                               </div>
//                             )}
//                             {feature?.key !== 'rating' && value}
//                             {isBest && (
//                               <Icon name="Crown" size={14} className="ml-1 inline text-amber-500" />
//                             )}
//                           </div>
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-6 pt-4 border-t border-border">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {courses?.map((course) => (
//                 <Button
//                   key={course?.id}
//                   variant="default"
//                   className="bg-gradient-primary hover:shadow-glow-blue"
//                   fullWidth
//                 >
//                   Enroll in {course?.title?.split(' ')?.slice(0, 2)?.join(' ')}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CourseComparison;























import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseComparison = ({ courses, onRemoveCourse, onClearComparison, isOpen, onToggle }) => {
  if (!courses || courses?.length === 0) return null;

  const formatDuration = (duration) => {
    if (duration < 60) return `${duration} hours`;
    const months = Math.floor(duration / 30);
    const weeks = Math.floor((duration % 30) / 7);
    return `${months}${months > 1 ? ' months' : ' month'}${weeks > 0 ? ` ${weeks}w` : ''}`;
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price', icon: 'DollarSign' },
    { key: 'duration', label: 'Duration', icon: 'Clock' },
    { key: 'level', label: 'Level', icon: 'BarChart3' },
    { key: 'lessons', label: 'Lessons', icon: 'BookOpen' },
    { key: 'enrolled', label: 'Students', icon: 'Users' },
    { key: 'rating', label: 'Rating', icon: 'Star' },
    { key: 'certificate', label: 'Certificate', icon: 'Award' },
    { key: 'lifetime', label: 'Lifetime Access', icon: 'Infinity' },
    { key: 'mobile', label: 'Mobile Access', icon: 'Smartphone' },
    { key: 'support', label: 'Support', icon: 'MessageCircle' }
  ];

  const getFeatureValue = (course, feature) => {
    switch (feature) {
      case 'price':
        return course?.price === 0 ? 'Free' : `$${course?.price}`;
      case 'duration':
        return formatDuration(course?.duration);
      case 'enrolled':
        return course?.enrolled?.toLocaleString();
      case 'rating':
        return `${course?.rating} (${course?.reviews})`;
      case 'certificate':
      case 'lifetime': 
      case 'mobile': 
      case 'support':
        return course?.features && course?.features?.includes(feature) ? 'Yes' : 'No';
      default:
        return course?.[feature] || 'N/A';
    }
  };

  const getBestValue = (feature) => {
    if (courses?.length < 2) return null;
    
    switch (feature) {
      case 'price':
        return Math.min(...courses?.map(c => c?.price));
      case 'duration':
        return Math.max(...courses?.map(c => c?.duration));
      case 'lessons':
        return Math.max(...courses?.map(c => c?.lessons));
      case 'enrolled':
        return Math.max(...courses?.map(c => c?.enrolled));
      case 'rating':
        return Math.max(...courses?.map(c => c?.rating));
      default:
        return null;
    }
  };

  const isBestValue = (course, feature) => {
    const bestValue = getBestValue(feature);
    if (bestValue === null) return false;
    
    switch (feature) {
      case 'price':
        return course?.price === bestValue;
      case 'duration': 
      case 'lessons': 
      case 'enrolled': 
      case 'rating':
        return course?.[feature] === bestValue;
      default:
        return false;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Comparison Panel */}
      <div className={`fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto bg-background border-t lg:border border-border z-50 lg:z-auto transform transition-transform duration-300 lg:transform-none rounded-t-xl lg:rounded-xl shadow-lg ${
        isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Compare Courses ({courses?.length})
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearComparison}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Clear All
            </Button>
            
            <button
              onClick={onToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 lg:hidden"
            >
              <Icon name={isOpen ? "ChevronDown" : "ChevronUp"} size={20} />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="p-4 max-h-96 lg:max-h-none overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr>
                  <th className="text-left p-3 w-32">
                    <span className="text-sm font-medium text-muted-foreground">Feature</span>
                  </th>
                  {courses?.map((course) => (
                    <th key={course?.id} className="text-left p-3 min-w-64">
                      <div className="space-y-3">
                        {/* Course Image */}
                        <div className="relative">
                          <Image
                            src={course?.image}
                            alt={course?.imageAlt}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => onRemoveCourse(course?.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                            aria-label="Remove from comparison"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                        
                        {/* Course Info */}
                        <div>
                          <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
                            {course?.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {course?.instructor?.name}
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {comparisonFeatures?.map((feature) => (
                  <tr key={feature?.key} className="border-t border-border">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={feature?.icon} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {feature?.label}
                        </span>
                      </div>
                    </td>
                    {courses?.map((course) => {
                      const value = getFeatureValue(course, feature?.key);
                      const isBest = isBestValue(course, feature?.key);
                      
                      return (
                        <td key={course?.id} className="p-3">
                          <div className={`text-sm ${
                            isBest 
                              ? 'text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md' 
                              : 'text-foreground'
                          }`}>
                            {feature?.key === 'rating' && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
                                <span>{value}</span>
                              </div>
                            )}
                            {feature?.key !== 'rating' && value}
                            {isBest && (
                              <Icon name="Crown" size={14} className="ml-1 inline text-amber-500" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses?.map((course) => (
                <Button
                  key={course?.id}
                  variant="default"
                  className="bg-gradient-primary hover:shadow-glow-blue"
                  fullWidth
                >
                  Enroll in {course?.title?.split(' ')?.slice(0, 2)?.join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseComparison;