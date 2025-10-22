// src/components/AdminHeader.jsx

import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
      {/* Lado Izquierdo: (oculto) */}

      {/* Lado Derecho: Iconos (puedes personalizarlos) */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <UserCircle className="w-8 h-8 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;