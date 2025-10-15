//Función que quita los espacios y comprueba que el texto no este vacío
export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

//Función que valida que el mail cumpla un formato especifico.
export const validateEmail = (email) => {
    /* 
     * La variable emailRegex se ve rara, pero le daré explicación para que
     * se entienda que hace. Cada simbolo tiene un significado. / marca el
     * inicio y final de la cadena. El ^ fuera de los corchetes inidica que
     * el texto debe empezar ahí. Cada ^ dentro de los corchetes indica los
     * simbolos que NO deben estar en esa posición del String. El \. es para
     * que sea el . literal en el mail. Por ultimo, el $ marca donde termina el
     * String.
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //El test es para probar que cumple el formato dado.
    return emailRegex.test(email);
};

/*
 * Función que quita los espacios del texto, comprueba que no este vacío
 * y que cumpla con la mínima cantidad de caracteres.
*/
export const validateMinLength = (value, minLength) => {
    return value && value.trim().length > minLength;
};