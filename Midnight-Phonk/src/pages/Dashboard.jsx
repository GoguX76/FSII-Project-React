import React from 'react';
import '../css/dashboard.css';
import { 
  LayoutDashboard, ShoppingCart, Package, LayoutGrid, 
  Users, BarChart2, User, Store, ArrowUpRight 
} from 'lucide-react';

// Stat card
const StatCard = ({ title, value, subtext, icon, variant = 'blue' }) => {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-row">
        <div className="stat-text">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className="stat-icon">{React.cloneElement(icon, { className: 'w-6 h-6' })}</div>
      </div>
      <div className="stat-subtext">{subtext}</div>
    </div>
  );
};

const Dashboard = () => {
  const actionItems = [
    { title: 'Dashboard', desc: 'Visión general de métricas', icon: <LayoutDashboard /> },
    { title: 'Órdenes', desc: 'Gestión de órdenes', icon: <ShoppingCart /> },
    { title: 'Productos', desc: 'Administrar inventario', icon: <Package /> },
    { title: 'Categorías', desc: 'Organizar categorías', icon: <LayoutGrid /> },
    { title: 'Usuarios', desc: 'Gestión de usuarios', icon: <Users /> },
    { title: 'Reportes', desc: 'Generar reportes', icon: <BarChart2 /> },
    { title: 'Perfil', desc: 'Configuración de cuenta', icon: <User /> },
    { title: 'Tienda', desc: 'Ver tienda', icon: <Store /> },
  ];

  return (
    <div className="dashboard-page">
      <div className="inner-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Resumen de las actividades diarias</p>

          <div className="stat-grid mt-6">
            <StatCard title="Ventas" value="1" subtext="Prob. aumento 200%" icon={<ShoppingCart />} variant="blue" />
            <StatCard title="Productos" value="12" subtext="Inventario actual: 24" icon={<Package />} variant="green" />
            <StatCard title="Usuarios" value="10" subtext="Nuevos usuarios este mes: 1" icon={<Users />} variant="yellow" />
          </div>
        </div>

        <div className="action-grid mt-8">
          {actionItems.map(item => (
            <div key={item.title} className="action-card">
              <div className="icon-wrap">{React.cloneElement(item.icon, { className: 'w-6 h-6' })}</div>
              <h3 className="action-title">{item.title}</h3>
              <p className="action-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;