import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 text-6xl opacity-10"
        >🍭</motion.div>
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 text-5xl opacity-15"
        >🎠</motion.div>
        <motion.div 
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 left-20 text-4xl opacity-10"
        >🪀</motion.div>
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-40 text-5xl opacity-15"
        >⚽</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
          >
            <Shield className="text-white" size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Acesso Administrativo
          </h1>
          <p className="text-gray-600">
            Entre com suas credenciais para gerenciar a loja
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="admin@lavibaby.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Entrando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </motion.button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-2">Credenciais de Teste:</h3>
          <p className="text-sm text-blue-700">
            <strong>Email:</strong> admin@lavibaby.com<br />
            <strong>Senha:</strong> admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;