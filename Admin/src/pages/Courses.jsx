import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen, Clock, Users, Star, Tag, Settings, Calendar, Upload, Image as ImageIcon, SaveAll } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Courses = () => {
  const { courses, setCourses, saveAllToFirebase } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingLevel, setEditingLevel] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteLevelId, setDeleteLevelId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingAll, setSavingAll] = useState(false);

  // Load categories and levels from localStorage or use defaults
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('course-categories');
    return saved ? JSON.parse(saved) : [
      { id: 'technology', name: 'Technology', color: 'blue' },
      { id: 'business', name: 'Business', color: 'green' },
      { id: 'arts', name: 'Arts', color: 'purple' },
      { id: 'science', name: 'Science', color: 'orange' }
    ];
  });

  const [levels, setLevels] = useState(() => {
    const saved = localStorage.getItem('course-levels');
    return saved ? JSON.parse(saved) : [
      { id: 'beginner', name: 'Beginner', color: 'emerald' },
      { id: 'intermediate', name: 'Intermediate', color: 'yellow' },
      { id: 'advanced', name: 'Advanced', color: 'red' }
    ];
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    level: 'beginner',
    price: '',
    originalPrice: '',
    duration: '',
    durationUnit: 'hours',
    months: '',
    years: '',
    lessons: '',
    enrolled: '',
    rating: '',
    reviews: '',
    image: '',
    imageAlt: '',
    isNew: false,
    instructor: {
      name: '',
      title: '',
      avatar: '',
      avatarAlt: ''
    },
    outcomes: []
  });

  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
    color: 'blue'
  });

  const [levelForm, setLevelForm] = useState({
    id: '',
    name: '',
    color: 'emerald'
  });

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'green', label: 'Green', class: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'red', label: 'Red', class: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-800 border-orange-200' },
    { value: 'emerald', label: 'Emerald', class: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-100 text-pink-800 border-pink-200' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-100 text-gray-800 border-gray-200' }
  ];

  const durationUnitOptions = [
    { value: 'hours', label: 'Hours' },
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];

  // Save categories to localStorage whenever they change
  const saveCategoriesToStorage = (newCategories) => {
    localStorage.setItem('course-categories', JSON.stringify(newCategories));
  };

  // Save levels to localStorage whenever they change
  const saveLevelsToStorage = (newLevels) => {
    localStorage.setItem('course-levels', JSON.stringify(newLevels));
  };

  // Handle image upload - Convert to base64 for local storage
  const handleImageUpload = async (event, type = 'course') => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      // Convert image to base64 for local storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        
        if (type === 'course') {
          setFormData(prev => ({ 
            ...prev, 
            image: imageUrl,
            imageAlt: `Image for ${formData.title || 'course'}`
          }));
        } else if (type === 'instructor') {
          setFormData(prev => ({
            ...prev,
            instructor: { 
              ...prev.instructor, 
              avatar: imageUrl,
              avatarAlt: `Avatar for ${formData.instructor.name || 'instructor'}`
            }
          }));
        }
        toast.success('Image uploaded successfully!');
        setUploadingImage(false);
      };
      
      reader.onerror = () => {
        toast.error('Error reading image file');
        setUploadingImage(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
      setUploadingImage(false);
    }
  };

  // Handle number input changes - only save if not empty
  const handleNumberChange = (field, value) => {
    if (value === '' || value === null || value === undefined) {
      setFormData(prev => ({ ...prev, [field]: '' }));
    } else {
      const numValue = Number(value);
      setFormData(prev => ({ ...prev, [field]: isNaN(numValue) ? '' : numValue }));
    }
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      category: categories[0]?.id || '',
      level: levels[0]?.id || '',
      price: '',
      originalPrice: '',
      duration: '',
      durationUnit: 'hours',
      months: '',
      years: '',
      lessons: '',
      enrolled: '',
      rating: '',
      reviews: '',
      image: '',
      imageAlt: '',
      isNew: false,
      instructor: {
        name: '',
        title: '',
        avatar: '',
        avatarAlt: ''
      },
      outcomes: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    // Convert numbers to empty string if they are 0
    const courseData = {
      ...course,
      price: course.price === 0 ? '' : course.price,
      originalPrice: course.originalPrice === 0 ? '' : course.originalPrice,
      duration: course.duration === 0 ? '' : course.duration,
      months: course.months === 0 ? '' : course.months,
      years: course.years === 0 ? '' : course.years,
      lessons: course.lessons === 0 ? '' : course.lessons,
      enrolled: course.enrolled === 0 ? '' : course.enrolled,
      rating: course.rating === 0 ? '' : course.rating,
      reviews: course.reviews === 0 ? '' : course.reviews,
      durationUnit: course.durationUnit || 'hours',
      months: course.months || '',
      years: course.years || ''
    };
    setFormData(courseData);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error('Course title is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Course description is required');
      return;
    }

    // Prepare data for saving - convert empty strings to 0 for required fields
    const saveData = {
      ...formData,
      price: formData.price === '' ? 0 : Number(formData.price),
      originalPrice: formData.originalPrice === '' ? 0 : Number(formData.originalPrice),
      duration: formData.duration === '' ? 0 : Number(formData.duration),
      months: formData.months === '' ? 0 : Number(formData.months),
      years: formData.years === '' ? 0 : Number(formData.years),
      lessons: formData.lessons === '' ? 0 : Number(formData.lessons),
      enrolled: formData.enrolled === '' ? 0 : Number(formData.enrolled),
      rating: formData.rating === '' ? 0 : Number(formData.rating),
      reviews: formData.reviews === '' ? 0 : Number(formData.reviews)
    };

    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...saveData, id: c.id } : c));
      toast.success('Course updated successfully!');
    } else {
      setCourses(prev => [...prev, { ...saveData, id: Date.now() }]);
      toast.success('Course added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success('Course deleted successfully!');
  };

  // Category Management
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ id: '', name: '', color: 'blue' });
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const categoryId = categoryForm.id || categoryForm.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      const updatedCategories = categories.map(c => 
        c.id === editingCategory.id ? { ...categoryForm, id: categoryId } : c
      );
      setCategories(updatedCategories);
      saveCategoriesToStorage(updatedCategories);
      toast.success('Category updated successfully!');
    } else {
      if (categories.find(c => c.id === categoryId)) {
        toast.error('Category with this name already exists');
        return;
      }
      const updatedCategories = [...categories, { ...categoryForm, id: categoryId }];
      setCategories(updatedCategories);
      saveCategoriesToStorage(updatedCategories);
      toast.success('Category added successfully!');
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    const isUsed = courses.some(course => course.category === id);
    if (isUsed) {
      toast.error('Cannot delete category that is being used by courses');
      return;
    }

    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    saveCategoriesToStorage(updatedCategories);
    toast.success('Category deleted successfully!');
  };

  // Level Management
  const handleAddLevel = () => {
    setEditingLevel(null);
    setLevelForm({ id: '', name: '', color: 'emerald' });
    setIsLevelModalOpen(true);
  };

  const handleEditLevel = (level) => {
    setEditingLevel(level);
    setLevelForm(level);
    setIsLevelModalOpen(true);
  };

  const handleSaveLevel = () => {
    if (!levelForm.name.trim()) {
      toast.error('Level name is required');
      return;
    }

    const levelId = levelForm.id || levelForm.name.toLowerCase();

    if (editingLevel) {
      const updatedLevels = levels.map(l => 
        l.id === editingLevel.id ? { ...levelForm, id: levelId } : l
      );
      setLevels(updatedLevels);
      saveLevelsToStorage(updatedLevels);
      toast.success('Level updated successfully!');
    } else {
      if (levels.find(l => l.id === levelId)) {
        toast.error('Level with this name already exists');
        return;
      }
      const updatedLevels = [...levels, { ...levelForm, id: levelId }];
      setLevels(updatedLevels);
      saveLevelsToStorage(updatedLevels);
      toast.success('Level added successfully!');
    }
    setIsLevelModalOpen(false);
  };

  const handleDeleteLevel = (id) => {
    const isUsed = courses.some(course => course.level === id);
    if (isUsed) {
      toast.error('Cannot delete level that is being used by courses');
      return;
    }

    const updatedLevels = levels.filter(l => l.id !== id);
    setLevels(updatedLevels);
    saveLevelsToStorage(updatedLevels);
    toast.success('Level deleted successfully!');
  };

  // Save all to database
  const handleSaveAll = async () => {
    try {
      setSavingAll(true);
      const success = await saveAllToFirebase();
      
      if (success) {
        toast.success('All data saved to database successfully!');
      } else {
        toast.error('Failed to save some data to database');
      }
    } catch (error) {
      toast.error('Error saving data to database');
    } finally {
      setSavingAll(false);
    }
  };

  // Format duration display
  const formatDuration = (course) => {
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
    return 'Not specified';
  };

  // Format number display - show empty if 0
  const formatNumber = (value) => {
    return value === 0 || value === '' ? '-' : value;
  };

  // Format price in Sri Lankan Rupees
  const formatPrice = (price) => {
    if (price === 0 || price === '') return 'Free';
    return `RS ${price.toLocaleString('en-LK')}`;
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const colorClass = colorOptions.find(opt => opt.value === category?.color)?.class;
    return colorClass || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelColor = (levelId) => {
    const level = levels.find(l => l.id === levelId);
    const colorClass = colorOptions.find(opt => opt.value === level?.color)?.class;
    return colorClass || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  const getLevelName = (levelId) => {
    return levels.find(l => l.id === levelId)?.name || levelId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Courses Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage all courses with comprehensive CRUD operations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleSaveAll}
              disabled={savingAll}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SaveAll size={20} className="mr-2" />
              {savingAll ? 'Saving...' : 'Save All to Database'}
            </Button>
            <Button 
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Plus size={20} className="mr-2" />
              Add New Course
            </Button>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Categories Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Tag size={20} className="text-blue-600" />
                  Course Categories
                </CardTitle>
                <Button size="sm" onClick={handleAddCategory}>
                  <Plus size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setDeleteCategoryId(category.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No categories added yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Levels Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star size={20} className="text-green-600" />
                  Difficulty Levels
                </CardTitle>
                <Button size="sm" onClick={handleAddLevel}>
                  <Plus size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {levels.map(level => (
                  <div key={level.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${level.color}-500`}></div>
                      <span className="font-medium text-gray-900">{level.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditLevel(level)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setDeleteLevelId(level.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
                {levels.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No levels added yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} className="text-purple-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Courses</span>
                  <span className="text-2xl font-bold text-purple-600">{courses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Courses</span>
                  <span className="text-2xl font-bold text-green-600">
                    {courses.filter(c => c.isNew).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Categories</span>
                  <span className="text-2xl font-bold text-blue-600">{categories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Levels</span>
                  <span className="text-2xl font-bold text-orange-600">{levels.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Courses Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search courses by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Showing {filteredCourses.length} of {courses.length} courses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'No Courses Found' : 'No Courses Available'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm ? 'No courses match your search criteria.' : 'Get started by adding your first course to the platform.'}
                </p>
                <Button onClick={handleAdd} size="lg">
                  <Plus size={20} className="mr-2" />
                  Create Your First Course
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Course Details</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Category & Level</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Pricing (RS)</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Metrics</th>
                      <th className="text-right py-4 px-6 font-bold text-gray-700 uppercase text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCourses.map(course => (
                      <tr 
                        key={course.id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-4">
                            {course.image && (
                              <img 
                                src={course.image} 
                                alt={course.imageAlt}
                                className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-200 group-hover:shadow-md transition-shadow"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-lg truncate">{course.title}</h3>
                                {course.isNew && (
                                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{course.description}</p>
                              {course.instructor?.name && (
                                <div className="flex items-center gap-2">
                                  {course.instructor.avatar && (
                                    <img 
                                      src={course.instructor.avatar} 
                                      alt={course.instructor.avatarAlt}
                                      className="w-6 h-6 rounded-full border border-gray-200"
                                      onError={(e) => { e.target.src = 'https://via.placeholder.com/24'; }}
                                    />
                                  )}
                                  <span className="text-sm text-gray-700 font-medium">{course.instructor.name}</span>
                                  {course.instructor.title && (
                                    <span className="text-sm text-gray-500">• {course.instructor.title}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(course.category)}`}>
                              <Tag size={12} />
                              {getCategoryName(course.category)}
                            </span>
                            <div>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                                {getLevelName(course.level)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(course.price)}
                              </span>
                              {course.originalPrice > course.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  RS {course.originalPrice.toLocaleString('en-LK')}
                                </span>
                              )}
                            </div>
                            {course.originalPrice > course.price && course.price > 0 && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                                Save RS {(course.originalPrice - course.price).toLocaleString('en-LK')}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar size={14} className="text-blue-600" />
                              <span>{formatDuration(course)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <BookOpen size={14} className="text-green-600" />
                              <span>{formatNumber(course.lessons)} lessons</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users size={14} className="text-purple-600" />
                              <span>{formatNumber(course.enrolled)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Star size={14} className="text-yellow-500" />
                              <span>{formatNumber(course.rating)}</span>
                              <span className="text-gray-400">({formatNumber(course.reviews)})</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              onClick={() => handleEdit(course)}
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="danger" 
                              onClick={() => setDeleteId(course.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Course Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" />
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </div>
          } 
          size="xl"
        >
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Course Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" />
                Course Basic Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Course Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Web Development"
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Textarea
                  label="Course Description *"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category and Level Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Select
                  label="Category *"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  options={categories.map(cat => ({
                    value: cat.id,
                    label: cat.name
                  }))}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="w-full"
                >
                  <Settings size={14} className="mr-2" />
                  Manage Categories
                </Button>
              </div>
              <div className="space-y-4">
                <Select
                  label="Difficulty Level *"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  options={levels.map(level => ({
                    value: level.id,
                    label: level.name
                  }))}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLevelModalOpen(true)}
                  className="w-full"
                >
                  <Settings size={14} className="mr-2" />
                  Manage Levels
                </Button>
              </div>
            </div>

            {/* Course Duration */}
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-green-600" />
                Course Duration
              </h3>
              <div className="space-y-4">
                <Select
                  label="Duration Unit"
                  value={formData.durationUnit}
                  onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value })}
                  options={durationUnitOptions}
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                
                {formData.durationUnit === 'hours' && (
                  <Input
                    label="Duration (hours)"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleNumberChange('duration', e.target.value)}
                    placeholder="Leave empty if not applicable"
                    min="0"
                    className="bg-white border-2 border-gray-300 focus:border-green-500"
                  />
                )}
                
                {formData.durationUnit === 'months' && (
                  <div className="space-y-3">
                    <Select
                      label="Select Duration"
                      value={formData.months}
                      onChange={(e) => handleNumberChange('months', e.target.value)}
                      options={[
                        { value: '', label: 'Select duration...' },
                        { value: 0.5, label: '2 weeks' },
                        { value: 1, label: '1 month' },
                        { value: 2, label: '2 months' },
                        { value: 3, label: '3 months' },
                        { value: 6, label: '6 months' },
                        { value: 9, label: '9 months' },
                        { value: 12, label: '12 months' }
                      ]}
                      className="bg-white border-2 border-gray-300 focus:border-green-500"
                    />
                  </div>
                )}
                
                {formData.durationUnit === 'years' && (
                  <div className="space-y-3">
                    <Select
                      label="Select Duration"
                      value={formData.years}
                      onChange={(e) => handleNumberChange('years', e.target.value)}
                      options={[
                        { value: '', label: 'Select duration...' },
                        { value: 0.5, label: '6 months' },
                        { value: 1, label: '1 year' },
                        { value: 1.5, label: '1.5 years' },
                        { value: 2, label: '2 years' },
                        { value: 3, label: '3 years' },
                        { value: 4, label: '4 years' },
                        { value: 5, label: '5 years' }
                      ]}
                      className="bg-white border-2 border-gray-300 focus:border-green-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-purple-600" />
                Course Image
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      label="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/course-image.jpg"
                      className="bg-white border-2 border-gray-300 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'course')}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploadingImage}
                        className="bg-white text-purple-600 hover:bg-purple-50 border-purple-200"
                      >
                        <Upload size={16} className="mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload'}
                      </Button>
                    </label>
                  </div>
                </div>
                <Input
                  label="Image Alt Text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  placeholder="Descriptive text for accessibility"
                  className="bg-white border-2 border-gray-300 focus:border-purple-500"
                />
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-green-600" />
                Pricing (RS)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Current Price (RS)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleNumberChange('price', e.target.value)}
                  placeholder="Leave empty for free course"
                  min="0"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                <Input
                  label="Original Price (RS)"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleNumberChange('originalPrice', e.target.value)}
                  placeholder="For showing discounts"
                  min="0"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
              </div>
            </div>

            {/* Course Metrics */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Users size={18} className="text-orange-600" />
                Course Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Lessons Count"
                  type="number"
                  value={formData.lessons}
                  onChange={(e) => handleNumberChange('lessons', e.target.value)}
                  placeholder="Leave empty if not applicable"
                  min="0"
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Enrolled Students"
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => handleNumberChange('enrolled', e.target.value)}
                  placeholder="Leave empty if not applicable"
                  min="0"
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Rating (0-5)"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleNumberChange('rating', e.target.value)}
                  placeholder="Leave empty if not rated"
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Reviews Count"
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => handleNumberChange('reviews', e.target.value)}
                  placeholder="Leave empty if no reviews"
                  min="0"
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Instructor Details */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Users size={18} className="text-purple-600" />
                Instructor Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Instructor Name"
                    value={formData.instructor.name}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, name: e.target.value } })}
                    placeholder="e.g., John Doe"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                  <Input
                    label="Instructor Title"
                    value={formData.instructor.title}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, title: e.target.value } })}
                    placeholder="e.g., Senior Software Engineer"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      label="Instructor Avatar URL"
                      value={formData.instructor.avatar}
                      onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, avatar: e.target.value } })}
                      placeholder="https://example.com/avatar.jpg"
                      className="bg-white border-2 border-gray-300 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'instructor')}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploadingImage}
                        className="bg-white text-purple-600 hover:bg-purple-50 border-purple-200"
                      >
                        <Upload size={16} className="mr-2" />
                        {uploadingImage ? 'Uploading...' : 'Upload'}
                      </Button>
                    </label>
                  </div>
                </div>
                <Input
                  label="Avatar Alt Text"
                  value={formData.instructor.avatarAlt}
                  onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, avatarAlt: e.target.value } })}
                  placeholder="Description of instructor"
                  className="bg-white border-2 border-gray-300 focus:border-purple-500"
                />
                {formData.instructor.avatar && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Avatar Preview:</p>
                    <img 
                      src={formData.instructor.avatar} 
                      alt="Avatar Preview" 
                      className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Star size={18} className="text-blue-600" />
                Learning Outcomes
              </h3>
              <div className="space-y-3">
                {formData.outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={outcome}
                        onChange={(e) => {
                          const newOutcomes = [...formData.outcomes];
                          newOutcomes[index] = e.target.value;
                          setFormData({ ...formData, outcomes: newOutcomes });
                        }}
                        placeholder="What will students learn from this course?"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newOutcomes = formData.outcomes.filter((_, i) => i !== index);
                        setFormData({ ...formData, outcomes: newOutcomes });
                      }}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 mt-1"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, outcomes: [...formData.outcomes, ''] })}
                  className="bg-white text-blue-600 hover:bg-blue-50 border-blue-200"
                >
                  + Add Learning Outcome
                </Button>
              </div>
            </div>

            {/* New Course Toggle */}
            <div className="flex items-center gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                id="isNew"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isNew" className="text-sm font-medium text-gray-700">
                Mark as New Course (shows "New" badge)
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Category Management Modal */}
        <Modal 
          isOpen={isCategoryModalOpen} 
          onClose={() => setIsCategoryModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <Tag size={24} className="text-blue-600" />
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </div>
          } 
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Category Name *"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g., Programming & Development"
              className="bg-white border-2 border-gray-300 focus:border-blue-500"
            />
            <Select
              label="Color"
              value={categoryForm.color}
              onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
              options={colorOptions.map(opt => ({
                value: opt.value,
                label: (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${opt.value}-500`}></div>
                    {opt.label}
                  </div>
                )
              }))}
              className="bg-white border-2 border-gray-300 focus:border-blue-500"
            />
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsCategoryModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveCategory}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              >
                {editingCategory ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Level Management Modal */}
        <Modal 
          isOpen={isLevelModalOpen} 
          onClose={() => setIsLevelModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <Star size={24} className="text-green-600" />
              {editingLevel ? 'Edit Level' : 'Add New Level'}
            </div>
          } 
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Level Name *"
              value={levelForm.name}
              onChange={(e) => setLevelForm({ ...levelForm, name: e.target.value })}
              placeholder="e.g., Beginner, Intermediate, Advanced"
              className="bg-white border-2 border-gray-300 focus:border-green-500"
            />
            <Select
              label="Color"
              value={levelForm.color}
              onChange={(e) => setLevelForm({ ...levelForm, color: e.target.value })}
              options={colorOptions.map(opt => ({
                value: opt.value,
                label: (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${opt.value}-500`}></div>
                    {opt.label}
                  </div>
                )
              }))}
              className="bg-white border-2 border-gray-300 focus:border-green-500"
            />
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsLevelModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveLevel}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg"
              >
                {editingLevel ? 'Update Level' : 'Create Level'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Dialogs */}
        <ConfirmDialog
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={() => { handleDelete(deleteId); setDeleteId(null); }}
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone and all course data will be permanently removed."
          confirmText="Delete Course"
          cancelText="Keep Course"
        />

        <ConfirmDialog
          isOpen={deleteCategoryId !== null}
          onClose={() => setDeleteCategoryId(null)}
          onConfirm={() => { handleDeleteCategory(deleteCategoryId); setDeleteCategoryId(null); }}
          title="Delete Category"
          message="Are you sure you want to delete this category? This action cannot be undone."
          confirmText="Delete Category"
          cancelText="Keep Category"
        />

        <ConfirmDialog
          isOpen={deleteLevelId !== null}
          onClose={() => setDeleteLevelId(null)}
          onConfirm={() => { handleDeleteLevel(deleteLevelId); setDeleteLevelId(null); }}
          title="Delete Level"
          message="Are you sure you want to delete this difficulty level? This action cannot be undone."
          confirmText="Delete Level"
          cancelText="Keep Level"
        />
      </div>
    </div>
  );
};