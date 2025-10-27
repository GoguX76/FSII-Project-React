import React, { useEffect, useState } from "react";
import "../css/blogModal.css";

const BlogModal = ({ post, isOpen, onClose, onLike }) => {
  const [hasLiked, setHasLiked] = useState(false);

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

  // Verificar si el usuario ya dio like a este post
  useEffect(() => {
    if (post) {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      setHasLiked(likedPosts.includes(post.idNew));
    }
  }, [post]);

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

  // Manejar el like
  const handleLikeClick = () => {
    if (hasLiked) {
      alert("Ya has dado like a esta publicación");
      return;
    }

    onLike(post.idNew);
    setHasLiked(true);

    // Guardar que el usuario dio like a este post
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    likedPosts.push(post.idNew);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  };

  // Manejar compartir
  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `¡Mira este artículo! ${post.titleNew}`;

    if (navigator.share) {
      navigator
        .share({
          title: post.titleNew,
          text: shareText,
          url: shareUrl,
        })
        .then(() => console.log("Compartido exitosamente"))
        .catch((error) => console.log("Error al compartir:", error));
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      alert("¡Enlace copiado al portapapeles!");
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
            <span className="blog-modal-category">{post.categoryNew}</span>
          </div>

          <h2 className="blog-modal-title">{post.titleNew}</h2>

          <div className="blog-modal-meta">
            <span className="blog-modal-date">📅 {post.dateNew}</span>
            <span className="blog-modal-author">👤 {post.autorNew}</span>
          </div>

          <div className="blog-modal-stats">
            <span className="blog-modal-stat">❤️ {post.likes || 0} likes</span>
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
            <button className="blog-btn-share" onClick={handleShare}>
              Compartir 🔗
            </button>
            <button
              className={`blog-btn-like ${hasLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
              disabled={hasLiked}
            >
              {hasLiked ? "Ya diste like ❤️" : "Me gusta ❤️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
