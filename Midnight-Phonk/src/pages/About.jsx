// Archivo: src/components/AboutUs.jsx

import React from 'react';
// Asegúrate de que la ruta a tu logo sea la correcta
import logo from '../assets/images/midnight-phonk.png';

const About = () => {
  return (
    <section className="bg-gray-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between -mx-4">
          
          {/* Columna de Texto */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold text-indigo-400 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Midnight Phonk nació de la pasión por la música y el deseo de compartir la cultura Phonk con el mundo. Inspirados por los sonidos underground y la energía vibrante de la escena brasileña, decidimos crear un espacio único para productores, oyentes y amantes del género.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Nos dedicamos a ofrecer recursos de calidad: samples, kits, catálogos musicales, artículos y tutoriales, todo pensado para impulsar la creatividad y el crecimiento de la comunidad Phonk. Nuestro objetivo es conectar, inspirar y acompañar a quienes buscan innovar y dejar huella en la música.
            </p>
            <ul className="space-y-4 text-lg text-gray-300 mb-6">
              <li>
                <b className="text-white">¿Por qué lo hacemos?</b>
                <span className="ml-2 text-indigo-300">
                  Creemos en el poder de la música para unir personas y culturas. Queremos que más artistas descubran el Phonk y encuentren aquí las herramientas para crear su propio sonido.
                </span>
              </li>
              <li>
                <b className="text-white">Nuestra pasión:</b>
                <span className="ml-2 text-indigo-300">
                  Cada proyecto, cada sample y cada historia que compartimos está impregnada de nuestro amor por el género y su cultura. Innovar, colaborar y crecer junto a la comunidad es lo que nos impulsa día a día.
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-300">
              Gracias por ser parte de Midnight Phonk. ¡La historia la escribimos juntos!
            </p>
          </div>

          {/* Columna de la Imagen */}
          <div className="w-full lg:w-1/2 px-4 flex justify-center items-center">
            <img 
              src={logo} 
              alt="Logo Midnight Phonk" 
              className="max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;