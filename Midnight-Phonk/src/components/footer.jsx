import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => (
  <div id="footer" className="bg-gray-900 py-12 border-t border-gray-700">
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <section className="contact mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Síguenos en redes sociales</h3>
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 p-2 rounded-full hover:bg-gray-700"><Twitter size={24} /></a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 p-2 rounded-full hover:bg-gray-700"><Facebook size={24} /></a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition duration-300 p-2 rounded-full hover:bg-gray-700"><Instagram size={24} /></a>
          </li>
        </ul>
      </section>
      <div className="copyright text-gray-500 text-sm">
        <ul className="space-y-1">
          <li>&copy; Midnight Phonk. Todos los derechos reservados.</li>
          <li>Diseño React/Tailwind: (Basado en HTML5 UP)</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;