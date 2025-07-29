import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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

const AppContent = () => {
  const { user, isAdmin } = useAuth();

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (user && !isAdmin) {
    // Usuário comum logado - mostrar site normal
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <Hero />
        <Categories />
        <FeaturedProducts />
        <About />
        <Testimonials />
        <Newsletter />
        <Footer />
      </div>
    );
  }

  // Não logado - mostrar site público
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
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