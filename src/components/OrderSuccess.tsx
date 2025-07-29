import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

interface OrderSuccessProps {
  onBackToHome: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onBackToHome }) => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="text-green-500" size={40} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Pedido Confirmado! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Seu pedido foi realizado com sucesso e já está sendo processado.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-6"
        >
          <p className="text-sm text-gray-600 mb-2">Número do Pedido:</p>
          <p className="text-2xl font-bold text-pink-600">#{orderNumber}</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-500" size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Processando</p>
              <p className="text-sm text-gray-600">Preparando seu pedido</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl opacity-50">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Truck className="text-yellow-500" size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Em Transporte</p>
              <p className="text-sm text-gray-600">A caminho do destino</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl opacity-50">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Home className="text-green-500" size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Entregue</p>
              <p className="text-sm text-gray-600">Pedido finalizado</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <p className="text-sm text-gray-600">
            Você receberá um email com os detalhes do pedido e código de rastreamento.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToHome}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Voltar ao Início
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gray-500">
            Obrigado por escolher a LaviBaby! 💕
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;