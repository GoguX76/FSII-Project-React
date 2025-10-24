import React from 'react';
import { useCart } from '../context/CartContext';
import '../css/cart.css';

const Cart = ({ onNavigate }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <div className="cart-container">
      <h2>Carrito MP</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-description">{item.fullDesc}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="clear-btn" onClick={clearCart}>Limpiar carrito</button>
            <button className="checkout-btn" onClick={() => onNavigate('checkout')}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;