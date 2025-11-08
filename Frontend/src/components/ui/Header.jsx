import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'About', path: '/about', icon: 'Info' },
    { name: 'Courses', path: '/courses', icon: 'BookOpen' },
    { name: 'Contact', path: '/contact', icon: 'Mail' },
    { name: 'FAQs', path: '/faqs', icon: 'Mail' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openImagePreview = () => {
    setIsImagePreviewOpen(true);
  };

  const closeImagePreview = () => {
    setIsImagePreviewOpen(false);
  };

  const handleVerifyCredential = () => {
    try {
      window.open('/verify', '_blank', 'noopener,noreferrer');
    } catch {
      navigate('/verify');
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-3 group">
      <div className="relative">
        <div>
          {/* Clickable image that opens preview */}
          <img 
            src="https://res.cloudinary.com/dldtfwvxa/image/upload/v1761794277/hitec_qelt8j.jpg" 
            alt="Hi-Tec College Logo"
            className="w-10 h-10 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openImagePreview();
            }}
            onError={(e) => {
              console.error('Image failed to load');
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-glow"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gradient font-accent">Hi-Tec</span>
        <span className="text-xs text-muted-foreground font-medium tracking-wider">College</span>
      </div>
    </Link>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-brand shadow-brand-md border-b border-border'
          : 'bg-background/80 backdrop-blur-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${isActivePath(item?.path)
                      ? 'text-primary bg-primary/10 shadow-brand-sm'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleVerifyCredential}
              >
                Verify Credential
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-brand ${isMobileMenuOpen
            ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="bg-background/95 backdrop-blur-brand border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${isActivePath(item?.path)
                      ? 'text-primary bg-primary/10 shadow-brand-sm'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    handleVerifyCredential();
                    closeMobileMenu();
                  }}
                >
                  Verify Credential
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Image Preview Modal */}
      {isImagePreviewOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/80 backdrop-blur-lg transition-all duration-300">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeImagePreview}
              className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-accent transition-colors duration-200"
              aria-label="Close preview"
            >
              <Icon name="X" size={24} />
            </button>
            
            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dldtfwvxa/image/upload/v1761794277/hitec_qelt8j.jpg" 
                alt="Hi-Tec College Logo Preview"
                className="w-full h-auto max-h-[80vh] object-contain"
                onClick={closeImagePreview}
              />
            </div>
            
            {/* Download Button */}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = "https://res.cloudinary.com/dldtfwvxa/image/upload/v1761794277/hitec_qelt8j.jpg";
                  link.download = "hitec-logo.jpg";
                  link.click();
                }}
                variant="primary"
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Download Image
              </Button>
            </div>
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeImagePreview}
          />
        </div>
      )}
    </>
  );
};

export default Header;