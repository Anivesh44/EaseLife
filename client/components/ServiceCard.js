import { FaMapMarkerAlt, FaRupeeSign, FaClock, FaStar, FaPhone, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

export default function ServiceCard({ provider }) {
  const { t } = useLanguage();
  
  // Safety check - return null if provider is not provided
  if (!provider) {
    return null;
  }

  const handleContact = (phone) => {
    const message = `${t('contact')}: ${phone}\n${t('cashPayment')}`;
    alert(message);
  };

  const serviceEmojis = {
    labour: '👷',
    tailoring: '✂️',
    electrician: '⚡',
    teacher: '👨‍🏫',
    staff: '👔',
    plumber: '🔧',
    carpenter: '🪚',
    painter: '🎨',
    other: '🔨'
  };

  const workTypeLabels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{serviceEmojis[provider?.serviceType] || '🔨'}</div>
            <div>
              <h3 className="text-lg font-bold capitalize">{provider?.name || 'Unknown'}</h3>
              <p className="text-sm text-blue-100 capitalize">{provider?.serviceType || 'other'}</p>
            </div>
          </div>
          {provider?.aadharVerified && (
            <FaCheckCircle className="text-green-300 text-xl" title="Aadhar Verified" />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Areas */}
        {provider?.areas && Array.isArray(provider.areas) && provider.areas.length > 0 && (
          <div className="flex items-start gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {provider.areas.slice(0, 3).map((area, index) => (
                <span key={index} className="text-sm bg-blue-50 px-2 py-1 rounded">
                  {area}
                </span>
              ))}
              {provider.areas.length > 3 && (
                <span className="text-sm text-gray-500">+{provider.areas.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="flex items-center gap-2 text-gray-700">
          <FaRupeeSign className="text-green-600" />
          <span className="font-semibold">
            ₹{provider.priceRange?.min || 0} - ₹{provider.priceRange?.max || 0}
          </span>
          <span className="text-sm text-gray-500">
            / {workTypeLabels[provider.workType] || provider.workType}
          </span>
        </div>

        {/* Duty Hours */}
        <div className="flex items-center gap-2 text-gray-700">
          <FaClock className="text-purple-600" />
          <span className="text-sm">{provider?.dutyHours || 0} hours/day</span>
        </div>

        {/* Rating */}
        {provider?.rating > 0 && (
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{(provider.rating || 0).toFixed(1)}</span>
            <span className="text-sm text-gray-500">
              ({provider?.totalReviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Experience */}
        {provider?.experience > 0 && (
          <div className="text-sm text-gray-600">
            Experience: {provider.experience} {provider.experience === 1 ? 'year' : 'years'}
          </div>
        )}

        {/* Description */}
        {provider?.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{provider.description}</p>
        )}

        {/* Contact Button */}
        <div className="pt-3 border-t border-gray-200">
          <button
            onClick={() => handleContact(provider?.phone || '')}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            <FaPhone />
            {t('contact')}: {provider?.phone || 'N/A'}
          </button>
        </div>

        {/* Verification Badge */}
        {!provider?.aadharVerified && (
          <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
            ⚠️ Verification pending
          </div>
        )}
      </div>
    </div>
  );
}

