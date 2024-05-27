// src/components/ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleGreeting() {
    const greetingMessage = this.createChatBotMessage('Hello! How can I assist you today?');
    this.updateChatbotState(greetingMessage);
  }

  handleHelp() {
    const helpMessage = this.createChatBotMessage('Sure! I am here to help. You can ask me about document management, uploading files, and more.');
    this.updateChatbotState(helpMessage);
  }

  handleDocumentRequest() {
    const documentMessage = this.createChatBotMessage('You can manage your documents by clicking on the "Documents" tab in the menu.');
    this.updateChatbotState(documentMessage);
  }

  handleUnknown() {
    const unknownMessage = this.createChatBotMessage('I am not sure how to help with that. Can you please rephrase your question or ask something else?');
    this.updateChatbotState(unknownMessage);
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
