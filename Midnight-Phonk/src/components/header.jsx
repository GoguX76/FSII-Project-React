import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import logo from "../assets/images/midnight-phonk.png";
import { useDelayedHover } from "../hooks/useDelayedHover";
import { useCart } from "../context/CartContext";

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const {
    isOpen: isCategoryOpen,
    handleMouseEnter: handleCategoryEnter,
    handleMouseLeave: handleCategoryLeave,
  } = useDelayedHover(300);
  const {
    isOpen: isAccountOpen,
    handleMouseEnter: handleAccountEnter,
    handleMouseLeave: handleAccountLeave,
  } = useDelayedHover(300);

  const handleNavigation = (pageName) => {
    onNavigate(pageName);
    setIsMenuOpen(false);
  };
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);

  const navLinks = [
    { name: "Home", state: "home" },
    { name: "Categorías", state: "categories" },
    { name: "Blog", state: "blog" },
    { name: "Contacto", state: "contact" },
    { name: "Sobre nosotros", state: "about" },
  ];

  return (
    <div id="header" className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={() => handleNavigation("home")}
              className="flex items-center space-x-3 text-4xl font-extrabold tracking-wider text-indigo-400 hover:text-indigo-300 transition duration-300"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="font-dest">Midnight Phonk</span>
              <img
                src={logo}
                alt="Midnight-Phonk-Logo"
                className="h-16 w-16 object-contain ml-2"
              />
            </a>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-8 text-lg font-medium">
              {navLinks.map((link) => (
                <li key={link.state} className="relative">
                  {link.state === "categories" ? (
                    <div
                      onMouseEnter={handleCategoryEnter}
                      onMouseLeave={handleCategoryLeave}
                      className="inline-block"
                    >
                      <a
                        href="#"
                        className="text-gray-300 hover:text-indigo-400 transition duration-200"
                      >
                        {link.name}
                      </a>
                      {isCategoryOpen && (
                        <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-xl py-2 z-10 max-w-xs whitespace-nowrap">
                          <li>
                            <a
                              href="#"
                              onClick={() => handleNavigation("brazilianphonk")}
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                            >
                              Phonk Brasileño
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <a
                      href="#"
                      onClick={() => handleNavigation(link.state)}
                      className="text-gray-300 hover:text-indigo-400 transition duration-200"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* CUENTA DROPDOWN - DESKTOP */}
            <div className="ml-8">
              <div
                onMouseEnter={handleAccountEnter}
                onMouseLeave={handleAccountLeave}
                className="relative inline-block"
              >
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200"
                >
                  <User size={20} className="mr-1" />
                  <span>Cuenta</span>
                </a>

                {/* Dropdown de Cuenta */}
                {isAccountOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-xl py-2 z-20">
                    <li>
                      <a
                        href="#"
                        onClick={() => handleNavigation("login")}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      >
                        Iniciar sesión
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => handleNavigation("register")}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                      >
                        Registrarse
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* CARRITO - DESKTOP */}
            <div className="ml-4">
              <a
                href="#"
                onClick={() => handleNavigation("cart")}
                className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </nav>

          {/* MOBILE NAVIGATION BUTTON + CARRITO */}
          <div className="lg:hidden flex items-center">
            {/* CARRITO - MOBILE */}
            <a
              href="#"
              onClick={() => handleNavigation("cart")}
              className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200 mr-4"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="ml-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </a>

            {/* HAMBURGER MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-white bg-gray-800">
            {/* Navigation Links */}
            {navLinks
              .filter((l) => l.state !== "categories")
              .map((link) => (
                <a
                  key={link.state}
                  href="#"
                  onClick={() => handleNavigation(link.state)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  {link.name}
                </a>
              ))}

            {/* CUENTA SECTION - MOBILE */}
            <div className="pt-2">
              <button
                onClick={() => setIsMobileAccountOpen(!isMobileAccountOpen)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <User size={20} className="mr-2" />
                  Cuenta
                </div>
                <span className="ml-2">{isMobileAccountOpen ? "▲" : "▼"}</span>
              </button>
              {isMobileAccountOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1">
                  <a
                    href="#"
                    onClick={() => handleNavigation("login")}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                  >
                    Iniciar sesión
                  </a>
                  <a
                    href="#"
                    onClick={() => handleNavigation("register")}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Registrarse
                  </a>
                </div>
              )}
            </div>

            {/* CATEGORÍAS SECTION - MOBILE */}
            <div className="pt-2">
              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                Categorías
                <span className="ml-2">{isMobileCategoryOpen ? "▲" : "▼"}</span>
              </button>
              {isMobileCategoryOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1">
                  <a
                    href="#"
                    onClick={() => handleNavigation("brazilianphonk")}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                  >
                    Phonk Brasileño
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
