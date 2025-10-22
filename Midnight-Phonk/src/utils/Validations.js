// src/utils/validationRules.js

export function validateForm(values) {
    let errors = {};
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    // --- REGLAS COMPARTIDAS ---

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
    if ('asunto' in values && !values.asunto) {
        errors.asunto = 'Debes seleccionar un asunto';
    }
    if ('mensaje' in values && (!values.mensaje || values.mensaje.trim().length < 10)) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    return errors;
}

// Helper: detecta si un correo pertenece al dominio admin
export function isAdminEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return email.toLowerCase().trim().endsWith('@adminduoc.cl');
}