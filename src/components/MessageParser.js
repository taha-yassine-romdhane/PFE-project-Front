// src/components/MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (this.isGreeting(lowerCaseMessage)) {
        this.actionProvider.handleGreeting();
      } else if (this.isHelpRequest(lowerCaseMessage)) {
        this.actionProvider.handleHelp();
      } else if (this.isDocumentRequest(lowerCaseMessage)) {
        this.actionProvider.handleDocumentRequest();
      } else {
        this.actionProvider.handleUnknown();
      }
    }
  
    isGreeting(message) {
      const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
      return greetings.some(greeting => message.includes(greeting));
    }
  
    isHelpRequest(message) {
      const helpRequests = ['help', 'assist', 'support', 'how to'];
      return helpRequests.some(request => message.includes(request));
    }
  
    isDocumentRequest(message) {
      const documentRequests = ['document', 'file', 'pdf', 'upload'];
      return documentRequests.some(request => message.includes(request));
    }
  }
  
  export default MessageParser;
  