import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  LogOut,
  BarChart3,
  Users,
  ShoppingBag,
  Settings,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Type,
  FileText,
  DollarSign,
  Percent,
  Image,
  Link,
  Info
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
    { id: 'basic', label: 'Informações Básicas', icon: Settings },
    { id: 'content', label: 'Conteúdo do Site', icon: FileText },
    { id: 'design', label: 'Design & Links', icon: Image }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-pink-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/LOGO HORIZONTAL TRANSPARENTE.png" 
              alt="LaviBaby" 
              className="h-8 md:h-12 w-auto"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Painel Admin</h1>
              <p className="text-sm md:text-base text-gray-600">Bem-vindo, {user?.name}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 md:px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Sair</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs md:text-sm">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r ${stat.color} rounded-lg md:rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg mb-6">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 md:px-6 py-3 md:py-4 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Gerenciar Produtos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
              >
                <Plus size={16} />
                <span>Adicionar</span>
              </motion.button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 md:h-48 object-cover"
                  />
                  <div className="p-3 md:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Estoque' : 'Fora'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-base md:text-lg font-bold text-pink-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through ml-2 text-sm">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{product.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Edit size={14} />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center space-x-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Informações Básicas</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTempSettings(siteSettings);
                  setEditingSettings(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
              >
                <Edit size={16} />
                <span>Editar</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Phone className="text-pink-500" size={20} />
                  <span>Contato</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Nome da Empresa</label>
                    <p className="text-gray-800">{siteSettings.companyName}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-gray-800">{siteSettings.phone}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{siteSettings.email}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Endereço</label>
                    <p className="text-gray-800">{siteSettings.address}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Instagram className="text-pink-500" size={20} />
                  <span>Redes Sociais</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Instagram</label>
                    <p className="text-gray-800">{siteSettings.instagram}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                    <p className="text-gray-800">{siteSettings.whatsapp}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <label className="text-sm font-medium text-gray-600">Horário</label>
                    <p className="text-gray-800">{siteSettings.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Conteúdo do Site</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTempSettings(siteSettings);
                  setEditingSettings(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
              >
                <Edit size={16} />
                <span>Editar</span>
              </motion.button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Título Principal</label>
                  <p className="text-gray-800">{siteSettings.heroTitle}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Título Sobre</label>
                  <p className="text-gray-800">{siteSettings.aboutTitle}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-sm font-medium text-gray-600 mb-2 block">Subtítulo</label>
                <p className="text-gray-800">{siteSettings.heroSubtitle}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-sm font-medium text-gray-600 mb-2 block">Descrição Sobre</label>
                <p className="text-gray-800">{siteSettings.aboutDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Frete Grátis (R$)</label>
                  <p className="text-gray-800">R$ {siteSettings.freeShippingMinValue}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Desconto Newsletter (%)</label>
                  <p className="text-gray-800">{siteSettings.discountPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Design & Links Tab */}
        {activeTab === 'design' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Design & Links</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTempSettings(siteSettings);
                  setEditingSettings(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
              >
                <Edit size={16} />
                <span>Editar</span>
              </motion.button>
            </div>

            <div className="space-y-6">
              {/* Logo */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-sm font-medium text-gray-600 mb-3 block">Logo Atual</label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={siteSettings.logoUrl} 
                    alt="Logo atual" 
                    className="h-12 w-auto bg-white p-2 rounded-lg shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/LOGO HORIZONTAL TRANSPARENTE.png';
                    }}
                  />
                  <div className="text-xs text-gray-500">
                    <p>Tamanho: 300x90px</p>
                    <p>Formato: PNG transparente</p>
                  </div>
                </div>
              </div>

              {/* Button Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600">Ver Coleção</label>
                  <p className="text-gray-800 text-sm break-all">{siteSettings.buttonLinks.verColecao}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600">Ofertas</label>
                  <p className="text-gray-800 text-sm break-all">{siteSettings.buttonLinks.ofertas}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                  <p className="text-gray-800 text-sm break-all">{siteSettings.buttonLinks.falarWhatsApp}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-xl">
                  <label className="text-sm font-medium text-gray-600">Todos Produtos</label>
                  <p className="text-gray-800 text-sm break-all">{siteSettings.buttonLinks.verTodosProdutos}</p>
                </div>
              </div>

              {/* Quick Guide */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">📖 Guia Rápido</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Links Internos:</strong> #inicio, #categorias, #produtos, #sobre</p>
                      <p><strong>WhatsApp:</strong> https://wa.me/5511999999999</p>
                      <p><strong>Links Externos:</strong> https://seu-site.com</p>
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
            className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold">Adicionar Produto</h3>
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
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Preço"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <input
                type="number"
                placeholder="Preço original"
                value={newProduct.originalPrice}
                onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
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
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                rows={3}
              />
              <input
                type="url"
                placeholder="URL da imagem"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold text-sm md:text-base"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm md:text-base"
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
            className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold">Editar Produto</h3>
              <button onClick={() => setEditingProduct(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <input
                type="number"
                value={editingProduct.originalPrice}
                onChange={(e) => setEditingProduct({...editingProduct, originalPrice: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              />
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
              >
                <option value="Meninas">Meninas</option>
                <option value="Meninos">Meninos</option>
                <option value="Bebês">Bebês</option>
                <option value="Acessórios">Acessórios</option>
              </select>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                rows={3}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                  className="w-4 h-4 text-pink-600"
                />
                <label className="text-gray-700 text-sm md:text-base">Em estoque</label>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold text-sm md:text-base"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm md:text-base"
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
            className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold">Editar Configurações</h3>
              <button onClick={() => setEditingSettings(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Informações Básicas</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    value={tempSettings.companyName}
                    onChange={(e) => setTempSettings({...tempSettings, companyName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({...tempSettings, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({...tempSettings, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={tempSettings.whatsapp}
                    onChange={(e) => setTempSettings({...tempSettings, whatsapp: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                    placeholder="5511999999999"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Conteúdo</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Título Principal</label>
                  <input
                    type="text"
                    value={tempSettings.heroTitle}
                    onChange={(e) => setTempSettings({...tempSettings, heroTitle: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Subtítulo</label>
                  <textarea
                    value={tempSettings.heroSubtitle}
                    onChange={(e) => setTempSettings({...tempSettings, heroSubtitle: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Frete Grátis (R$)</label>
                  <input
                    type="number"
                    value={tempSettings.freeShippingMinValue}
                    onChange={(e) => setTempSettings({...tempSettings, freeShippingMinValue: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Desconto (%)</label>
                  <input
                    type="number"
                    value={tempSettings.discountPercentage}
                    onChange={(e) => setTempSettings({...tempSettings, discountPercentage: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold text-sm md:text-base"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditingSettings(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm md:text-base"
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