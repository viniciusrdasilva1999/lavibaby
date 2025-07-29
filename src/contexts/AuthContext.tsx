import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  freeShippingMinValue: number;
  discountPercentage: number;
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: 'LaviBaby',
    phone: '(11) 99999-9999',
    email: 'contato@lavibaby.com.br',
    address: 'São Paulo, SP - Brasil',
    instagram: '@lavibaby',
    facebook: 'LaviBaby',
    twitter: '@lavibaby',
    whatsapp: '5511999999999',
    workingHours: 'Seg-Sex: 8h às 18h',
    heroTitle: 'Roupas que fazem os pequenos brilharem',
    heroSubtitle: 'Descubra nossa coleção exclusiva de roupas infantis. Conforto, estilo e qualidade para os momentos especiais dos seus pequenos.',
    aboutTitle: 'Por que escolher a LaviBaby?',
    aboutDescription: 'Somos uma loja especializada em roupas infantis que combina estilo, conforto e qualidade. Nossa missão é fazer com que cada criança se sinta especial e confiante.',
    freeShippingMinValue: 150,
    discountPercentage: 20
  });

  // Credenciais de admin (em produção, isso deveria vir de um backend seguro)
  const ADMIN_CREDENTIALS = {
    email: 'admin@lavibaby.com',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@lavibaby.com',
      role: 'admin' as const,
      name: 'Administrador'
    }
  };

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem('user', JSON.stringify(ADMIN_CREDENTIALS.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoading, siteSettings, updateSiteSettings }}>
      {children}
    </AuthContext.Provider>
  );
};