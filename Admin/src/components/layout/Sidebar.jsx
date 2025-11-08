import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  BookOpen,
  HelpCircle,
  Award,
  Info,
  Settings,
  Phone,

  MessageCircle
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Homepage', path: '/homepage', icon:Home  },
  { name: 'Message', path: '/message', icon: MessageCircle },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'FAQ', path: '/faq', icon: HelpCircle },
  { name: 'Verify Certificate', path: '/certificates', icon: Award },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Hi-Tec Admin
        </h1>
        <p className="text-sm text-gray-600 mt-1">College Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2025 Hi-Tec College
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
