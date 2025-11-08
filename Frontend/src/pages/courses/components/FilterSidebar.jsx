// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import { Checkbox } from '../../../components/ui/Checkbox';

// const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });

//   const categories = [
//     { id: 'programming', label: 'Programming & Development', count: 45 },
//     { id: 'design', label: 'Design & Creative', count: 32 },
//     { id: 'business', label: 'Business & Management', count: 28 },
//     { id: 'marketing', label: 'Marketing & Sales', count: 24 },
//     { id: 'data-science', label: 'Data Science & Analytics', count: 19 },
//     { id: 'cybersecurity', label: 'Cybersecurity', count: 15 },
//     { id: 'cloud', label: 'Cloud Computing', count: 12 },
//     { id: 'ai-ml', label: 'AI & Machine Learning', count: 18 }
//   ];

//   const levels = [
//     { id: 'beginner', label: 'Beginner', count: 67 },
//     { id: 'intermediate', label: 'Intermediate', count: 89 },
//     { id: 'advanced', label: 'Advanced', count: 34 }
//   ];

//   const durations = [
//     { id: 'short', label: 'Under 10 hours', count: 45 },
//     { id: 'medium', label: '10-50 hours', count: 78 },
//     { id: 'long', label: '50+ hours', count: 67 }
//   ];

//   const ratings = [
//     { id: '4.5', label: '4.5 & up', count: 156 },
//     { id: '4.0', label: '4.0 & up', count: 178 },
//     { id: '3.5', label: '3.5 & up', count: 189 },
//     { id: '3.0', label: '3.0 & up', count: 190 }
//   ];

//   const features = [
//     { id: 'certificate', label: 'Certificate of Completion', count: 145 },
//     { id: 'lifetime', label: 'Lifetime Access', count: 123 },
//     { id: 'mobile', label: 'Mobile Access', count: 167 },
//     { id: 'subtitles', label: 'Closed Captions', count: 134 },
//     { id: 'quizzes', label: 'Practice Tests', count: 89 },
//     { id: 'projects', label: 'Hands-on Projects', count: 76 }
//   ];

//   const handleCategoryChange = (categoryId, checked) => {
//     const newCategories = checked
//       ? [...(filters?.categories || []), categoryId]
//       : (filters?.categories || [])?.filter(id => id !== categoryId);
    
//     onFiltersChange({ ...filters, categories: newCategories });
//   };

//   const handleLevelChange = (levelId, checked) => {
//     const newLevels = checked
//       ? [...(filters?.levels || []), levelId]
//       : (filters?.levels || [])?.filter(id => id !== levelId);
    
//     onFiltersChange({ ...filters, levels: newLevels });
//   };

//   const handleDurationChange = (durationId, checked) => {
//     const newDurations = checked
//       ? [...(filters?.durations || []), durationId]
//       : (filters?.durations || [])?.filter(id => id !== durationId);
    
//     onFiltersChange({ ...filters, durations: newDurations });
//   };

//   const handleRatingChange = (ratingId, checked) => {
//     const newRatings = checked
//       ? [...(filters?.ratings || []), ratingId]
//       : (filters?.ratings || [])?.filter(id => id !== ratingId);
    
//     onFiltersChange({ ...filters, ratings: newRatings });
//   };

//   const handleFeatureChange = (featureId, checked) => {
//     const newFeatures = checked
//       ? [...(filters?.features || []), featureId]
//       : (filters?.features || [])?.filter(id => id !== featureId);
    
//     onFiltersChange({ ...filters, features: newFeatures });
//   };

//   const handlePriceRangeChange = () => {
//     onFiltersChange({ 
//       ...filters, 
//       priceRange: { 
//         min: priceRange?.min ? parseInt(priceRange?.min) : null,
//         max: priceRange?.max ? parseInt(priceRange?.max) : null
//       }
//     });
//   };

//   const FilterSection = ({ title, children, defaultOpen = true }) => {
//     const [isExpanded, setIsExpanded] = useState(defaultOpen);

//     return (
//       <div className="border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center justify-between w-full text-left mb-4 group"
//         >
//           <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
//             {title}
//           </h3>
//           <Icon 
//             name="ChevronDown" 
//             size={16} 
//             className={`text-muted-foreground transition-transform duration-200 ${
//               isExpanded ? 'rotate-180' : ''
//             }`} 
//           />
//         </button>
        
//         <div className={`transition-all duration-300 overflow-hidden ${
//           isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}>
//           {children}
//         </div>
//       </div>
//     );
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
//       {/* Sidebar */}
//       <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-background border-r border-border z-50 lg:z-auto transform transition-transform duration-300 lg:transform-none ${
//         isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}>
//         <div className="h-full overflow-y-auto">
//           {/* Mobile Header */}
//           <div className="flex items-center justify-between p-6 border-b border-border lg:hidden">
//             <h2 className="text-lg font-semibold text-foreground">Filters</h2>
//             <button
//               onClick={onToggle}
//               className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
//             >
//               <Icon name="X" size={20} />
//             </button>
//           </div>

//           <div className="p-6">
//             {/* Clear Filters */}
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-foreground hidden lg:block">Filters</h2>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onClearFilters}
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 <Icon name="RotateCcw" size={14} className="mr-2" />
//                 Clear All
//               </Button>
//             </div>

//             {/* Price Range */}
//             <FilterSection title="Price Range">
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <Input
//                     type="number"
//                     placeholder="Min"
//                     value={priceRange?.min}
//                     onChange={(e) => setPriceRange({ ...priceRange, min: e?.target?.value })}
//                     className="text-sm"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Max"
//                     value={priceRange?.max}
//                     onChange={(e) => setPriceRange({ ...priceRange, max: e?.target?.value })}
//                     className="text-sm"
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handlePriceRangeChange}
//                   fullWidth
//                 >
//                   Apply Range
//                 </Button>
//               </div>
//             </FilterSection>

//             {/* Categories */}
//             <FilterSection title="Categories">
//               <div className="space-y-3 max-h-48 overflow-y-auto">
//                 {categories?.map((category) => (
//                   <div key={category?.id} className="flex items-center justify-between">
//                     <Checkbox
//                       label={category?.label}
//                       checked={(filters?.categories || [])?.includes(category?.id)}
//                       onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
//                       className="flex-1"
//                     />
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {category?.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </FilterSection>

//             {/* Difficulty Level */}
//             <FilterSection title="Difficulty Level">
//               <div className="space-y-3">
//                 {levels?.map((level) => (
//                   <div key={level?.id} className="flex items-center justify-between">
//                     <Checkbox
//                       label={level?.label}
//                       checked={(filters?.levels || [])?.includes(level?.id)}
//                       onChange={(e) => handleLevelChange(level?.id, e?.target?.checked)}
//                       className="flex-1"
//                     />
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {level?.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </FilterSection>

//             {/* Duration */}
//             <FilterSection title="Course Duration">
//               <div className="space-y-3">
//                 {durations?.map((duration) => (
//                   <div key={duration?.id} className="flex items-center justify-between">
//                     <Checkbox
//                       label={duration?.label}
//                       checked={(filters?.durations || [])?.includes(duration?.id)}
//                       onChange={(e) => handleDurationChange(duration?.id, e?.target?.checked)}
//                       className="flex-1"
//                     />
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {duration?.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </FilterSection>

//             {/* Ratings */}
//             <FilterSection title="Ratings">
//               <div className="space-y-3">
//                 {ratings?.map((rating) => (
//                   <div key={rating?.id} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2 flex-1">
//                       <Checkbox
//                         checked={(filters?.ratings || [])?.includes(rating?.id)}
//                         onChange={(e) => handleRatingChange(rating?.id, e?.target?.checked)}
//                       />
//                       <div className="flex items-center space-x-1">
//                         <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
//                         <span className="text-sm text-foreground">{rating?.label}</span>
//                       </div>
//                     </div>
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {rating?.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </FilterSection>

//             {/* Features */}
//             <FilterSection title="Course Features" defaultOpen={false}>
//               <div className="space-y-3">
//                 {features?.map((feature) => (
//                   <div key={feature?.id} className="flex items-center justify-between">
//                     <Checkbox
//                       label={feature?.label}
//                       checked={(filters?.features || [])?.includes(feature?.id)}
//                       onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
//                       className="flex-1"
//                     />
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {feature?.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </FilterSection>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;


























import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters = {}, 
  onFiltersChange, 
  onClearFilters, 
  isOpen = false, 
  onToggle,
  categories = [],
  levels = [],
  durations = [],
  ratings = [],
  features = [],
  totalResults = 0
}) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isMounted, setIsMounted] = useState(false);

  // Initialize price range from filters
  useEffect(() => {
    if (filters.priceRange) {
      setPriceRange({
        min: filters.priceRange.min?.toString() || '',
        max: filters.priceRange.max?.toString() || ''
      });
    }
  }, [filters.priceRange]);

  // Handle mobile body scroll lock
  useEffect(() => {
    setIsMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...(filters.categories || []), categoryId]
      : (filters.categories || []).filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleLevelChange = (levelId, checked) => {
    const newLevels = checked
      ? [...(filters.levels || []), levelId]
      : (filters.levels || []).filter(id => id !== levelId);
    
    onFiltersChange({ ...filters, levels: newLevels });
  };

  const handleDurationChange = (durationId, checked) => {
    const newDurations = checked
      ? [...(filters.durations || []), durationId]
      : (filters.durations || []).filter(id => id !== durationId);
    
    onFiltersChange({ ...filters, durations: newDurations });
  };

  const handleRatingChange = (ratingId, checked) => {
    const newRatings = checked
      ? [...(filters.ratings || []), ratingId]
      : (filters.ratings || []).filter(id => id !== ratingId);
    
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const handleFeatureChange = (featureId, checked) => {
    const newFeatures = checked
      ? [...(filters.features || []), featureId]
      : (filters.features || []).filter(id => id !== featureId);
    
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handlePriceRangeChange = () => {
    const min = priceRange.min ? parseInt(priceRange.min) : null;
    const max = priceRange.max ? parseInt(priceRange.max) : null;
    
    // Validate price range
    if (min !== null && max !== null && min > max) {
      // Swap values if min is greater than max
      onFiltersChange({ 
        ...filters, 
        priceRange: { min: max, max: min }
      });
      setPriceRange({ min: max.toString(), max: min.toString() });
    } else {
      onFiltersChange({ 
        ...filters, 
        priceRange: { min, max }
      });
    }
  };

  const handlePriceInputChange = (field, value) => {
    // Allow only numbers and empty string
    if (value === '' || /^\d*$/.test(value)) {
      setPriceRange(prev => ({ ...prev, [field]: value }));
    }
  };

  const clearPriceRange = () => {
    setPriceRange({ min: '', max: '' });
    onFiltersChange({ 
      ...filters, 
      priceRange: { min: null, max: null }
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.levels?.length) count += filters.levels.length;
    if (filters.durations?.length) count += filters.durations.length;
    if (filters.ratings?.length) count += filters.ratings.length;
    if (filters.features?.length) count += filters.features.length;
    if (filters.priceRange?.min !== null || filters.priceRange?.max !== null) count += 1;
    return count;
  };

  const FilterSection = ({ title, children, defaultOpen = true, id }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <section 
        className="border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
        aria-labelledby={`filter-${id}-heading`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-4 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
          aria-expanded={isExpanded}
          aria-controls={`filter-${id}-content`}
          id={`filter-${id}-heading`}
        >
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-muted-foreground transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
            aria-hidden="true"
          />
        </button>
        
        <div 
          id={`filter-${id}-content`}
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isExpanded}
        >
          {children}
        </div>
      </section>
    );
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-72 bg-background border-r border-border z-50 lg:z-auto transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Course filters"
        role="complementary"
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-border lg:hidden bg-background/95 backdrop-blur-sm">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {totalResults > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {totalResults} course{totalResults !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                {totalResults > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {totalResults} course{totalResults !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <span 
                    className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-primary text-primary-foreground rounded-full"
                    aria-label={`${activeFiltersCount} active filters`}
                  >
                    {activeFiltersCount}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary"
                  disabled={activeFiltersCount === 0}
                  aria-label="Clear all filters"
                >
                  <Icon name="RotateCcw" size={14} className="mr-2" aria-hidden="true" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <FilterSection title="Price Range" id="price">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="price-min" className="sr-only">Minimum price</label>
                    <Input
                      id="price-min"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Min ₹"
                      value={priceRange.min}
                      onChange={(e) => handlePriceInputChange('min', e.target.value)}
                      className="text-sm"
                      aria-label="Minimum price in rupees"
                    />
                  </div>
                  <div>
                    <label htmlFor="price-max" className="sr-only">Maximum price</label>
                    <Input
                      id="price-max"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Max ₹"
                      value={priceRange.max}
                      onChange={(e) => handlePriceInputChange('max', e.target.value)}
                      className="text-sm"
                      aria-label="Maximum price in rupees"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePriceRangeChange}
                    className="flex-1 focus:ring-2 focus:ring-primary"
                    disabled={!priceRange.min && !priceRange.max}
                    aria-label="Apply price range filter"
                  >
                    Apply
                  </Button>
                  {(priceRange.min || priceRange.max) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearPriceRange}
                      className="focus:ring-2 focus:ring-primary"
                      aria-label="Clear price range"
                    >
                      <Icon name="X" size={14} aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>
            </FilterSection>

            {/* Categories */}
            {categories.length > 0 && (
              <FilterSection title="Categories" id="categories">
                <div className="space-y-3 max-h-48 overflow-y-auto" role="listbox" aria-label="Course categories">
                  {categories.map((category) => (
                    <div 
                      key={category.id} 
                      className="flex items-center justify-between"
                      role="option"
                      aria-selected={(filters.categories || []).includes(category.id)}
                    >
                      <Checkbox
                        label={category.label}
                        checked={(filters.categories || []).includes(category.id)}
                        onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                        className="flex-1"
                        aria-label={`Filter by ${category.label} category`}
                      />
                      <span className="text-xs text-muted-foreground ml-2" aria-hidden="true">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Difficulty Level */}
            {levels.length > 0 && (
              <FilterSection title="Difficulty Level" id="levels">
                <div className="space-y-3" role="listbox" aria-label="Difficulty levels">
                  {levels.map((level) => (
                    <div 
                      key={level.id} 
                      className="flex items-center justify-between"
                      role="option"
                      aria-selected={(filters.levels || []).includes(level.id)}
                    >
                      <Checkbox
                        label={level.label}
                        checked={(filters.levels || []).includes(level.id)}
                        onChange={(e) => handleLevelChange(level.id, e.target.checked)}
                        className="flex-1"
                        aria-label={`Filter by ${level.label} difficulty level`}
                      />
                      <span className="text-xs text-muted-foreground ml-2" aria-hidden="true">
                        {level.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Duration */}
            {durations.length > 0 && (
              <FilterSection title="Course Duration" id="durations">
                <div className="space-y-3" role="listbox" aria-label="Course durations">
                  {durations.map((duration) => (
                    <div 
                      key={duration.id} 
                      className="flex items-center justify-between"
                      role="option"
                      aria-selected={(filters.durations || []).includes(duration.id)}
                    >
                      <Checkbox
                        label={duration.label}
                        checked={(filters.durations || []).includes(duration.id)}
                        onChange={(e) => handleDurationChange(duration.id, e.target.checked)}
                        className="flex-1"
                        aria-label={`Filter by ${duration.label} duration`}
                      />
                      <span className="text-xs text-muted-foreground ml-2" aria-hidden="true">
                        {duration.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Ratings */}
            {ratings.length > 0 && (
              <FilterSection title="Ratings" id="ratings">
                <div className="space-y-3" role="listbox" aria-label="Course ratings">
                  {ratings.map((rating) => (
                    <div 
                      key={rating.id} 
                      className="flex items-center justify-between"
                      role="option"
                      aria-selected={(filters.ratings || []).includes(rating.id)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          checked={(filters.ratings || []).includes(rating.id)}
                          onChange={(e) => handleRatingChange(rating.id, e.target.checked)}
                          aria-label={`Filter by ${rating.label} star rating`}
                        />
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" aria-hidden="true" />
                          <span className="text-sm text-foreground">{rating.label}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground ml-2" aria-hidden="true">
                        {rating.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Features */}
            {features.length > 0 && (
              <FilterSection title="Course Features" id="features" defaultOpen={false}>
                <div className="space-y-3" role="listbox" aria-label="Course features">
                  {features.map((feature) => (
                    <div 
                      key={feature.id} 
                      className="flex items-center justify-between"
                      role="option"
                      aria-selected={(filters.features || []).includes(feature.id)}
                    >
                      <Checkbox
                        label={feature.label}
                        checked={(filters.features || []).includes(feature.id)}
                        onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
                        className="flex-1"
                        aria-label={`Filter by ${feature.label} feature`}
                      />
                      <span className="text-xs text-muted-foreground ml-2" aria-hidden="true">
                        {feature.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>
            )}

            {/* No filters applied message */}
            {activeFiltersCount === 0 && (
              <div className="text-center py-8 text-muted-foreground" aria-live="polite">
                <Icon name="Filter" size={32} className="mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p className="text-sm">No filters applied</p>
                <p className="text-xs mt-1">Select filters to narrow down courses</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;