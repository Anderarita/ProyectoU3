import { useNavigate } from 'react-router-dom';
import { InputEmailValidations } from '../validations/input-email';
import { useContext, useState } from 'react';
import { InputRequiredValidation } from '../validations/input-required';
import { Errors } from '../Components';
import { constants } from '../helpers/constants';
import { AuthContext } from '../context';



export const LoginPage = () => {
    const [loginForm, setLogin] = useState({
        email: '',
        password: ''

    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const { API_URL } = constants();

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

        
        try {
            const response = await fetch(`https://localhost:7074/api/login/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   //'Authorization': `Bearer ${token}`
   
                 },
                body: JSON.stringify(loginForm)
                });

                if (!response.ok) {
                    throw new Error('Error al iniciar sesion');
                }

                const result = await response.json();
                localStorage.setItem('token', result.token);
                login(result.data);
                navigate('/redSocial');

        } catch (error) {
                console.log(error);
        }
    

    }

    const checkboxClasses = "form-checkbox text-blue-600 rounded"
    const linkClasses = "text-blue-500 hover:text-blue-600"
    
    return (
        <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="sm:w-96 sm:m-auto mx-5 mb-5">
                <h1 className="font-bold text-center text-4xl text-red-500 mb-5">
                    Inicio de Sesión
                </h1>
                <form onSubmit={handleSubmit} className="bg-black p-10 rounded-lg shadow space-y-6">
                    <h2 className="font-bold text-gray-600 text-xl text-center mb-4">
                        Ingrese a su cuenta
                    </h2>

                    {errors.length > 0 ? <Errors errorList={errors} /> : null}

                    <div className="flex flex-col space-y-2 border-b-2 border-red-500">
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

                    <div className="flex flex-col space-y-1 border-b-2 border-red-500">
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
                            className="bg-red-500 text-white font-bold rounded focus:outline-none shadow hover:bg-red-700 transition-colors
                            px-5 py-2 text-center w-full"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                    <div className='text-center text-zinc-400 text-xs mt-4'>
                    <p><a href="#" className='{linkClasses}'>¿Olvidaste tu contraseña?</a></p>
                    <div className="mt-4">
                        <label className="inline-flex items-center" >
                        <input type="checkbox" className={checkboxClasses}/>
                        <span className="ml-2 text-white">Recuérdame</span>
                        </label>
                    </div>
                    <p className="mt-4"><a onClick={() => navigate('/register')} className={linkClasses}>¿Primera vez en? Suscríbete ahora.</a></p>
                </div>
                </form>
            </div>
        </div>
    );
};


