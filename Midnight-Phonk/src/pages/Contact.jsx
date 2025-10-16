import React, { useState } from "react";
// Eliminadas las importaciones de archivos externos para resolver el error de compilación.

// Componente simulado PageWrapper
const PageWrapper = ({ title, children }) => (
    <div style={{ padding: '0' }}>
        {children}
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Lógica de validación eliminada (para moverla a otro archivo)

        
        // Simular el envío exitoso
        setMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
        
        // Resetear el formulario
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    };

    return (
        <PageWrapper title="Contacto">
            {/* Usa form-page y container para el fondo degradado y centrado */}
            <div className="form-page contact-page">
                <div className="container">
                    {/* Usa form-card y contact-section para el estilo de tarjeta oscura y ancho doble */}
                    <section className="form-card contact-section">
                        <div className="card-content" style={{textAlign: 'left'}}>
                            {/* Título de la tarjeta */}
                            <h2 className="title" style={{textAlign: 'center', marginBottom: '1rem'}}>Contáctanos</h2>
                            {/* Subtítulo de la tarjeta */}
                            <p className="subtitle">
                                Por favor, completa el siguiente formulario y nos pondremos en
                                contacto contigo lo antes posible.
                            </p>
                            {message && (
                                // Solo se mostrará el mensaje de éxito tras el envío.
                                <div className={`message ${message.includes("éxito") ? 'success' : 'error'}`}>
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre completo"
                                        // 'required' eliminado
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        // 'required' eliminado
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <select
                                    name="asunto"
                                    // 'required' eliminado
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="">Selecciona el asunto</option>
                                    <option value="pago">Problemas con el sistema de pago</option>
                                    <option value="herramientas">Problemas con herramientas</option>
                                    <option value="articulo">Artículo Inapropiado</option>
                                </select>
                                <textarea
                                    name="mensaje"
                                    placeholder="Describe tu problema o consulta"
                                    rows="5"
                                    // 'required' eliminado
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    className="form-textarea"
                                ></textarea>
                                {/* Usa card-footer y text-right para el estilo consistente del pie de tarjeta */}
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