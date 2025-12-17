import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';
import API_BASE_URL from '../config/api';
import ConfirmModal from '../components/ConfirmModal';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [pendingDelete, setPendingDelete] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/categories`);
            if (!res.ok) throw new Error("Error connecting to API");
            const data = await res.json();
            setCategories(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        try {
            const res = await fetch(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName }),
            });
            if (!res.ok) throw new Error("Error creating category");
            await fetchCategories();
            setNewCategoryName("");
            setIsModalOpen(false);
        } catch (e) {
            alert("Error al crear categoría: " + e.message);
        }
    };

    const handleDeleteCategory = async () => {
        if (!pendingDelete) return;
        try {
            const res = await fetch(`${API_BASE_URL}/categories/${pendingDelete.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Error deleting category");
            await fetchCategories();
            setPendingDelete(null);
        } catch (e) {
            alert("Error: " + e.message);
        }
    };

    if (loading) return <div className="dashboard-page"><div className="inner-container"><p>Cargando categorías...</p></div></div>;

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 className="dashboard-title">Gestión de Categorías</h1>
                            <p className="dashboard-subtitle">Administra las categorías de productos</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Nueva Categoría</button>
                        </div>
                    </div>

                    <div className="table-container mt-6">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(cat => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.name}</td>
                                        <td>
                                            <button className="btn-danger" onClick={() => setPendingDelete(cat)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && <tr><td colSpan="3">No hay categorías.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}>
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header"><h2>Nueva Categoría</h2></div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateCategory}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Ej: Russian Phonk"
                                        required
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-primary">Crear</button>
                                    <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={!!pendingDelete}
                title="Eliminar Categoría"
                message={`¿Estás seguro de eliminar "${pendingDelete?.name}"?`}
                onConfirm={handleDeleteCategory}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
};

export default Categories;
