import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminStatus = localStorage.getItem('easelife_admin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // Demo password - in production, use secure authentication
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('easelife_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('easelife_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

