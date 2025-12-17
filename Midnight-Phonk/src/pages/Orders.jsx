import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';
import API_BASE_URL from '../config/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/purchases`);
      if (!response.ok) {
        throw new Error('Error al conectar con la base de datos simulada.');
      }
      const data = await response.json();

      const parsedOrders = data.map(order => {
        let parsedShipping = {};
        try {
          parsedShipping = typeof order.shippingDetails === 'string'
            ? JSON.parse(order.shippingDetails)
            : order.shippingDetails || {};
        } catch (e) {
          console.error("Error parsing shipping details", e);
        }
        return {
          ...order,
          shippingDetails: parsedShipping
        };
      });
      setOrders(parsedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          {actionMessage && (
            <div className="alert alert-success" style={{
              padding: '10px',
              marginBottom: '20px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '4px',
              border: '1px solid #c3e6cb'
            }}>
              {actionMessage}
            </div>
          )}
          <div className="table-container mt-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Dirección de Facturación</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Comprobante</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user?.email || 'N/A'}</td>
                    <td>
                      {order.product?.title} (x{order.quantity})
                    </td>
                    <td>
                      {order.shippingDetails?.address ? (
                        <>
                          {order.shippingDetails.address}, {order.shippingDetails.city}
                        </>
                      ) : 'N/A'}
                    </td>
                    <td>${order.totalPrice?.toFixed(2)}</td>
                    <td>{order.purchaseDate ? new Date(order.purchaseDate).toLocaleDateString() : '-'}</td>
                    <td>
                      {order.orderCode ? (
                        <a
                          href={`${API_BASE_URL}/purchases/receipt/${order.orderCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                          title="Descargar Boleta"
                        >
                          📥 PDF
                        </a>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
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