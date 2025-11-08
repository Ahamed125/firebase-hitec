import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Shield, Lock, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { toast } from '../utils/toast';
import { auth } from '../../firebase';
import { 
  signInWithEmailAndPassword,
  sendPasswordResetEmail 
} from 'firebase/auth';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Sign in existing user
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success('Login successful! Welcome back.');

      // Store authentication in sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userEmail', userCredential.user.email);
      sessionStorage.setItem('userId', userCredential.user.uid);
      sessionStorage.setItem('loginTime', new Date().toISOString());
      
      navigate('/');
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      let errorMessage = 'Authentication failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = error.message || 'Authentication failed.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Password reset email sent! Check your inbox.');
      setShowResetModal(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        default:
          errorMessage = error.message || 'Failed to send reset email.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 40%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 40%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* SEO Meta Tags */}
      <head>
        <title>Admin Login - Hi-Tec College Management System</title>
        <meta name="description" content="Secure admin login for Hi-Tec College management system. Access dashboard, manage courses, students, and certificates." />
        <meta name="keywords" content="admin login, Hi-Tec College, management system, dashboard, courses, students" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Admin Login - Hi-Tec College" />
        <meta property="og:description" content="Secure admin login portal for Hi-Tec College management system" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://hiteccollege.lk/admin/login" />
      </head>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <Lock className="w-3 h-3 text-slate-900" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            Hi-Tec College
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-white/80 text-sm font-medium">Admin Portal</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
          {/* Card Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4">
              <User className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/70 text-sm">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  autoFocus
                  className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors font-medium"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-0"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn size={20} className="mr-3" />
                  Sign In to Dashboard
                </span>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white/90 mb-1">Secure Access</p>
                <p className="text-xs text-white/60">
                  Your credentials are encrypted and securely authenticated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2025 Hi-Tec College. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-1">
            Secure Admin Portal • v2.0
          </p>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-slate-800 rounded-3xl border border-white/20 shadow-2xl p-6 max-w-md w-full mx-4 animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-3">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
              <p className="text-white/70 text-sm">
                Enter your email to receive a password reset link
              </p>
            </div>
            
            {/* Reset Form */}
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/50 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handlePasswordReset}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 text-white"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResetModal(false);
                    setResetEmail('');
                  }}
                  disabled={loading}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};