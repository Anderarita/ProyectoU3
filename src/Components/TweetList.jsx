
/*import React, { useState } from "react";
import { Heart, MessageSquare } from "react-feather";

// Componente para mostrar cada tweet
export const Tweet = ({
  tweet,
  index,
  likedTweets,
  handleHeartClick,
  comments,
  addComment,
  removeComment,
  activeCommentIndex,
  setActiveCommentIndex
}) => {
  const [commentText, setCommentText] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && commentText.trim()) {
      addComment(index, commentText);
      setCommentText('');
      setActiveCommentIndex(null);  // Close the comment box after adding the comment
      event.preventDefault();
    }
  };

  return (
    <div className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden">
      <p>{tweet}</p>
      <div className="flex justify-between mt-2">
        <button
          className={`flex items-center text-gray-500 ${likedTweets[index] ? "text-red-500" : ""}`}
          onClick={() => handleHeartClick(index)}
        >
          <Heart size={20} className="mr-1" />
          Me gusta
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-white"
          onClick={() => setActiveCommentIndex(index)}
        >
          <MessageSquare size={20} className="mr-1 " />
          Comentar
        </button>
      </div>
      {activeCommentIndex === index && (
        <textarea
          className="w-full mt-2 border border-gray-300 rounded-md p-2"
          placeholder="Escribe tu comentario..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
      {comments.filter(c => c.index === index).map((c, i) => (
        <p key={i} className="text-white">
          {c.comment}
          <button onClick={() => removeComment(index, i)} className="ml-2 text-gray-500 hover:text-red-500">Eliminar</button>
        </p>
      ))}
    </div>
  );
};

export const TweetList = ({ tweets }) => {
  const [likedTweets, setLikedTweets] = useState({});
  const [comments, setComments] = useState([]);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);

  const handleHeartClick = (index) => {
    setLikedTweets({ ...likedTweets, [index]: !likedTweets[index] });
  };

  const addComment = (index, comment) => {
    setComments([...comments, { index, comment }]);
  };

  const removeComment = (tweetIndex, commentIndex) => {
    setComments(comments.filter((c, i) => c.index !== tweetIndex || i !== commentIndex));
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          tweet={tweet}
          index={index}
          likedTweets={likedTweets}
          handleHeartClick={handleHeartClick}
          comments={comments}
          addComment={addComment}
          removeComment={removeComment}
          activeCommentIndex={activeCommentIndex}
          setActiveCommentIndex={setActiveCommentIndex}
        />
      ))}
    </div>
  );
};*/

/*import React, { useState, useEffect } from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState({});
  const [comments, setComments] = useState([]);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [fetchTweets, setFetchTweets] = useState(true);

  /*useEffect(() => {
    if (fetchTweets) {
      fetch("https://localhost:7074/api/publication/user", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': - 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setTweets(data);
          setFetchTweets(false);
        })
        .catch((error) => {
          console.error('Error al obtener las publicaciones:', error);
        });
      setFetchTweets(false);
    }
  }, [fetch]);*/ // Agrega user al array de dependencias para re-ejecutar cuando cambie

  /*useEffect(() => {
    if (fetchTweets && user.token) { 
      console.log(user.id) // Asegurándonos de que hay un token
      fetch(`https://localhost:7074/api/publication/user/${user.id}`, { // Añade el ID del usuario en la URL
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Algo salió mal al obtener las publicaciones');
      })
      .then(data => {
        setTweets(data);
        setFetchTweets(false);  // Solo setea a false si la petición fue exitosa
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
        setFetchTweets(false);  // Asegúrate de manejar el estado también en caso de error
      });
    }
  }, [fetchTweets, user]);

  const handleHeartClick = (index) => {
    setLikedTweets({ ...likedTweets, [index]: !likedTweets[index] });
  };

  const addComment = (index, comment) => {
    setComments([...comments, { index, comment }]);
  };

  const removeComment = (tweetIndex, commentIndex) => {
    setComments(comments.filter((c, i) => c.index !== tweetIndex || i !== commentIndex));
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          tweet={tweet.content} // Asegúrate de acceder a la propiedad correcta del objeto tweet
          index={index}
          likedTweets={likedTweets}
          handleHeartClick={handleHeartClick}
          comments={comments}
          addComment={addComment}
          removeComment={removeComment}
          activeCommentIndex={activeCommentIndex}
          setActiveCommentIndex={setActiveCommentIndex}
        />
      ))}
    </div>
  );
  /*return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <Tweet
            key={index}
            tweet={tweet.content} // Asegúrate de que 'content' es la propiedad correcta
            index={index}
            likedTweets={likedTweets}
          handleHeartClick={handleHeartClick}
          comments={comments}
          addComment={addComment}
          removeComment={removeComment}
          activeCommentIndex={activeCommentIndex}
          setActiveCommentIndex={setActiveCommentIndex}
          
          />
        ))
      ) : (
        <p>No hay publicaciones para mostrar</p>  // Añade esto para verificar si el array de tweets está vacío
      )}
    </div>
  );*/
  
//};

/*import React, { useState, useEffect } from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState({});
  const [comments, setComments] = useState([]);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [fetchTweets, setFetchTweets] = useState(true);

  useEffect(() => {
    if (user.token) {
      console.log(user.id);
    }
  }, [user]);
   /* if (fetchTweets && user.token) { 
      console.log(user.id) // Asegurándonos de que hay un token
      fetch(`https://localhost:7074/api/publication/user/${user.id}`, { // Añade el ID del usuario en la URL
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        
        if (response.ok) {
          return response.json();
        }
        throw new Error('Algo salió mal al obtener las publicaciones');
      })
      .then(data => {
        setTweets(data); // Solo setea a false si la petición fue exitosa
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);  // Asegúrate de manejar el estado también en caso de error
      });
    }
  }, [user, setTweets]);*/

  /*const handleHeartClick = (index) => {
    setLikedTweets({ ...likedTweets, [index]: !likedTweets[index] });
  };

  const addComment = (index, comment) => {
    setComments([...comments, { index, comment }]);
  };

  const removeComment = (tweetIndex, commentIndex) => {
    setComments(comments.filter((c, i) => c.index !== tweetIndex || i !== commentIndex));
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <Tweet
            key={index}
            tweet={tweet.content} // Asegúrate de que 'content' es la propiedad correcta
            index={index}
            likedTweets={likedTweets}
            handleHeartClick={handleHeartClick}
            comments={comments}
            addComment={addComment}
            removeComment={removeComment}
            activeCommentIndex={activeCommentIndex}
            setActiveCommentIndex={setActiveCommentIndex}
          />
        ))
      ) : (
        <p>No hay publicaciones para mostrar</p>  // Añade esto para verificar si el array de tweets está vacío
      )}
    </div>
  );
};*/

/*import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


// Suponiendo que tienes un componente Tweet para mostrar cada tweet individual
const Tweet = ({ tweet }) => (
  <div className="tweet">
    <h4>{tweet.title}</h4>
    <p>{tweet.content}</p>
  </div>
);

export const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);

  // Cargar el usuario desde el token al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); // Suponemos que el ID está en el token decodificado
        console.log("Usuario ID:", decodedToken.sub); // 'sub' suele ser el ID del usuario en tokens JWT
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  // Hacer la petición de tweets cuando el usuario se establece
  useEffect(() => {
    if (user && user.sub) {
      fetch(`https://localhost:7074/api/publication/user/${user.sub}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Fallo al obtener tweets');
        }
        return response.json();
      })
      .then(data => {
        setTweets(data);
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
      });
    }
  }, [user]); // Dependencia en el estado 'user'

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} />
        ))
      ) : (
        <p>No hay publicaciones para mostrar</p>
      )}
    </div>
  );
};*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode }from 'jwt-decode';

const Tweet = ({ tweet }) => (
  <div className="tweet">
    <h4>{tweet.title}</h4>
    <p>{tweet.content}</p>
  </div>
);

export const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);

  // Cargar el usuario desde el token al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Asumiendo que jwt-decode está correctamente importado
        setUser(decodedToken);
        console.log("Usuario ID:", decodedToken.sub); // Asume 'sub' como el ID del usuario en el token
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  // Hacer la petición de tweets cuando el usuario se establece
  useEffect(() => {
    if (user && user.sub) {
      axios.get(`https://localhost:7074/api/publication/user/${user.sub}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setTweets(response.data); // Axios encapsula la respuesta bajo el key 'data'
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
      });
    }
  }, [user]); // Dependencia en el estado 'user'

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} />
        ))
      ) : (
        <p>No hay publicaciones para mostrar</p>
      )}
    </div>
  );
};

