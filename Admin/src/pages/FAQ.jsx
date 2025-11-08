import React, { useState } from 'react';
import { Plus, Edit, Trash2, HelpCircle, FolderOpen, ChevronDown, ChevronUp, Save, Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';
import { Helmet } from 'react-helmet';

export const FAQ = () => {
  const { faqs, setFaqs, saveAllToFirebase } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [catFormData, setCatFormData] = useState({ title: '', order: 1 });
  const [faqFormData, setFaqFormData] = useState({ question: '', answer: '', order: 1 });
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [saving, setSaving] = useState(false);

  // SEO Metadata
  const pageTitle = "FAQ Management System | Admin Dashboard";
  const pageDescription = "Manage and organize frequently asked questions with our comprehensive FAQ management system. Add, edit, and categorize FAQs efficiently.";
  const pageKeywords = "FAQ management, frequently asked questions, admin dashboard, content management, customer support";

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSaveToDatabase = async () => {
    setSaving(true);
    try {
      const success = await saveAllToFirebase();
      if (success) {
        toast.success('All FAQ data saved successfully to Firebase!');
      } else {
        toast.error('Failed to save FAQ data to Firebase');
      }
    } catch (error) {
      toast.error('Error saving FAQ data');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    if (!catFormData.title.trim()) {
      toast.error('Please enter a category title');
      return;
    }
    const newCat = { id: Date.now(), ...catFormData, items: [] };
    setFaqs(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
    toast.success('Category added successfully!');
    setIsCatModalOpen(false);
    setCatFormData({ title: '', order: 1 });
  };

  const handleEditCategory = () => {
    if (!catFormData.title.trim()) {
      toast.error('Please enter a category title');
      return;
    }
    setFaqs(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...catFormData }
          : cat
      )
    }));
    toast.success('Category updated successfully!');
    setIsCatModalOpen(false);
    setEditingCategory(null);
    setCatFormData({ title: '', order: 1 });
  };

  const handleAddFAQ = () => {
    if (!selectedCategory) return;
    if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
      toast.error('Please fill in both question and answer');
      return;
    }
    const newFAQ = { id: Date.now(), ...faqFormData };
    setFaqs(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategory.id
          ? { ...cat, items: [...cat.items, newFAQ] }
          : cat
      )
    }));
    toast.success('FAQ added successfully!');
    setIsModalOpen(false);
    setFaqFormData({ question: '', answer: '', order: 1 });
  };

  const handleEditFAQ = () => {
    if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
      toast.error('Please fill in both question and answer');
      return;
    }
    setFaqs(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategory.id
          ? { 
              ...cat, 
              items: cat.items.map(faq =>
                faq.id === editingFAQ.id
                  ? { ...faq, ...faqFormData }
                  : faq
              )
            }
          : cat
      )
    }));
    toast.success('FAQ updated successfully!');
    setIsModalOpen(false);
    setEditingFAQ(null);
    setFaqFormData({ question: '', answer: '', order: 1 });
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category? All FAQs within it will also be deleted.')) {
      setFaqs(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
      toast.success('Category deleted successfully!');
    }
  };

  const handleDeleteFAQ = (catId, faqId) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === catId
            ? { ...cat, items: cat.items.filter(f => f.id !== faqId) }
            : cat
        )
      }));
      toast.success('FAQ deleted successfully!');
    }
  };

  const openEditCategoryModal = (category) => {
    setEditingCategory(category);
    setCatFormData({ title: category.title, order: category.order });
    setIsCatModalOpen(true);
  };

  const openEditFAQModal = (category, faq) => {
    setSelectedCategory(category);
    setEditingFAQ(faq);
    setFaqFormData({ question: faq.question, answer: faq.answer, order: faq.order });
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsCatModalOpen(false);
    setEditingCategory(null);
    setEditingFAQ(null);
    setSelectedCategory(null);
    setCatFormData({ title: '', order: 1 });
    setFaqFormData({ question: '', answer: '', order: 1 });
  };

  const getCategoryColor = (index) => {
    const colors = [
      'bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200',
      'bg-gradient-to-r from-green-50 to-green-100/50 border-green-200',
      'bg-gradient-to-r from-purple-50 to-purple-100/50 border-purple-200',
      'bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-200',
      'bg-gradient-to-r from-pink-50 to-pink-100/50 border-pink-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/admin/faq" />
      </Helmet>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageTitle,
          "description": pageDescription,
          "publisher": {
            "@type": "Organization",
            "name": "Your Company Name"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Section */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                FAQ Management
              </h1>
              <p className="text-gray-600 mt-2 text-base sm:text-lg">
                Manage frequently asked questions and categories
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <Button 
                onClick={handleSaveToDatabase}
                disabled={saving}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Database size={20} className="mr-2" />
                {saving ? 'Saving...' : 'Save All to Database'}
              </Button>
              <Button 
                onClick={() => setIsCatModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Plus size={20} className="mr-2" />
                Add Category
              </Button>
            </div>
          </header>

          {/* Stats Overview */}
          <section aria-label="FAQ Statistics" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FolderOpen className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{faqs.categories.length}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Total Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {faqs.categories.reduce((total, cat) => total + (cat.items?.length || 0), 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Total FAQs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Edit className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {faqs.categories.filter(cat => cat.items?.length === 0).length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Empty Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Categories and FAQs */}
          <main>
            {faqs.categories.length === 0 ? (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12 sm:py-16">
                  <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No FAQ Categories Yet</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    Get started by creating your first FAQ category to organize your frequently asked questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => setIsCatModalOpen(true)}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full sm:w-auto"
                    >
                      <Plus size={20} className="mr-2" />
                      Create First Category
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {faqs.categories.map((category, index) => (
                  <Card key={category.id} className={`border-0 shadow-lg ${getCategoryColor(index)} backdrop-blur-sm`}>
                    <CardHeader className="border-b border-gray-200/50 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center gap-2 sm:gap-3 hover:bg-white/50 p-2 rounded-lg transition-colors"
                            aria-label={expandedCategories.has(category.id) ? `Collapse ${category.title}` : `Expand ${category.title}`}
                          >
                            {expandedCategories.has(category.id) ? (
                              <ChevronUp className="text-gray-600" size={18} />
                            ) : (
                              <ChevronDown className="text-gray-600" size={18} />
                            )}
                            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                              <FolderOpen size={18} className="text-current" />
                              {category.title}
                            </CardTitle>
                          </button>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-white/80 text-gray-600 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
                              {category.items?.length || 0} FAQs
                            </span>
                            <span className="bg-white/80 text-gray-600 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
                              Order: {category.order}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            onClick={() => { setSelectedCategory(category); setIsModalOpen(true); }}
                            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm"
                          >
                            <Plus size={14} className="mr-1" />
                            Add FAQ
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => openEditCategoryModal(category)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-sm hover:shadow-md transition-all"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="danger" 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0 shadow-sm hover:shadow-md transition-all"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedCategories.has(category.id) && (
                      <CardContent className="p-4 sm:p-6">
                        {category.items?.length === 0 ? (
                          <div className="text-center py-6 sm:py-8 bg-white/50 rounded-xl border-2 border-dashed border-gray-300">
                            <HelpCircle size={40} className="mx-auto text-gray-400 mb-3" />
                            <p className="text-gray-600 font-medium mb-4 text-sm sm:text-base">No FAQs in this category yet</p>
                            <Button 
                              onClick={() => { setSelectedCategory(category); setIsModalOpen(true); }}
                              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 text-xs sm:text-sm"
                            >
                              <Plus size={14} className="mr-2" />
                              Add First FAQ
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3 sm:space-y-4">
                            {category.items?.map((faq, faqIndex) => (
                              <article 
                                key={faq.id} 
                                className="group bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                itemScope
                                itemType="https://schema.org/Question"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-start gap-3 mb-3">
                                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <HelpCircle className="text-blue-600" size={14} />
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2" itemProp="name">
                                          {faq.question}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                                          <span itemProp="text">{faq.answer}</span>
                                        </p>
                                        <div className="flex items-center gap-3 mt-3 text-xs sm:text-sm text-gray-500">
                                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                                            Order: {faq.order}
                                          </span>
                                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                                            FAQ #{faqIndex + 1}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-2 sm:ml-4">
                                    <Button 
                                      size="sm" 
                                      onClick={() => openEditFAQModal(category, faq)}
                                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-sm hover:shadow-md"
                                    >
                                      <Edit size={12} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="danger" 
                                      onClick={() => handleDeleteFAQ(category.id, faq.id)}
                                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0 shadow-sm hover:shadow-md"
                                    >
                                      <Trash2 size={12} />
                                    </Button>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </main>

          {/* Add/Edit Category Modal */}
          <Modal 
            isOpen={isCatModalOpen} 
            onClose={closeModals} 
            title={
              <div className="flex items-center gap-2">
                <FolderOpen size={20} className="text-purple-600" />
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </div>
            }
            size="md"
          >
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Category Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Category Title"
                    value={catFormData.title}
                    onChange={(e) => setCatFormData({...catFormData, title: e.target.value})}
                    placeholder="e.g., General Questions, Technical Support"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                  <Input
                    label="Display Order"
                    type="number"
                    value={catFormData.order}
                    onChange={(e) => setCatFormData({...catFormData, order: Number(e.target.value)})}
                    placeholder="1"
                    min="1"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={closeModals}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingCategory ? handleEditCategory : handleAddCategory}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg order-1 sm:order-2"
                >
                  {editingCategory ? <Save size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </div>
          </Modal>

          {/* Add/Edit FAQ Modal */}
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModals} 
            title={
              <div className="flex items-center gap-2">
                <HelpCircle size={20} className="text-green-600" />
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                {selectedCategory && (
                  <span className="text-sm text-gray-600 font-normal ml-2">
                    to {selectedCategory.title}
                  </span>
                )}
              </div>
            }
            size="lg"
          >
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">FAQ Content</h3>
                <div className="space-y-4">
                  <Input
                    label="Question"
                    value={faqFormData.question}
                    onChange={(e) => setFaqFormData({...faqFormData, question: e.target.value})}
                    placeholder="What is your return policy?"
                    className="bg-white border-2 border-gray-300 focus:border-green-500"
                  />
                  <Textarea
                    label="Answer"
                    value={faqFormData.answer}
                    onChange={(e) => setFaqFormData({...faqFormData, answer: e.target.value})}
                    placeholder="Our return policy allows returns within 30 days of purchase..."
                    rows={4}
                    className="bg-white border-2 border-gray-300 focus:border-green-500"
                  />
                  <Input
                    label="Display Order"
                    type="number"
                    value={faqFormData.order}
                    onChange={(e) => setFaqFormData({...faqFormData, order: Number(e.target.value)})}
                    placeholder="1"
                    min="1"
                    className="bg-white border-2 border-gray-300 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={closeModals}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingFAQ ? handleEditFAQ : handleAddFAQ}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg order-1 sm:order-2"
                >
                  {editingFAQ ? <Save size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                  {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};