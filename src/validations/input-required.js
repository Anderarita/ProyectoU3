export const InputRequiredValidation = (name, value) => {
    if (value.lengt == 0 || value === '') {
        return {
            validations: false,
            message: `${name} es requerido`
        }
    }
    return {
        validations: true
    }
}