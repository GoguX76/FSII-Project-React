import { useState, useRef } from "react";

export const useDelayedHover = (delay = 300) => {
  /* Variable que dice si el menu está abierto o cerrado y cambiar su valor. */
  const [isOpen, setIsOpen] = useState(false);
  /* Variable que guarda la referencia del temporizador. */
  const timeoutRef = useRef(null);

  /* Función que maneja la entrada del mouse. */
  const handleMouseEnter = () => {
    /* Verifica que haya un temporizador activo. */
    if (timeoutRef.current) {
      /* Evita que el menu se cierre si el usuario vuelve. */
      clearTimeout(timeoutRef.current);
    }
    /* setIsOpen(true mantiene abierto el menú, sin delay.) */
    setIsOpen(true);
  };
  /* Función que maneja la salida del mouse. */
  const handleMouseLeave = () => {
    /* Crea un temporizador, maneja que hace después del delay. */
    timeoutRef.current = setTimeout(() => {
      /* setIsOpen(false) cierra el menu tras el delay. */
      setIsOpen(false);
    }, delay);
  };
  /* Retrorna los estados a manejar en cada situación. */
  return { isOpen, handleMouseEnter, handleMouseLeave };
};
