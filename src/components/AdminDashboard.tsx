import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  LogOut,
  BarChart3,
  Users,
  ShoppingBag,
  Settings,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Clock,
  Type,
  FileText,
  DollarSign,
  Percent,
  Image,
  Link,
  Info,
  Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

const AdminDashboard = () => {
  const { logout, user, siteSettings, updateSiteSettings } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(siteSettings);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Vestido Princesa Rosa",
      price: 89.90,
      originalPrice: 129.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meninas",
      description: "Lindo vestido rosa para princesas",
      inStock: true
    },
    {
      id: 2,
      name: "Conjunto Aventureiro",
      price: 69.90,
      originalPrice: 99.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meninos",
      description: "Conjunto perfeito para aventuras",
      inStock: true
    },
    {
      id: 3,
      name: "Body Bebê Unicórnio",
      price: 39.90,
      originalPrice: 59.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Bebês",
      description: "Body fofo com estampa de unicórnio",
      inStock: false
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: 'Meninas',
    description: '',
    inStock: true
  });

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const handleAddProduct = () => {
    const id = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id }]);
    setNewProduct({
      name: '',
      price: 0,
      originalPrice: 0,
      image: '',
      category: 'Meninas',
      description: '',
      inStock: true
    });
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSaveSettings = () => {
    updateSiteSettings(tempSettings);
    setEditingSettings(false);
  };

  const stats = [
    { label: 'Total de Produtos', value: products.length, icon: Package, color: 'from-pink-500 to-rose-500' },
    { label: 'Em Estoque', value: products.filter(p => p.inStock).length, icon: ShoppingBag, color: 'from-rose-500 to-cyan-500' },
    { label: 'Fora de Estoque', value: products.filter(p => !p.inStock).length, icon: BarChart3, color: 'from-cyan-500 to-purple-500' },
    { label: 'Categorias', value: [...new Set(products.map(p => p.category))].length, icon: Users, color: 'from-purple-500 to-pink-500' }
  ];

  const tabs = [
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'design', label: 'Design & Links', icon: Image }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-pink-100 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/LOGO HORIZONTAL TRANSPARENTE.png" 
              alt="LaviBaby" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
              <p className="text-gray-600">Bem-vindo, {user?.name}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gerenciar Produtos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                <span>Adicionar Produto</span>
              </motion.button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-pink-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through ml-2">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit size={16} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Design & Links Tab */}
        {activeTab === 'design' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Design & Links do Site</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTempSettings(siteSettings);
                  setEditingSettings(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                <Edit size={20} />
                <span>Editar Design & Links</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Logo Configuration */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Image className="text-pink-500" size={24} />
                  <span>Configuração da Logo</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Logo Atual</label>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={siteSettings.logoUrl} 
                        alt="Logo atual" 
                        className="h-16 w-auto bg-white p-2 rounded-lg shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/LOGO HORIZONTAL TRANSPARENTE.png';
                        }}
                      />
                      <div>
                        <p className="text-sm text-gray-600">Tamanho recomendado:</p>
                        <p className="text-xs text-gray-500">• Largura: 200-400px</p>
                        <p className="text-xs text-gray-500">• Altura: 60-120px</p>
                        <p className="text-xs text-gray-500">• Formato: PNG com fundo transparente</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <Info className="text-blue-500 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">📋 Manual da Logo</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><strong>1.</strong> Prepare sua logo em PNG com fundo transparente</p>
                          <p><strong>2.</strong> Tamanho ideal: 300x90 pixels</p>
                          <p><strong>3.</strong> Faça upload para um serviço como:</p>
                          <p className="ml-4">• <a href="https://imgur.com" target="_blank" className="underline">Imgur.com</a> (gratuito)</p>
                          <p className="ml-4">• <a href="https://postimg.cc" target="_blank" className="underline">PostImg.cc</a> (gratuito)</p>
                          <p><strong>4.</strong> Copie o link direto da imagem</p>
                          <p><strong>5.</strong> Cole no campo "URL da Logo" abaixo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">URL da Logo</label>
                    <p className="text-gray-800 break-all">{siteSettings.logoUrl}</p>
                  </div>
                </div>
              </div>

              {/* Button Links Configuration */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Link className="text-pink-500" size={24} />
                  <span>Links dos Botões</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Ver Coleção</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.verColecao}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Ofertas Especiais</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.ofertas}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Ver Ofertas</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.verOfertas}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Comprar Agora</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.comprarAgora}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Quero Desconto</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.queroDesconto}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Falar no WhatsApp</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.falarWhatsApp}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Ver Todos Produtos</label>
                    <p className="text-gray-800">{siteSettings.buttonLinks.verTodosProdutos}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Guide */}
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Info className="text-green-500 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">📖 Guia de Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                    <div>
                      <p><strong>Links Internos (seções do site):</strong></p>
                      <p>• <code>#inicio</code> - Ir para o topo</p>
                      <p>• <code>#categorias</code> - Seção categorias</p>
                      <p>• <code>#produtos</code> - Seção produtos</p>
                      <p>• <code>#sobre</code> - Seção sobre</p>
                      <p>• <code>#newsletter</code> - Newsletter</p>
                    </div>
                    <div>
                      <p><strong>Links Externos:</strong></p>
                      <p>• <code>https://wa.me/5511999999999</code> - WhatsApp</p>
                      <p>• <code>https://instagram.com/seu_perfil</code> - Instagram</p>
                      <p>• <code>https://seu-site.com/loja</code> - Loja externa</p>
                      <p>• <code>mailto:contato@email.com</code> - Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Configurações do Site</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTempSettings(siteSettings);
                  setEditingSettings(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                <Edit size={20} />
                <span>Editar Configurações</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informações de Contato */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Phone className="text-pink-500" size={24} />
                  <span>Informações de Contato</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Type className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Nome da Empresa</label>
                      <p className="text-gray-800">{siteSettings.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Telefone</label>
                      <p className="text-gray-800">{siteSettings.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-800">{siteSettings.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Endereço</label>
                      <p className="text-gray-800">{siteSettings.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Horário de Funcionamento</label>
                      <p className="text-gray-800">{siteSettings.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Instagram className="text-pink-500" size={24} />
                  <span>Redes Sociais</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Instagram className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Instagram</label>
                      <p className="text-gray-800">{siteSettings.instagram}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Facebook className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Facebook</label>
                      <p className="text-gray-800">{siteSettings.facebook}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Twitter className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Twitter</label>
                      <p className="text-gray-800">{siteSettings.twitter}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <MessageCircle className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                      <p className="text-gray-800">{siteSettings.whatsapp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Site */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <FileText className="text-pink-500" size={24} />
                  <span>Conteúdo do Site</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Título Principal</label>
                    <p className="text-gray-800">{siteSettings.heroTitle}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Subtítulo</label>
                    <p className="text-gray-800">{siteSettings.heroSubtitle}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Título Sobre</label>
                    <p className="text-gray-800">{siteSettings.aboutTitle}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Descrição Sobre</label>
                    <p className="text-gray-800">{siteSettings.aboutDescription}</p>
                  </div>
                </div>
              </div>

              {/* Configurações de Vendas */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <DollarSign className="text-pink-500" size={24} />
                  <span>Configurações de Vendas</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <DollarSign className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Valor Mínimo Frete Grátis</label>
                      <p className="text-gray-800">R$ {siteSettings.freeShippingMinValue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Percent className="text-gray-500" size={20} />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Desconto Newsletter (%)</label>
                      <p className="text-gray-800">{siteSettings.discountPercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Adicionar Produto</h3>
              <button onClick={() => setIsAddingProduct(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome do produto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                placeholder="Preço"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                placeholder="Preço original"
                value={newProduct.originalPrice}
                onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              >
                <option value="Meninas">Meninas</option>
                <option value="Meninos">Meninos</option>
                <option value="Bebês">Bebês</option>
                <option value="Acessórios">Acessórios</option>
              </select>
              <textarea
                placeholder="Descrição"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                rows={3}
              />
              <input
                type="url"
                placeholder="URL da imagem"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Editar Produto</h3>
              <button onClick={() => setEditingProduct(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                value={editingProduct.originalPrice}
                onChange={(e) => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              />
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
              >
                <option value="Meninas">Meninas</option>
                <option value="Meninos">Meninos</option>
                <option value="Bebês">Bebês</option>
                <option value="Acessórios">Acessórios</option>
              </select>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                rows={3}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                  className="w-4 h-4 text-pink-600"
                />
                <label className="text-gray-700">Em estoque</label>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Settings Modal */}
      {editingSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Editar Configurações do Site</h3>
              <button onClick={() => setEditingSettings(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Informações Básicas</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    value={tempSettings.companyName}
                    onChange={(e) => setTempSettings({...tempSettings, companyName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({...tempSettings, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({...tempSettings, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={tempSettings.address}
                    onChange={(e) => setTempSettings({...tempSettings, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Horário de Funcionamento</label>
                  <input
                    type="text"
                    value={tempSettings.workingHours}
                    onChange={(e) => setTempSettings({...tempSettings, workingHours: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Redes Sociais</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Instagram</label>
                  <input
                    type="text"
                    value={tempSettings.instagram}
                    onChange={(e) => setTempSettings({...tempSettings, instagram: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Facebook</label>
                  <input
                    type="text"
                    value={tempSettings.facebook}
                    onChange={(e) => setTempSettings({...tempSettings, facebook: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Twitter</label>
                  <input
                    type="text"
                    value={tempSettings.twitter}
                    onChange={(e) => setTempSettings({...tempSettings, twitter: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={tempSettings.whatsapp}
                    onChange={(e) => setTempSettings({...tempSettings, whatsapp: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Conteúdo do Site</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Título Principal</label>
                  <input
                    type="text"
                    value={tempSettings.heroTitle}
                    onChange={(e) => setTempSettings({...tempSettings, heroTitle: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Subtítulo</label>
                  <textarea
                    value={tempSettings.heroSubtitle}
                    onChange={(e) => setTempSettings({...tempSettings, heroSubtitle: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Título Sobre</label>
                  <input
                    type="text"
                    value={tempSettings.aboutTitle}
                    onChange={(e) => setTempSettings({...tempSettings, aboutTitle: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Descrição Sobre</label>
                  <textarea
                    value={tempSettings.aboutDescription}
                    onChange={(e) => setTempSettings({...tempSettings, aboutDescription: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                    rows={4}
                  />
                </div>
              </div>

              {/* Configurações de Vendas */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Configurações de Vendas</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Valor Mínimo Frete Grátis (R$)</label>
                  <input
                    type="number"
                    value={tempSettings.freeShippingMinValue}
                    onChange={(e) => setTempSettings({...tempSettings, freeShippingMinValue: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Desconto Newsletter (%)</label>
                  <input
                    type="number"
                    value={tempSettings.discountPercentage}
                    onChange={(e) => setTempSettings({...tempSettings, discountPercentage: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Logo Configuration */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Configuração da Logo</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">URL da Logo</label>
                  <input
                    type="url"
                    value={tempSettings.logoUrl}
                    onChange={(e) => setTempSettings({...tempSettings, logoUrl: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                    placeholder="https://exemplo.com/logo.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tamanho recomendado: 300x90px, formato PNG</p>
                </div>
              </div>

              {/* Button Links Configuration */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Links dos Botões</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Ver Coleção</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.verColecao}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, verColecao: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Ofertas Especiais</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.ofertas}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, ofertas: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Ver Ofertas</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.verOfertas}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, verOfertas: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Comprar Agora</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.comprarAgora}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, comprarAgora: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Quero Desconto</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.queroDesconto}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, queroDesconto: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Falar no WhatsApp</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.falarWhatsApp}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, falarWhatsApp: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                    placeholder="https://wa.me/5511999999999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Ver Todos Produtos</label>
                  <input
                    type="text"
                    value={tempSettings.buttonLinks.verTodosProdutos}
                    onChange={(e) => setTempSettings({...tempSettings, buttonLinks: {...tempSettings.buttonLinks, verTodosProdutos: e.target.value}})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold"
              >
                Salvar Configurações
              </button>
              <button
                onClick={() => setEditingSettings(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;