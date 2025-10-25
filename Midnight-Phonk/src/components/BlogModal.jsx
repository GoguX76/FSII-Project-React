import React, { useEffect } from "react";
import "../css/blogModal.css";

const BlogModal = ({ post, isOpen, onClose }) => {
  // Evita que se pueda hacer scroll en la pantalla del fondo cuando se abre
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function para restaurar el scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Manejar el cierre con la tecla Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Si no hay post o no está abierto el modal no muestra nada
  if (!isOpen || !post) return null;

  // Maneja que, cuando se haga click fuera del modal, este se cierre
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="blog-modal-overlay" onClick={handleOverlayClick}>
      <div className="blog-modal-content">
        <button className="blog-modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="blog-modal-header">
          <div className="blog-modal-image-container">
            <img
              src={post.imageNew}
              alt={post.titleNew}
              className="blog-modal-image"
              onError={(e) => {
                e.target.src = "placeholder-image.jpg";
                e.target.alt = "Imagen no disponible";
              }}
            />
          </div>
        </div>

        <div className="blog-modal-body">
          <div className="blog-modal-category-container">
            <span className="blog-modal-category">{post.category}</span>
          </div>

          <h2 className="blog-modal-title">{post.titleNew}</h2>

          <div className="blog-modal-meta">
            <span className="blog-modal-date">📅 {post.dateNew}</span>
            <span className="blog-modal-author">👤 {post.autorNew}</span>
          </div>

          <div className="blog-modal-stats">
            <span className="blog-modal-stat">
              ❤️ {post.likes || "0"} likes
            </span>
          </div>

          <div className="blog-modal-description">
            <h3>Contenido</h3>
            <p>
              {post.fullDescNew ||
                post.shortDescNew ||
                "Sin contenido disponible"}
            </p>
          </div>

          <div className="blog-modal-actions">
            <button className="blog-btn-share">Compartir 🔗</button>
            <button className="blog-btn-like">Me gusta ❤️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
