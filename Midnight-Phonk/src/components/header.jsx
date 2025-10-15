import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/midnight-phonk.png';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleNavigation = (pageName) => {
    onNavigate(pageName);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', state: 'home' },
    { name: 'Donaciones', state: 'donations' },
    { name: 'Contacto', state: 'contact' },
    { name: 'Sobre nosotros', state: 'about' },
  ];

  return (
    <div id="header" className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="#" onClick={() => handleNavigation('home')} className="flex items-center space-x-3 text-4xl font-extrabold tracking-wider text-indigo-400 hover:text-indigo-300 transition duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span>Midnight Phonk</span>
              {/* Carga la imagen del logo de Midnight Phonk */}
              <img
                src={logo}
                alt="Midnight-Phonk-Logo"
                className='h-16 w-16 object-contain ml-2' //Aquí se modifican las propiedades de la imagen.
              />
            </a>
          </div>
          <nav className="hidden lg:block">
            <ul className="flex space-x-8 text-lg font-medium">
              {navLinks.map((link) => (
                <li key={link.state}>
                  <a href="#" onClick={() => handleNavigation(link.state)} className="text-gray-300 hover:text-indigo-400 transition duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="relative" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition duration-200">Categorías</a>
                {isCategoryOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-10">
                    <li><a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400">Phonk Ruso</a></li>
                    <li><a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400">Phonk Brasileño</a></li>
                    <li><a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400">Phonk Fiestas Patrias</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-md" aria-controls="mobile-menu" aria-expanded="false">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-white bg-gray-800">
            {navLinks.map((link) => (
              <a key={link.state} href="#" onClick={() => handleNavigation(link.state)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Categorías <span className="ml-2">{isCategoryOpen ? '▲' : '▼'}</span>
              </button>
              {isCategoryOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md">Phonk Ruso</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md">Phonk Brasileño</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded-md">Phonk Fiestas Patrias</a>
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