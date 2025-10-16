import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import logo from '../assets/images/midnight-phonk.png';
import '../css/forms.css';

// ====================================================================
// COMPONENTE: LOGIN
// Recibe 'onNavigate' como prop para cambiar la página al autenticarse.
// ====================================================================

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: Validaciones deshabilitadas aquí a petición del usuario.
    // SIMULACIÓN DE AUTENTICACIÓN
    console.log('Intentando iniciar sesión:', formData);
    setMessage('Iniciando sesión...');

    // Simulamos una llamada a API (2 segundos)
    setTimeout(() => {
        // Lógica de éxito o fallo (simulado)
        if (formData.email === "test@mp.com" && formData.password === "12345") {
            setMessage('Inicio de sesión exitoso. Redirigiendo...');
            // Redirige al home después de un breve momento
            setTimeout(() => onNavigate('home'), 1000); 
        } else {
            setMessage('Error: Credenciales incorrectas.');
        }
    }, 2000);
  };

  return (
    // Replicación del 'vh-100 gradient-custom' con Tailwind (fondo púrpura/negro vibrante)
    <section className="form-page login-page">
      <div className="container">
        <div className="form-card">
          <div className="card-content">
            <div className="logo">
              <img src={logo} alt="Midnight Phonk" />
            </div>
            <div className="title">Midnight Phonk</div>
            <p className="subtitle">Por favor, ingresa tu correo y contraseña</p>

            {message && (
              <div className={`message ${message.includes('éxito') || message.includes('Redirigiendo') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />

              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />

              <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <p className="link-small">
              <a href="#" onClick={() => alert('Función de recuperación de contraseña no implementada.')}>¿Olvidaste tu contraseña?</a>
            </p>

            <div className="card-footer">
              <p className="small">¿No tienes cuenta? <a href="#" onClick={() => onNavigate('register')} className="link-small">Regístrate</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
