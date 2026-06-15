import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { FaHandshake, FaUserCheck, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <FaUserCheck className="text-4xl text-blue-600" />,
      title: 'Register as Provider',
      description: 'Service providers register with their details, areas of service, and pricing. Admin verifies their information.'
    },
    {
      icon: <FaHandshake className="text-4xl text-green-600" />,
      title: 'Find Service',
      description: 'Service seekers browse and filter providers by area, price, work type, and availability.'
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-yellow-600" />,
      title: 'Direct Contact',
      description: 'Contact providers directly via phone. Payment is made in cash when service is provided.'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-purple-600" />,
      title: 'Verified & Safe',
      description: 'All providers are verified by admin. Aadhar verification ensures authenticity.'
    }
  ];

  return (
    <>
      <Head>
        <title>{t('how')} - EASELIFE</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header onRegisterClick={() => {}} />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('how')}</h1>
            <p className="text-xl text-gray-600">
              EASELIFE connects service seekers with local service providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  {step.icon}
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-start gap-2">
                <FaMoneyBillWave className="text-green-600 mt-1" />
                <span><strong>Cash Payment:</strong> All payments are made directly in cash when the service is provided. EASELIFE does not handle payments.</span>
              </p>
              <p className="flex items-start gap-2">
                <FaShieldAlt className="text-blue-600 mt-1" />
                <span><strong>Verified Providers:</strong> All service providers are verified by admin with Aadhar verification for your safety.</span>
              </p>
              <p className="flex items-start gap-2">
                <FaHandshake className="text-purple-600 mt-1" />
                <span><strong>Local Service:</strong> Connect with service providers in your area for easy access and quick service.</span>
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

