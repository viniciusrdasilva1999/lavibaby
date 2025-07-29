import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Footer = () => {
  const { siteSettings } = useAuth();

  const footerLinks = {
    'Categorias': [
      'Roupas para Meninas',
      'Roupas para Meninos',
      'Roupas para Bebês',
      'Acessórios',
      'Calçados'
    ],
    'Atendimento': [
      'Central de Ajuda',
      'Trocas e Devoluções',
      'Guia de Tamanhos',
      'Formas de Pagamento',
      'Frete e Entrega'
    ],
    'Empresa': [
      'Sobre Nós',
      'Trabalhe Conosco',
      'Sustentabilidade',
      'Imprensa',
      'Parceiros'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/LOGO HORIZONTAL TRANSPARENTE.png" 
                alt={siteSettings.companyName} 
                className="h-16 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformando momentos especiais em memórias inesquecíveis 
              através de roupas que fazem os pequenos brilharem.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Phone size={16} className="text-purple-400" />
                </motion.div>
                <span className="text-gray-400">{siteSettings.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <Mail size={16} className="text-pink-400" />
                </motion.div>
                <span className="text-gray-400">{siteSettings.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <MapPin size={16} className="text-blue-400" />
                </motion.div>
                <span className="text-gray-400">{siteSettings.address}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -5, rotate: 360 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-4 cursor-pointer"
            >
              <div className="flex items-center space-x-3 text-white">
                <div className="text-2xl">📱</div>
                <div>
                  <div className="font-semibold">Atendimento WhatsApp</div>
                  <div className="text-sm opacity-90">{siteSettings.workingHours}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <motion.h3 
                whileHover={{ color: "#a855f7" }}
                className="text-white font-semibold mb-4 cursor-pointer"
              >
                {category}
              </motion.h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 {siteSettings.companyName}. Todos os direitos reservados.
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Floating Promotion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full cursor-pointer"
            >
              <span className="text-sm font-semibold">🎉 Cadastre-se e ganhe 20% OFF na primeira compra!</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;