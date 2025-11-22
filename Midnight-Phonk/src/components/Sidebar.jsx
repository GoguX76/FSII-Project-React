import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LayoutGrid,
  Users,
  BarChart2,
  User,
  Store,
  LogOut,
  MessageSquare
} from "lucide-react";
import { useCart } from "../context/CartContext";

const Sidebar = () => {
  const { user, logout } = useCart();
  const navigate = useNavigate();

  // Clase base para los botones/enlaces del sidebar
  const navBtnClass =
    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-indigo-200 hover:bg-[rgba(255,255,255,0.04)] w-full text-left";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-6 bg-[var(--card-bg)] border-r border-gray-200">
      {/* Contenedor flexible para empujar los botones al fondo */}
      <div className="flex flex-col justify-between flex-1">
        {/* Navegación Principal */}
        <nav className="flex-1 space-y-2">
          <Link to="/admin" className={navBtnClass}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link to="/admin/orders" className={navBtnClass}>
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-3">Órdenes</span>
          </Link>
          <Link to="/admin/products" className={navBtnClass}>
            <Package className="w-5 h-5" />
            <span className="ml-3">Productos</span>
          </Link>
          {user?.admin && (
            <Link to="/admin/users" className={navBtnClass}>
              <Users className="w-5 h-5" />
              <span className="ml-3">Usuarios</span>
            </Link>
          )}
          <Link to="/admin/contacts" className={navBtnClass}>
            <MessageSquare className="w-5 h-5" />
            <span className="ml-3">Solicitudes</span>
          </Link>
        </nav>

        {/* Navegación Inferior */}
        <div className="space-y-2">
          <button onClick={() => navigate("/admin")} className={navBtnClass}>
            <User className="w-5 h-5" />
            <span className="ml-3">Perfil</span>
          </button>

          <Link
            to="/"
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Store className="w-5 h-5" />
            <span className="ml-3">Tienda</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
