// hooks/useChatMessages.js
import { useState, useRef, useEffect } from 'react';

// Backend API URL - change this to your actual backend URL
const BACKEND_API_URL = 'http://localhost:3001/api/chat';

export const useChatMessages = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Rivier AI Assistant. How can I help you with blockchain, crypto, or any questions today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  /**
   * Add a user message to the chat
   * @param {string} content - Message content
   */
  const addUserMessage = (content) => {
    if (!content.trim()) return;
    
    setMessages(prevMessages => [
      ...prevMessages, 
      { role: 'user', content }
    ]);
  };
  
  /**
   * Add a system/assistant message to the chat
   * @param {string} content - Message content
   */
  const addSystemMessage = (content) => {
    setMessages(prevMessages => [
      ...prevMessages, 
      { role: 'assistant', content }
    ]);
  };
  
  /**
   * Update a message in the chat
   * @param {number} index - Message index to update
   * @param {string} content - New message content
   */
  const updateMessage = (index, content) => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      if (index >= 0 && index < newMessages.length) {
        newMessages[index] = { ...newMessages[index], content };
      }
      return newMessages;
    });
  };
  
  /**
   * Remove a message with specific content
   * @param {string} contentSubstring - Content substring to match
   */
  const removeMessageWithContent = (contentSubstring) => {
    setMessages(prevMessages => 
      prevMessages.filter(msg => !msg.content.includes(contentSubstring))
    );
  };
  
  /**
   * Send a message to the AI backend
   */
  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Add user message to chat
    addUserMessage(inputValue);
    const userMessage = { role: 'user', content: inputValue };
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Call backend API which proxies the request to your AI provider
      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            ...messages.filter(msg => msg.role !== 'system'),
            userMessage
          ]
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        addSystemMessage(data.message);
      } else {
        // Handle HTTP error
        addSystemMessage("I'm sorry, I encountered an issue processing your request. Please try again later.");
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      
      // Handle network error
      addSystemMessage("I'm sorry, I encountered a connection error. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    messagesEndRef,
    sendMessage,
    addUserMessage,
    addSystemMessage,
    updateMessage,
    removeMessageWithContent
  };
};