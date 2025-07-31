import React from 'react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useCart } from './hooks/useCart';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';

const AppContent = () => {
  const { user, isAdmin } = useAuth();
  const cart = useCart();
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'success'>('home');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAddToCart = (product: any, size: string, quantity: number) => {
    if (!user) {
      setShowUserRegistration(true);
      return;
    }
    cart.addToCart(product, size, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      setShowUserRegistration(true);
      return;
    }
    cart.closeCart();
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    cart.clearCart();
    setCurrentView('success');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
  };

  // Debug: Log do estado do admin
  console.log('Admin Status:', { user, isAdmin, userRole: user?.role });
  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (currentView === 'checkout') {
    return (
      <Checkout
        items={cart.items}
        onBack={() => setCurrentView('home')}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === 'success') {
    return <OrderSuccess onBackToHome={handleBackToHome} />;
  }

  // Home view
  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar 
          cartItemCount={cart.getTotalItems()} 
          onCartClick={cart.openCart}
        />
        <Hero />
        <Categories onCategorySelect={setSelectedCategory} />
        <FeaturedProducts 
          onAddToCart={handleAddToCart} 
          selectedCategory={selectedCategory}
        />
        <About />
        <Testimonials />
        <Newsletter />
        <Footer />
      </div>

      {/* Cart Sidebar */}
      <Cart
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onCheckout={handleCheckout}
      />

      {/* User Login Modal */}
      {showUserLogin && (
        <UserLogin
          onClose={() => setShowUserLogin(false)}
          onSwitchToRegister={() => {
            setShowUserLogin(false);
            setShowUserRegistration(true);
          }}
          onSuccess={() => setShowUserLogin(false)}
        />
      )}

      {/* User Registration Modal */}
      {showUserRegistration && (
        <UserRegistration
          onClose={() => setShowUserRegistration(false)}
          onSuccess={() => setShowUserRegistration(false)}
        />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;