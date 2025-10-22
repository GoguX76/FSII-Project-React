// src/components/Sidebar.jsx

import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Package, LayoutGrid, 
  Users, BarChart2, User, Store, LogOut 
} from 'lucide-react';

const Sidebar = ({ isAdmin = true, onNavigate = () => {}, onLogout = () => {} }) => {
  // Clase base para los botones/enlaces del sidebar
  const navBtnClass = 'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-indigo-200 hover:bg-[rgba(255,255,255,0.04)]';

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-6 bg-[var(--card-bg)] border-r border-gray-200">
      
      {/* Contenedor flexible para empujar los botones al fondo */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Navegación Principal */}
        <nav className="flex-1 space-y-2">
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </button>
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-3">Órdenes</span>
          </button>
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <Package className="w-5 h-5" />
            <span className="ml-3">Productos</span>
          </button>
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <LayoutGrid className="w-5 h-5" />
            <span className="ml-3">Categorías</span>
          </button>
          {isAdmin && (
            <button onClick={() => onNavigate('admin')} className={navBtnClass}>
              <Users className="w-5 h-5" />
              <span className="ml-3">Usuarios</span>
            </button>
          )}
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <BarChart2 className="w-5 h-5" />
            <span className="ml-3">Reportes</span>
          </button>
        </nav>

        {/* Navegación Inferior */}
        <div className="space-y-2">
          <button onClick={() => onNavigate('admin')} className={navBtnClass}>
            <User className="w-5 h-5" />
            <span className="ml-3">Perfil</span>
          </button>
          {/* Estos son botones, puedes cambiarlos por NavLink si van a otras rutas */}
          <button onClick={() => onNavigate('admin')} className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700">
            <Store className="w-5 h-5" />
            <span className="ml-3">Tienda</span>
          </button>
          <button onClick={() => { onLogout(); onNavigate('home'); }} className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500">
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;