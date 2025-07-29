import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, MapPin, Phone, Mail, Eye, EyeOff, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserRegistrationProps {
  onClose: () => void;
  onSuccess: () => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onClose, onSuccess }) => {
  const { registerUser } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    
    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Termos
    aceitaTermos: false,
    aceitaNewsletter: false
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'cep') {
      formattedValue = formatCEP(value);
    } else if (field === 'telefone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validateStep1 = () => {
    const { nome, cpf, telefone, email, senha, confirmarSenha } = formData;
    
    if (!nome || !cpf || !telefone || !email || !senha || !confirmarSenha) {
      setError('Todos os campos são obrigatórios');
      return false;
    }
    
    if (cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF deve ter 11 dígitos');
      return false;
    }
    
    if (senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (senha !== confirmarSenha) {
      setError('Senhas não coincidem');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { cep, endereco, numero, bairro, cidade, estado } = formData;
    
    if (!cep || !endereco || !numero || !bairro || !cidade || !estado) {
      setError('Todos os campos de endereço são obrigatórios');
      return false;
    }
    
    if (cep.replace(/\D/g, '').length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError('');
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.aceitaTermos) {
      setError('Você deve aceitar os termos de uso');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular registro (em produção, seria uma API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now().toString(),
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.telefone,
        endereco: {
          cep: formData.cep,
          endereco: formData.endereco,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado
        },
        aceitaNewsletter: formData.aceitaNewsletter,
        role: 'user' as const
      };
      
      registerUser(userData, formData.senha);
      onSuccess();
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const buscarCEP = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        }
      } catch (error) {
        console.log('Erro ao buscar CEP');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 p-6 rounded-t-3xl text-white relative overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-2 right-16 text-2xl opacity-30"
          >
            🍭
          </motion.div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <div className="text-3xl mb-2">👶</div>
            <h2 className="text-2xl font-bold mb-2">Criar Conta</h2>
            <p className="text-white/90">Cadastre-se para finalizar sua compra</p>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-8 h-2 rounded-full transition-colors ${
                  stepNum <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="text-pink-500 mr-2" size={24} />
                Dados Pessoais
              </h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">CPF</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Telefone</label>
                <input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirmar Senha</label>
                <input
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Confirme sua senha"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Endereço */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="text-pink-500 mr-2" size={24} />
                Endereço de Entrega
              </h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">CEP</label>
                <input
                  type="text"
                  value={formData.cep}
                  onChange={(e) => {
                    handleInputChange('cep', e.target.value);
                    if (e.target.value.replace(/\D/g, '').length === 8) {
                      buscarCEP(e.target.value);
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="00000-000"
                  maxLength={9}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Endereço</label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Rua, Avenida..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Número</label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) => handleInputChange('numero', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Complemento</label>
                  <input
                    type="text"
                    value={formData.complemento}
                    onChange={(e) => handleInputChange('complemento', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Apto, Casa..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bairro</label>
                <input
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nome do bairro"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cidade</label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Sua cidade"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmação */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="text-pink-500 mr-2" size={24} />
                Finalizar Cadastro
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-gray-800">Resumo dos Dados:</h4>
                <p><strong>Nome:</strong> {formData.nome}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>CPF:</strong> {formData.cpf}</p>
                <p><strong>Telefone:</strong> {formData.telefone}</p>
                <p><strong>Endereço:</strong> {formData.endereco}, {formData.numero}</p>
                <p><strong>Cidade:</strong> {formData.cidade} - {formData.estado}</p>
                <p><strong>CEP:</strong> {formData.cep}</p>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.aceitaTermos}
                    onChange={(e) => setFormData(prev => ({ ...prev, aceitaTermos: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">
                    Aceito os <a href="#" className="text-pink-600 hover:underline">termos de uso</a> e 
                    <a href="#" className="text-pink-600 hover:underline ml-1">política de privacidade</a>
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.aceitaNewsletter}
                    onChange={(e) => setFormData(prev => ({ ...prev, aceitaNewsletter: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">
                    Quero receber ofertas e novidades por email
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mt-4"
            >
              {error}
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
              >
                Voltar
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  'Criar Conta'
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegistration;