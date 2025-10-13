import React from 'react';
import PageWrapper from '../components/PageWrapper';

const Donations = () => (
  <PageWrapper title="Donaciones">
    <p className="text-lg">Ayúdanos a mantener los motores encendidos. ¡Tu apoyo nos permite seguir trayéndote la mejor música!</p>
    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
      Donar Ahora
    </button>
  </PageWrapper>
);

export default Donations;
