import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  const discount = product.originalPrice > product.price ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                {/* Image Section */}
                <div className="lg:w-1/2 relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full z-10 hover:bg-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                      -{discount}%
                    </div>
                  )}
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-2">({product.rating}.0)</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl font-bold text-pink-600">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-400 line-through text-lg">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Size Selection */}
                    {product.sizes.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Tamanho:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                                selectedSize === size
                                  ? 'border-pink-500 bg-pink-50 text-pink-600'
                                  : 'border-gray-300 hover:border-pink-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selection */}
                    {product.colors.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Cor:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                                selectedColor === color
                                  ? 'border-pink-500 bg-pink-50 text-pink-600'
                                  : 'border-gray-300 hover:border-pink-300'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Quantidade:</h4>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-semibold text-lg">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                      >
                        <ShoppingCart size={20} />
                        <span>Adicionar ao Carrinho</span>
                      </motion.button>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50">
                          <Heart size={18} />
                          <span>Favoritar</span>
                        </button>
                        <button className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50">
                          <Share2 size={18} />
                          <span>Compartilhar</span>
                        </button>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Truck className="text-green-500" size={18} />
                        <span>Frete grátis acima de R$ 150</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Shield className="text-blue-500" size={18} />
                        <span>Compra 100% segura</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <RotateCcw className="text-purple-500" size={18} />
                        <span>7 dias para trocas e devoluções</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div>
                      <div className="flex border-b">
                        <button
                          onClick={() => setActiveTab('description')}
                          className={`px-4 py-2 font-medium ${
                            activeTab === 'description'
                              ? 'border-b-2 border-pink-500 text-pink-600'
                              : 'text-gray-600'
                          }`}
                        >
                          Descrição
                        </button>
                        <button
                          onClick={() => setActiveTab('details')}
                          className={`px-4 py-2 font-medium ${
                            activeTab === 'details'
                              ? 'border-b-2 border-pink-500 text-pink-600'
                              : 'text-gray-600'
                          }`}
                        >
                          Detalhes
                        </button>
                      </div>
                      
                      <div className="pt-4">
                        {activeTab === 'description' && (
                          <p className="text-gray-600 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                        {activeTab === 'details' && (
                          <div className="space-y-2 text-sm">
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Material:</strong> 100% Algodão</p>
                            <p><strong>Cuidados:</strong> Lavar à máquina em água fria</p>
                            <p><strong>Origem:</strong> Nacional</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;