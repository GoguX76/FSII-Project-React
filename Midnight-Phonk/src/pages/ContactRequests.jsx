import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import API_BASE_URL from '../config/api';
import ConfirmModal from '../components/ConfirmModal';

const ContactRequests = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/contacts`);
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!pendingDelete) return;

        try {
            const response = await fetch(`${API_BASE_URL}/contacts/${pendingDelete.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setContacts(contacts.filter(c => c.id !== pendingDelete.id));
            } else {
                alert("Error al eliminar la solicitud");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        } finally {
            setPendingDelete(null);
        }
    };

    if (loading) return <div className="dashboard-page"><div className="inner-container"><p>Cargando solicitudes...</p></div></div>;

    return (
        <div className="dashboard-page">
            <div className="inner-container">
                <h1 className="dashboard-title">Solicitudes de Contacto</h1>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Asunto</th>
                                <th>Mensaje</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.subject}</td>
                                    <td>{contact.message}</td>
                                    <td>{new Date(contact.date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn-danger"
                                            onClick={() => setPendingDelete(contact)}
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

                {/* Delete Confirmation Modal */}
                <ConfirmModal
                    isOpen={!!pendingDelete}
                    title={pendingDelete ? `Eliminar solicitud de "${pendingDelete.name}"` : 'Eliminar solicitud'}
                    message={pendingDelete ? '¿Estás seguro de que deseas eliminar esta solicitud? Esta acción no se puede deshacer.' : ''}
                    onConfirm={handleDelete}
                    onCancel={() => setPendingDelete(null)}
                />
            </div>
        </div>
    );
};

export default ContactRequests;
