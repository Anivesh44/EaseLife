import { useState, useEffect } from 'react';
import Head from 'next/head';
import ServiceCard from '../components/ServiceCard';
import FilterPanel from '../components/FilterPanel';
import Hero from '../components/Hero';
import Header from '../components/Header';
import RegisterModal from '../components/RegisterModal';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const { t } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [filters, setFilters] = useState({
    area: '',
    serviceType: '',
    minPrice: '',
    maxPrice: '',
    workType: '',
    minHours: '',
    maxHours: '',
    search: ''
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, providers]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await fetch(`${API_URL}/providers?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is always an array
      const providersArray = Array.isArray(data) ? data : [];
      
      setProviders(providersArray);
      setFilteredProviders(providersArray);
    } catch (error) {
      console.error('Error fetching providers:', error);
      // Set empty arrays on error to prevent crashes
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    // Ensure providers is always an array
    if (!Array.isArray(providers)) {
      setFilteredProviders([]);
      return;
    }

    let filtered = [...providers];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p && p.name && (
          p.name.toLowerCase().includes(searchLower) ||
          (p.serviceType && p.serviceType.toLowerCase().includes(searchLower)) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
        )
      );
    }

    setFilteredProviders(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    fetchProviders();
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('footerNote')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          onRegisterClick={() => setShowRegisterModal(true)}
          searchQuery={filters.search}
          onSearchChange={(value) => handleFilterChange({ search: value })}
        />
        
        <Hero />

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Filter Panel */}
            <div className="hidden lg:block lg:w-1/4">
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange}
                onApplyFilters={fetchProviders}
              />
            </div>
            
            {/* Mobile Filter Panel (rendered separately for better control) */}
            <div className="lg:hidden">
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange}
                onApplyFilters={fetchProviders}
              />
            </div>

            {/* Service Providers Grid */}
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Service Providers
                  {Array.isArray(filteredProviders) && filteredProviders.length > 0 && (
                    <span className="ml-2 text-lg font-normal text-gray-600">
                      ({filteredProviders.length})
                    </span>
                  )}
                </h2>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : !Array.isArray(filteredProviders) || filteredProviders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No service providers found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or register as a service provider
                  </p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Register as Provider
                  </button>
                </div>
              ) : Array.isArray(filteredProviders) && filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProviders
                    .filter(provider => provider && (provider._id || provider.id))
                    .map(provider => (
                      <ServiceCard key={provider._id || provider.id} provider={provider} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No service providers found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or register as a service provider
                  </p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Register as Provider
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showRegisterModal && (
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onSuccess={handleRegisterSuccess}
          />
        )}

        <Footer />
      </div>
    </>
  );
}

