// components/ChatInterface.jsx
import React, { useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ 
  messages, 
  isLoading, 
  inputValue, 
  setInputValue, 
  sendMessage, 
  onProvideLP, 
  onWithdrawLP,
  pools = [],
  positions = []
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render messages with markdown and interactive elements
  const renderMessageContent = (content) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/\[Provide Liquidity\]\(#pool-(\d+)\)/g, (match, index) => {
        return `<button class="provide-lp-btn" data-pool-index="${index}">Provide Liquidity</button>`;
      })
      .replace(/\[Withdraw Liquidity\]\(#withdraw-(\d+)\)/g, (match, index) => {
        return `<button class="withdraw-lp-btn" data-position-index="${index}">Withdraw Liquidity</button>`;
      });

    return { __html: formattedContent };
  };

  // Handle clicks on buttons in messages
  const handleMessageClick = (e) => {
    if (e.target.className === 'provide-lp-btn') {
      const poolIndex = parseInt(e.target.getAttribute('data-pool-index'));
      onProvideLP(pools[poolIndex]);
    } else if (e.target.className === 'withdraw-lp-btn') {
      const positionIndex = parseInt(e.target.getAttribute('data-position-index'));
      onWithdrawLP(positions[positionIndex]);
    }
  };

  return (
    <>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div 
              className="message-content"
              dangerouslySetInnerHTML={renderMessageContent(message.content)}
              onClick={handleMessageClick}
            />
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-message assistant-message">
            <div className="message-content loading">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button 
          className="send-button" 
          onClick={sendMessage}
          disabled={isLoading || inputValue.trim() === ''}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default ChatInterface;