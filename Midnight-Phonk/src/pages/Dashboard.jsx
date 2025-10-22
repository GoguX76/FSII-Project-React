import React from 'react';
import '../css/dashboard.css';
import { 
  LayoutDashboard, ShoppingCart, Package, LayoutGrid, 
  Users, BarChart2, User, Store, ArrowUpRight 
} from 'lucide-react';

// Stat card
const StatCard = ({ title, value, subtext, icon, variant = 'blue' }) => {
  const variantColor = {
    blue: '#4f46e5',
    green: '#10b981',
    yellow: '#f59e0b',
  }[variant];

  return (
    <div className="stat-card" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#cbd5e1' }}>{title}</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 6 }}>{value}</p>
        </div>
        <div style={{ background: variantColor, color: '#fff', borderRadius: 9999, padding: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {React.cloneElement(icon, { className: 'w-6 h-6', size: 20, color: '#fff' })}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8' }}>{subtext}</div>
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
    <div className="dashboard-page" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent)' }}>
      <div className="inner-container">
        <div className="dashboard-card" style={{ background: '#1f2937', color: '#fff' }}>
          <h1 className="dashboard-title" style={{ color: '#c4b5fd' }}>Dashboard</h1>
          <p className="dashboard-subtitle" style={{ color: '#cbd5e1' }}>Resumen de las actividades diarias</p>

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
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;