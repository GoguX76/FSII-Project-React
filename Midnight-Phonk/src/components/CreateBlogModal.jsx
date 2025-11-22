import React, { useState } from 'react';
import '../css/forms.css';
import API_BASE_URL from '../config/api';

const CreateBlogModal = ({ isOpen, onClose, onBlogCreated }) => {
    const [formData, setFormData] = useState({
        titleNew: '',
        imageNew: '',
        // categoryNew removed
        shortDescNew: '',
        fullDescNew: '',
        autorNew: 'Admin', // Default author
        dateNew: new Date().toISOString().split('T')[0] // Today's date
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setFormData(prev => ({ ...prev, imageNew: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    categoryNew: 'General' // Default category since field is removed but might be useful
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear el blog');
            }

            const newBlog = await response.json();
            onBlogCreated(newBlog);
            onClose();
            // Reset form
            setFormData({
                titleNew: '',
                imageNew: '',
                shortDescNew: '',
                fullDescNew: '',
                autorNew: 'Admin',
                dateNew: new Date().toISOString().split('T')[0]
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <h2 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Crear Nuevo Blog</h2>

                {error && <div className="message error">{error}</div>}

                <form onSubmit={handleSubmit} className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        name="titleNew"
                        placeholder="Título del Blog"
                        value={formData.titleNew}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                    <div className="form-group">
                        <label style={{ color: '#ccc', marginBottom: '0.5rem', display: 'block' }}>Imagen de Portada</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="form-input"
                            required={!formData.imageNew}
                        />
                        {formData.imageNew && (
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <img
                                    src={formData.imageNew}
                                    alt="Preview"
                                    style={{ maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>

                    <textarea
                        name="shortDescNew"
                        placeholder="Descripción Corta (para la tarjeta)"
                        value={formData.shortDescNew}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="3"
                        required
                    />

                    <textarea
                        name="fullDescNew"
                        placeholder="Contenido Completo del Blog"
                        value={formData.fullDescNew}
                        onChange={handleChange}
                        className="form-textarea"
                        rows="6"
                        required
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} className="btn-secondary" style={{ marginRight: '1rem' }}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Creando...' : 'Publicar Blog'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogModal;
