import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, User, Search, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const { user, isAdmin, isLoggedIn, logout } = useAuth();

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      // Se estiver logado, mostrar menu de usuário ou fazer logout
      logout();
    } else {
      // Se não estiver logado, mostrar login
      setShowUserLogin(true);
    }
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-pink-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <img 
              src="/LOGO HORIZONTAL TRANSPARENTE.png" 
              alt="LaviBaby" 
              className="h-16 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ec4899" }}
              href="#inicio" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Início
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ec4899" }}
              href="#categorias" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Categorias
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ec4899" }}
              href="#produtos" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Produtos
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ec4899" }}
              href="#sobre" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Sobre
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#ec4899" }}
              href="#contato" 
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              Contato
            </motion.a>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Search size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Heart size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={isAdmin ? () => setShowAdminLogin(true) : handleUserIconClick}
              className="p-2 text-gray-700 hover:text-pink-500 transition-colors"
            >
              {isAdmin ? (
                <Shield size={20} />
              ) : isLoggedIn ? (
                <div className="relative">
                  <User size={20} className="text-pink-500" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
              ) : (
                <User size={20} />
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-700 hover:text-pink-500 transition-colors relative"
            >
              <ShoppingBag size={20} />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                3
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-pink-100"
          >
            <div className="flex flex-col space-y-4">
              <motion.a 
                whileHover={{ x: 10, color: "#ec4899" }}
                href="#inicio" 
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                Início
              </motion.a>
              <motion.a 
                whileHover={{ x: 10, color: "#ec4899" }}
                href="#categorias" 
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                Categorias
              </motion.a>
              <motion.a 
                whileHover={{ x: 10, color: "#ec4899" }}
                href="#produtos" 
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                Produtos
              </motion.a>
              <motion.a 
                whileHover={{ x: 10, color: "#ec4899" }}
                href="#sobre" 
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                Sobre
              </motion.a>
              <motion.a 
                whileHover={{ x: 10, color: "#ec4899" }}
                href="#contato" 
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
              >
                Contato
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>

    {/* Admin Login Modal */}
    {showAdminLogin && !isAdmin && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <button
            onClick={() => setShowAdminLogin(false)}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg z-10"
          >
            <X size={20} />
          </button>
          <AdminLogin />
        </motion.div>
      </motion.div>
    )}

    {/* User Login Modal */}
    {showUserLogin && (
      <UserLogin
        onClose={() => setShowUserLogin(false)}
        onSwitchToRegister={() => {
          setShowUserLogin(false);
          setShowUserRegistration(true);
        }}
        onSuccess={() => setShowUserLogin(false)}
      />
    )}

    {/* User Registration Modal */}
    {showUserRegistration && (
      <UserRegistration
        onClose={() => setShowUserRegistration(false)}
        onSuccess={() => setShowUserRegistration(false)}
      />
    )}
    </>
  );
};

export default Navbar;