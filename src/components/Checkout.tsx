import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Phone, Mail, Copy, Check, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../types';
import { processPayment, validateCreditCard, getCardBrand, calculateInstallments, PaymentData } from '../services/paymentService';
import { formatCPF, formatPhone } from '../utils/formatters';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  
  // Dados do formulário
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.telefone || '',
    document: user?.cpf || '',
    address: {
      street: user?.endereco?.endereco || '',
      number: user?.endereco?.numero || '',
      complement: user?.endereco?.complemento || '',
      neighborhood: user?.endereco?.bairro || '',
      city: user?.endereco?.cidade || '',
      state: user?.endereco?.estado || '',
      zipCode: user?.endereco?.cep || ''
    }
  });
  
  // Dados do cartão
  const [cardData, setCardData] = useState({
    number: '',
    holderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    installments: 1
  });
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15.90 : subtotal >= 150 ? 0 : 9.90;
  const total = subtotal + shipping;
  const installmentOptions = calculateInstallments(total);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryMonth' || field === 'expiryYear') {
      const expiry = formatExpiry(value);
      const [month, year] = expiry.split('/');
      setCardData(prev => ({
        ...prev,
        expiryMonth: month || '',
        expiryYear: year || ''
      }));
      return;
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setPaymentError('Preencha todos os campos obrigatórios');
      return false;
    }
    
    if (paymentMethod === 'credit') {
      if (!cardData.number || !cardData.holderName || !cardData.expiryMonth || !cardData.expiryYear || !cardData.cvv) {
        setPaymentError('Preencha todos os dados do cartão');
        return false;
      }
      
      if (!validateCreditCard(cardData.number)) {
        setPaymentError('Número do cartão inválido');
        return false;
      }
    }
    
    return true;
  };

  const handleCompleteOrder = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      const paymentData: PaymentData = {
        method: paymentMethod as 'credit' | 'pix' | 'boleto',
        amount: total,
        customerData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          document: formData.document,
          address: formData.address
        }
      };
      
      if (paymentMethod === 'credit') {
        paymentData.creditCard = {
          number: cardData.number.replace(/\s/g, ''),
          holderName: cardData.holderName,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
          cvv: cardData.cvv
        };
      }
      
      const result = await processPayment(paymentData);
      
      if (result.success) {
        setPaymentResult(result);
        if (result.status === 'approved') {
          // Para cartão aprovado, finalizar pedido
          setTimeout(() => {
            onOrderComplete();
          }, 3000);
        }
      } else {
        setPaymentError(result.error || 'Erro no processamento do pagamento');
      }
    } catch (error) {
      setPaymentError('Erro inesperado. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyPixCode = () => {
    if (paymentResult?.pixCode) {
      navigator.clipboard.writeText(paymentResult.pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
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
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader className="animate-spin" size={20} />
                      <span>Processando...</span>
                    </div>
                  ) : (
                    'Finalizar Pedido'
                  )}
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
                        <label className="block text-gray-700 font-medium mb-2">
                          Número do Cartão
                          {cardData.number && (
                            <span className="ml-2 text-sm text-blue-600">
                              {getCardBrand(cardData.number)}
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={(e) => handleCardChange('number', e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-pink-500 ${
                              cardData.number && !validateCreditCard(cardData.number) 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300'
                            }`}
                            maxLength={19}
                          />
                          {cardData.number && !validateCreditCard(cardData.number) && (
                            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Validade</label>
                          <input
                            type="text"
                            value={`${cardData.expiryMonth}${cardData.expiryYear ? '/' + cardData.expiryYear : ''}`}
                            onChange={(e) => handleCardChange('expiryMonth', e.target.value)}
                            placeholder="MM/AA"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => handleCardChange('cvv', e.target.value)}
                            placeholder="123"
                            value={cardData.holderName}
                            onChange={(e) => handleCardChange('holderName', e.target.value.toUpperCase())}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                            maxLength={4}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Parcelas</label>
                          <select
                            value={cardData.installments}
                            onChange={(e) => setCardData(prev => ({ ...prev, installments: Number(e.target.value) }))}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                          >
                            {installmentOptions.map((option) => (
                              <option key={option.number} value={option.number}>
                                {option.label}
                              </option>
                            ))}
                          </select>
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
                  
                  {paymentMethod === 'pix' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">PIX</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800">Pagamento via PIX</h4>
                          <p className="text-sm text-blue-600">Aprovação instantânea</p>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700">
                        Após confirmar o pedido, você receberá o código PIX para pagamento.
                      </p>
                    </div>
                  )}
                  
                  {paymentMethod === 'boleto' && (
                    <div className="mt-6 p-4 bg-orange-50 rounded-xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">📄</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-800">Boleto Bancário</h4>
                          <p className="text-sm text-orange-600">Vencimento em 3 dias úteis</p>
                        </div>
                      </div>
                      <p className="text-sm text-orange-700">
                        O boleto será gerado após a confirmação do pedido.
                      </p>
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
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-12 h-12 object-cover rounded-lg"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                      required
                      placeholder="(11) 99999-9999"
                      required
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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    value={`${formData.address.street}, ${formData.address.number}, ${formData.address.neighborhood}, ${formData.address.city} - ${formData.address.state}, ${formData.address.zipCode}`}
                    onChange={(e) => {
                      // Para simplificar, vamos manter como readonly e usar os dados do usuário
                    }}
                    placeholder="seu@email.com"
                    required
                    placeholder="Endereço completo"
                    readOnly
                  <span className="text-pink-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Error Modal */}
      {paymentError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Erro no Pagamento</h3>
              <p className="text-gray-600 mb-6">{paymentError}</p>
              <button
                onClick={() => setPaymentError('')}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600"
              >
                Tentar Novamente
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Payment Success Modal */}
      {paymentResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            {paymentResult.status === 'approved' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Pagamento Aprovado!</h3>
                <p className="text-gray-600 mb-4">
                  Transação: {paymentResult.transactionId}
                </p>
                <p className="text-sm text-gray-500">
                  Redirecionando para confirmação...
                </p>
              </div>
            )}
            
            {paymentResult.status === 'pending' && paymentResult.pixCode && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-500 font-bold">PIX</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Código PIX Gerado</h3>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <p className="text-xs text-gray-600 mb-2">Código PIX:</p>
                  <div className="bg-white p-3 rounded border text-xs font-mono break-all">
                    {paymentResult.pixCode}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={copyPixCode}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 flex items-center justify-center space-x-2"
                  >
                    {copiedPix ? <Check size={20} /> : <Copy size={20} />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                  <button
                    onClick={onOrderComplete}
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
                  >
                    Continuar
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Após o pagamento, seu pedido será processado automaticamente.
                </p>
              </div>
            )}
            
            {paymentResult.status === 'pending' && paymentResult.boletoUrl && (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 text-2xl">📄</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Boleto Gerado</h3>
                
                <div className="space-y-3">
                  <a
                    href={paymentResult.boletoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 inline-block"
                  >
                    Baixar Boleto
                  </a>
                  <button
                    onClick={onOrderComplete}
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
                  >
                    Continuar
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Vencimento em 3 dias úteis. Após o pagamento, seu pedido será processado.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Checkout;