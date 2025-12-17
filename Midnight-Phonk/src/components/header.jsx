import React, { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/midnight-phonk.png";
import { useDelayedHover } from "../hooks/useDelayedHover";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartItems, user, logout } = useCart();
  const navigate = useNavigate();
  const {
    isOpen: isCategoryOpen,
    handleMouseEnter: handleCategoryEnter,
    handleMouseLeave: handleCategoryLeave,
  } = useDelayedHover(300);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const {
    isOpen: isAccountOpen,
    handleMouseEnter: handleAccountEnter,
    handleMouseLeave: handleAccountLeave,
  } = useDelayedHover(300);

  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categorías", path: "#", isDropdown: true },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contact" },
    { name: "Sobre nosotros", path: "/about" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMobileLinkClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div id="header" className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-3 text-4xl font-extrabold tracking-wider text-indigo-400 hover:text-indigo-300 transition duration-300"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="font-dest">Midnight Phonk</span>
              <img
                src={logo}
                alt="Midnight-Phonk-Logo"
                className="h-16 w-16 object-contain ml-2"
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-8 text-lg font-medium">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.isDropdown ? (
                    <div
                      onMouseEnter={handleCategoryEnter}
                      onMouseLeave={handleCategoryLeave}
                      className="inline-block"
                    >
                      <button
                        className="text-gray-300 hover:text-indigo-400 transition duration-200 focus:outline-none"
                      >
                        {link.name}
                      </button>
                      {isCategoryOpen && (
                        <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-xl py-2 z-10 max-w-xs whitespace-nowrap">
                          <li>
                            <Link
                              to="/brazilianphonk"
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                            >
                              Phonk Brasileño
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/japanesephonk"
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                            >
                              Phonk Japonés
                            </Link>
                          </li>
                          {categories.map((cat) => (
                            <li key={cat.id}>
                              <Link
                                to={`/category/${cat.name}`}
                                className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-indigo-400 transition duration-200"
                    >
                      {link.name}
                    </Link>
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
                <button
                  className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200 focus:outline-none"
                >
                  <User size={20} className="mr-1" />
                  <span>{user ? user.user.name : "Cuenta"}</span>
                </button>

                {/* Dropdown de Cuenta */}
                {isAccountOpen && (
                  <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-xl py-2 z-20">
                    {user ? (
                      <>
                        {user.admin && (
                          <li>
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                            >
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                          >
                            Cerrar sesión
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                          >
                            Iniciar sesión
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400"
                          >
                            Registrarse
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* CARRITO - DESKTOP */}
            <div className="ml-4">
              <Link
                to="/cart"
                className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          {/* MOBILE NAVIGATION BUTTON + CARRITO */}
          <div className="lg:hidden flex items-center">
            {/* CARRITO - MOBILE */}
            <Link
              to="/cart"
              className="flex items-center text-gray-300 hover:text-indigo-400 transition duration-200 mr-4"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="ml-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

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
              .filter((l) => !l.isDropdown)
              .map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              ))}

            {/* CUENTA SECTION - MOBILE */}
            <div className="pt-2">
              <button
                onClick={() => setIsMobileAccountOpen(!isMobileAccountOpen)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 focus:outline-none"
              >
                <div className="flex items-center">
                  <User size={20} className="mr-2" />
                  {user ? user.user.name : "Cuenta"}
                </div>
                <span className="ml-2">{isMobileAccountOpen ? "▲" : "▼"}</span>
              </button>
              {isMobileAccountOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1">
                  {user ? (
                    <>
                      {user.admin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                        >
                          Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* CATEGORÍAS SECTION - MOBILE */}
            <div className="pt-2">
              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 focus:outline-none"
              >
                Categorías
                <span className="ml-2">{isMobileCategoryOpen ? "▲" : "▼"}</span>
              </button>
              {isMobileCategoryOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1">
                  <Link
                    to="/brazilianphonk"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                  >
                    Phonk Brasileño
                  </Link>
                  <Link
                    to="/japanesephonk"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                  >
                    Phonk Japonés
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.name}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md"
                    >
                      {cat.name}
                    </Link>
                  ))}
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
