import React, { useState } from 'react';
// 1. Importa el hook y las reglas de validación
import useForm from '../hooks/useForm';
import { validateForm, isAdminEmail } from '../utils/Validations';
import logo from '../assets/images/midnight-phonk.png';
import '../css/forms.css';

// 2. Define el estado inicial para este formulario
const INITIAL_STATE = {
  email: '',
  password: '',
};

const Login = ({ onNavigate, onAuthSuccess }) => {
  // Mantenemos este estado para los mensajes de éxito o error de la API
  const [message, setMessage] = useState('');
  

  // 3. Define la lógica que se ejecutará si la validación es exitosa
  const handleSuccessfulLogin = () => {
    // Validación y autenticación local sin llamadas externas
    // Validación exitosa: aceptamos credenciales localmente (sin backend todavía)
    setMessage('Validación correcta. Verificando credenciales...');
    console.log('Intentando iniciar sesión (local):', values);

    // En esta etapa aceptamos cualquier credencial que pase las validaciones
    setMessage('Inicio de sesión exitoso. Redirigiendo...');
    const userObj = { email: values.email, name: 'Usuario' };
    const admin = isAdminEmail(values.email);
    if (onAuthSuccess) {
      onAuthSuccess({ user: userObj, admin });
    } else {
      // pequeña espera para mostrar mensaje al usuario
      setTimeout(() => onNavigate(admin ? 'admin' : 'home'), 700);
    }
  };

  // 4. Llama al hook 'useForm' para obtener toda la lógica del formulario
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(INITIAL_STATE, validateForm, handleSuccessfulLogin);

  return (
    <section className="form-page login-page">
      <div className="container">
        <div className="form-card">
          <div className="card-content">
            <div className="logo">
              <img src={logo} alt="Midnight Phonk" />
            </div>
            <div className="title">Midnight Phonk</div>
            <p className="subtitle">Por favor, ingresa tu correo y contraseña</p>

            {/* Muestra mensajes de estado (éxito/error de la API) */}
            {message && (
              <div className={`message ${message.includes('éxito') || message.includes('Redirigiendo') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            {/* 5. El 'handleSubmit' del formulario ahora viene del hook */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* CAMBIO: Se añade 'name' y se muestra el error de validación */}
              <input
                type="email"
                id="email"
                name="email" // <-- Atributo 'name' es crucial
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleChange}
                className="form-input"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}

              <input
                type="password"
                id="password"
                name="password" // <-- Atributo 'name' es crucial
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange}
                className="form-input"
              />
              {errors.password && <p className="error-message">{errors.password}</p>}

              <button type="submit" className="btn-primary">Entrar</button>
            </form>

            <p className="link-small">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Función de recuperación no implementada.'); }}>
                ¿Olvidaste tu contraseña?
              </a>
            </p>

            <div className="card-footer">
              <p className="small">
                ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }} className="link-small">Regístrate</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;