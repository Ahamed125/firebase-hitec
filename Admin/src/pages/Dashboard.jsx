import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Award, Plus, ArrowUpRight, ChevronRight, UserPlus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from '../utils/toast';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { courses, settings, faqs, certificates } = useAdmin();
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [creatingAccount, setCreatingAccount] = useState(false);

  const stats = [
    { 
      title: 'Total Students', 
      value: settings.trustStats?.studentsCount || '50,000+', 
      icon: Users, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: '+12%',
      description: 'Enrolled students'
    },
    { 
      title: 'Active Courses', 
      value: courses.length || settings.trustStats?.coursesAvailable || '1,200+', 
      icon: BookOpen, 
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: '+5%',
      description: 'Available courses'
    },
    { 
      title: 'Success Rate', 
      value: settings.trustStats?.successRate || '95%', 
      icon: TrendingUp, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      trend: '+2%',
      description: 'Completion rate'
    },
    { 
      title: 'Certificates Issued', 
      value: certificates.records?.length || '45,000+', 
      icon: Award, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: '+8%',
      description: 'Total certificates'
    }
  ];

  const quickActions = [
    { label: 'Add Course', path: '/courses', icon: BookOpen, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
    { label: 'Add FAQ', path: '/faq', icon: Plus, color: 'text-green-600 bg-green-50 hover:bg-green-100' },
    { label: 'Manage Homepage', path: '/homepage', icon: Plus, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
    { label: 'View Certificates', path: '/certificates', icon: Award, color: 'text-orange-600 bg-orange-50 hover:bg-orange-100' },
    { label: 'Create Admin Account', path: '#', icon: UserPlus, color: 'text-red-600 bg-red-50 hover:bg-red-100', action: () => setShowCreateAccount(true) },
  ];

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    if (!newUserData.email || !newUserData.password || !newUserData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newUserData.password !== newUserData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newUserData.password.length < 6) {
      toast.error('Password should be at least 6 characters');
      return;
    }

    setCreatingAccount(true);

    try {
      // Create new user in Firebase Authentication only
      await createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password);
      
      toast.success('Admin account created successfully!');
      setShowCreateAccount(false);
      setNewUserData({ email: '', password: '', confirmPassword: '' });
      
    } catch (error) {
      console.error('Account creation error:', error);
      
      let errorMessage = 'Failed to create account. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = error.message || 'Account creation failed.';
      }
      
      toast.error(errorMessage);
    } finally {
      setCreatingAccount(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <head>
        <title>Admin Dashboard - Hi-Tec College Management System</title>
        <meta name="description" content="Hi-Tec College admin dashboard. Manage courses, students, certificates, and institutional data with comprehensive analytics and tools." />
        <meta name="keywords" content="admin dashboard, Hi-Tec College, management system, analytics, courses, students, certificates" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Admin Dashboard - Hi-Tec College" />
        <meta property="og:description" content="Comprehensive admin dashboard for managing Hi-Tec College operations" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://hiteccollege.lk/admin/dashboard" />
      </head>

      <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Active</span>
          </div>
        </div>

        {/* Stats Grid - Enhanced Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center">
                      <span className="text-xs sm:text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full flex items-center">
                        <ArrowUpRight size={12} className="mr-1" />
                        {stat.trend}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 border-0 shadow-md">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <Plus size={20} className="mr-2 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 sm:space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action || (() => navigate(action.path))}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-200 hover:shadow-md border border-gray-200 ${action.color}`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm mr-3">
                        <action.icon size={18} />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{action.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <TrendingUp size={20} className="mr-2 text-orange-600" />
                Recent Content Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-25 border border-blue-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <BookOpen className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Courses Management</p>
                      <p className="text-sm text-gray-600">{courses.length} active courses available for students</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-sm sm:text-base"
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-25 border border-green-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Plus className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">FAQ Sections</p>
                      <p className="text-sm text-gray-600">{faqs.categories?.length || 0} categories helping students</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/faq')}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-sm text-sm sm:text-base"
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-25 border border-purple-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Award className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Certificates</p>
                      <p className="text-sm text-gray-600">{certificates.records?.length || 0} certificates issued to students</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/certificates')}
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm text-sm sm:text-base"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Section */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-green-700">Database</p>
                <p className="text-sm text-green-600">Connected & Active</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-blue-700">Authentication</p>
                <p className="text-sm text-blue-600">Secure & Running</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-purple-700">Storage</p>
                <p className="text-sm text-purple-600">Optimized</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-orange-700">Performance</p>
                <p className="text-sm text-orange-600">Excellent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Account Modal */}
      {showCreateAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-500">Create Admin Account</h3>
              <button
                onClick={() => setShowCreateAccount(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                placeholder="Enter admin email"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                placeholder="Enter password (min 6 characters)"
                required
                minLength={6}
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={newUserData.confirmPassword}
                onChange={(e) => setNewUserData({ ...newUserData, confirmPassword: e.target.value })}
                placeholder="Confirm password"
                required
              />
              
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  variant='outline'
                  disabled={creatingAccount}
                  className="flex-1"
                >
                  {creatingAccount ? 'Creating...' : 'Create Account'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateAccount(false)}
                  disabled={creatingAccount}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};