// src/hooks/useForm.js

import { useState, useEffect } from 'react';

// Este hook gestiona el estado y la lógica de cualquier formulario.
function useForm(initialState, validate, callback) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Este efecto se dispara cuando 'errors' o 'isSubmitting' cambian.
    useEffect(() => {
        // Si no hay errores y se está enviando, llamamos a la función de éxito (callback).
        if (isSubmitting && Object.keys(errors).length === 0) {
            callback();
            setIsSubmitting(false);
        }
        // Dependemos de errors e isSubmitting para cubrir el caso donde errors ya es {}
    }, [errors, isSubmitting, callback]);

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
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);

        // Validación inmediata para el campo de tarjeta
        if (name === 'card') {
            const fieldErrors = validate({ card: value });
            if (fieldErrors.card) {
                setErrors(prev => ({...prev, card: fieldErrors.card }));
            } else {
                setErrors(prev => {
                    const { card, ...rest } = prev;
                    return rest;
                });
            }
        }
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