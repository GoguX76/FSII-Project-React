import React, { useState } from 'react';
// 1. Importa el hook y las reglas de validación
import useForm from '../hooks/useForm';
import { validateForm, isAdminEmail } from '../utils/Validations';
import logo from '../assets/images/midnight-phonk.png';
import '../css/forms.css';
import API_BASE_URL from '../config/api';

// 2. Define el estado inicial del formulario
const INITIAL_STATE = {
  nombre: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
};

const Register = ({ onNavigate, onAuthSuccess }) => {
  // El estado para los mensajes de éxito/error se mantiene aquí
  const [message, setMessage] = useState('');

  // 3. Define la lógica que se ejecutará si el formulario es válido
  const handleSuccessfulRegistration = async () => {
    setMessage('Validación exitosa. Registrando usuario...');
    console.log('Intentando registrar:', values);

    try {
      // Verificar si el usuario ya existe
  const response = await fetch(`${API_BASE_URL}/users?email=${values.email}`);
  const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        setMessage('El correo electrónico ya está registrado. Por favor, intenta con otro.');
        return;
      }

      // Si no existe, proceder con el registro
      const newUser = {
        nombre: values.nombre,
        email: values.email,
        password: values.password, // En una app real, esto debería estar hasheado
      };

      const postResponse = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!postResponse.ok) {
        throw new Error('Hubo un problema al registrar el usuario.');
      }

      setMessage(`¡Registro exitoso para ${values.nombre}! Redirigiendo...`);
      const userObj = { email: values.email, name: values.nombre };
      const admin = isAdminEmail(values.email);

      // Simular una pequeña espera y luego navegar
      setTimeout(() => {
        if (onAuthSuccess) {
          onAuthSuccess({ user: userObj, admin });
        } else {
          onNavigate(admin ? 'admin' : 'login');
        }
      }, 1500);

    } catch (error) {
      console.error('Error en el registro:', error);
      setMessage(error.message || 'No se pudo completar el registro. Inténtalo de nuevo.');
    }
  };

  // 4. Usa el hook para obtener todo lo que necesitas
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(INITIAL_STATE, validateForm, handleSuccessfulRegistration);

  return (
    <section className="form-page register-page">
      <div className="container">
        <div className="form-card">
          <div className="card-content">
            <div className="logo">
              <img src={logo} alt="Midnight Phonk" />
            </div>
            <div className="title">Registro MP</div>
            <p className="subtitle">Por favor, ingresa tus datos</p>

            {/* Muestra el mensaje de éxito o de proceso */}
            {message && (
              <div className={`message ${message.includes('exitoso') ? 'success' : 'info'}`}>
                {message}
              </div>
            )}

            {/* 5. El 'handleSubmit' del formulario ahora viene del hook */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* CAMBIO: Se añade el atributo 'name' y se muestra el error */}
              <input type="text" id="nombre" name="nombre" placeholder="Nombre completo" value={values.nombre} onChange={handleChange} className="form-input" />
              {errors.nombre && <p className="error-message">{errors.nombre}</p>}

              <input type="email" id="email" name="email" placeholder="Correo electrónico" value={values.email} onChange={handleChange} className="form-input" />
              {errors.email && <p className="error-message">{errors.email}</p>}

              <input type="email" id="confirmEmail" name="confirmEmail" placeholder="Confirmar Correo electrónico" value={values.confirmEmail} onChange={handleChange} className="form-input" />
              {errors.confirmEmail && <p className="error-message">{errors.confirmEmail}</p>}

              <input type="password" id="password" name="password" placeholder="Contraseña" value={values.password} onChange={handleChange} className="form-input" />
              {errors.password && <p className="error-message">{errors.password}</p>}
              
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña" value={values.confirmPassword} onChange={handleChange} className="form-input" />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

              <button type="submit" className="btn-primary">Completar Registro</button>
            </form>

            <div className="card-footer">
              <p className="small">¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="link-small">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;