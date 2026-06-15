import { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaHome, FaTachometerAlt, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onRegisterClick, searchQuery, onSearchChange }) {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EASELIFE
              </Link>
              <span className="text-sm text-gray-600 hidden md:inline">
                {t('title')}
              </span>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md w-full md:w-auto">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, providers..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
          </div>

          {/* Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Home Link */}
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaHome />
              <span>{t('home')}</span>
            </Link>

            {/* How it Works Link */}
            <Link
              href="/how-it-works"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FaQuestionCircle />
              <span>{t('how')}</span>
            </Link>

            {/* Dashboard Link (if admin) */}
            {isAdmin && (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
              >
                <FaTachometerAlt />
                <span>{t('dashboard')}</span>
              </Link>
            )}

            {/* Register Button */}
            {onRegisterClick && (
              <button
                onClick={onRegisterClick}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                <FaUserPlus />
                <span>{t('registerTitle')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isMobile && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 animate-slideDown">
            <div className="flex flex-col gap-3">
              {/* Language Switcher */}
              <div className="px-2">
                <LanguageSwitcher />
              </div>

              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg"
              >
                <FaHome />
                <span>{t('home')}</span>
              </Link>

              {/* How it Works Link */}
              <Link
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg"
              >
                <FaQuestionCircle />
                <span>{t('how')}</span>
              </Link>

              {/* Dashboard Link (if admin) */}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition rounded-lg"
                >
                  <FaTachometerAlt />
                  <span>{t('dashboard')}</span>
                </Link>
              )}

              {/* Register Button */}
              {onRegisterClick && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onRegisterClick();
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md mt-2"
                >
                  <FaUserPlus />
                  <span>{t('registerTitle')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

