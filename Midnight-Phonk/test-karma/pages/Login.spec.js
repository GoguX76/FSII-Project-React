import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../src/context/CartContext';
import Login from '../../src/pages/Login';

describe('Login Page', () => {
  beforeEach(() => {
    // Mock fetch to avoid actual network calls
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve([])
    }));
  });

  it('should update email state when typing', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </CartProvider>
    );

    const emailInput = screen.getByPlaceholderText('Correo electrónico');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password state when typing', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </CartProvider>
    );

    const passwordInput = screen.getByPlaceholderText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });
});
