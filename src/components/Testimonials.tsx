import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Mãe da Sofia (4 anos)',
    text: 'As roupas são lindas e de ótima qualidade! Minha filha adora usar e eu fico tranquila sabendo que são confortáveis e seguras.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Carlos Santos',
    role: 'Pai do Miguel (6 anos)',
    text: 'Excelente atendimento e produtos incríveis. O Miguel sempre fica elegante e confortável com as roupas da Pequenos Estilosos.',
    rating: 5,
    avatar: '👨‍💻'
  },
  {
    name: 'Mariana Costa',
    role: 'Mãe da Laura (2 anos)',
    text: 'Compro sempre aqui! As roupas são resistentes, lindas e chegam super rápido. Recomendo para todas as mães!',
    rating: 5,
    avatar: '👩‍🎨'
  },
  {
    name: 'Roberto Lima',
    role: 'Pai do João (5 anos)',
    text: 'Qualidade excepcional e preços justos. Meu filho se sente um verdadeiro estiloso com as roupas daqui!',
    rating: 5,
    avatar: '👨‍🏫'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 text-4xl opacity-10"
        >🎪</motion.div>
        <motion.div 
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 right-20 text-5xl opacity-15"
        >🎠</motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-40 left-20 text-3xl opacity-10"
        >🍬</motion.div>
        <motion.div 
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-1/3 text-4xl opacity-15"
        >⚽</motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            O que dizem nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
              clientes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 10.000 famílias confiam na Pequenos Estilosos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-current cursor-pointer" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Quote className="text-purple-200 mb-4" size={24} />
              </motion.div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center space-x-3">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-3xl cursor-pointer"
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <motion.div 
                    whileHover={{ color: "#8b5cf6" }}
                    className="font-semibold text-gray-800 cursor-pointer"
                  >
                    {testimonial.name}
                  </motion.div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-current cursor-pointer" />
                  </motion.div>
                ))}
              </div>
              <motion.span 
                whileHover={{ scale: 1.1, color: "#8b5cf6" }}
                className="font-semibold text-gray-800 cursor-pointer"
              >
                4.9/5
              </motion.span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-gray-600">
              Baseado em 2.847 avaliações
            </div>
          </div>
        </motion.div>

        {/* Interactive Review CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-6 text-white relative overflow-hidden cursor-pointer max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 right-2 text-2xl opacity-50"
            >
              ⭐
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">💬 Compartilhe sua experiência!</h3>
            <p className="text-lg mb-4">Ajude outras famílias contando como foi sua compra</p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              ⭐ Deixar Avaliação
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;