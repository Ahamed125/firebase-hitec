// import React from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const SortingControls = ({ 
//   sortBy, 
//   sortOrder, 
//   onSortChange, 
//   viewMode, 
//   onViewModeChange,
//   onFilterToggle,
//   resultsCount 
// }) => {
//   const sortOptions = [
//     { value: 'relevance', label: 'Relevance', icon: 'Target' },
//     { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
//     { value: 'rating', label: 'Highest Rated', icon: 'Star' },
//     { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
//     { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
//     { value: 'newest', label: 'Newest First', icon: 'Calendar' },
//     { value: 'duration', label: 'Duration', icon: 'Clock' }
//   ];

//   const viewModes = [
//     { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
//     { value: 'list', icon: 'List', label: 'List View' }
//   ];

//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
//       {/* Results Info & Mobile Filter Toggle */}
//       <div className="flex items-center space-x-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={onFilterToggle}
//           className="lg:hidden"
//         >
//           <Icon name="Filter" size={16} className="mr-2" />
//           Filters
//         </Button>
        
//         <div className="text-sm text-muted-foreground">
//           Showing <span className="font-semibold text-foreground">{resultsCount?.toLocaleString()}</span> courses
//         </div>
//       </div>
//       {/* Sorting & View Controls */}
//       <div className="flex items-center space-x-4">
//         {/* Sort Dropdown */}
//         <div className="relative group">
//           <Button
//             variant="outline"
//             size="sm"
//             className="flex items-center space-x-2"
//           >
//             <Icon name="ArrowUpDown" size={16} />
//             <span className="hidden sm:inline">Sort by:</span>
//             <span className="font-medium">
//               {sortOptions?.find(opt => opt?.value === sortBy)?.label || 'Relevance'}
//             </span>
//             <Icon name="ChevronDown" size={14} className="group-hover:rotate-180 transition-transform duration-200" />
//           </Button>
          
//           <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//             <div className="py-2">
//               {sortOptions?.map((option) => (
//                 <button
//                   key={option?.value}
//                   onClick={() => onSortChange(option?.value)}
//                   className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
//                     sortBy === option?.value ? 'text-primary bg-primary/5' : 'text-popover-foreground'
//                   }`}
//                 >
//                   <Icon name={option?.icon} size={16} />
//                   <span>{option?.label}</span>
//                   {sortBy === option?.value && (
//                     <Icon name="Check" size={14} className="ml-auto" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sort Order Toggle */}
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
//           className="p-2"
//           aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
//         >
//           <Icon 
//             name={sortOrder === 'asc' ? 'SortAsc' : 'SortDesc'} 
//             size={16} 
//           />
//         </Button>

//         {/* View Mode Toggle */}
//         <div className="flex items-center bg-muted rounded-lg p-1">
//           {viewModes?.map((mode) => (
//             <button
//               key={mode?.value}
//               onClick={() => onViewModeChange(mode?.value)}
//               className={`p-2 rounded-md transition-all duration-200 ${
//                 viewMode === mode?.value
//                   ? 'bg-background text-primary shadow-sm'
//                   : 'text-muted-foreground hover:text-foreground'
//               }`}
//               aria-label={mode?.label}
//             >
//               <Icon name={mode?.icon} size={16} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SortingControls;

















import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onFilterToggle,
  resultsCount 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'duration', label: 'Duration', icon: 'Clock' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
      {/* Results Info & Mobile Filter Toggle */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="lg:hidden"
        >
          <Icon name="Filter" size={16} className="mr-2" />
          Filters
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultsCount?.toLocaleString()}</span> courses
        </div>
      </div>

      {/* Sorting & View Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Icon name="ArrowUpDown" size={16} />
            <span className="hidden sm:inline">Sort by:</span>
            <span className="font-medium">
              {sortOptions?.find(opt => opt?.value === sortBy)?.label || 'Relevance'}
            </span>
            <Icon name="ChevronDown" size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </Button>
          
          <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="py-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSortChange(option?.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                    sortBy === option?.value ? 'text-primary bg-primary/5' : 'text-popover-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span>{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={14} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort Order Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          <Icon 
            name={sortOrder === 'asc' ? 'SortAsc' : 'SortDesc'} 
            size={16} 
          />
        </Button>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <button
              key={mode?.value}
              onClick={() => onViewModeChange(mode?.value)}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === mode?.value
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={mode?.label}
            >
              <Icon name={mode?.icon} size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingControls;