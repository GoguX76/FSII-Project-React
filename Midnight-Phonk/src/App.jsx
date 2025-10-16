import React, { useState } from 'react';
import { Mail, Home as HomeIcon, Info, DollarSign, Menu, X, Twitter, Facebook, Instagram } from 'lucide-react';

import Home from './pages/Home';
import About from './pages/About';
import Donations from './pages/Donations';
import Contact from './pages/Contact';
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  // Configuración de Tailwind CSS (para el entorno Canvas)
  // Nota: En un proyecto React normal, esto no sería necesario.
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
  }

  // Maneja las páginas que se mostraran ('home', 'about', 'contact', 'donations')
    const [paginaActual, setPaginaActual] = useState('home'); // Maneja las páginas que se mostraran ('home', 'about', 'contact', 'donations', 'login', 'register')

  // Función para renderizar el contenido de la página actual
  const renderPage = () => {
    switch (paginaActual) {
        case 'home':
          return <Home />;
        case 'about':
          return <About />;
        case 'contact':
          return <Contact />;
        case 'donations':
          return <Donations />;
        case 'login':
          return <Login onNavigate={setPaginaActual} />;
        case 'register':
          return <Register onNavigate={setPaginaActual} />;
        default:
          return <Home />; // Fallback
    }
  };

  return (
    // Estructura principal, con la clase base simulando el body/page-wrapper
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-500">
      
      {/* HEADER: Le pasamos la función para cambiar el estado */}
      <Header onNavigate={setPaginaActual} />

      {/* MAIN CONTENT */}
      <main className="pt-0 pb-12">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
