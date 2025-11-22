import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrazilianPhonk from "./pages/BrazilianPhonk";
import JapanesePhonk from "./pages/JapanesePhonk";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

// Styles
import "./css/cards.css";
import "./css/forms.css";
import "./css/cart.css";

function App() {
  const { user } = useCart();

  useEffect(() => {
    // Configuración de Tailwind CSS (para el entorno Canvas)
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-500">
      <Header />
      <main className="pt-0 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/brazilianphonk" element={<BrazilianPhonk />} />
          <Route path="/japanesephonk" element={<JapanesePhonk />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            user?.admin ? (
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 overflow-hidden">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
