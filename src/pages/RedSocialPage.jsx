
import React, { useState, useEffect } from "react";
import { Navbar } from "../Components";
import TweetList from "../Components/TweetList";

export const RedSocialPage = () => {
  const [tweets, setTweets] = useState([]);

  const addTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };



  return (
    <div className="flex-auto h-screen bg-gray-700 overflow-hidden ">
      <Navbar addTweet={addTweet} />
      <div className={`flex-auto ml overflow-y-auto max-h-screen`}>
        <h1 className="text-3xl font-bold text-white m-3 text-center">Redes Sociales</h1>
        <p className="flex text-lg text-white m-3">
          
        </p>
        {/* Renderiza el componente TweetList */}
        
        <TweetList tweets={tweets}/>
      </div>
    </div>
  );
};