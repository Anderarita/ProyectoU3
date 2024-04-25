import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { InputEmailValidations } from '../validations/input-email';
import { InputRequiredValidation } from '../validations/input-required';
import { Errors } from '../Components';

export const LoginPage = () => {
    const [loginForm, setLogin] = useState({
        email: '',
        password: ''

    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = [];

        const errorEmail = InputEmailValidations('Correo electronico', loginForm.email);
        if (!errorEmail.validations) {
            newErrors.push(errorEmail.message);
        }

        const errorEmailRequired = InputRequiredValidation('Correo electronico', loginForm.email);
        if (!errorEmailRequired.validations) {
            newErrors.push(errorEmailRequired.message);
        }

        const errorPasswordRequired = InputRequiredValidation('Contraseña', loginForm.password);
        if (!errorPasswordRequired.validations) {
            newErrors.push(errorPasswordRequired.message);
        }

        setErrors(newErrors);

        if (errors.length === 0) {
            try {
                const response = await fetch('https://localhost:7074/api/create/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ loginForm })
                });

                if (!response.ok) {
                    throw new Error('Error al inicio de sesion');
                }

                const result = await response.json();
                login(result.data)
                navigate('/redsocial');
            } catch (error) {
                console.log('Error al iniciar sesion', error);
            }

        }

    }

    

    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="sm:w-96 sm:m-auto mx-5 mb-5">
                <h1 className="font-bold text-center text-4xl text-teal-500 mb-5">
                    Lista de Tareas
                </h1>
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow space-y-6">
                    <h2 className="font-bold text-gray-600 text-xl text-center mb-4">
                        Ingrese a su cuenta
                    </h2>

                    {errors.length > 0 ? <Errors errorList={errors} /> : null}

                    <div className="flex flex-col space-y-2 border-b-2 border-teal-500">
                        <label htmlFor="email" className="text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginForm.email}
                            onChange={(e) => setLogin({ ...loginForm, email: e.target.value })}
                            className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-3 
                            leading-tight focus:outline-none"
                            placeholder="Ingrese su correo electrónico"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-1 border-b-2 border-teal-500">
                        <label htmlFor="password" className="text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete='off'
                            value={loginForm.password}
                            onChange={(e) => setLogin({ ...loginForm, password: e.target.value })}
                            name="password"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-3 
                            leading-tight focus:outline-none"
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white font-bold rounded focus:outline-none shadow hover:bg-teal-700 transition-colors
                            px-5 py-2 text-center w-full"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



