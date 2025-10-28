import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import useForm from "../hooks/useForm";
import { validateForm } from "../utils/Validations";
import "../css/checkout.css";

const INITIAL_STATE = {
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
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase),
      });

      if (!response.ok) throw new Error("No se pudo registrar el pedido.");

      setMessage("¡Pedido realizado con éxito! Gracias por tu compra.");
      setSubmissionStatus("success");
      clearCart();
    } catch (error) {
      setMessage(error.message || "Ocurrió un error al procesar tu pedido.");
      setSubmissionStatus("error");
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

  if (submissionStatus === "success") {
    return (
      <div className="checkout-container submission-feedback">
        <h2>{message}</h2>
        <p>Recibirás una confirmación por correo electrónico en breve.</p>
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
            />
            {errors.name && <p className="error-text">{errors.card}</p>}
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
