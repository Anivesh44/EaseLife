import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    title: 'EASELIFE — Local Service Connector',
    admin: 'Admin',
    how: 'How it works',
    areaPlaceholder: 'Select Area',
    type: 'Work Type',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    registerTitle: 'Register As Service Provider',
    registerNote: 'Please provide phone and only last 4 digits of Aadhaar. We DO NOT store full Aadhaar here (demo).',
    fullName: 'Full Name',
    phone: 'Mobile Number',
    aadhaarLast4: 'Aadhaar (last 4 digits)',
    workType: 'Work Type',
    area: 'Areas (comma separated)',
    price: 'Expected Price (₹)',
    hours: 'Duty Hours / day',
    availability: 'Availability',
    photo: 'Upload Photo (optional)',
    photoNote: 'Images are stored locally in your browser (demo). For production use a secure server storage.',
    submit: 'Submit for Verification',
    reset: 'Reset',
    footerNote: '✔ Direct Cash Payment | ✔ Local Work | ✔ Easy Access for Everyone',
    adminBadge: 'Admin',
    adminPanel: 'Admin Panel',
    adminLoginNote: 'Demo admin login: password admin123. (In production, use secure auth)',
    adminPass: 'Password',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    home: 'Home',
    contact: 'Contact',
    view: 'View',
    verify: 'Verify',
    reject: 'Reject',
    pending: 'Pending',
    verified: 'Verified',
    rejected: 'Rejected',
    all: 'All',
    search: 'Search',
    noProviders: 'No providers found',
    cashPayment: 'Payment method: Cash in person (EASELIFE)',
    report: 'Report'
  },
  hi: {
    title: 'EASELIFE — लोकल सर्विस कनेक्टर',
    admin: 'एडमिन',
    how: 'कैसे काम करता है',
    areaPlaceholder: 'क्षेत्र चुनें',
    type: 'काम का प्रकार',
    daily: 'दैनिक',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    registerTitle: 'सेवा प्रदाता के रूप में रजिस्टर करें',
    registerNote: 'कृपया फोन और केवल आधार के आखिरी 4 अंक दें। हम यहाँ पूरा आधार संग्रहीत नहीं करते (डेमो)।',
    fullName: 'पूरा नाम',
    phone: 'मोबाइल नंबर',
    aadhaarLast4: 'आधार (आखिरी 4 अंक)',
    workType: 'काम का प्रकार',
    area: 'क्षेत्र (कॉमा से अलग करें)',
    price: 'अपेक्षित कीमत (₹)',
    hours: 'ड्यूटी घंटे/दिन',
    availability: 'उपलब्धता',
    photo: 'फोटो अपलोड (वैकल्पिक)',
    photoNote: 'छवियाँ आपके ब्राउज़र में स्थानीय रूप से संग्रहीत होती हैं (डेमो)। प्रोडक्शन के लिए सुरक्षित सर्वर स्टोरेज का उपयोग करें।',
    submit: 'सत्यापन के लिए सबमिट करें',
    reset: 'रीसेट',
    footerNote: '✔ नकद भुगतान | ✔ स्थानीय काम | ✔ सभी के लिए आसान पहुँच',
    adminBadge: 'एडमिन',
    adminPanel: 'एडमिन पैनल',
    adminLoginNote: 'डेमो एडमिन लॉगिन: पासवर्ड admin123. (प्रोडक्शन में सुरक्षित ऑथ का प्रयोग करें)',
    adminPass: 'पासवर्ड',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    dashboard: 'डैशबोर्ड',
    home: 'होम',
    contact: 'संपर्क करें',
    view: 'देखें',
    verify: 'सत्यापित करें',
    reject: 'अस्वीकार करें',
    pending: 'लंबित',
    verified: 'सत्यापित',
    rejected: 'अस्वीकृत',
    all: 'सभी',
    search: 'खोजें',
    noProviders: 'कोई प्रदाता नहीं मिला',
    cashPayment: 'भुगतान विधि: व्यक्तिगत नकद (EASELIFE)',
    report: 'रिपोर्ट करें'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('easelife_lang');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('easelife_lang', lang);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

