import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EASELIFE</h3>
            <p className="text-gray-300 text-sm">
              {t('footerNote')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition">
                  {t('dashboard')}
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-300 hover:text-white transition">
                  {t('how')}
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Payment</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>💵 {t('cashPayment')}</p>
              <p className="text-xs text-gray-400 mt-4">
                For production: add server storage, SMS OTP login, legal-compliant KYC and privacy policy.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EASELIFE. All rights reserved.</p>
          <p className="mt-2">Connecting People to Service Providers</p>
        </div>
      </div>
    </footer>
  );
}

