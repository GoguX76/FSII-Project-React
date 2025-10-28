import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import useForm from "../hooks/useForm";
import { validateForm } from "../utils/Validations";
import "../css/checkout.css";

const INITIAL_STATE = {
  card: "",
  name: "",
  email: "",
  address: "",
  city: "",
  "postal-code": "",
};

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'loading', 'success', or 'error'
  const [message, setMessage] = useState("");

  const submit = async () => {

    // Verificar stock disponible
    try {
      const stockResponse = await fetch('/api/products');
      if (!stockResponse.ok) throw new Error('Error al verificar el stock disponible.');
      const products = await stockResponse.json();

      // Verificar cada item del carrito
      for (const cartItem of cartItems) {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) {
          setMessage(`El producto "${cartItem.title}" ya no está disponible.`);
          setSubmissionStatus("error");
          return;
        }
        if (cartItem.quantity > product.stock) {
          setMessage(`Lo sentimos, solo hay ${product.stock} unidades disponibles de "${cartItem.title}".`);
          setSubmissionStatus("error");
          return;
        }
      }
    } catch (err) {
      setMessage("Error al verificar el stock disponible.");
      setSubmissionStatus("error");
      return;
    }

    const loggedInUserData = localStorage.getItem("loggedInUser");
    if (!loggedInUserData) {
      setMessage("Debes iniciar sesión para realizar un pedido.");
      setSubmissionStatus("error");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Tu carrito está vacío.");
      setSubmissionStatus("error");
      return;
    }

    const { user } = JSON.parse(loggedInUserData);

    const purchase = {
      userId: user.email,
      userName: user.name,
      shippingDetails: values,
      items: cartItems,
      totalAmount: total,
      purchaseDate: new Date().toISOString(),
    };

    setMessage("Procesando pedido...");
    setSubmissionStatus("loading");

    try {
      // Primero decrementar stock en el servidor para cada producto
      const productsResponse = await fetch('/api/products');
      if (!productsResponse.ok) throw new Error('Error al obtener productos para actualizar stock.');
      const products = await productsResponse.json();

      const updated = [];
      for (const cartItem of cartItems) {
        const prod = products.find(p => String(p.id) === String(cartItem.id));
        if (!prod) throw new Error(`Producto ${cartItem.title} no encontrado al actualizar stock.`);
        const newStock = (Number(prod.stock) || 0) - Number(cartItem.quantity);
        // Asegurar no bajar a negativo (aunque ya verificamos)
        const finalStock = newStock >= 0 ? newStock : 0;

        const patchRes = await fetch(`/api/products/${prod.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: finalStock }),
        });

        if (!patchRes.ok) {
          // rollback previo
          for (const upd of updated) {
            try {
              await fetch(`/api/products/${upd.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: upd.prevStock }),
              });
            } catch (ignored) {}
          }
          throw new Error(`No se pudo actualizar el stock de ${cartItem.title}.`);
        }

        updated.push({ id: prod.id, prevStock: prod.stock, newStock: finalStock });
      }

      // Si todos los PATCH fueron ok, registrar la purchase
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase),
      });

      if (!response.ok) {
        // intentar rollback si falla el POST
        for (const upd of updated) {
          try {
            await fetch(`/api/products/${upd.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ stock: upd.prevStock }),
            });
          } catch (ignored) {}
        }
        throw new Error('No se pudo registrar el pedido. Se revirtieron los cambios de stock.');
      }

      setMessage('¡Pedido realizado con éxito! Gracias por tu compra.');
      setSubmissionStatus('success');
      clearCart();
    } catch (error) {
      setMessage(error.message || 'Ocurrió un error al procesar tu pedido.');
      setSubmissionStatus('error');
    }
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    INITIAL_STATE,
    validateForm,
    submit,
  );

  useEffect(() => {
    const loggedInUserData = localStorage.getItem("loggedInUser");
    if (loggedInUserData) {
      const { user } = JSON.parse(loggedInUserData);
      setValues((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [setValues]);

  if (submissionStatus === "success" || submissionStatus === "error") {
    return (
      <div className="checkout-container submission-feedback">
        <h2>{message}</h2>
        {submissionStatus === "success" && (
          <p>Recibirás una confirmación por correo electrónico en breve.</p>
        )}
      </div>
    );
  }

  if (cartItems.length === 0 && submissionStatus !== "success") {
    return (
      <div className="checkout-container submission-feedback">
        <h2>Tu carrito está vacío</h2>
        <p>Añade algunos productos antes de proceder al pago.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Datos de Envío</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="card">Número de tarjeta</label>
            <input
              type="text"
              id="card"
              name="card"
              value={values.card}
              onChange={handleChange}
              maxLength="16"
              placeholder="Ingrese los 16 dígitos"
              required
            />
            {errors.card && <p className="error-text">{errors.card}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Código Postal</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              value={values["postal-code"]}
              onChange={handleChange}
            />
            {errors["postal-code"] && (
              <p className="error-text">{errors["postal-code"]}</p>
            )}
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={submissionStatus === "loading"}
          >
            {submissionStatus === "loading"
              ? "Procesando..."
              : "Realizar Pedido"}
          </button>
        </form>
        {message && submissionStatus !== "success" && (
          <div className={`message ${submissionStatus}`}>{message}</div>
        )}
      </div>
      <div className="checkout-summary">
        <h2>Resumen de Compra</h2>
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.title} />
              <div className="summary-item-details">
                <h4>{item.title}</h4>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <p className="summary-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <h3>Total</h3>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
