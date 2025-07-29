import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Newsletter = () => {
  const { siteSettings } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 text-6xl opacity-20"
        >🍭</motion.div>
        <motion.div 
          animate={{ x: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-20 text-4xl opacity-15"
        >🎠</motion.div>
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-5xl opacity-20"
        >🎡</motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 right-10 text-3xl opacity-15"
        >🧸</motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 text-4xl opacity-10"
        >🎪</motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
            >
              <Gift className="text-white" size={32} />
            </motion.div>
          </div>

          <motion.h2 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            🎁 Ganhe {siteSettings.discountPercentage}% de desconto!
          </motion.h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Cadastre-se em nossa newsletter e seja a primeira a saber sobre 
            novidades, promoções exclusivas e dicas de estilo para os pequenos.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector(siteSettings.buttonLinks.queroDesconto);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else if (siteSettings.buttonLinks.queroDesconto.startsWith('http')) {
                    window.open(siteSettings.buttonLinks.queroDesconto, '_blank');
                  }
                }}
                type="submit"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">🎉 Ganhar Desconto</span>
              </motion.button>
            </div>
          </form>

          <p className="text-white/70 text-sm mt-4">
            * Desconto válido para primeira compra acima de R$ {siteSettings.freeShippingMinValue}. Não enviamos spam.
          </p>

          {/* Bonus Offers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { icon: '🚚', text: 'Frete Grátis', desc: 'Acima de R$ 150' },
              { icon: '🎁', text: 'Brinde Especial', desc: 'Na primeira compra' },
              { icon: '⚡', text: 'Ofertas Flash', desc: 'Exclusivas por email' }
            ].map((bonus, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 cursor-pointer"
              >
                <div className="text-2xl mb-2">{bonus.icon}</div>
                <div className="font-semibold text-white">{bonus.text}</div>
                <div className="text-sm text-white/80">{bonus.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;