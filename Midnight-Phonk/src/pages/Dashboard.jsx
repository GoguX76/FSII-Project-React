import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { 
  ShoppingCart, Users, Package, ServerCrash, LayoutDashboard, 
  LayoutGrid, BarChart2, User, Store 
} from 'lucide-react';

// Stat card (sin cambios)
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

const Dashboard = ({ onNavigate = () => {} }) => {
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos para el action grid
  const actionItems = [
    { title: 'Órdenes', desc: 'Gestión de órdenes', icon: <ShoppingCart />, path: 'admin/orders' },
    { title: 'Productos', desc: 'Administrar inventario', icon: <Package />, path: 'admin/products' },
    { title: 'Usuarios', desc: 'Gestión de usuarios', icon: <Users />, path: 'admin/users' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, purchasesResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/purchases'),
        ]);

        if (!usersResponse.ok || !purchasesResponse.ok) {
          throw new Error('Error al conectar con la base de datos simulada.');
        }

        const usersData = await usersResponse.json();
        const purchasesData = await purchasesResponse.json();

        setUsers(usersData);
        setPurchases(purchasesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard-page"><div className="inner-container"><p>Cargando datos del dashboard...</p></div></div>;
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="inner-container error-container">
            <ServerCrash size={48} />
            <h2>Error de Conexión</h2>
            <p>{error}</p>
            <p>Asegúrate de haber iniciado el servidor con: <strong>npm run server</strong></p>
        </div>
      </div>
    );
  }

  const totalRevenue = purchases.reduce((acc, p) => acc + p.totalAmount, 0);

  return (
    <div className="dashboard-page">
      <div className="inner-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Resumen de la actividad de la tienda</p>

          <div className="stat-grid mt-6">
            <StatCard title="Ingresos Totales" value={`${totalRevenue.toFixed(2)}`} subtext={`${purchases.length} ventas`} icon={<ShoppingCart />} variant="blue" />
            <StatCard title="Usuarios Registrados" value={users.length} subtext="Clientes totales" icon={<Users />} variant="yellow" />
            <StatCard title="Artículos Vendidos" value={purchases.flatMap(p => p.items).length} subtext="En todas las órdenes" icon={<Package />} variant="green" />
          </div>
        </div>

        <div className="action-grid mt-8">
          {actionItems.map(item => (
            <div key={item.title} className="action-card" onClick={() => onNavigate(item.path)}>
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
