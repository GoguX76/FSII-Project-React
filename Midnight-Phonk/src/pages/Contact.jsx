import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }
    setMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <PageWrapper title="Contacto">
      <section className="contact">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Por favor, completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.</p>
        {message && (
          <div className={`p-3 mb-4 rounded-lg font-semibold ${message.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="nombre" placeholder="Nombre completo" required value={formData.nombre} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="email" name="email" placeholder="Correo electrónico" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <select name="asunto" required value={formData.asunto} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none">
            <option value="">Selecciona el asunto</option>
            <option value="pago">Problemas con el sistema de pago</option>
            <option value="herramientas">Problemas con herramientas</option>
            <option value="articulo">Artículo Inapropiado</option>
          </select>
          <textarea name="mensaje" placeholder="Describe tu problema o consulta" rows="5" required value={formData.mensaje} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          <div className="flex justify-end">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md transform hover:scale-105">Enviar Mensaje</button>
          </div>
        </form>
      </section>
    </PageWrapper>
  );
};

export default Contact;