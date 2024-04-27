import { useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ addTweet }) => {
  const [tweetContent, setTweetContent] = useState({ descripcion: '' }); // Inicializa como objeto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  const handleTweetSubmit = async () => {
    if (!user.token) {
      console.error('Token no disponible');
      return;
    }
    console.log("Nuevo tweet:", tweetContent.descripcion);
    console.log("Contenido del tweet a enviar:", JSON.stringify({ content: tweetContent.descripcion }));

    try {
      const response = await fetch('https://localhost:7074/api/publication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ content: tweetContent.descripcion }) 
      });
  
      if (!response.ok) {
        throw new Error('Algo salió mal con la petición: ' + response.statusText);
      }
      const data = await response.json();
      addTweet(data);
      setTweetContent({ descripcion: '' }); // Resetea el contenido del tweet correctamente
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar por nombre:", searchQuery);
    setSearchQuery('');
  };

  const handleNotiSubmit = () => {
    console.log("Botón de notificaciones pulsado");
    // Aquí iría la lógica para manejar las notificaciones
  };

  return (
    <nav className="bg-gray-800 p-4 block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white font-bold mr-4">Logo</div>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-black px-2 py-1 rounded-md mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Buscar
            </button>
          </form>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white" onClick={() => setIsModalOpen(true)}>
              Crear TWEET
            </a>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md w-1/2">
                  <textarea
                    value={tweetContent.descripcion}
                    onChange={(e) => setTweetContent({ descripcion: e.target.value })}
                    placeholder="¿Qué estás pensando?"
                    className="w-full h-32 resize-none border border-gray-300 rounded-md p-2 mb-4"
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      onClick={handleTweetSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Enviar
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <button onClick={handleNotiSubmit} className="text-white">
              Notificaciones
            </button>
          </li>
          <li>
            <a href="#" className="text-white">
              Perfil
            </a>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

