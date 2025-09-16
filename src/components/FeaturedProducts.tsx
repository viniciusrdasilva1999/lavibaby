import React from 'react';
import { Star, ShoppingCart, Heart, Eye, Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';
import ProductModal from './ProductModal';

const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = (product: any, size: string = 'M') => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity: 1
    });
  };
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : '';
    onAddToCart(product, defaultSize, 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Produtos em Destaque</h2>
            <p className="text-gray-600">Nenhum produto disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <>
      <section id="produtos" className="py-20 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Produtos em Destaque</h2>
          <p className="text-lg text-gray-600">Descubra nossa seleção especial de produtos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(4.0)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar</span>
                    onClick={(e) => handleQuickAdd(e, product)}
                  </button>
                </div>
                    <Plus size={18} />
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Tamanhos disponíveis:</p>
                    <div className="flex space-x-2">
                      {product.sizes.map((size: string) => (
                        <button
                          key={size}
                onClick={() => handleProductClick(product)}
                          onClick={() => handleAddToCart(product, size)}
                          className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200"
                        >
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

            onClick={() => {
              // Scroll to top to show all products
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Ver Todos os Produtos
          </button>
        </div>
      </div>
      </section>
  );
};

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={closeModal}
        onAddToCart={onAddToCart}
      />
    </>
export default FeaturedProducts;