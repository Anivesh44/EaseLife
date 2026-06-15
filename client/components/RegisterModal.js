import { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaIdCard, FaMapMarkerAlt, FaRupeeSign, FaClock } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function RegisterModal({ onClose, onSuccess }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    aadharNumber: '',
    serviceType: 'labour',
    areas: '',
    priceMin: '',
    priceMax: '',
    workType: 'daily',
    dutyHours: '8',
    experience: '0',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const serviceTypes = [
    { value: 'labour', label: 'Labour', emoji: '👷' },
    { value: 'tailoring', label: 'Tailoring', emoji: '✂️' },
    { value: 'electrician', label: 'Electrician', emoji: '⚡' },
    { value: 'teacher', label: 'Teacher', emoji: '👨‍🏫' },
    { value: 'staff', label: 'Staff', emoji: '👔' },
    { value: 'plumber', label: 'Plumber', emoji: '🔧' },
    { value: 'carpenter', label: 'Carpenter', emoji: '🪚' },
    { value: 'painter', label: 'Painter', emoji: '🎨' },
    { value: 'other', label: 'Other', emoji: '🔨' }
  ];

  const workTypes = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar must be 12 digits';
    }

    if (!formData.areas.trim()) {
      newErrors.areas = 'At least one area is required';
    }

    if (!formData.priceMin || !formData.priceMax) {
      newErrors.price = 'Price range is required';
    } else if (parseInt(formData.priceMin) > parseInt(formData.priceMax)) {
      newErrors.price = 'Min price cannot be greater than max price';
    }

    if (!formData.dutyHours || parseInt(formData.dutyHours) < 1 || parseInt(formData.dutyHours) > 24) {
      newErrors.dutyHours = 'Duty hours must be between 1 and 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const areasArray = formData.areas.split(',').map(area => area.trim()).filter(area => area);

      const payload = {
        name: formData.name,
        phone: formData.phone,
        aadharNumber: formData.aadharNumber,
        serviceType: formData.serviceType,
        areas: areasArray,
        priceRange: {
          min: parseInt(formData.priceMin),
          max: parseInt(formData.priceMax),
          currency: 'INR'
        },
        workType: formData.workType,
        dutyHours: parseInt(formData.dutyHours),
        experience: parseInt(formData.experience) || 0,
        description: formData.description
      };

      // Create timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_URL}/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).catch((fetchError) => {
        clearTimeout(timeoutId);
        // Handle network errors
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timeout. Please check if the server is running.');
        }
        if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
          throw new Error('Cannot connect to server. Please make sure:\n1. Backend server is running (port 5000)\n2. Run "npm run dev" from the project root\n3. Check server console for errors');
        }
        throw fetchError;
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `Server error: ${response.status} ${response.statusText}` };
        }

        // Check for MongoDB connection errors
        if (response.status === 503 || (errorData.error && errorData.error.includes('Database'))) {
          const errorMsg = errorData.details 
            ? `${errorData.error}\n\n${errorData.details}\n\nNote: File storage will be used if MongoDB is not available.`
            : `${errorData.error}\n\nNote: File storage will be used if MongoDB is not available.`;
          throw new Error(errorMsg);
        }
        throw new Error(errorData.error || `Registration failed: ${response.status}`);
      }

      const data = await response.json();

      alert('Registration successful! Your Aadhar will be verified soon.');
      onSuccess();
    } catch (error) {
      // Show detailed error message
      let errorMessage = error.message || 'Registration failed. Please try again.';
      
      // Provide helpful suggestions
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Cannot connect')) {
        errorMessage = `Connection Error:\n\n${errorMessage}\n\nTroubleshooting:\n1. Make sure backend server is running\n2. Check terminal for server errors\n3. Verify API_URL in .env.local is correct\n4. Try restarting the server`;
      }
      
      alert(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t('registerTitle')}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="10 digit phone number"
              maxLength="10"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Aadhar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaIdCard className="inline mr-2" />
              Aadhar Number *
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.aadharNumber ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="12 digit Aadhar number"
              maxLength="12"
            />
            {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
            <p className="text-xs text-gray-500 mt-1">Your Aadhar will be verified for security</p>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {serviceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.emoji} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-2" />
              Areas of Service * (comma separated)
            </label>
            <input
              type="text"
              name="areas"
              value={formData.areas}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.areas ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Delhi, Mumbai, Bangalore"
            />
            {errors.areas && <p className="text-red-500 text-sm mt-1">{errors.areas}</p>}
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaRupeeSign className="inline mr-2" />
              Price Range (₹) *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="priceMin"
                value={formData.priceMin}
                onChange={handleChange}
                className={`w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.price ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Min price"
              />
              <input
                type="number"
                name="priceMax"
                value={formData.priceMax}
                onChange={handleChange}
                className={`w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.price ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Max price"
              />
            </div>
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Type *
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
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
              <FaClock className="inline mr-2" />
              Duty Hours per Day *
            </label>
            <input
              type="number"
              name="dutyHours"
              value={formData.dutyHours}
              onChange={handleChange}
              min="1"
              max="24"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.dutyHours ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.dutyHours && <p className="text-red-500 text-sm mt-1">{errors.dutyHours}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your services..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register as Provider'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

