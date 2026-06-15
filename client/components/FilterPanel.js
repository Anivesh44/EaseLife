import { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

export default function FilterPanel({ filters, onFilterChange, onApplyFilters }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const serviceTypes = [
    { value: '', label: 'All Services' },
    { value: 'labour', label: 'Labour' },
    { value: 'tailoring', label: 'Tailoring' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'staff', label: 'Staff' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'other', label: 'Other' }
  ];

  const workTypes = [
    { value: '', label: 'All Types' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      area: '',
      serviceType: '',
      minPrice: '',
      maxPrice: '',
      workType: '',
      minHours: '',
      maxHours: '',
      search: ''
    });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110"
          aria-label="Open filters"
        >
          <FaFilter className="text-xl" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filter Panel */}
      <div className={`
        bg-white rounded-lg shadow-lg p-6
        ${isMobile 
          ? `fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'sticky top-24'
        }
      `}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaFilter />
            {t('type')}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800 p-2"
            aria-label="Close filters"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

      {isOpen && (
        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Search providers..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <input
              type="text"
              value={filters.area}
              onChange={(e) => handleChange('area', e.target.value)}
              placeholder="Enter area name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              value={filters.serviceType}
              onChange={(e) => handleChange('serviceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {serviceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (₹)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                placeholder="Min"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                placeholder="Max"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Type
            </label>
            <select
              value={filters.workType}
              onChange={(e) => handleChange('workType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Duty Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duty Hours
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minHours}
                onChange={(e) => handleChange('minHours', e.target.value)}
                placeholder="Min hours"
                min="1"
                max="24"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={filters.maxHours}
                onChange={(e) => handleChange('maxHours', e.target.value)}
                placeholder="Max hours"
                min="1"
                max="24"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={onApplyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

