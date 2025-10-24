import React from 'react';
import { useCart } from '../context/CartContext';
import '../css/checkout.css';

const Checkout = () => {
  const { cartItems, total } = useCart();

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Datos de Envío</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input type="text" id="address" name="address" required />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" required />
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Código Postal</label>
            <input type="text" id="postal-code" name="postal-code" required />
          </div>
          <button type="submit" className="submit-btn">Realizar Pedido</button>
        </form>
      </div>
      <div className="checkout-summary">
        <h2>Resumen de Compra</h2>
        <div className="summary-items">
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.title} />
              <div className="summary-item-details">
                <h4>{item.title}</h4>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <p className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</p>
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
