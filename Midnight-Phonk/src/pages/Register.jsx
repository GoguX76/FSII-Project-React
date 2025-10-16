import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import logo from '../assets/images/midnight-phonk.png';
import '../css/forms.css';

// ====================================================================
// COMPONENTE: REGISTER
// Recibe 'onNavigate' para redirigir al Login después del registro.
// ====================================================================

const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  // NOTE: Validaciones deshabilitadas aquí a petición del usuario.
    // Aquí iría la lógica de registro real (API call a Firebase, etc.)
    console.log('Intentando registrar:', formData);
    setMessage('Registrando usuario...');

    // SIMULACIÓN DE REGISTRO (3 segundos)
    setTimeout(() => {
        setMessage(`¡Registro exitoso para ${formData.nombre}! Redirigiendo al inicio de sesión.`);
        
        // Redirige a la página de Login después de 2 segundos
        setTimeout(() => onNavigate('login'), 2000); 
    }, 3000);
  };

  return (
    // Estilo Phonk de gradiente (similar al Login)
    <section className="form-page register-page">
      <div className="container">
        <div className="form-card">
          <div className="card-content">
            <div className="logo">
              <img src={logo} alt="Midnight Phonk" />
            </div>
            <div className="title">Registro MP</div>
            <p className="subtitle">Por favor, ingresa tus datos</p>

            {message && (
              <div className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input type="text" id="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} className="form-input" />
              <input type="email" id="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} className="form-input" />
              <input type="email" id="confirmEmail" placeholder="Confirmar Correo electrónico" value={formData.confirmEmail} onChange={handleChange} className="form-input" />
              <input type="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="form-input" />
              <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} className="form-input" />

              <button type="submit" className="btn-primary">Completar Registro</button>
            </form>

            <div className="card-footer">
              <p className="small">¿Ya tienes cuenta? <a href="#" onClick={() => onNavigate('login')} className="link-small">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
