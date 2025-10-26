import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/purchases');
        if (!response.ok) {
          throw new Error('Error al conectar con la base de datos simulada.');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="dashboard-page"><div className="inner-container"><p>Cargando órdenes...</p></div></div>;
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

  return (
    <div className="dashboard-page">
      <div className="inner-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Gestión de Órdenes</h1>
          <p className="dashboard-subtitle">Lista de compras realizadas</p>
          <div className="table-container mt-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID de Orden</th>
                  <th>Email del Cliente</th>
                  <th>Productos</th>
                  <th>Dirección de Envío</th>
                  <th>Monto Total</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>
                      <ul>
                        {order.items.map(item => (
                          <li key={item.id}>{item.title} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails['postal-code']}
                    </td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;