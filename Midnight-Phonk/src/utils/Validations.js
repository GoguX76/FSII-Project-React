// src/utils/validationRules.js

export function validateForm(values) {
    let errors = {};
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    // --- REGLAS COMPARTIDAS ---

    if ('card' in values) {
        const cardNumber = values.card ? values.card.replace(/\D/g, '') : '';
        if (!cardNumber) {
            errors.card = 'El número de tarjeta es requerido';
        } else if (cardNumber.length !== 16) {
            errors.card = 'El número de tarjeta debe tener 16 dígitos';
        }
    }

    if ('email' in values) {
        if (!values.email) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!emailRegex.test(values.email)) {
            errors.email = 'El correo electrónico es inválido';
        }
    }

    // ... (las otras reglas de nombre y password se quedan igual) ...
    if ('nombre' in values) {
        if (!values.nombre || values.nombre.trim().length < 3) {
            errors.nombre = 'El nombre completo debe tener al menos 3 caracteres';
        }
    }

    if ('password' in values) {
        if (!values.password || values.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
    }


    // Para el formulario de Registro
    if ('confirmPassword' in values) {
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
    }

    if ('confirmEmail' in values) {
        if (values.email !== values.confirmEmail) {
            errors.confirmEmail = 'Los correos electrónicos no coinciden';
        }
    }

    // ... (las reglas de Contacto se quedan igual) ...
    return errors;
}

// Helper: detecta si un correo pertenece al dominio admin
export function isAdminEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return email.toLowerCase().trim().endsWith('@adminduoc.cl');
}