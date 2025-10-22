// src/components/AdminLayout.jsx

import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children, onNavigate = () => {}, isAdmin = true, user = null, onLogout = () => {} }) => {
  return (
  // Contenedor principal (sin padding extra de forms.css)
  <div className="flex h-screen bg-gray-100">
      
      {/* Contenedor del contenido (Sidebar + Página) */}
      <div className="flex flex-1 overflow-hidden">
        
  {/* 2. Menú Lateral (Sidebar) */}
  <Sidebar onNavigate={onNavigate} isAdmin={isAdmin} onLogout={onLogout} />

        {/* 3. Contenido de la Página (donde se cargan las rutas) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children} {/* Render children passed from App (Dashboard, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;