import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios u otra biblioteca para hacer solicitudes HTTP

export const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer una solicitud HTTP para obtener las notificaciones del usuario
    // Por ejemplo, usando Axios
    axios.get('url-de-tu-api/notificaciones')
      .then(response => {
        setNotificaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las notificaciones:', error);
      });
  }, []);

  return (
    <div>
      <h1>Notificaciones</h1>
      <ul>
        {notificaciones.map(notificacion => (
          <li key={notificacion.id}>{notificacion.contenido}</li>
        ))}
      </ul>
    </div>
  );
};
