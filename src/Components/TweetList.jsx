/*import React from "react";

export const TweetList = ({ tweets }) => {
  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden"
        >
           <p className="overflow-hidden">{tweet}</p>
        </div>
      ))}
    </div>
  );
};*/

/*import React from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = ({ tweets }) => {
  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden"
        >
          <p className="overflow-hidden">{tweet}</p>
          <div className="flex justify-between mt-2">
            <button className="flex items-center text-gray-500">
              <Heart size={20} className="mr-1" />
              Me gusta
            </button>
            <button className="flex items-center text-gray-500">
              <MessageSquare size={20} className="mr-1" />
              Comentar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};*/

/*import React, { useState } from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = ({ tweets }) => {
  const [likedTweets, setLikedTweets] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleLikeClick = (index) => {
    if (!likedTweets.includes(index)) {
      setLikedTweets([...likedTweets, index]);
    } else {
      setLikedTweets(likedTweets.filter((item) => item !== index));
    }
  };

  const handleCommentClick = () => {
    setShowCommentModal(true);
  };

  const handleSubmitComment = (index) => {
    // Aquí se maneja el envío del comentario
    setTweetData((prevState) => {
      const updatedTweets = [...prevState];
      updatedTweets[index].comments.push(comment); // Agrega el comentario al tweet
      return updatedTweets;
    });

    setShowCommentModal(false);
    setComment("");
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden"
        >
          <p className="overflow-hidden">{tweet}</p>
          <div className="flex justify-between mt-2">
            <button
              className={`flex items-center ${
                likedTweets.includes(index) ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => handleLikeClick(index)}
            >
              <Heart size={20} className="mr-1" />
              Me gusta
            </button>
            <button
              className="flex items-center text-gray-500"
              onClick={handleCommentClick}
            >
              <MessageSquare size={20} className="mr-1" />
              Comentar
            </button>
          </div>
        </div>
      ))}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-1/2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full h-32 resize-none border border-gray-300 rounded-md p-2 mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCommentModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSubmitComment(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};*/

/*import React, { useState } from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = ({ tweets }) => {
  // Inicializa el estado con un objeto que contiene los tuits "likeados"
  const [likedTweets, setLikedTweets] = useState({});

  // Función para manejar el clic en el corazón
  const handleHeartClick = (index) => {
    // Actualiza el estado para marcar el tuit como "likeado"
    setLikedTweets({ ...likedTweets, [index]: !likedTweets[index] });
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden"
        >
          <p className="overflow-hidden">{tweet}</p>
          <div className="flex justify-between mt-2">
            <button
              className={`flex items-center text-gray-500 ${
                likedTweets[index] ? "text-red-500" : ""
              }`}
              onClick={() => handleHeartClick(index)}
            >
              <Heart size={20} className="mr-1" />
              Me gusta
            </button>
            <button className="flex items-center text-gray-500">
              <MessageSquare size={20} className="mr-1" />
              Comentar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};*/

/*import React, { useState } from "react";
import { Heart, MessageSquare } from "react-feather";

export const TweetList = ({ tweets }) => {
  // Inicializa el estado con un objeto que contiene los tuits "likeados"
  const [likedTweets, setLikedTweets] = useState({});

  // Inicializa el estado con un array vacío para los comentarios
  const [comments, setComments] = useState([]);

  // Agrega un comentario al estado
  const addComment = (index, comment) => {
    setComments([...comments, { index, comment }]);
  };

  // Elimina un comentario del estado
  const removeComment = (index) => {
    setComments(comments.filter((c) => c.index !== index));
  };

  // Función para manejar el clic en el corazón
  const handleHeartClick = (index) => {
    // Actualiza el estado para marcar el tuit como "likeado"
    setLikedTweets({ ...likedTweets, [index]: !likedTweets[index] });
  };

  // Función para manejar el clic en el botón de comentario
  const handleCommentClick = (index) => {
    // Muestra el modal para ingresar el comentario
    showModal(index);
  };

  // Función para manejar el envío del comentario
  const handleCommentSubmit = (index, event) => {
    // Verifica si event no está definido
    if (!event) return;

    // Obtiene el valor del textarea
    const newComment = event.target.value;

    // Agrega el comentario al estado
    addComment(index, newComment);

    // Limpia el textarea
    event.target.value = "";

    // Oculta el modal
    hideModal();

    // Agrega el comentario al tuit original
    const updatedTweets = [...tweets];
    const tweetToUpdate = updatedTweets[index];
    updatedTweets[index] = `${tweetToUpdate} ${newComment}`;
    setTweets(updatedTweets);
  };

  // Estado para controlar si se muestra el modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Estado para controlar el índice del tuit seleccionado en el modal
  const [selectedTweetIndex, setSelectedTweetIndex] = useState(null);

  // Función para mostrar el modal
  const showModal = (index) => {
    setSelectedTweetIndex(index);
    setModalVisible(true);
  };

  // Función para ocultar el modal
  const hideModal = () => {
    setSelectedTweetIndex(null);
    setModalVisible(false);
  };

  return (
    <div className="p-3 flex flex-col items-center overflow-y-auto max-h-screen">
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden"
        >
          <p className="overflow-hidden">{tweet}</p>
          <div className="flex justify-between mt-2">
            <button
              className={`flex items-center text-gray-500 ${
                likedTweets[index] ? "text-red-500" : ""
              }`}
              onClick={() => handleHeartClick(index)}
            >
              <Heart size={20} className="mr-1" />
              Me gusta
            </button>
            <button
              className="flex items-center text-gray-500"
              onClick={() => handleCommentClick(index)}
            >
              <MessageSquare size={20} className="mr-1" />
              Comentar
            </button>
          </div>
          {comments
            .filter((c) => c.index === index)
            .map(({ comment }, i) => (
              <p key={i} className="text-gray-600">
                {comment}<button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setComments(index)}
                >
                  Eliminar
                </button>
              </p>
            ))}
          {isModalVisible && selectedTweetIndex === index && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md">
                <textarea
                  className="w-full h-24 border border-gray-300 rounded-md p-2 mb-4"
                  placeholder="Escribe tu comentario..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCommentSubmit(index, e.target);
                    }
                  }}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={(e) => {
                    handleCommentSubmit(index, e.target.previousElementSibling);
                  }}
                >
                  Enviar
                </button>
                <button
                  className="px-4 py-2 ml-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
                  onClick={hideModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};*/

import React, { useState } from "react";
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
};

