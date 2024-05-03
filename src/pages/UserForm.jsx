import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../helpers/constants';

export const UserForm = () => {
  const [usuario, setUsuario] = useState({
    userName: '',
    email: '',
    password: '',
    photoUrl: '',
    biography: '',
    socialMediaLinks: ''
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { API_URL } = constants();

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7074/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
      }
      
      console.log('Usuario creado con éxito:', data);
      setUsuario({
        userName: '',
        email: '',
        password: '',
        photoUrl: '',
        biography: '',
        socialMediaLinks: ''
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setErrors([error.message]);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="sm:w-96 sm:m-auto mx-5 mb-5">
        <h1 className="font-bold text-start text-4xl text-red-600 mb-5">
          Registro de Usuario
        </h1>
        <form onSubmit={handleSubmit} className="bg-black p-10 rounded-lg shadow space-y-6">
          <h2 className="font-bold text-gray-600 text-xl text-center mb-4">
            Cree su cuenta
          </h2>
          {errors.length > 0 && (
            <div className="mb-4 text-red-500">
              <p>Errores:</p>
              <ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="userName" className="block text-red-600 text-sm font-bold mb-2">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={usuario.userName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-red-600 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-red-600 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-red-600 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* Otras entradas de datos opcionales aquí */}
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




