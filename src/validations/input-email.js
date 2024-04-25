export const InputEmailValidations = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        return{
            validations: false,
            message: `${name} debe ser un correo electronico valido` 
        }
    }else{
        return{
            validations: true
        }
    }
}