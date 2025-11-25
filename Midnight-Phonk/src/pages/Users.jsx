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
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });

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

  const handleDelete = async () => {
    if (!pendingDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${pendingDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== pendingDelete.id));
        setActionMessage('Usuario eliminado exitosamente');
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        setError('Error al eliminar el usuario');
      }
    } catch (err) {
      setError('Error al eliminar el usuario');
    } finally {
      setPendingDelete(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, password: '' });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      // Only include password if it was changed
      const updateData = {
        ...editingUser,
        name: editForm.name,
        email: editForm.email
      };

      if (editForm.password && editForm.password.trim() !== '') {
        updateData.password = editForm.password;
      }

      const response = await fetch(`${API_BASE_URL}/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setActionMessage('Usuario actualizado exitosamente');
        setTimeout(() => setActionMessage(null), 3000);
        setEditingUser(null);
      } else {
        setError('Error al actualizar el usuario');
      }
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.email.endsWith('@adminduoc.cl') ? 'Admin' : 'User'}</td>
                    <td>
                      <button
                        className="btn-secondary"
                        onClick={() => handleEdit(user)}
                        style={{ marginRight: '8px', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => setPendingDelete(user)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="modal-overlay" onClick={() => setEditingUser(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
              <button className="modal-close-btn" onClick={() => setEditingUser(null)}>×</button>
              <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Editar Usuario</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#ccc', display: 'block', marginBottom: '0.5rem' }}>Nombre</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ color: '#ccc', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ color: '#ccc', display: 'block', marginBottom: '0.5rem' }}>Nueva Contraseña (dejar vacío para no cambiar)</label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button className="btn-secondary" onClick={() => setEditingUser(null)}>Cancelar</button>
                  <button className="btn-primary" onClick={handleSaveEdit}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        <ConfirmModal
          isOpen={!!pendingDelete}
          title={pendingDelete ? `Eliminar "${pendingDelete.name}"` : 'Eliminar usuario'}
          message={pendingDelete ? '¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.' : ''}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      </div>
    </div>
  );
};

export default Users;