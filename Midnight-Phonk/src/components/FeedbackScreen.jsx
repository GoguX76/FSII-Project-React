import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Download } from 'lucide-react';
import '../css/feedbackScreen.css';

const FeedbackScreen = ({ status, message, purchaseData }) => {
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
        {isSuccess && purchaseData && purchaseData.orderCode && (
          <a
            href={`http://localhost:8080/api/purchases/receipt/${purchaseData.orderCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="feedback-button download-btn"
            style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <Download size={20} />
            Descargar Boleta
          </a>
        )}
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