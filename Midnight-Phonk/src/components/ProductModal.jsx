import React, { useEffect } from "react";
import "../css/productModal.css";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, isOpen, onClose, onNavigate }) => {
  const { addToCart } = useCart();

  //Esto evita que se pueda hacer scroll en la pantalla del fondo cuando se abre.
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

  //Esto que, si no hay producto o no está abierto el modal no muestra nada.
  if (!isOpen || !product) return null;

  //Esto maneja que, cuando se haga click fuera del modal, este se cierre.
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    onClose(); // Cierra el modal después de agregar
  };

  const handleAddToCartAndNavigate = () => {
    addToCart(product);
    onClose();
    if (onNavigate) {
      onNavigate("cart");
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="modal-product-image"
              onError={(e) => {
                e.target.src = "placeholder-image.jpg";
                e.target.alt = "Imagen no disponible";
              }}
            />
          </div>
        </div>

        <div className="modal-body">
          <h2 className="modal-product-title">{product.title}</h2>

          <div className="modal-product-price">
            {product.price > 0 ? `$${product.price}` : "Gratis"}
          </div>

          <div className="modal-product-description">
            <h3>Descripción</h3>
            <p>
              {product.fullDesc || product.desc || "Sin descripción disponible"}
            </p>
          </div>

          <div className="modal-product-details">
            <h3>Detalles del producto</h3>
            <ul>
              <li>
                <strong>Formato:</strong> WAV, MIDI
              </li>
              <li>
                <strong>Calidad:</strong> 24-bit / 44.1 kHz
              </li>
              <li>
                <strong>Tamaño:</strong> ~{Math.floor(Math.random() * 500) + 50}{" "}
                MB
              </li>
            </ul>
          </div>

          <div className="modal-actions">
            <button
              className="btn-primary"
              onClick={handleAddToCartAndNavigate}
            >
              {product.price > 0 ? "Comprar ahora" : "Descargar gratis"}
            </button>
            <button className="btn-secondary" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
            <button className="btn-preview">Escuchar preview</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
