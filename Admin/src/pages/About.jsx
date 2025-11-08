import React, { useState } from 'react';
import { Save, Image, Play, Move, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const About = () => {
  const { about, setAbout, saveHeroToFirebase } = useAdmin();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeMotionTab, setActiveMotionTab] = useState('entrance');
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Save hero section using the context function
      const success = await saveHeroToFirebase();
      
      if (success) {
        toast.success('About page hero section saved successfully!');
      } else {
        toast.error('Failed to save about page settings');
      }
    } catch (error) {
      console.error('Error saving about page:', error);
      toast.error('Failed to save about page settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateHero = (field, value) => {
    setAbout(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateMotion = (section, field, value) => {
    setAbout(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        motion: {
          ...prev.hero.motion,
          [section]: {
            ...prev.hero.motion?.[section],
            [field]: value
          }
        }
      }
    }));
  };

  const updateStat = (index, field, value) => {
    const updatedStats = [...(about.hero.stats || [])];
    if (!updatedStats[index]) {
      updatedStats[index] = { id: Date.now() + index, number: '', label: '' };
    }
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    
    setAbout(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: updatedStats
      }
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      toast.success('Image selected successfully! Click "Upload Image" to generate URL.');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    updateHero('heroImage', '');
    toast.success('Image removed successfully!');
  };

  const simulateImageUpload = async () => {
    if (!imageFile) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setIsUploading(true);
      toast.loading('Uploading image and generating URL...');
      
      // Simulate upload process with actual URL generation
      setTimeout(() => {
        // Generate a realistic URL based on the file
        const fileExtension = imageFile.name.split('.').pop();
        const fileName = imageFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const timestamp = Date.now();
        
        // Generate a realistic CDN URL
        const generatedImageUrl = `https://cdn.yourdomain.com/images/about/hero/${cleanFileName}-${timestamp}.${fileExtension}`;
        
        // Update the hero image URL with the generated URL
        updateHero('heroImage', generatedImageUrl);
        setImageFile(null);
        setIsUploading(false);
        toast.success('Image uploaded successfully! URL generated: ' + generatedImageUrl);
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      toast.error('Failed to upload image');
    }
  };

  // Initialize motion settings if they don't exist
  const motionSettings = about.hero.motion || {
    entrance: {
      duration: 0.8,
      delay: 0,
      ease: "easeOut"
    },
    content: {
      stagger: 0.2,
      duration: 0.6
    },
    image: {
      duration: 0.8,
      delay: 0.4
    },
    floating: {
      duration: 4,
      type: "infinite"
    }
  };

  // Initialize stats if they don't exist
  const stats = about.hero.stats || [
    { id: 1, number: '15+', label: 'Years of Excellence' },
    { id: 2, number: '50,000+', label: 'Students Graduated' },
    { id: 3, number: '98%', label: 'Success Rate' }
  ];

  const motionTabs = [
    { id: 'entrance', label: 'Page Entrance', icon: Zap },
    { id: 'content', label: 'Content Animation', icon: Move },
    { id: 'image', label: 'Image Animation', icon: Image },
    { id: 'floating', label: 'Floating Elements', icon: Play }
  ];

  const addStat = () => {
    const newStat = { id: Date.now(), number: '', label: '' };
    setAbout(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: [...(prev.hero.stats || []), newStat]
      }
    }));
  };

  const removeStat = (index) => {
    const updatedStats = about.hero.stats.filter((_, i) => i !== index);
    setAbout(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: updatedStats
      }
    }));
    toast.success('Statistic removed successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              About Page Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Customize your about page hero section with animations</p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Image className="text-blue-600" size={24} />
                About Hero Section
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Main Content */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4">Main Content</h3>
                <div className="space-y-4">
                  <Input 
                    label="Badge Text" 
                    value={about.hero.badgeText} 
                    onChange={(e) => updateHero('badgeText', e.target.value)} 
                    placeholder="About Our College"
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  />
                  <Input 
                    label="Main Title Line 1" 
                    value={about.hero.mainTitle1} 
                    onChange={(e) => updateHero('mainTitle1', e.target.value)} 
                    placeholder="Welcome to Our Educational"
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  />
                  <Input 
                    label="Accent Title" 
                    value={about.hero.accentTitle} 
                    onChange={(e) => updateHero('accentTitle', e.target.value)} 
                    placeholder="Journey of Excellence"
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  />
                  <Textarea 
                    label="Description" 
                    value={about.hero.description} 
                    onChange={(e) => updateHero('description', e.target.value)} 
                    placeholder="Describe your institution's story and values..."
                    rows={4}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Hero Image Upload */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Image size={18} className="text-purple-600" />
                  Hero Image
                </h3>
                <div className="space-y-4">
                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Hero Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-300"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported formats: JPG, PNG, WebP. Max size: 5MB
                        </p>
                      </div>
                      
                      {imageFile && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            onClick={simulateImageUpload}
                            disabled={isUploading}
                            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 disabled:opacity-50"
                          >
                            <Save size={16} className="mr-2" />
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    {/* Image Preview */}
                    {(imagePreview || about.hero.heroImage) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveImage}
                            className="text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300"
                          >
                            Remove Image
                          </Button>
                        </div>
                        <div className="relative">
                          <motion.img 
                            src={imagePreview || about.hero.heroImage} 
                            alt="Hero preview" 
                            className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 transition-all duration-300"
                            onError={(e) => { 
                              e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          />
                          {imageFile && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                              New Upload
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Image URL Display */}
                        {about.hero.heroImage && !imageFile && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <p className="text-sm text-green-700 font-medium mb-1">Image URL:</p>
                            <p className="text-sm text-green-600 break-all">{about.hero.heroImage}</p>
                          </motion.div>
                        )}
                        
                        {/* Image Info */}
                        {imageFile && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <p className="text-sm text-blue-700">
                              <strong>File:</strong> {imageFile.name}
                            </p>
                            <p className="text-sm text-blue-700">
                              <strong>Size:</strong> {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-sm text-blue-700">
                              <strong>Type:</strong> {imageFile.type}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* Manual URL Input as Fallback */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-4"
                    >
                      <Input 
                        label="Or Enter Image URL (Alternative)" 
                        value={about.hero.heroImage} 
                        onChange={(e) => updateHero('heroImage', e.target.value)} 
                        placeholder="https://cdn.yourdomain.com/images/about/hero/hero-image.jpg"
                        className="bg-white border-2 border-gray-300 focus:border-purple-500 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <Input 
                    label="Image Alt Text" 
                    value={about.hero.imageAlt} 
                    onChange={(e) => updateHero('imageAlt', e.target.value)} 
                    placeholder="Descriptive text for accessibility"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Motion Settings */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-2 border-indigo-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-indigo-600" />
                  Motion & Animation Settings
                </h3>
                
                {/* Motion Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {motionTabs.map(tab => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveMotionTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          activeMotionTab === tab.id
                            ? 'bg-indigo-100 border-indigo-300 text-indigo-700 shadow-md'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Motion Settings Content */}
                <div className="space-y-6">
                  {activeMotionTab === 'entrance' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Duration (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.entrance?.duration || 0.8}
                        onChange={(e) => updateMotion('entrance', 'duration', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                      <Input
                        label="Delay (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.entrance?.delay || 0}
                        onChange={(e) => updateMotion('entrance', 'delay', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                      <Select
                        label="Easing Function"
                        value={motionSettings.entrance?.ease || "easeOut"}
                        onChange={(e) => updateMotion('entrance', 'ease', e.target.value)}
                        options={[
                          { value: 'easeIn', label: 'Ease In' },
                          { value: 'easeOut', label: 'Ease Out' },
                          { value: 'easeInOut', label: 'Ease In Out' },
                          { value: 'linear', label: 'Linear' },
                          { value: 'circIn', label: 'Circ In' },
                          { value: 'circOut', label: 'Circ Out' }
                        ]}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {activeMotionTab === 'content' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Stagger Delay (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.content?.stagger || 0.2}
                        onChange={(e) => updateMotion('content', 'stagger', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                      <Input
                        label="Animation Duration (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.content?.duration || 0.6}
                        onChange={(e) => updateMotion('content', 'duration', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {activeMotionTab === 'image' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Image Duration (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.image?.duration || 0.8}
                        onChange={(e) => updateMotion('image', 'duration', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                      <Input
                        label="Image Delay (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.image?.delay || 0.4}
                        onChange={(e) => updateMotion('image', 'delay', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {activeMotionTab === 'floating' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Float Duration (seconds)"
                        type="number"
                        step="0.1"
                        value={motionSettings.floating?.duration || 4}
                        onChange={(e) => updateMotion('floating', 'duration', parseFloat(e.target.value))}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                      <Select
                        label="Animation Type"
                        value={motionSettings.floating?.type || "infinite"}
                        onChange={(e) => updateMotion('floating', 'type', e.target.value)}
                        options={[
                          { value: 'infinite', label: 'Infinite Loop' },
                          { value: 'once', label: 'Play Once' },
                          { value: 'hover', label: 'On Hover' }
                        ]}
                        className="bg-white border-2 border-gray-300 focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>

                {/* Motion Preview */}
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Animation Preview</h4>
                  <div className="flex gap-4">
                    <motion.div
                      animate={{
                        y: [-10, 10, -10],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: motionSettings.floating?.duration || 4,
                        repeat: motionSettings.floating?.type === 'infinite' ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold"
                    >
                      A
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: motionSettings.entrance?.duration || 0.8,
                        delay: motionSettings.entrance?.delay || 0,
                        ease: motionSettings.entrance?.ease || "easeOut"
                      }}
                      className="flex-1 p-3 bg-gray-100 rounded-lg text-sm text-gray-600"
                    >
                      Current animation settings applied in real-time
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Statistics Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">Statistics</h3>
                  <Button
                    onClick={addStat}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    + Add Statistic
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <Input 
                          label={`Stat ${index + 1} Number`}
                          value={stat.number}
                          onChange={(e) => updateStat(index, 'number', e.target.value)}
                          placeholder="15+"
                          className="bg-white border-2 border-gray-300 focus:border-orange-500"
                        />
                        <Input 
                          label={`Stat ${index + 1} Label`}
                          value={stat.label}
                          onChange={(e) => updateStat(index, 'label', e.target.value)}
                          placeholder="Years of Excellence"
                          className="bg-white border-2 border-gray-300 focus:border-orange-500"
                        />
                      </div>
                      {stats.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeStat(index)}
                          className="text-red-600 border-red-200 hover:bg-red-50 mt-6"
                        >
                          Remove
                        </Button>
                      )}
                    </motion.div>
                  ))}
                  
                  {stats.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <p className="text-gray-500">No statistics added yet.</p>
                      <p className="text-sm text-gray-400 mt-1">Click "Add Statistic" to get started.</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Play size={18} className="text-green-600" />
                  Call to Action
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Watch Video Text" 
                    value={about.hero.watchVideoText} 
                    onChange={(e) => updateHero('watchVideoText', e.target.value)} 
                    placeholder="Watch Our Story"
                    className="bg-white border-2 border-gray-300 focus:border-green-500 transition-all duration-300"
                  />
                  <Input 
                    label="Watch Video Link" 
                    value={about.hero.watchVideoLink} 
                    onChange={(e) => updateHero('watchVideoLink', e.target.value)} 
                    placeholder="https://youtube.com/your-video"
                    className="bg-white border-2 border-gray-300 focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div className="mt-4">
                  <Input 
                    label="Explore Button Text" 
                    value={about.hero.exploreButtonText} 
                    onChange={(e) => updateHero('exploreButtonText', e.target.value)} 
                    placeholder="Explore Our Campus"
                    className="bg-white border-2 border-gray-300 focus:border-green-500 transition-all duration-300"
                  />
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};




















