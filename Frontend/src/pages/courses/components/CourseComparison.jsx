import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseComparison = ({ courses, onRemoveCourse, onClearComparison, isOpen, onToggle }) => {
  const navigate = useNavigate();

  if (!courses || courses?.length === 0) return null;

  // Enhanced duration formatting to match your Courses component
  const formatDuration = (course) => {
    if (!course) return 'Not specified';
    
    // Handle different duration units from your Courses component
    if (course.durationUnit === 'hours' && course.duration > 0) {
      return `${course.duration}h`;
    } else if (course.durationUnit === 'months' && course.months > 0) {
      if (course.months === 1) return '1 month';
      if (course.months === 0.5) return '2 weeks';
      return `${course.months} months`;
    } else if (course.durationUnit === 'years' && course.years > 0) {
      if (course.years === 1) return '1 year';
      if (course.years === 1.5) return '1.5 years';
      if (course.years === 0.5) return '6 months';
      return `${course.years} years`;
    }
    
    // Fallback to original duration field
    if (course.duration && course.duration > 0) {
      if (course.duration < 60) return `${course.duration} hours`;
      const months = Math.floor(course.duration / 30);
      const weeks = Math.floor((course.duration % 30) / 7);
      return `${months}${months > 1 ? ' months' : ' month'}${weeks > 0 ? ` ${weeks}w` : ''}`;
    }
    
    return 'Not specified';
  };

  // Format number display - consistent with your Courses component
  const formatNumber = (value) => {
    return value === 0 || value === '' || !value ? '-' : value;
  };

  // Format price in Sri Lankan Rupees - consistent with your Courses component
  const formatPrice = (price) => {
    if (price === 0 || price === '' || !price) return 'Free';
    return `RS ${price.toLocaleString('en-LK')}`;
  };

  // Handle enrollment button click
  const handleEnrollClick = (course) => {
    // Navigate to contact page with course information
    navigate('/contact', {
      state: {
        courseInfo: {
          id: course.id,
          title: course.title,
          price: course.price,
          instructor: course.instructor?.name,
          category: course.category,
          level: course.level
        },
        intent: 'enrollment'
      }
    });
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price', icon: 'DollarSign' },
    { key: 'duration', label: 'Duration', icon: 'Clock' },
    { key: 'level', label: 'Level', icon: 'BarChart3' },
    { key: 'category', label: 'Category', icon: 'Tag' },
    { key: 'lessons', label: 'Lessons', icon: 'BookOpen' },
    { key: 'enrolled', label: 'Students', icon: 'Users' },
    { key: 'rating', label: 'Rating', icon: 'Star' },
    { key: 'instructor', label: 'Instructor', icon: 'User' },
    { key: 'description', label: 'Description', icon: 'FileText' }
  ];

  const getFeatureValue = (course, feature) => {
    if (!course) return 'N/A';
    
    switch (feature) {
      case 'price':
        return formatPrice(course.price);
      case 'duration':
        return formatDuration(course);
      case 'enrolled':
        return formatNumber(course.enrolled);
      case 'rating':
        const rating = formatNumber(course.rating);
        const reviews = formatNumber(course.reviews);
        return rating !== '-' ? `${rating} (${reviews} reviews)` : 'Not rated';
      case 'instructor':
        return course.instructor?.name || 'N/A';
      case 'description':
        return course.description ? `${course.description.substring(0, 50)}...` : 'N/A';
      case 'level':
        return course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : 'N/A';
      case 'category':
        return course.category ? course.category.charAt(0).toUpperCase() + course.category.slice(1) : 'N/A';
      default:
        return course[feature] || 'N/A';
    }
  };

  const getBestValue = (feature) => {
    if (courses?.length < 2) return null;
    
    const validCourses = courses.filter(course => course && course[feature] !== undefined && course[feature] !== '');
    
    if (validCourses.length === 0) return null;
    
    switch (feature) {
      case 'price':
        return Math.min(...validCourses.map(c => c.price || 0));
      case 'duration':
        // For duration, we need a numerical value to compare
        const durations = validCourses.map(course => {
          if (course.durationUnit === 'hours') return course.duration || 0;
          if (course.durationUnit === 'months') return (course.months || 0) * 30 * 24; // Convert months to hours
          if (course.durationUnit === 'years') return (course.years || 0) * 365 * 24; // Convert years to hours
          return course.duration || 0;
        });
        return Math.max(...durations);
      case 'lessons':
        return Math.max(...validCourses.map(c => c.lessons || 0));
      case 'enrolled':
        return Math.max(...validCourses.map(c => c.enrolled || 0));
      case 'rating':
        return Math.max(...validCourses.map(c => c.rating || 0));
      default:
        return null;
    }
  };

  const isBestValue = (course, feature) => {
    if (!course) return false;
    
    const bestValue = getBestValue(feature);
    if (bestValue === null) return false;
    
    switch (feature) {
      case 'price':
        return course.price === bestValue;
      case 'duration':
        // Compare duration numerically
        const courseDuration = course.durationUnit === 'hours' ? course.duration || 0 :
                              course.durationUnit === 'months' ? (course.months || 0) * 30 * 24 :
                              course.durationUnit === 'years' ? (course.years || 0) * 365 * 24 :
                              course.duration || 0;
        return courseDuration === bestValue;
      case 'lessons': 
      case 'enrolled': 
      case 'rating':
        return course[feature] === bestValue;
      default:
        return false;
    }
  };

  // Filter out any null/undefined courses
  const validCourses = courses?.filter(course => course) || [];

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
              Compare Courses ({validCourses.length})
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearComparison}
              className="text-muted-foreground hover:text-foreground"
              disabled={validCourses.length === 0}
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
          {validCourses.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="GitCompare" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No courses to compare</h4>
              <p className="text-muted-foreground">Add courses to comparison to see them side by side</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr>
                    <th className="text-left p-3 w-40 sticky left-0 bg-background z-10">
                      <span className="text-sm font-medium text-muted-foreground">Feature</span>
                    </th>
                    {validCourses.map((course) => (
                      <th key={course.id} className="text-left p-3 min-w-64">
                        <div className="space-y-3">
                          {/* Course Image */}
                          <div className="relative">
                            <Image
                              src={course.image}
                              alt={course.imageAlt || `Image for ${course.title}`}
                              className="w-full h-32 object-cover rounded-lg border border-border"
                              fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
                            />
                            <button
                              onClick={() => onRemoveCourse(course.id)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                              aria-label={`Remove ${course.title} from comparison`}
                            >
                              <Icon name="X" size={14} />
                            </button>
                            
                            {/* New Course Badge */}
                            {course.isNew && (
                              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                NEW
                              </span>
                            )}
                          </div>
                          
                          {/* Course Info */}
                          <div>
                            <h4 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
                              {course.title || 'Untitled Course'}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {course.instructor?.name || 'Instructor not specified'}
                            </p>
                            {course.instructor?.title && (
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {course.instructor.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature.key} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="p-3 sticky left-0 bg-background z-10">
                        <div className="flex items-center space-x-2">
                          <Icon name={feature.icon} size={16} className="text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {feature.label}
                          </span>
                        </div>
                      </td>
                      {validCourses.map((course) => {
                        const value = getFeatureValue(course, feature.key);
                        const isBest = isBestValue(course, feature.key);
                        
                        return (
                          <td key={course.id} className="p-3">
                            <div className={`text-sm ${
                              isBest 
                                ? 'text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md border border-green-200' 
                                : 'text-foreground'
                            }`}>
                              {feature.key === 'rating' && value !== 'Not rated' ? (
                                <div className="flex items-center space-x-1">
                                  <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
                                  <span>{value}</span>
                                </div>
                              ) : (
                                <span>{value}</span>
                              )}
                              {isBest && feature.key !== 'description' && (
                                <Icon name="Award" size={14} className="ml-1 inline text-amber-500" />
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
          )}

          {/* Action Buttons */}
          {validCourses.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {validCourses.map((course) => (
                  <Button
                    key={course.id}
                    variant="default"
                    onClick={() => handleEnrollClick(course)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    fullWidth
                  >
                    Enroll Now - {formatPrice(course.price)}
                  </Button>
                ))}
              </div>
              
              {/* Comparison Tips */}
              {/* <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Comparison Tips:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Green highlighted values indicate the best option for that feature</li>
                      <li>Award icon (🏆) marks the best value in each category</li>
                      <li>Compare duration, price, and student ratings to make your decision</li>
                      <li>Click "Enroll Now" to contact us about your selected course</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseComparison;