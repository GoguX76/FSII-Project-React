// src/hooks/useForm.js

import { useState, useEffect } from 'react';

// Este hook gestiona el estado y la lógica de cualquier formulario.
function useForm(initialState, validate, callback) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Este efecto se dispara solo cuando 'errors' cambia o cuando se intenta enviar.
    useEffect(() => {
        // Si no hay errores y se está enviando, llamamos a la función de éxito (callback).
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            setIsSubmitting(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    // Maneja el envío del formulario.
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values)); // Validamos los datos.
        setIsSubmitting(true); // Marcamos que hemos intentado enviar.
    };

    // Maneja los cambios en cualquier input.
    const handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setValues(values => ({
            ...values,
            [name]: value,
        }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        setValues,
    };
}

export default useForm;