import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  User, LogOut } from 'lucide-react';
import { toast } from '../../utils/toast';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const Header = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAdminEmail(user.email);
        // Set name from email (everything before @) or use displayName if available
        const name = user.displayName || user.email.split('@')[0];
        setAdminName(name);
        
        // Also store in sessionStorage for backward compatibility
        sessionStorage.setItem('adminUser', name);
        sessionStorage.setItem('adminEmail', user.email);
      } else {
        // User is signed out, fallback to sessionStorage
        const storedUser = sessionStorage.getItem('adminUser');
        const storedEmail = sessionStorage.getItem('adminEmail');
        
        if (storedUser) {
          setAdminName(storedUser);
        }
        if (storedEmail) {
          setAdminEmail(storedEmail);
        }
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminEmail');
      sessionStorage.removeItem('loginTime');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Welcome back, {adminName}</h2>
          <p className="text-xs sm:text-sm text-gray-600">Manage your college content efficiently</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            {/* <Bell size={20} /> */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{adminName}</p>
              <p className="text-xs text-gray-600">{adminEmail || 'Loading...'}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User size={16} className="sm:w-5 text-indigo-600" />
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};