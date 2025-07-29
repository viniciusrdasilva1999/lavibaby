import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { siteSettings } = useAuth();

  return (
    <section id="inicio" className="pt-20 min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 text-6xl opacity-20 cursor-pointer"
        >🍭</motion.div>
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 text-5xl opacity-15 cursor-pointer"
        >🎠</motion.div>
        <motion.div 
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 left-20 text-4xl opacity-20 cursor-pointer"
        >🪀</motion.div>
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-40 text-5xl opacity-15 cursor-pointer"
        >⚽</motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-60 left-1/3 text-3xl opacity-10 cursor-pointer"
        >🧸</motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-1/3 text-4xl opacity-15 cursor-pointer"
        >🎪</motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-60 right-10 text-5xl opacity-20 cursor-pointer"
        >🎡</motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-80 left-1/2 text-3xl opacity-10 cursor-pointer"
        >🍬</motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-current cursor-pointer" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-600 text-sm">Mais de 10.000 famílias satisfeitas</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              {siteSettings.heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                {siteSettings.heroTitle.split(' ').slice(-2).join(' ')}
              </span>{' '}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {siteSettings.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = siteSettings.buttonLinks.verColecao}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Ver Coleção</span>
                <ArrowRight size={20} className="relative z-10" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = siteSettings.buttonLinks.ofertas}
                className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="relative z-10">🎉 Ofertas Especiais</span>
              </motion.button>
            </div>

            {/* Floating Promotion Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-2xl cursor-pointer shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🎁</div>
                    <div>
                      <div className="font-bold">FRETE GRÁTIS</div>
                      <div className="text-sm opacity-90">Em compras acima de R$ {siteSettings.freeShippingMinValue}</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl font-bold text-pink-600">500+</div>
                <div className="text-gray-600 text-sm">Produtos</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl font-bold text-purple-500">10k+</div>
                <div className="text-gray-600 text-sm">Clientes</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl font-bold text-cyan-500">98%</div>
                <div className="text-gray-600 text-sm">Satisfação</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Criança feliz com roupas coloridas"
                className="w-full h-[600px] object-cover rounded-3xl shadow-2xl cursor-pointer"
              />
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute top-8 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-pink-200 cursor-pointer"
              >
                <div className="text-2xl mb-2">🍭</div>
                <div className="text-sm font-semibold text-gray-800">Camisetas</div>
                <div className="text-xs text-pink-600 font-bold">A partir de R$ 29,90</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="absolute bottom-8 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-purple-200 cursor-pointer"
              >
                <div className="text-2xl mb-2">🎠</div>
                <div className="text-sm font-semibold text-gray-800">Vestidos</div>
                <div className="text-xs text-purple-600 font-bold">A partir de R$ 49,90</div>
              </motion.div>

              {/* Promotion Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent rounded-3xl flex items-end justify-center pb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = siteSettings.buttonLinks.comprarAgora}
                  className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  🛍️ Comprar Agora
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Promotion Banner */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-pink-600 to-purple-500 text-white py-2 overflow-hidden"
        >
          <div className="whitespace-nowrap text-center">
            🎉 MEGA PROMOÇÃO: 50% OFF em toda coleção de verão! • 🚚 FRETE GRÁTIS acima de R$ 150 • 🎁 Ganhe brindes em compras acima de R$ 200 • 
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;