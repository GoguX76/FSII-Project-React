import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import API_BASE_URL from '../config/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Error connecting to the API.');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  if (loading) {
    return <div className="dashboard-page"><div className="inner-container"><p>Cargando usuarios...</p></div></div>;
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
          <h1 className="dashboard-title">Gestión de Usuarios</h1>
          <p className="dashboard-subtitle">Lista de usuarios registrados</p>
          {(actionMessage || error) && (
            <div className={`alert ${error ? 'alert-error' : 'alert-success'}`} style={{
              padding: '10px',
              marginBottom: '20px',
              backgroundColor: error ? '#f8d7da' : '#d4edda',
              color: error ? '#721c24' : '#155724',
              borderRadius: '4px',
              border: `1px solid ${error ? '#f5c6cb' : '#c3e6cb'}`
            }}>
              {actionMessage || error}
            </div>
          )}
          <div className="table-container mt-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>{user.email.endsWith('@adminduoc.cl') ? 'Admin' : 'User'}</td>
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

export default Users;