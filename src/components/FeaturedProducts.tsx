import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProductModal from './ProductModal';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  badge: string;
  badgeColor: string;
  description: string;
  sizes: string[];
  colors: string[];
  category: string;
}

interface FeaturedProductsProps {
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  selectedCategory?: string | null;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart, selectedCategory }) => {
  const { siteSettings } = useAuth();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = React.useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    onAddToCart(product, size, quantity);
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Vestido Princesa Rosa",
      price: 89.90,
      originalPrice: 129.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      badge: "Mais Vendido",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Lindo vestido rosa perfeito para ocasiões especiais. Feito com tecido macio e confortável.",
      sizes: ["2", "4", "6", "8", "10"],
      colors: ["Rosa", "Lilás"],
      category: "meninas"
    },
    {
      id: 2,
      name: "Conjunto Aventureiro",
      price: 69.90,
      originalPrice: 99.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4,
      badge: "Oferta",
      badgeColor: "bg-gradient-to-r from-pink-500 to-blue-500",
      description: "Conjunto aventureiro ideal para brincadeiras ao ar livre. Resistente e estiloso.",
      sizes: ["2", "4", "6", "8"],
      colors: ["Azul", "Verde"],
      category: "meninos"
    },
    {
      id: 3,
      name: "Body Bebê Unicórnio",
      price: 39.90,
      originalPrice: 59.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      badge: "Novo",
      badgeColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      description: "Body fofo com estampa de unicórnio. 100% algodão, ideal para bebês.",
      sizes: ["RN", "P", "M", "G"],
      colors: ["Branco", "Rosa Claro"],
      category: "bebes"
    },
    {
      id: 4,
      name: "Macacão Colorido",
      price: 79.90,
      originalPrice: 119.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4,
      badge: "Promoção",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Macacão colorido e divertido. Perfeito para o dia a dia dos pequenos.",
      sizes: ["1", "2", "3", "4"],
      colors: ["Colorido", "Arco-íris"],
      category: "meninas"
    },
    {
      id: 5,
      name: "Camiseta Super Herói",
      price: 49.90,
      originalPrice: 69.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      badge: "Novo",
      badgeColor: "bg-gradient-to-r from-blue-500 to-green-500",
      description: "Camiseta de super herói para os pequenos aventureiros.",
      sizes: ["2", "4", "6", "8", "10"],
      colors: ["Azul", "Vermelho"],
      category: "meninos"
    },
    {
      id: 6,
      name: "Tiara Princesa",
      price: 29.90,
      originalPrice: 39.90,
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4,
      badge: "Acessório",
      badgeColor: "bg-gradient-to-r from-pink-500 to-purple-500",
      description: "Linda tiara para completar o look de princesa.",
      sizes: ["Único"],
      colors: ["Rosa", "Dourado"],
      category: "acessorios"
    }
  ];

  // Filtrar produtos por categoria se selecionada
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;
  return (
    <section id="produtos" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Candy Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 text-4xl opacity-10"
        >🍭</motion.div>
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 text-3xl opacity-15"
        >🎠</motion.div>
        <motion.div 
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-40 left-20 text-3xl opacity-10"
        >🪀</motion.div>
        <motion.div 
          animate={{ x: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-20 right-40 text-4xl opacity-15"
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
            {selectedCategory ? `Produtos - ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Produtos em'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
              {selectedCategory ? '' : 'Destaque'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {selectedCategory 
              ? `Confira nossa seleção especial para ${selectedCategory}`
              : 'Descubra nossa seleção especial de roupas que fazem sucesso entre as famílias'
            }
          </p>
          {selectedCategory && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="mt-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
            >
              Ver Todos os Produtos
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
              }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group relative"
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold z-10`}>
                {product.badge}
              </div>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart size={16} className="text-pink-500" />
              </motion.button>

              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProductClick(product)}
                    className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow-lg flex items-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>Ver Detalhes</span>
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">({product.rating}.0)</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProductClick(product)}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ShoppingCart size={18} className="relative z-10" />
                  <span className="relative z-10">Ver Produto</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to top to show all products
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">🛍️ Ver Todos os Produtos</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={selectedProduct}
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;