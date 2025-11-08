import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit2, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  Users, 
  Eye, 
  Layout, 
  Star, 
  TrendingUp,
  Book,
  Award,
  Phone,
  MapPin,
  FileText,
  Heart,
  CheckCircle,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Download,
  Shield,
  ArrowRight,
  BookOpen,
  Upload,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Homepage = () => {
  const { 
    homepage, 
    setHomepage, 
    loading, 
    saveAllToFirebase 
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isNewsHeaderModalOpen, setIsNewsHeaderModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [heroForm, setHeroForm] = useState({ h1: '', h2: '', h3: '', image: '' });
  const [ctaHeaderForm, setCTAHeaderForm] = useState({ h1: '', h2: '', h3: '' });
  const [ctaCardForm, setCTACardForm] = useState({ icon: '', h3: '', buttonName: '', path: '' });
  const [statForm, setStatForm] = useState({ text: '', icon: '', number: '' });
  const [newsHeaderForm, setNewsHeaderForm] = useState({ 
    title: '', 
    subtitle: '', 
    description: '' 
  });
  const [newsForm, setNewsForm] = useState({ 
    title: '', 
    date: '', 
    time: '', 
    type: 'Virtual Event', 
    description: '', 
    registrations: '', 
    image: '', 
    imageAlt: '' 
  });

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Layout, color: 'text-blue-600' },
    { id: 'cta', label: 'CTA Section', icon: Star, color: 'text-purple-600' },
    { id: 'stats', label: 'Quick Stats', icon: TrendingUp, color: 'text-green-600' },
    { id: 'news', label: 'News & Events', icon: Calendar, color: 'text-orange-600' },
  ];

  const iconOptions = [
    { value: 'users', label: 'Users', icon: Users },
    { value: 'graduation-cap', label: 'Graduation Cap', icon: GraduationCap },
    { value: 'book-open', label: 'Book Open', icon: BookOpen },
    { value: 'trending-up', label: 'Trending Up', icon: TrendingUp },
    { value: 'message-circle', label: 'Message Circle', icon: MessageCircle },
    { value: 'download', label: 'Download', icon: Download },
    { value: 'shield', label: 'Shield', icon: Shield },
    { value: 'award', label: 'Award', icon: Award },
    { value: 'clock', label: 'Clock', icon: Clock },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'star', label: 'Star', icon: Star },
    { value: 'arrow-right', label: 'Arrow Right', icon: ArrowRight },
    { value: 'book', label: 'Book', icon: Book },
    { value: 'map-pin', label: 'Map Pin', icon: MapPin },
    { value: 'file-text', label: 'File Text', icon: FileText },
    { value: 'heart', label: 'Heart', icon: Heart },
    { value: 'check-circle', label: 'Check Circle', icon: CheckCircle },
    { value: 'calendar', label: 'Calendar', icon: Calendar },
    { value: 'briefcase', label: 'Briefcase', icon: Briefcase }
  ];

  const eventTypeOptions = [
    'Virtual Event',
    'Webinar',
    'In-Person',
    'Hybrid Event'
  ];

  // Helper function to get icon component by name
  const getIconComponent = (iconName, size = 20, color = "currentColor") => {
    if (!iconName) return <Star size={size} color={color} />;
    
    const iconOption = iconOptions.find(icon => icon.value === iconName);
    if (iconOption && iconOption.icon) {
      const IconComponent = iconOption.icon;
      return <IconComponent size={size} color={color} />;
    }
    return <Star size={size} color={color} />; // Default icon
  };

  // Image upload handler
  const handleImageUpload = async (file, type) => {
    if (!file) return '';
    
    setUploadingImage(true);
    try {
      // Simulate image upload - replace with your actual upload logic
      const formData = new FormData();
      formData.append('image', file);
      
      // This would be your actual API call to upload the image
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a blob URL
      const imageUrl = URL.createObjectURL(file);
      
      toast.success('Image uploaded successfully!');
      return imageUrl;
    } catch (error) {
      toast.error('Failed to upload image');
      return '';
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle file input for hero slides
  const handleHeroImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    
    const imageUrl = await handleImageUpload(file, 'hero');
    if (imageUrl) {
      setHeroForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Handle file input for event images
  const handleEventImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    
    const imageUrl = await handleImageUpload(file, 'event');
    if (imageUrl) {
      setNewsForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Clear uploaded image
  const clearHeroImage = () => {
    setHeroForm(prev => ({ ...prev, image: '' }));
  };

  const clearEventImage = () => {
    setNewsForm(prev => ({ ...prev, image: '' }));
  };

  const handleSave = async () => {
    const success = await saveAllToFirebase();
    if (success) {
      toast.success('All homepage settings saved successfully to Firebase!');
    } else {
      toast.error('Failed to save settings to Firebase');
    }
  };

  // Hero Section Functions
  const openHeroModal = (slide = null) => {
    if (slide) {
      setHeroForm({ h1: slide.h1, h2: slide.h2, h3: slide.h3, image: slide.image });
      setEditingItem(slide);
    } else {
      setHeroForm({ h1: '', h2: '', h3: '', image: '' });
      setEditingItem(null);
    }
    setIsHeroModalOpen(true);
  };

  const saveHeroSlide = () => {
    if (!heroForm.h1 || !heroForm.h2 || !heroForm.h3 || !heroForm.image) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingItem) {
      setHomepage(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          slides: prev.hero.slides.map(s => s.id === editingItem.id ? { ...s, ...heroForm } : s)
        }
      }));
      toast.success('Slide updated successfully!');
    } else {
      const newSlide = { id: Date.now(), ...heroForm };
      setHomepage(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          slides: [...prev.hero.slides, newSlide]
        }
      }));
      toast.success('Slide added successfully!');
    }
    setIsHeroModalOpen(false);
    setEditingItem(null);
  };

  const deleteHeroSlide = (id) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      setHomepage(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          slides: prev.hero.slides.filter(s => s.id !== id)
        }
      }));
      toast.success('Slide deleted successfully!');
    }
  };

  // CTA Section Functions
  const saveCTAHeader = () => {
    if (!ctaHeaderForm.h1 || !ctaHeaderForm.h2 || !ctaHeaderForm.h3) {
      toast.error('Please fill all heading fields');
      return;
    }
    setHomepage(prev => ({
      ...prev,
      cta: { ...prev.cta, header: ctaHeaderForm }
    }));
    toast.success('CTA Header saved successfully!');
  };

  const openCTACardModal = (card = null) => {
    if (card) {
      setCTACardForm({ icon: card.icon, h3: card.h3, buttonName: card.buttonName, path: card.path });
      setEditingItem(card);
    } else {
      setCTACardForm({ icon: '', h3: '', buttonName: '', path: '' });
      setEditingItem(null);
    }
    setIsCTAModalOpen(true);
  };

  const saveCTACard = () => {
    if (!ctaCardForm.icon || !ctaCardForm.h3 || !ctaCardForm.buttonName || !ctaCardForm.path) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingItem) {
      setHomepage(prev => ({
        ...prev,
        cta: {
          ...prev.cta,
          cards: prev.cta.cards.map(c => c.id === editingItem.id ? { ...c, ...ctaCardForm } : c)
        }
      }));
      toast.success('CTA Card updated successfully!');
    } else {
      const newCard = { id: Date.now(), ...ctaCardForm };
      setHomepage(prev => ({
        ...prev,
        cta: {
          ...prev.cta,
          cards: [...(prev.cta.cards || []), newCard]
        }
      }));
      toast.success('CTA Card added successfully!');
    }
    setIsCTAModalOpen(false);
    setEditingItem(null);
  };

  const deleteCTACard = (id) => {
    if (confirm('Are you sure you want to delete this CTA card?')) {
      setHomepage(prev => ({
        ...prev,
        cta: {
          ...prev.cta,
          cards: prev.cta.cards.filter(c => c.id !== id)
        }
      }));
      toast.success('CTA Card deleted successfully!');
    }
  };

  // Quick Stats Functions
  const openStatModal = (stat = null) => {
    if (stat) {
      setStatForm({ text: stat.text, icon: stat.icon, number: stat.number });
      setEditingItem(stat);
    } else {
      setStatForm({ text: '', icon: '', number: '' });
      setEditingItem(null);
    }
    setIsStatModalOpen(true);
  };

  const saveStat = () => {
    if (!statForm.text || !statForm.icon || !statForm.number) {
      toast.error('Please fill all fields');
      return;
    }

    if (editingItem) {
      setHomepage(prev => ({
        ...prev,
        quickStats: prev.quickStats.map(s => s.id === editingItem.id ? { ...s, ...statForm } : s)
      }));
      toast.success('Stat updated successfully!');
    } else {
      const newStat = { id: Date.now(), ...statForm };
      setHomepage(prev => ({
        ...prev,
        quickStats: [...prev.quickStats, newStat]
      }));
      toast.success('Stat added successfully!');
    }
    setIsStatModalOpen(false);
    setEditingItem(null);
  };

  const deleteStat = (id) => {
    if (confirm('Are you sure you want to delete this stat?')) {
      setHomepage(prev => ({
        ...prev,
        quickStats: prev.quickStats.filter(s => s.id !== id)
      }));
      toast.success('Stat deleted successfully!');
    }
  };

  // News Section Functions
  const openNewsHeaderModal = () => {
    setNewsHeaderForm({
      title: homepage.news?.header?.title || '',
      subtitle: homepage.news?.header?.subtitle || '',
      description: homepage.news?.header?.description || ''
    });
    setIsNewsHeaderModalOpen(true);
  };

  const saveNewsHeader = () => {
    if (!newsHeaderForm.title || !newsHeaderForm.subtitle || !newsHeaderForm.description) {
      toast.error('Please fill all fields');
      return;
    }

    setHomepage(prev => ({
      ...prev,
      news: {
        ...prev.news,
        header: newsHeaderForm
      }
    }));
    toast.success('News header saved successfully!');
    setIsNewsHeaderModalOpen(false);
  };

  const openNewsModal = (event = null) => {
    if (event) {
      setNewsForm({ 
        title: event.title, 
        date: event.date, 
        time: event.time, 
        type: event.type, 
        description: event.description, 
        registrations: event.registrations.toString(), 
        image: event.image, 
        imageAlt: event.imageAlt 
      });
      setEditingItem(event);
    } else {
      setNewsForm({ 
        title: '', 
        date: '', 
        time: '', 
        type: 'Virtual Event', 
        description: '', 
        registrations: '', 
        image: '', 
        imageAlt: '' 
      });
      setEditingItem(null);
    }
    setIsNewsModalOpen(true);
  };

  const saveNewsEvent = () => {
    if (!newsForm.title || !newsForm.date || !newsForm.time || !newsForm.description || !newsForm.image) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingItem) {
      setHomepage(prev => ({
        ...prev,
        news: {
          ...prev.news,
          events: prev.news.events.map(e => e.id === editingItem.id ? { 
            ...e, 
            ...newsForm,
            registrations: parseInt(newsForm.registrations) || 0
          } : e)
        }
      }));
      toast.success('Event updated successfully!');
    } else {
      const newEvent = { 
        id: Date.now(), 
        ...newsForm,
        registrations: parseInt(newsForm.registrations) || 0
      };
      setHomepage(prev => ({
        ...prev,
        news: {
          ...prev.news,
          events: [...(prev.news?.events || []), newEvent]
        }
      }));
      toast.success('Event added successfully!');
    }
    setIsNewsModalOpen(false);
    setEditingItem(null);
  };

  const deleteNewsEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setHomepage(prev => ({
        ...prev,
        news: {
          ...prev.news,
          events: prev.news.events.filter(e => e.id !== id)
        }
      }));
      toast.success('Event deleted successfully!');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Virtual Event':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Webinar':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In-Person':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Hybrid Event':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'hero': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'cta': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'stats': return 'bg-green-50 border-green-200 text-green-700';
      case 'news': return 'bg-orange-50 border-orange-200 text-orange-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" role="status" aria-label="Loading">
            <span className="sr-only">Loading homepage data...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading homepage data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      {/* SEO Meta Structure - This would be handled by your framework's head component */}
      {/* <head>
        <title>Homepage Management | College Admin Panel</title>
        <meta name="description" content="Manage and optimize your college homepage sections including hero banners, call-to-action sections, statistics, and news events for better engagement and SEO performance." />
        <meta name="keywords" content="college homepage, hero section, CTA, statistics, news events, website management, SEO optimization" />
        <meta property="og:title" content="Homepage Management | College Admin Panel" />
        <meta property="og:description" content="Optimize your college homepage for better user engagement and search engine visibility." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/admin/homepage" />
      </head> */}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section with proper heading hierarchy */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Homepage Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Design and manage your college homepage sections</p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label={loading ? 'Saving changes to Firebase' : 'Save all changes to Firebase'}
          >
            <Save size={20} className="mr-2" aria-hidden="true" />
            {loading ? 'Saving...' : 'Save All Changes to Firebase'}
          </Button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation with proper ARIA labels */}
          <nav aria-label="Homepage section navigation" className="lg:w-80 space-y-3">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
                    activeTab === tab.id
                      ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  aria-label={`Manage ${tab.label}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      activeTab === tab.id ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <IconComponent 
                        size={20} 
                        className={activeTab === tab.id ? tab.color : 'text-gray-500'} 
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <span className="font-semibold block">{tab.label}</span>
                      <span className="text-sm opacity-75">
                        {tab.id === 'hero' && 'Manage hero slides'}
                        {tab.id === 'cta' && 'Call-to-action sections'}
                        {tab.id === 'stats' && 'Statistics and numbers'}
                        {tab.id === 'news' && 'Events and announcements'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 space-y-6">
            {/* Hero Section */}
            {activeTab === 'hero' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Layout className="text-blue-600" size={24} aria-hidden="true" />
                        Hero Slides Management
                      </CardTitle>
                      <p className="text-gray-600 mt-1">Manage the main banner slides on your homepage</p>
                    </div>
                    <Button 
                      onClick={() => openHeroModal()}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                      aria-label="Add new hero slide"
                    >
                      <Plus size={18} className="mr-2" aria-hidden="true" />
                      Add New Slide
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {homepage.hero?.slides?.length === 0 ? (
                    <div className="text-center py-12" role="status" aria-label="No slides created">
                      <Layout size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Slides Created</h2>
                      <p className="text-gray-600 mb-4">Get started by adding your first hero slide</p>
                      <Button onClick={() => openHeroModal()} aria-label="Create first hero slide">
                        <Plus size={18} className="mr-2" aria-hidden="true" />
                        Create First Slide
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4" role="list" aria-label="List of hero slides">
                      {homepage.hero?.slides?.map(slide => (
                        <div 
                          key={slide.id} 
                          className="group bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                          role="listitem"
                        >
                          <div className="flex items-start gap-4">
                            {slide.image && (
                              <div className="relative">
                                <img 
                                  src={slide.image} 
                                  alt={slide.h1 || "Hero slide preview"} 
                                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; e.target.alt = 'Default placeholder image'; }}
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors" aria-hidden="true"></div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg text-gray-900 truncate">{slide.h1}</h3>
                              <h4 className="font-semibold text-gray-700 mt-1 text-sm">{slide.h2}</h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{slide.h3}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={() => openHeroModal(slide)}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                                aria-label={`Edit slide: ${slide.h1}`}
                              >
                                <Edit2 size={14} aria-hidden="true" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => deleteHeroSlide(slide.id)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                aria-label={`Delete slide: ${slide.h1}`}
                              >
                                <Trash2 size={14} aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* CTA Section */}
            {activeTab === 'cta' && (
              <>
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Star className="text-purple-600" size={24} aria-hidden="true" />
                      CTA Header Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4">
                      <Input
                        label="Main Heading (H1)"
                        value={ctaHeaderForm.h1 || homepage.cta?.header?.h1 || ''}
                        onChange={(e) => setCTAHeaderForm({ ...ctaHeaderForm, h1: e.target.value })}
                        placeholder="Transform Your Future Today"
                        className="bg-white border-gray-300 focus:border-purple-500"
                        aria-required="true"
                      />
                      <Input
                        label="Sub Heading (H2)"
                        value={ctaHeaderForm.h2 || homepage.cta?.header?.h2 || ''}
                        onChange={(e) => setCTAHeaderForm({ ...ctaHeaderForm, h2: e.target.value })}
                        placeholder="Join thousands of successful students"
                        className="bg-white border-gray-300 focus:border-purple-500"
                        aria-required="true"
                      />
                      <Input
                        label="Description (H3)"
                        value={ctaHeaderForm.h3 || homepage.cta?.header?.h3 || ''}
                        onChange={(e) => setCTAHeaderForm({ ...ctaHeaderForm, h3: e.target.value })}
                        placeholder="Start your journey with our world-class programs and expert instructors"
                        className="bg-white border-gray-300 focus:border-purple-500"
                        aria-required="true"
                      />
                    </div>
                    <Button 
                      onClick={saveCTAHeader}
                      className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                      aria-label="Save CTA header content"
                    >
                      Save Header Content
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <Star className="text-purple-600" size={24} aria-hidden="true" />
                          CTA Action Cards
                        </CardTitle>
                        <p className="text-gray-600 mt-1">Create engaging call-to-action cards</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => openCTACardModal()}
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                        aria-label="Add new CTA card"
                      >
                        <Plus size={16} className="mr-1" aria-hidden="true" />
                        Add Card
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {homepage.cta?.cards?.length === 0 ? (
                      <div className="text-center py-8" role="status" aria-label="No CTA cards">
                        <Star size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">No CTA Cards</h2>
                        <p className="text-gray-600 mb-4">Add cards to guide users through your site</p>
                        <Button onClick={() => openCTACardModal()} aria-label="Create first CTA card">
                          <Plus size={18} className="mr-2" aria-hidden="true" />
                          Create First Card
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4" role="list" aria-label="List of CTA cards">
                        {homepage.cta?.cards?.map(card => (
                          <div 
                            key={card.id} 
                            className="group bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                            role="listitem"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div 
                                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md"
                                  aria-hidden="true"
                                >
                                  {getIconComponent(card.icon, 24, "white")}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900">{card.h3}</h3>
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">Button:</span> {card.buttonName} → {card.path}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  onClick={() => openCTACardModal(card)}
                                  className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
                                  aria-label={`Edit CTA card: ${card.h3}`}
                                >
                                  <Edit2 size={14} aria-hidden="true" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  onClick={() => deleteCTACard(card.id)}
                                  className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                  aria-label={`Delete CTA card: ${card.h3}`}
                                >
                                  <Trash2 size={14} aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Stats Section */}
            {activeTab === 'stats' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="text-green-600" size={24} aria-hidden="true" />
                        Quick Statistics
                      </CardTitle>
                      <p className="text-gray-600 mt-1">Showcase your college's achievements and numbers</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => openStatModal()}
                      className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                      aria-label="Add new statistic"
                    >
                      <Plus size={16} className="mr-1" aria-hidden="true" />
                      Add Stat
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {homepage.quickStats?.length === 0 ? (
                    <div className="text-center py-12" role="status" aria-label="No statistics added">
                      <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Statistics Added</h2>
                      <p className="text-gray-600 mb-4">Add statistics to build trust with visitors</p>
                      <Button onClick={() => openStatModal()} aria-label="Add first statistic">
                        <Plus size={18} className="mr-2" aria-hidden="true" />
                        Add First Statistic
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="List of statistics">
                      {homepage.quickStats?.map(stat => (
                        <div 
                          key={stat.id} 
                          className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                          role="listitem"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div 
                              className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
                              aria-hidden="true"
                            >
                              {getIconComponent(stat.icon, 28, "white")}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                size="sm" 
                                variant="secondary" 
                                onClick={() => openStatModal(stat)}
                                className="bg-white/80 text-green-600 hover:bg-white border-green-200 backdrop-blur-sm"
                                aria-label={`Edit statistic: ${stat.text}`}
                              >
                                <Edit2 size={12} aria-hidden="true" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => deleteStat(stat.id)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                aria-label={`Delete statistic: ${stat.text}`}
                              >
                                <Trash2 size={12} aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-3xl font-bold text-green-600 mb-2" aria-label={`Statistic value: ${stat.number}`}>
                            {stat.number}
                          </p>
                          <p className="text-sm font-medium text-gray-700">{stat.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* News Section */}
            {activeTab === 'news' && (
              <>
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <Calendar className="text-orange-600" size={24} aria-hidden="true" />
                          News & Events Header
                        </CardTitle>
                        <p className="text-gray-600 mt-1">Set the title and description for your events section</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={openNewsHeaderModal}
                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                        aria-label="Edit news and events header"
                      >
                        <Edit2 size={16} className="mr-1" aria-hidden="true" />
                        Edit Header
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
                      <h2 className="font-bold text-xl text-gray-900 mb-2">
                        {homepage.news?.header?.title || 'Join Our Events'}
                      </h2>
                      <p className="text-orange-700 font-semibold text-sm mb-3">
                        {homepage.news?.header?.subtitle || 'Upcoming Events & Announcements'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {homepage.news?.header?.description || 'Discover upcoming workshops, webinars, and networking events designed to help you grow.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <Calendar className="text-orange-600" size={24} aria-hidden="true" />
                          Events & Announcements
                        </CardTitle>
                        <p className="text-gray-600 mt-1">Manage upcoming events and news</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => openNewsModal()}
                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                        aria-label="Add new event"
                      >
                        <Plus size={16} className="mr-1" aria-hidden="true" />
                        Add Event
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {homepage.news?.events?.length === 0 ? (
                      <div className="text-center py-12" role="status" aria-label="No events scheduled">
                        <Calendar size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">No Events Scheduled</h2>
                        <p className="text-gray-600 mb-4">Add events to keep your audience engaged</p>
                        <Button onClick={() => openNewsModal()} aria-label="Schedule first event">
                          <Plus size={18} className="mr-2" aria-hidden="true" />
                          Schedule First Event
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6" role="list" aria-label="List of events">
                        {homepage.news?.events?.map(event => (
                          <article 
                            key={event.id} 
                            className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                            role="listitem"
                          >
                            <div className="flex items-start gap-6">
                              {event.image && (
                                <div className="relative flex-shrink-0">
                                  <img 
                                    src={event.image} 
                                    alt={event.imageAlt || event.title} 
                                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/96'; e.target.alt = 'Default event image'; }}
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors" aria-hidden="true"></div>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="font-bold text-xl text-gray-900">{event.title}</h3>
                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getEventTypeColor(event.type)}`}>
                                    {event.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                    <Calendar size={14} className="text-orange-600" aria-hidden="true" />
                                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                                  </div>
                                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                    <Clock size={14} className="text-orange-600" aria-hidden="true" />
                                    <span>{event.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                    <Users size={14} className="text-orange-600" aria-hidden="true" />
                                    <span>{event.registrations} registered</span>
                                  </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{event.description}</p>
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  onClick={() => openNewsModal(event)}
                                  className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200"
                                  aria-label={`Edit event: ${event.title}`}
                                >
                                  <Edit2 size={14} aria-hidden="true" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  onClick={() => deleteNewsEvent(event.id)}
                                  className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                  aria-label={`Delete event: ${event.title}`}
                                >
                                  <Trash2 size={14} aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {/* Hero Slide Modal */}
      <Modal 
        isOpen={isHeroModalOpen} 
        onClose={() => setIsHeroModalOpen(false)} 
        title={editingItem ? 'Edit Hero Slide' : 'Add Hero Slide'}
        size="md"
        aria-label={editingItem ? 'Edit hero slide dialog' : 'Add hero slide dialog'}
      >
        <div className="space-y-6">
          <Input
            label="Main Heading (H1)"
            value={heroForm.h1}
            onChange={(e) => setHeroForm({ ...heroForm, h1: e.target.value })}
            placeholder="Welcome to Our College"
            aria-required="true"
          />
          <Input
            label="Sub Heading (H2)"
            value={heroForm.h2}
            onChange={(e) => setHeroForm({ ...heroForm, h2: e.target.value })}
            placeholder="Excellence in Education Since 1990"
            aria-required="true"
          />
          <Textarea
            label="Description (H3)"
            value={heroForm.h3}
            onChange={(e) => setHeroForm({ ...heroForm, h3: e.target.value })}
            placeholder="Join our community of learners and discover endless opportunities for growth and success."
            rows={3}
            aria-required="true"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} className="text-blue-600" aria-hidden="true" />
              Background Image
            </label>
            
            {/* Image Upload Section */}
            <div className="space-y-4">
              {/* URL Input */}
              <Input
                value={heroForm.image}
                onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                aria-required="true"
              />
              
              {/* File Upload */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50">
                    <Upload size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                
                {heroForm.image && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={clearHeroImage}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>
            
            {heroForm.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <div className="relative">
                  <img 
                    src={heroForm.image} 
                    alt="Hero slide preview" 
                    className="w-full h-40 object-cover rounded-lg border-2 border-gray-300"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; e.target.alt = 'Default placeholder image'; }}
                    loading="lazy"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsHeroModalOpen(false)}>Cancel</Button>
            <Button onClick={saveHeroSlide} className="bg-blue-600 hover:bg-blue-700">Save Slide</Button>
          </div>
        </div>
      </Modal>

      {/* CTA Card Modal */}
      <Modal 
        isOpen={isCTAModalOpen} 
        onClose={() => setIsCTAModalOpen(false)} 
        title={editingItem ? 'Edit CTA Card' : 'Add CTA Card'}
        size="md"
        aria-label={editingItem ? 'Edit CTA card dialog' : 'Add CTA card dialog'}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Selection</label>
            <select
              value={ctaCardForm.icon}
              onChange={(e) => setCTACardForm({ ...ctaCardForm, icon: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              aria-required="true"
            >
              <option value="">Choose an icon...</option>
              {iconOptions.map(icon => (
                <option key={icon.value} value={icon.value}>{icon.label}</option>
              ))}
            </select>
            {ctaCardForm.icon && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-gray-600">Preview:</span>
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                  {getIconComponent(ctaCardForm.icon, 16, "white")}
                </div>
                <span className="text-sm font-medium text-purple-700">
                  {iconOptions.find(icon => icon.value === ctaCardForm.icon)?.label}
                </span>
              </div>
            )}
          </div>
          <Input
            label="Card Title (H3)"
            value={ctaCardForm.h3}
            onChange={(e) => setCTACardForm({ ...ctaCardForm, h3: e.target.value })}
            placeholder="Explore Our Programs"
            aria-required="true"
          />
          <Input
            label="Button Text"
            value={ctaCardForm.buttonName}
            onChange={(e) => setCTACardForm({ ...ctaCardForm, buttonName: e.target.value })}
            placeholder="Learn More"
            aria-required="true"
          />
          <Input
            label="Link Path"
            value={ctaCardForm.path}
            onChange={(e) => setCTACardForm({ ...ctaCardForm, path: e.target.value })}
            placeholder="/programs or https://example.com"
            aria-required="true"
          />
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsCTAModalOpen(false)}>Cancel</Button>
            <Button onClick={saveCTACard} className="bg-purple-600 hover:bg-purple-700">Save Card</Button>
          </div>
        </div>
      </Modal>

      {/* Quick Stat Modal */}
      <Modal 
        isOpen={isStatModalOpen} 
        onClose={() => setIsStatModalOpen(false)} 
        title={editingItem ? 'Edit Statistic' : 'Add Statistic'}
        size="md"
        aria-label={editingItem ? 'Edit statistic dialog' : 'Add statistic dialog'}
      >
        <div className="space-y-6">
          <Input
            label="Statistic Text"
            value={statForm.text}
            onChange={(e) => setStatForm({ ...statForm, text: e.target.value })}
            placeholder="Students Enrolled"
            aria-required="true"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Selection</label>
            <select
              value={statForm.icon}
              onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              aria-required="true"
            >
              <option value="">Choose an icon...</option>
              {iconOptions.map(icon => (
                <option key={icon.value} value={icon.value}>{icon.label}</option>
              ))}
            </select>
            {statForm.icon && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-600">Preview:</span>
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                  {getIconComponent(statForm.icon, 16, "white")}
                </div>
                <span className="text-sm font-medium text-green-700">
                  {iconOptions.find(icon => icon.value === statForm.icon)?.label}
                </span>
              </div>
            )}
          </div>
          <Input
            label="Number/Value"
            value={statForm.number}
            onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
            placeholder="50,000+ or 95%"
            aria-required="true"
          />
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsStatModalOpen(false)}>Cancel</Button>
            <Button onClick={saveStat} className="bg-green-600 hover:bg-green-700">Save Statistic</Button>
          </div>
        </div>
      </Modal>

      {/* News Header Modal */}
      <Modal 
        isOpen={isNewsHeaderModalOpen} 
        onClose={() => setIsNewsHeaderModalOpen(false)} 
        title="Edit News & Events Header"
        size="md"
        aria-label="Edit news and events header dialog"
      >
        <div className="space-y-6">
          <Input
            label="Section Title"
            value={newsHeaderForm.title}
            onChange={(e) => setNewsHeaderForm({ ...newsHeaderForm, title: e.target.value })}
            placeholder="Join Our Events"
            aria-required="true"
          />
          <Input
            label="Subtitle"
            value={newsHeaderForm.subtitle}
            onChange={(e) => setNewsHeaderForm({ ...newsHeaderForm, subtitle: e.target.value })}
            placeholder="Upcoming Events & Announcements"
            aria-required="true"
          />
          <Textarea
            label="Description"
            value={newsHeaderForm.description}
            onChange={(e) => setNewsHeaderForm({ ...newsHeaderForm, description: e.target.value })}
            placeholder="Discover upcoming workshops, webinars, and networking events designed to help you grow professionally and personally."
            rows={4}
            aria-required="true"
          />
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsNewsHeaderModalOpen(false)}>Cancel</Button>
            <Button onClick={saveNewsHeader} className="bg-orange-600 hover:bg-orange-700">Save Header</Button>
          </div>
        </div>
      </Modal>

      {/* News Event Modal */}
      <Modal 
        isOpen={isNewsModalOpen} 
        onClose={() => setIsNewsModalOpen(false)} 
        title={editingItem ? 'Edit Event' : 'Add New Event'}
        size="lg"
        aria-label={editingItem ? 'Edit event dialog' : 'Add new event dialog'}
      >
        <div className="space-y-6 max-h-[80vh] overflow-y-auto">
          <Input
            label="Event Title"
            value={newsForm.title}
            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
            placeholder="Virtual Career Fair 2024"
            aria-required="true"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Date"
              type="date"
              value={newsForm.date}
              onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
              aria-required="true"
            />
            <Input
              label="Event Time"
              value={newsForm.time}
              onChange={(e) => setNewsForm({ ...newsForm, time: e.target.value })}
              placeholder="10:00 AM - 4:00 PM EST"
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={newsForm.type}
                onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                aria-required="true"
              >
                {eventTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <Input
              label="Registrations Count"
              type="number"
              value={newsForm.registrations}
              onChange={(e) => setNewsForm({ ...newsForm, registrations: e.target.value })}
              placeholder="2847"
            />
          </div>

          <Textarea
            label="Event Description"
            value={newsForm.description}
            onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
            placeholder="Connect with top employers and explore career opportunities in this virtual career fair. Network with industry professionals and discover your next career move."
            rows={4}
            aria-required="true"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} className="text-orange-600" aria-hidden="true" />
              Event Image
            </label>
            
            {/* Image Upload Section */}
            <div className="space-y-4">
              {/* URL Input */}
              <Input
                value={newsForm.image}
                onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-1551830410-95f3f2ce0b5a"
                aria-required="true"
              />
              
              {/* File Upload */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 transition-colors cursor-pointer bg-gray-50 hover:bg-orange-50">
                    <Upload size={20} className="text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEventImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                
                {newsForm.image && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={clearEventImage}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>
            
            {newsForm.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <div className="relative">
                  <img 
                    src={newsForm.image} 
                    alt={newsForm.imageAlt || "Event preview image"} 
                    className="w-full h-40 object-cover rounded-lg border-2 border-gray-300"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; e.target.alt = 'Default event image'; }}
                    loading="lazy"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Input
            label="Image Alt Text"
            value={newsForm.imageAlt}
            onChange={(e) => setNewsForm({ ...newsForm, imageAlt: e.target.value })}
            placeholder="Virtual career fair with professionals networking online"
          />

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsNewsModalOpen(false)}>Cancel</Button>
            <Button onClick={saveNewsEvent} className="bg-orange-600 hover:bg-orange-700">Save Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};