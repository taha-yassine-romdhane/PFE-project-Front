import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './chatbotConfig';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import { FaRobot } from 'react-icons/fa';
import './Chatbot.css'; // Add custom styles here

const ChatBotComponent = () => {
  const [showBot, setShowBot] = useState(false);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <div className="chatbot-container">
      {showBot && (
        <div className="chatbot-wrapper">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}
      <button className="chatbot-toggle-button" onClick={toggleBot}>
        <FaRobot size={30} />
      </button>
    </div>
  );
};

export default ChatBotComponent;
