// Tipos centralizados para melhor organização
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  badge: string;
  badgeColor: string;
  description: string;
  sizes: string[];
  colors: string[];
  category: string;
  inStock: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
  cpf?: string;
  telefone?: string;
  endereco?: {
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  aceitaNewsletter?: boolean;
}

export interface SiteSettings {
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
  logoUrl: string;
  buttonLinks: {
    verColecao: string;
    ofertas: string;
    verOfertas: string;
    comprarAgora: string;
    queroDesconto: string;
    falarWhatsApp: string;
    verTodosProdutos: string;
    baixarApp: string;
    criarConta: string;
  };
}