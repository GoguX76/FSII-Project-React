import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { validateForm, isAdminEmail } from '../utils/Validations';
import logo from '../assets/images/midnight-phonk.png';
import '../css/forms.css';
import API_BASE_URL from '../config/api';

const INITIAL_STATE = {
  nombre: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSuccessfulRegistration = async () => {
    setMessage('Validación exitosa. Registrando usuario...');
    console.log('Intentando registrar:', values);

    try {
      const response = await fetch(`${API_BASE_URL}/users?email=${values.email}`);
      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        setMessage('El correo electrónico ya está registrado. Por favor, intenta con otro.');
        return;
      }

      const newUser = {
        name: values.nombre, // Changed from 'nombre' to 'name' to match backend
        email: values.email,
        password: values.password,
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
      const admin = isAdminEmail(values.email);

      setTimeout(() => {
        navigate(admin ? '/admin' : '/login');
      }, 1500);

    } catch (error) {
      console.error('Error en el registro:', error);
      setMessage(error.message || 'No se pudo completar el registro. Inténtalo de nuevo.');
    }
  };

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

            {message && (
              <div className={`message ${message.includes('exitoso') ? 'success' : 'info'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
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
              <p className="small">¿Ya tienes cuenta? <Link to="/login" className="link-small">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;