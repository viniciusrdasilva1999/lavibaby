import React from 'react';
import { motion } from 'framer-motion';
import { User, UserPlus, X, ShoppingBag } from 'lucide-react';

interface LoginPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onRegister 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 p-6 text-white relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-2 right-16 text-2xl opacity-30"
          >
            🛍️
          </motion.div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <div className="text-4xl mb-3">👶</div>
            <h2 className="text-2xl font-bold mb-2">Finalizar Compra</h2>
            <p className="text-white/90">Para continuar, você precisa estar logado</p>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-pink-500" size={32} />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Para finalizar sua compra e garantir a melhor experiência, 
              faça login na sua conta ou crie uma nova conta rapidamente.
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <User size={20} />
              <span>Fazer Login</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRegister}
              className="w-full border-2 border-pink-500 text-pink-600 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <UserPlus size={20} />
              <span>Criar Conta Nova</span>
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 Seus dados estão seguros conosco
            </p>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎁</div>
              <div>
                <div className="font-semibold text-gray-800">Vantagens de ter uma conta:</div>
                <div className="text-sm text-gray-600">
                  • Histórico de pedidos • Endereços salvos • Ofertas exclusivas
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPrompt;