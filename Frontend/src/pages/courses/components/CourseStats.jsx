// import React from 'react';
// import Icon from '../../../components/AppIcon';

// const CourseStats = ({ totalCourses, filteredCourses, activeFilters }) => {
//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (activeFilters?.categories?.length) count += activeFilters?.categories?.length;
//     if (activeFilters?.levels?.length) count += activeFilters?.levels?.length;
//     if (activeFilters?.durations?.length) count += activeFilters?.durations?.length;
//     if (activeFilters?.ratings?.length) count += activeFilters?.ratings?.length;
//     if (activeFilters?.features?.length) count += activeFilters?.features?.length;
//     if (activeFilters?.priceRange?.min || activeFilters?.priceRange?.max) count += 1;
//     return count;
//   };

//   const stats = [
//     {
//       icon: 'BookOpen',
//       label: 'Total Courses',
//       value: totalCourses?.toLocaleString(),
//       color: 'text-blue-600 bg-blue-50'
//     },
//     {
//       icon: 'Filter',
//       label: 'Filtered Results',
//       value: filteredCourses?.toLocaleString(),
//       color: 'text-green-600 bg-green-50'
//     },
//     {
//       icon: 'Settings',
//       label: 'Active Filters',
//       value: getActiveFilterCount(),
//       color: 'text-amber-600 bg-amber-50'
//     },
//     {
//       icon: 'TrendingUp',
//       label: 'Match Rate',
//       value: `${Math.round((filteredCourses / totalCourses) * 100)}%`,
//       color: 'text-purple-600 bg-purple-50'
//     }
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//       {stats?.map((stat, index) => (
//         <div
//           key={index}
//           className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
//         >
//           <div className="flex items-center space-x-3">
//             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}>
//               <Icon name={stat?.icon} size={20} />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
//               <p className="text-sm text-muted-foreground">{stat?.label}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseStats;























import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseStats = ({ totalCourses, filteredCourses, activeFilters }) => {
  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.categories?.length) count += activeFilters?.categories?.length;
    if (activeFilters?.levels?.length) count += activeFilters?.levels?.length;
    if (activeFilters?.durations?.length) count += activeFilters?.durations?.length;
    if (activeFilters?.ratings?.length) count += activeFilters?.ratings?.length;
    if (activeFilters?.features?.length) count += activeFilters?.features?.length;
    if (activeFilters?.priceRange?.min || activeFilters?.priceRange?.max) count += 1;
    return count;
  };

  const stats = [
    {
      icon: 'BookOpen',
      label: 'Total Courses',
      value: totalCourses?.toLocaleString(),
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: 'Filter',
      label: 'Filtered Results',
      value: filteredCourses?.toLocaleString(),
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: 'Settings',
      label: 'Active Filters',
      value: getActiveFilterCount(),
      color: 'text-amber-600 bg-amber-50'
    },
    {
      icon: 'TrendingUp',
      label: 'Match Rate',
      value: `${Math.round((filteredCourses / totalCourses) * 100)}%`,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseStats;