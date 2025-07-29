import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onOrderComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15.90 : subtotal >= 150 ? 0 : 9.90;
  const total = subtotal + shipping;

  const handleCompleteOrder = () => {
    // Simular processamento do pedido
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar ao Carrinho</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  stepNum <= step
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    stepNum < step ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Truck className="text-pink-500 mr-3" size={28} />
                  Informações de Entrega
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          defaultValue={user?.name || ''}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          defaultValue={user?.telefone || ''}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Endereço Completo</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        defaultValue={user?.endereco ? `${user.endereco.endereco}, ${user.endereco.numero}, ${user.endereco.bairro}, ${user.endereco.cidade} - ${user.endereco.estado}, ${user.endereco.cep}` : ''}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Método de Entrega</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="text-pink-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium">Entrega Padrão</div>
                          <div className="text-sm text-gray-600">5-7 dias úteis - {subtotal >= 150 ? 'Grátis' : 'R$ 9,90'}</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="text-pink-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium">Entrega Expressa</div>
                          <div className="text-sm text-gray-600">2-3 dias úteis - R$ 15,90</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Continuar para Pagamento
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="text-pink-500 mr-3" size={28} />
                  Forma de Pagamento
                </h2>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium">Cartão de Crédito</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Elo</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium">PIX</div>
                        <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="boleto"
                        checked={paymentMethod === 'boleto'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium">Boleto Bancário</div>
                        <div className="text-sm text-gray-600">Vencimento em 3 dias</div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'credit' && (
                    <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Número do Cartão</label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Validade</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="000"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Nome no Cartão</label>
                        <input
                          type="text"
                          placeholder="Nome como está no cartão"
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Revisar Pedido
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Revisar Pedido
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Produtos</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.size && <p className="text-sm text-gray-600">Tamanho: {item.size}</p>}
                            <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Resumo</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frete:</span>
                        <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-pink-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete:</span>
                  <span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-pink-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;