import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  {
    name: 'Meninas',
    id: 'meninas',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-pink-400 via-pink-500 to-rose-400',
    items: '150+ produtos'
  },
  {
    name: 'Meninos',
    id: 'meninos',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-orange-400 via-orange-500 to-yellow-400',
    items: '120+ produtos'
  },
  {
    name: 'Bebês',
    id: 'bebes',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-yellow-400 via-yellow-500 to-orange-400',
    items: '80+ produtos'
  },
  {
    name: 'Acessórios',
    id: 'acessorios',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-pink-400 via-rose-400 to-pink-500',
    items: '50+ produtos'
  }
];

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const { siteSettings } = useAuth();

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    // Scroll para seção de produtos
    const element = document.querySelector('#produtos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="categorias" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 text-4xl opacity-10"
        >🎪</motion.div>
        <motion.div 
          animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-20 text-3xl opacity-15"
        >🧸</motion.div>
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 text-5xl opacity-10"
        >🎡</motion.div>
        <motion.div 
          animate={{ rotate: [0, 360], y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 right-1/3 text-4xl opacity-15"
        >🪀</motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Explore nossas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
              categorias
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre o look perfeito para cada ocasião e idade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-125 transition-transform duration-700"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.items}</p>
                </div>

                <div className="absolute top-6 right-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors duration-300"
                  >
                    <span className="text-white text-xl">🛍️</span>
                  </motion.div>
                </div>

                {/* Promotion Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  🔥 HOT
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Promotion Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const element = document.querySelector('#produtos');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-3xl opacity-30"
            >
              🎪
            </motion.div>
            <h3 className="text-3xl font-bold mb-4">🎉 LIQUIDAÇÃO DE INVERNO</h3>
            <p className="text-xl mb-6">Até 70% OFF em peças selecionadas!</p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                const element = document.querySelector('#produtos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              🛒 Ver Ofertas Imperdíveis
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;