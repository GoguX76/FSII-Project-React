import React, { useState } from "react";
import {
  Mail,
  Home as HomeIcon,
  Info,
  DollarSign,
  Menu,
  X,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

import Home from "./pages/Home";
import About from "./pages/About";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrazilianPhonk from "./pages/BrazilianPhonk";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import "./css/cards.css";
import "./css/forms.css"; // importar variables de color globales

function App() {
  // Configuración de Tailwind CSS (para el entorno Canvas)
  // Nota: En un proyecto React normal, esto no sería necesario.
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }

  // Maneja las páginas que se mostraran ('home', 'about', 'contact', 'donations')
  const [paginaActual, setPaginaActual] = useState("home"); // Maneja las páginas que se mostraran ('home', 'about', 'contact', 'donations', 'login', 'register')
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // Handler que actualiza user, isAdmin y paginaActual en una sola llamada
  const onAuthSuccess = ({ user: newUser, admin }) => {
    setUser(newUser || null);
    setIsAdmin(Boolean(admin));
    setPaginaActual(admin ? 'admin' : 'home');
  };
  // Logout simple: limpia user y isAdmin y vuelve a home
  const onLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setPaginaActual('home');
  };
  const pages = {
    home: <Home />,
    about: <About />,
    contact: <Contact />,
    donations: <Donations />,
    login: <Login onNavigate={setPaginaActual} onAuthSuccess={onAuthSuccess} />,
    register: <Register onNavigate={setPaginaActual} onAuthSuccess={onAuthSuccess} />,
    brazilianphonk: <BrazilianPhonk />,
  };
  // Función para renderizar el contenido de la página actual
  const renderPage = () => {
    return pages[paginaActual] || pages.home;
  };

  return (
    // Estructura principal, con la clase base simulando el body/page-wrapper
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-500">
      {/* HEADER: Le pasamos la función para cambiar el estado */}
      <Header onNavigate={setPaginaActual} />

      {/* MAIN CONTENT */}
      <main className="pt-0 pb-12">
        {isAdmin && paginaActual === 'admin' ? (
          <AdminLayout onNavigate={setPaginaActual} isAdmin={isAdmin} user={user} onLogout={onLogout}>
            <Dashboard />
          </AdminLayout>
        ) : (
          renderPage()
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
