// src/components/chatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  botName: 'AssistantBot',
  initialMessages: [createChatBotMessage('Hi! How can I assist you today?')],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#007bff',
    },
  
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
  widgets: []
};

export default config;
