import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
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
      // Parsear los strings JSON a objetos
      const parsedOrders = data.map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
        shippingDetails: typeof order.shippingDetails === 'string' ? JSON.parse(order.shippingDetails) : order.shippingDetails
      }));
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