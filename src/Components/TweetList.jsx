import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Trash2 } from 'react-feather'; // Íconos de Feather
import { Navbar } from './Navbar';

// Componente para mostrar cada tweet
const Tweet = ({
  tweet,
  index,
  likedTweets,
  handleHeartClick,
  comments,
  addComment,
  removeComment,
  removeTweet,
  activeCommentIndex,
  setActiveCommentIndex,
  userIsOwner // Nuevo prop: indica si el usuario es dueño del tweet
}) => {
  const [commentText, setCommentText] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && commentText.trim()) {
      addComment(index, commentText);
      setCommentText('');
      setActiveCommentIndex(null);
      event.preventDefault();
    }
  };

  return (
    <div className="border p-3 mb-4 rounded-md w-full md:w-1/2 xl:w-1/3 overflow-hidden my-2 bg-blue-100">
      <h2 className="text-xl font-semibold">{tweet.user.name} ({tweet.user.email})</h2>
      <p>{tweet.content}</p>
      <div className="flex justify-between mt-2">
        <button className={`flex items-center text-gray-500 ${likedTweets[index] ? 'text-red-500' : ''}`} onClick={() => handleHeartClick(index)}>
          <Heart size={20} className="mr-1" />
          Me gusta
        </button>
        <button className="flex items-center text-gray-500 hover:text-white" onClick={() => setActiveCommentIndex(activeCommentIndex === index ? null : index)}>
          <MessageSquare size={20} className="mr-1" />
          Comentar
        </button>
        {userIsOwner && (
          <button className="flex items-center text-gray-500 hover:text-red-500" onClick={() => removeTweet(index)}>
            <Trash2 size={20} className="mr-1" />
            Eliminar
          </button>
        )}
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
      {Array.isArray(comments) && comments.filter(c => c.index === index).map((c, i) => (
        <p key={i} className="text-white">
          {c.comment}
          <button onClick={() => removeComment(index, i)} className="ml-2 text-gray-500 hover:text-red-500 m-3">
            Eliminar
          </button>
        </p>
      ))}
    </div>
  );
};

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState({});
  const [comments, setComments] = useState([]);
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const loggedInUserId = user ? user.userId : null;

  useEffect(() => {
    const fetchTweets = async () => {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const token = user.token;
      const userId = user.userId;
    
      if (!token) {
        console.error("Token de autorización no encontrado");
        return;
      }
    
      try {
        const response = await fetch('https://localhost:7074/api/publication/user/13e4e66c-3ce2-416b-b20a-c0a1e9a3ae77/feed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) throw new Error('Fallo al cargar los tweets');
        const data = await response.json();
        setTweets(data || []);
      } catch (error) {
        console.error("Error al cargar:", error);
      }
    };
    fetchTweets();
  }, []);

  const addComment = async (index, comment) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const token = user.token;
    const tweetId = tweets[index].id; 

    try {
      const response = await fetch('https://localhost:7074/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tweetId, comment }) 
      });

      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = { index, comment };
      setComments(prevComments => [...prevComments, newComment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleHeartClick = (index) => {
    setLikedTweets(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const removeComment = (tweetIndex, commentIndex) => {
    setComments(prev => prev.filter((c, i) => c.index !== tweetIndex || i !== commentIndex));
  };

 
  const removeTweet = async (index) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const token = user.token;
    try {
      const response = await fetch(`https://localhost:7074/api/publication/${tweets[index].id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete');
      setTweets(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

 

  return (
    <div className="p-6 flex flex-col items-center overflow-y-auto mb-6 bg-gray-700">
      
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
          removeTweet={removeTweet}
          activeCommentIndex={activeCommentIndex}
          setActiveCommentIndex={setActiveCommentIndex}
          userIsOwner={tweet.user.userId === loggedInUserId}
        />
      ))}
    </div>
  );
};

export default TweetList;


