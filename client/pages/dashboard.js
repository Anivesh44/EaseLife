import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FaCheckCircle, FaTimesCircle, FaEye, FaSearch } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const router = useRouter();
  const { isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showLogin, setShowLogin] = useState(!isAdmin);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchProviders();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterProviders();
  }, [searchQuery, statusFilter, providers]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/providers`);
      const data = await response.json();
      setProviders(Array.isArray(data) ? data : []);
      setFilteredProviders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = [...providers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.serviceType && p.serviceType.toLowerCase().includes(query)) ||
        (p.phone && p.phone.includes(query))
      );
    }

    if (statusFilter) {
      if (statusFilter === 'verified') {
        filtered = filtered.filter(p => p.aadharVerified);
      } else if (statusFilter === 'pending') {
        filtered = filtered.filter(p => !p.aadharVerified);
      }
    }

    setFilteredProviders(filtered);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // This would use the AuthContext login method
    // For now, we'll handle it here
    if (password === 'admin123') {
      localStorage.setItem('easelife_admin', 'true');
      setShowLogin(false);
      window.location.reload();
    } else {
      alert('Invalid password. Demo password: admin123');
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await fetch(`${API_URL}/providers/${id}/verify`, {
        method: 'PATCH'
      });
      if (response.ok) {
        fetchProviders();
        alert('Provider verified successfully!');
      }
    } catch (error) {
      console.error('Error verifying provider:', error);
      alert('Failed to verify provider');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this provider?')) return;
    
    try {
      const response = await fetch(`${API_URL}/providers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProviders();
        alert('Provider rejected');
      }
    } catch (error) {
      console.error('Error rejecting provider:', error);
      alert('Failed to reject provider');
    }
  };

  if (showLogin) {
    return (
      <>
        <Head>
          <title>{t('adminPanel')} - EASELIFE</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{t('adminPanel')}</h2>
            <p className="text-sm text-gray-600 mb-6">{t('adminLoginNote')}</p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('adminPass')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {t('login')}
              </button>
            </form>
            <button
              onClick={() => router.push('/')}
              className="mt-4 w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('dashboard')} - EASELIFE</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header onRegisterClick={() => {}} />

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{t('adminPanel')}</h1>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {t('logout')}
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('all')}</option>
                <option value="pending">{t('pending')}</option>
                <option value="verified">{t('verified')}</option>
              </select>
            </div>
          </div>

          {/* Providers List */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">{t('noProviders')}</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProviders.map((provider) => (
                      <tr key={provider._id || provider.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{provider.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 capitalize">{provider.serviceType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{provider.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            provider.aadharVerified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {provider.aadharVerified ? t('verified') : t('pending')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            {!provider.aadharVerified && (
                              <button
                                onClick={() => handleVerify(provider._id || provider.id)}
                                className="text-green-600 hover:text-green-900 flex items-center gap-1"
                                title={t('verify')}
                              >
                                <FaCheckCircle />
                                <span className="hidden md:inline">{t('verify')}</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleReject(provider._id || provider.id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1"
                              title={t('reject')}
                            >
                              <FaTimesCircle />
                              <span className="hidden md:inline">{t('reject')}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

