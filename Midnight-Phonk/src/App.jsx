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
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrazilianPhonk from "./pages/BrazilianPhonk";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import "./css/cards.css";
import "./css/forms.css"; // importar variables de color globales

import Cart from "./pages/Cart";
import "./css/cart.css";

import Checkout from "./pages/Checkout";
import { useCart } from "./context/CartContext";

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

  const { user } = useCart();

  const pages = {
    home: <Home />,
    about: <About />,
    contact: <Contact />,
    blog: <Blog />,
    login: <Login onNavigate={setPaginaActual} />,
    register: <Register onNavigate={setPaginaActual} />,
    brazilianphonk: <BrazilianPhonk onNavigate={setPaginaActual} />,
    cart: <Cart onNavigate={setPaginaActual} />,
    checkout: <Checkout />,
    admin: <Dashboard onNavigate={setPaginaActual} />,
    'admin/users': <Users />,
    'admin/products': <Products />,
    'admin/orders': <Orders />,
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
        {user?.admin && paginaActual.startsWith("admin") ? (
          <div className="flex h-screen bg-gray-100">
            <Sidebar onNavigate={setPaginaActual} />
            <div className="flex-1 overflow-hidden">
              {renderPage()}
            </div>
          </div>
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
