import React, { useState } from 'react';
import { Plus, Edit, Trash2, Award, User, BookOpen, Calendar, Hash, Camera, Download, Eye, Search, Filter, Database, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';
import { Helmet } from 'react-helmet';

export const Certificates = () => {
  const { certificates, setCertificates, saveAllToFirebase } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    registrationNumber: '',
    studentName: '',
    studentProfilePicture: '',
    courseName: '',
    duration: '',
    dateOfAward: '',
    grade: '',
    instructor: '',
    description: '',
    certificateType: 'completion',
    credits: '',
    verificationUrl: ''
  });

  // SEO Metadata
  const pageTitle = "Certificate Management System | Admin Dashboard";
  const pageDescription = "Manage and issue student certificates, track achievements, and maintain comprehensive records of course completions and certifications.";
  const pageKeywords = "certificate management, student certificates, course completion, achievement awards, certificate generator, admin dashboard";

  // Handle save to database
  const handleSaveToDatabase = async () => {
    setSaving(true);
    try {
      const success = await saveAllToFirebase();
      if (success) {
        toast.success('All certificate data saved successfully to Firebase!');
      } else {
        toast.error('Failed to save certificate data to Firebase');
      }
    } catch (error) {
      toast.error('Error saving certificate data');
    } finally {
      setSaving(false);
    }
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      registrationNumber: '',
      studentName: '',
      studentProfilePicture: '',
      courseName: '',
      duration: '',
      dateOfAward: '',
      grade: '',
      instructor: '',
      description: '',
      certificateType: 'completion',
      credits: '',
      verificationUrl: ''
    });
  };

  // Open add modal
  const openAddModal = () => {
    resetFormData();
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (certificate) => {
    setFormData({
      registrationNumber: certificate.registrationNumber || '',
      studentName: certificate.studentName || '',
      studentProfilePicture: certificate.studentProfilePicture || '',
      courseName: certificate.courseName || '',
      duration: certificate.duration || '',
      dateOfAward: certificate.dateOfAward || '',
      grade: certificate.grade || '',
      instructor: certificate.instructor || '',
      description: certificate.description || '',
      certificateType: certificate.certificateType || 'completion',
      credits: certificate.credits || '',
      verificationUrl: certificate.verificationUrl || ''
    });
    setEditingCertificate(certificate);
    setIsEditModalOpen(true);
  };

  // Handle add certificate
  const handleAdd = () => {
    if (!formData.registrationNumber || !formData.studentName || !formData.courseName || !formData.dateOfAward) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCert = { 
      id: Date.now(), 
      createdAt: new Date().toISOString(),
      ...formData 
    };
    
    setCertificates(prev => ({ 
      ...prev, 
      records: [...prev.records, newCert] 
    }));
    
    toast.success('Certificate added successfully!');
    setIsModalOpen(false);
    resetFormData();
  };

  // Handle update certificate
  const handleUpdate = () => {
    if (!formData.registrationNumber || !formData.studentName || !formData.courseName || !formData.dateOfAward) {
      toast.error('Please fill in all required fields');
      return;
    }

    setCertificates(prev => ({
      ...prev,
      records: prev.records.map(cert => 
        cert.id === editingCertificate.id 
          ? { ...cert, ...formData, updatedAt: new Date().toISOString() }
          : cert
      )
    }));

    toast.success('Certificate updated successfully!');
    setIsEditModalOpen(false);
    setEditingCertificate(null);
    resetFormData();
  };

  // Handle delete certificate
  const handleDelete = (id) => {
    setCertificates(prev => ({ 
      ...prev, 
      records: prev.records.filter(c => c.id !== id) 
    }));
    toast.success('Certificate deleted successfully!');
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, studentProfilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate certificate PDF (placeholder function)
  const generatePDF = (certificate) => {
    toast.info('Generating PDF certificate...');
    // In a real implementation, this would generate and download a PDF
    console.log('Generating PDF for:', certificate);
  };

  // View certificate details
  const viewCertificate = (certificate) => {
    toast.info(`Viewing certificate: ${certificate.registrationNumber}`);
    // In a real implementation, this would open a detailed view modal
    console.log('Viewing certificate:', certificate);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter certificates based on search and filter
  const filteredCertificates = certificates.records.filter(cert => {
    const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterCourse || cert.courseName === filterCourse;
    
    return matchesSearch && matchesFilter;
  });

  // Get unique courses for filter
  const uniqueCourses = [...new Set(certificates.records.map(cert => cert.courseName))].filter(Boolean);

  // Certificate type options
  const certificateTypes = [
    { value: 'completion', label: 'Course Completion' },
    { value: 'achievement', label: 'Achievement Award' },
    { value: 'excellence', label: 'Excellence Certificate' },
    { value: 'participation', label: 'Participation Certificate' },
    { value: 'professional', label: 'Professional Certification' }
  ];

  // Calculate statistics
  const stats = {
    totalCertificates: certificates.records.length,
    uniqueStudents: new Set(certificates.records.map(cert => cert.studentName)).size,
    coursesCovered: new Set(certificates.records.map(cert => cert.courseName)).size,
    thisMonth: certificates.records.filter(cert => {
      const certDate = new Date(cert.dateOfAward);
      const now = new Date();
      return certDate.getMonth() === now.getMonth() && certDate.getFullYear() === now.getFullYear();
    }).length
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
        <link rel="canonical" href="/admin/certificates" />
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
            "name": "Your Institution Name"
          }
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Section */}
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                Certificate Management
              </h1>
              <p className="text-gray-600 mt-2 text-base sm:text-lg">Manage and issue student certificates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <Button 
                onClick={handleSaveToDatabase}
                disabled={saving}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Database size={20} className="mr-2" />
                {saving ? 'Saving...' : 'Save to Database'}
              </Button>
              <Button 
                onClick={openAddModal}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Plus size={20} className="mr-2" />
                Add Certificate
              </Button>
            </div>
          </header>

          {/* Stats Cards */}
          <section aria-label="Certificate Statistics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalCertificates}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Total Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.uniqueStudents}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Unique Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.coursesCovered}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Courses Covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Calendar className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
                    <p className="text-xs sm:text-sm text-gray-600">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Search and Filter Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search certificates by student, course, or registration number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-gray-400 flex-shrink-0" />
                    <select
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="w-full md:w-48 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
                    >
                      <option value="">All Courses</option>
                      {uniqueCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 w-full md:w-auto text-center md:text-right">
                  Showing {filteredCertificates.length} of {certificates.records.length} certificates
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Award className="text-blue-600" size={20} />
                    Issued Certificates
                  </CardTitle>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all certificate records</p>
                </div>
                <span className="bg-white/80 text-blue-600 font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue-200 text-sm sm:text-base self-start sm:self-auto">
                  {filteredCertificates.length} certificates
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredCertificates.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <Award size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {certificates.records.length === 0 ? 'No Certificates Issued' : 'No Certificates Found'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    {certificates.records.length === 0 
                      ? 'Start by issuing your first certificate to recognize student achievements and course completions.'
                      : 'Try adjusting your search or filter criteria.'
                    }
                  </p>
                  {certificates.records.length === 0 && (
                    <Button 
                      onClick={openAddModal}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base"
                    >
                      <Plus size={18} className="mr-2" />
                      Issue First Certificate
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-700 uppercase text-xs sm:text-sm">Certificate Details</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700 uppercase text-xs sm:text-sm">Student Information</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700 uppercase text-xs sm:text-sm">Course Details</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700 uppercase text-xs sm:text-sm">Award Date</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-700 uppercase text-xs sm:text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredCertificates.map(cert => (
                        <tr 
                          key={cert.id} 
                          className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                                <Award className="text-white" size={14} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                  <Hash size={12} className="text-gray-400 flex-shrink-0" />
                                  <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm truncate">{cert.registrationNumber}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                    {cert.duration}
                                  </span>
                                  {cert.grade && (
                                    <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                      Grade: {cert.grade}
                                    </span>
                                  )}
                                  {cert.certificateType && (
                                    <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                      {cert.certificateType}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative flex-shrink-0">
                                {cert.studentProfilePicture ? (
                                  <img 
                                    src={cert.studentProfilePicture} 
                                    alt={cert.studentName}
                                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/48';
                                    }}
                                  />
                                ) : (
                                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                                    <User size={14} className="text-blue-600" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="font-semibold text-gray-900 block text-xs sm:text-sm truncate">{cert.studentName}</span>
                                <span className="text-xs text-gray-500">Student</span>
                                {cert.instructor && (
                                  <span className="text-xs text-gray-400 truncate block">Instructor: {cert.instructor}</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <BookOpen size={12} className="text-green-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="font-medium text-gray-900 block text-xs sm:text-sm truncate">{cert.courseName}</span>
                                {cert.credits && (
                                  <span className="text-xs text-gray-500">{cert.credits} credits</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Calendar size={12} className="text-orange-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="font-medium text-gray-900 block text-xs sm:text-sm">{formatDate(cert.dateOfAward)}</span>
                                <span className="text-xs text-gray-500 truncate">{cert.dateOfAward}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1 sm:gap-2 justify-end">
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => viewCertificate(cert)}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 opacity-70 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md p-1 sm:p-2"
                              >
                                <Eye size={12} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => generatePDF(cert)}
                                className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200 opacity-70 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md p-1 sm:p-2"
                              >
                                <Download size={12} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => openEditModal(cert)}
                                className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 opacity-70 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md p-1 sm:p-2"
                              >
                                <Edit size={12} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
                                    handleDelete(cert.id);
                                  }
                                }}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 opacity-70 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md p-1 sm:p-2"
                              >
                                <Trash2 size={12} />
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

          {/* Add Certificate Modal */}
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={
              <div className="flex items-center gap-2">
                <Award size={20} className="text-blue-600" />
                Issue New Certificate
              </div>
            }
            size="lg"
          >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Hash size={16} className="text-blue-600" />
                  Certificate Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Registration Number *"
                    placeholder="e.g., M/HTC/FIC/825"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select
                      value={formData.certificateType}
                      onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
                    >
                      {certificateTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Duration *"
                    placeholder="e.g., 6 months, 1 year"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <Input
                    label="Credits"
                    placeholder="e.g., 3, 4.5"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} className="text-green-600" />
                  Student Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Student Name *"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter full student name"
                    className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="Instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      placeholder="Course instructor name"
                      className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                    />
                    <Input
                      label="Grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      placeholder="e.g., A, 95%, Distinction"
                      className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Camera size={14} className="text-green-600" />
                      Student Profile Picture
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex-1 w-full">
                        <Input
                          placeholder="Image URL or upload file"
                          value={formData.studentProfilePicture}
                          onChange={(e) => setFormData({ ...formData, studentProfilePicture: e.target.value })}
                          className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                        />
                      </div>
                      <div className="relative w-full sm:w-auto">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          className="bg-white text-green-600 hover:bg-green-50 border-green-200 w-full sm:w-auto text-sm sm:text-base"
                        >
                          <Camera size={14} className="mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    
                    {formData.studentProfilePicture && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={formData.studentProfilePicture} 
                            alt="Student preview" 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-green-200 shadow-sm"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64';
                            }}
                          />
                          <div>
                            <p className="text-sm text-gray-600">Profile picture preview</p>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, studentProfilePicture: '' })}
                              className="text-xs text-red-600 hover:text-red-700 mt-1"
                            >
                              Remove image
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-purple-600" />
                  Course Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Course Name *"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder="Enter course name"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 text-sm sm:text-base"
                  />
                  <Textarea
                    label="Course Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the course or achievement..."
                    rows={3}
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-orange-600" />
                  Award Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Date of Award *"
                    type="date"
                    value={formData.dateOfAward}
                    onChange={(e) => setFormData({ ...formData, dateOfAward: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-orange-500 text-sm sm:text-base"
                  />
                  <Input
                    label="Verification URL"
                    value={formData.verificationUrl}
                    onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    placeholder="https://verify.example.com/certificate/..."
                    className="bg-white border-2 border-gray-300 focus:border-orange-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 order-2 sm:order-1 w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg order-1 sm:order-2 w-full sm:w-auto"
                >
                  <Award size={16} className="mr-2" />
                  Issue Certificate
                </Button>
              </div>
            </div>
          </Modal>

          {/* Edit Certificate Modal */}
          <Modal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            title={
              <div className="flex items-center gap-2">
                <Edit size={20} className="text-purple-600" />
                Edit Certificate
              </div>
            }
            size="lg"
          >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Hash size={16} className="text-blue-600" />
                  Certificate Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Registration Number *"
                    placeholder="e.g., M/HTC/FIC/825"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
                    <select
                      value={formData.certificateType}
                      onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
                    >
                      {certificateTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Duration *"
                    placeholder="e.g., 6 months, 1 year"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <Input
                    label="Credits"
                    placeholder="e.g., 3, 4.5"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} className="text-green-600" />
                  Student Details
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Student Name *"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter full student name"
                    className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="Instructor"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      placeholder="Course instructor name"
                      className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                    />
                    <Input
                      label="Grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      placeholder="e.g., A, 95%, Distinction"
                      className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Camera size={14} className="text-green-600" />
                      Student Profile Picture
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex-1 w-full">
                        <Input
                          placeholder="Image URL or upload file"
                          value={formData.studentProfilePicture}
                          onChange={(e) => setFormData({ ...formData, studentProfilePicture: e.target.value })}
                          className="bg-white border-2 border-gray-300 focus:border-green-500 text-sm sm:text-base"
                        />
                      </div>
                      <div className="relative w-full sm:w-auto">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          className="bg-white text-green-600 hover:bg-green-50 border-green-200 w-full sm:w-auto text-sm sm:text-base"
                        >
                          <Camera size={14} className="mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                    
                    {formData.studentProfilePicture && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={formData.studentProfilePicture} 
                            alt="Student preview" 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-green-200 shadow-sm"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64';
                            }}
                          />
                          <div>
                            <p className="text-sm text-gray-600">Profile picture preview</p>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, studentProfilePicture: '' })}
                              className="text-xs text-red-600 hover:text-red-700 mt-1"
                            >
                              Remove image
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={16} className="text-purple-600" />
                  Course Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Course Name *"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder="Enter course name"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 text-sm sm:text-base"
                  />
                  <Textarea
                    label="Course Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the course or achievement..."
                    rows={3}
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-orange-600" />
                  Award Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Date of Award *"
                    type="date"
                    value={formData.dateOfAward}
                    onChange={(e) => setFormData({ ...formData, dateOfAward: e.target.value })}
                    className="bg-white border-2 border-gray-300 focus:border-orange-500 text-sm sm:text-base"
                  />
                  <Input
                    label="Verification URL"
                    value={formData.verificationUrl}
                    onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    placeholder="https://verify.example.com/certificate/..."
                    className="bg-white border-2 border-gray-300 focus:border-orange-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 order-2 sm:order-1 w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdate}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg order-1 sm:order-2 w-full sm:w-auto"
                >
                  <Edit size={16} className="mr-2" />
                  Update Certificate
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};