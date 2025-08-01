import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Truck, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: Heart,
    title: 'Feito com Amor',
    description: 'Cada peça é selecionada com carinho pensando no conforto e felicidade dos pequenos.'
  },
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Materiais seguros e duráveis, testados para garantir a segurança das crianças.'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Entregamos em todo o Brasil com rapidez e segurança para sua comodidade.'
  },
  {
    icon: Award,
    title: 'Melhor Atendimento',
    description: 'Nossa equipe está sempre pronta para ajudar você a encontrar o look perfeito.'
  }
];

const About = () => {
  const { siteSettings } = useAuth();

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-10 right-10 text-5xl opacity-10"
        >🎡</motion.div>
        <motion.div 
          animate={{ rotate: [0, 360], y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-10 text-4xl opacity-15"
        >🪀</motion.div>
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-1/4 text-6xl opacity-10"
        >🍭</motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/3 text-3xl opacity-15"
        >🧸</motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {siteSettings.aboutTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
                {siteSettings.aboutTitle.split(' ').slice(-1)[0]}
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {siteSettings.aboutDescription}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    <feature.icon className="text-purple-600" size={24} />
                  </motion.div>
                  <div>
                    <motion.h3 
                      whileHover={{ color: "#8b5cf6" }}
                      className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Criança feliz"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Roupas coloridas"
                  className="w-full h-32 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Família feliz"
                  className="w-full h-32 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Detalhes das roupas"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-pink-100"
            >
              <div className="text-2xl font-bold text-purple-600">10k+</div>
              <div className="text-sm text-gray-600">Famílias Felizes</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-purple-100"
            >
              <div className="text-2xl font-bold text-pink-500">5★</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-4xl opacity-30"
            >
              🎪
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">🎁 Oferta Especial para Novos Clientes!</h3>
            <p className="text-xl mb-6">Ganhe 20% OFF na primeira compra + Frete Grátis</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#newsletter');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🛍️ Quero Meu Desconto
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open(`https://wa.me/${siteSettings.whatsapp}?text=Olá! Gostaria de saber mais sobre os produtos da LaviBaby 👶`, '_blank');
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                📱 Falar no WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;