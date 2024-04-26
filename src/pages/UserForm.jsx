/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../helpers/constants';

export const UserForm = () => {
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: ''
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
      const response = await fetch(`${API_URL}/login`, {
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
      console.log('Datos enviados con éxito:', data);
      setUsuario({
        nombre_usuario: '',
        correo_electronico: '',
        contrasena: ''
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setErrors([...errors, error.message]);
    }
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
          {errors.length > 0 && (
            <div className="mb-4 text-red-500">
              <p>Errores:</p>
              <ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="nombre_usuario" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={usuario.nombre_usuario}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo_electronico" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={usuario.correo_electronico}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={usuario.contrasena}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { constants } from '../helpers/constants';

export const UserForm = () => {
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    contrasena: '',
    photoUrl: '',
    biography: '',
    socialMediaLinks: ''
  });

  const navigate = useNavigate();
  const { API_URL } = constants();

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Convertir socialMediaLinks a un array antes de enviar
    const finalUser = {
      ...usuario,
      socialMediaLinks: usuario.socialMediaLinks.split(',').map(link => link.trim())
    };

    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate("/dashboard"); // Asumiendo que es el camino deseado
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
    });

    // Limpiar formulario
    setUsuario({
      nombre_usuario: '',
      correo_electronico: '',
      contrasena: '',
      photoUrl: '',
      biography: '',
      socialMediaLinks: ''
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="sm:w-96 sm:m-auto mx-5 mb-5">
      <h1 className="font-bold text-start text-4xl text-teal-500 mb-5">
          Lista de Tareas
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow space-y-6">
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
          <div className="mb-4">
            <label htmlFor="photoUrl" className="block text-gray-700 text-sm font-bold mb-2">URL de la Foto:</label>
            <input type="text" id="photoUrl" name="photoUrl" value={usuario.photoUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="biography" className="block text-gray-700 text-sm font-bold mb-2">Biografía:</label>
            <textarea id="biography" name="biography" value={usuario.biography} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="socialMediaLinks" className="block text-gray-700 text-sm font-bold mb-2">Enlaces de Redes Sociales (separados por comas):</label>
            <input type="text" id="socialMediaLinks" name="socialMediaLinks" value={usuario.socialMediaLinks} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};




