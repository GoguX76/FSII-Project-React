import React, { useState } from "react";
// 1. Importa el hook y las reglas de validación
import useForm from '../hooks/useForm';
import { validateForm } from '../utils/Validations';

// Componente simulado PageWrapper 
const PageWrapper = ({ children }) => (
    <div style={{ padding: '0' }}>{children}</div>
);

// 2. Define el estado inicial para el formulario de contacto
const INITIAL_STATE = {
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
};

const Contact = () => {
    // Estado solo para el mensaje de éxito
    const [message, setMessage] = useState("");

    // 3. Define la lógica que se ejecutará si la validación es exitosa
    const handleSuccessfulSubmit = async () => {
        try {
            // Mapear los valores del formulario (español) a la entidad del backend (inglés)
            const payload = {
                name: values.nombre,
                email: values.email,
                subject: values.asunto,
                message: values.mensaje
            };

            const response = await fetch('http://localhost:8080/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
                setValues(INITIAL_STATE);
                setTimeout(() => setMessage(""), 5000);
            } else {
                setMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error sending contact form:", error);
            setMessage("Error de conexión. Inténtalo de nuevo más tarde.");
        }
    };

    // 4. Llama al hook para obtener toda la lógica
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setValues, // <-- Obtenemos la nueva función para resetear
    } = useForm(INITIAL_STATE, validateForm, handleSuccessfulSubmit);

    return (
        <PageWrapper title="Contacto">
            <div className="form-page contact-page">
                <div className="container">
                    <section className="form-card contact-section">
                        <div className="card-content" style={{ textAlign: 'left' }}>
                            <h2 className="title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Contáctanos</h2>
                            <p className="subtitle">
                                Por favor, completa el siguiente formulario y nos pondremos en
                                contacto contigo lo antes posible.
                            </p>
                            {message && (
                                <div className={`message success`}>
                                    {message}
                                </div>
                            )}
                            {/* 5. El 'handleSubmit' del formulario ahora viene del hook */}
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-grid">
                                    <div>
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre completo"
                                            value={values.nombre}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                        {/* Muestra el error de validación si existe */}
                                        {errors.nombre && <p className="error-message">{errors.nombre}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                        {errors.email && <p className="error-message">{errors.email}</p>}
                                    </div>
                                </div>

                                <select
                                    name="asunto"
                                    value={values.asunto}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="">Selecciona el asunto</option>
                                    <option value="pago">Problemas con el sistema de pago</option>
                                    <option value="herramientas">Problemas con herramientas</option>
                                    <option value="articulo">Artículo Inapropiado</option>
                                </select>
                                {errors.asunto && <p className="error-message">{errors.asunto}</p>}

                                <textarea
                                    name="mensaje"
                                    placeholder="Describe tu problema o consulta"
                                    rows="5"
                                    value={values.mensaje}
                                    onChange={handleChange}
                                    className="form-textarea"
                                ></textarea>
                                {errors.mensaje && <p className="error-message">{errors.mensaje}</p>}

                                <div className="card-footer text-right">
                                    <button type="submit" className="btn-primary">Enviar Mensaje</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Contact;