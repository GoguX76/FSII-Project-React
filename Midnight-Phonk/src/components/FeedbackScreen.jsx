import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import '../css/feedbackScreen.css';

const FeedbackScreen = ({ status, message }) => {
  const isSuccess = status === 'success';

  return (
    <div className="feedback-container">
      <div className="feedback-card zoom-in-out">
        {isSuccess ? (
          <CheckCircle size={64} className="feedback-icon success" />
        ) : (
          <XCircle size={64} className="feedback-icon error" />
        )}
        <h2>{isSuccess ? '¡Éxito!' : 'Ocurrió un Error'}</h2>
        <p>{message}</p>
        {isSuccess ? (
          <Link to="/" className="feedback-button">
            Volver al Inicio
          </Link>
        ) : (
          <Link to="/cart" className="feedback-button">
            Volver al Carrito
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeedbackScreen;