import React from 'react';
import '../css/modal.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar' }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true">
      <div className="confirm-box">
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn-danger" onClick={onConfirm}>{confirmLabel}</button>
          <button className="btn-secondary" onClick={onCancel} style={{marginLeft:12}}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
