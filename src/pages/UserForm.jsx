import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const UserForm = () => {
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí puedes enviar los datos del usuario a tu backend o realizar alguna otra acción
    console.log(usuario);
    // Puedes reiniciar el estado del formulario después de enviarlo si es necesario
    setUsuario({
      nombre_usuario: '',
      correo_electronico: '',
      contrasena: ''
    });

    console.log('Click en salir2')
    navigate("/login", { replace: true });

  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="sm:w-96 sm:m-auto mx-5 mb-5">
        <h1 className="font-bold text-start text-4xl text-teal-500 mb-5">
          Lista de Tareas
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow space-y-6">
          <h2 className="font-bold text-gray-600 text-xl text-center mb-4">
            Ingrese a su cuenta
          </h2>
          <div className="mb-4">
            <label htmlFor="nombre_usuario" className="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario:</label>
            <input type="text" id="nombre_usuario" name="nombre_usuario" value={usuario.nombre_usuario} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="correo_electronico" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
            <input type="email" id="correo_electronico" name="correo_electronico" value={usuario.correo_electronico} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" value={usuario.contrasena} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
          </div>
        </form>
      </div>
    </div>

  );
};


