import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './deposits.css';
import { fetchAllSuiPools, getAllSuiPoolsInfo } from '../../services/geckoTerminalFetcher';
// Import the correct wallet kit components
import { 
  ConnectButton, 
  WalletKitProvider 
} from '@mysten/wallet-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// SUI contract constants
const PACKAGE_ID = '0x7ed2cd934d2b46a91ade6d799ebea3ec1d9174e02594e30354b9a28f000cff9c';
const REGISTRY_ID = '0xa5cbba526777ad7a65bb7911a6915a3ec5f8dc58302b00c64a133b7749adce86';

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-part1">Rivier</span>
        </div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/withdraw">Withdraw</Link>
            </li>
            <li className="nav-item active">
              <Link to="/deposits">AI Assistant</Link>
            </li>
            <li className="nav-item">
              <Link to="/buyminer">Buy Miner</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function CustomConnectButton() {
  const { isConnected } = useWalletKit();
  
  return (
    <div className="wallet-button-container">
      <ConnectButton connectText="Connect SUI Wallet" />
    </div>
  );
}

function DepositsContent() {
  const { isConnected, signTransactionBlock, currentAccount } = useWalletKit();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Rivier AI assistant. How can I help you with blockchain, crypto, or any questions today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFindingPools, setIsFindingPools] = useState(false);
  const [showLpModal, setShowLpModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [lpAmount, setLpAmount] = useState('');
  const [suiAmount, setSuiAmount] = useState('');
  const [foundPools, setFoundPools] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Backend API URL - change this to your actual backend URL
  const BACKEND_API_URL = 'http://localhost:3001/api/chat';
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleProvideLP = (pool) => {
    if (!isConnected) {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "Please connect your SUI wallet first before providing liquidity." }
      ]);
      return;
    }
    
    setSelectedPool(pool);
    setShowLpModal(true);
  };

  const closeModal = () => {
    setShowLpModal(false);
    setLpAmount('');
    setSuiAmount('');
  };

  const submitLiquidity = async () => {
    if (!lpAmount || !suiAmount) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Convert amounts to proper units
      const coinAmount = parseFloat(lpAmount) * 10**8; // Assuming 8 decimals for WBTC
      const suiAmountMicros = parseFloat(suiAmount) * 10**9; // SUI has 9 decimals
      
      // Create a TransactionBlock
      const tx = new TransactionBlock();
      
      // Create a SUI coin for the transaction
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(suiAmountMicros)]);
      
      // Add transaction details for the provide_liquidity function
      tx.moveCall({
        target: `${PACKAGE_ID}::rivier::provide_liquidity`,
        typeArguments: ['0x2::sui::SUI'], // Replace with appropriate coin type for the base token
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure(selectedPool.address),
          tx.pure(coinAmount.toString()),
          coin
        ],
      });
      
      // Sign and execute transaction using wallet adapter
      const result = await signTransactionBlock({
        transactionBlock: tx,
      });
      
      if (result && result.digest) {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: `Successfully provided liquidity to ${selectedPool.name}! Transaction ID: ${result.digest}` 
          }
        ]);
      } else {
        throw new Error('Transaction failed');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error providing liquidity:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: "Failed to provide liquidity. Please check your wallet balance and try again." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const findBestYieldPool = async () => {
    setIsFindingPools(true);
    
    // Add user message to indicate pool search
    const userMessage = { 
      role: 'user', 
      content: 'Find me the best yield pool available based on liquidity and fees.' 
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      // Loading message
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: "Searching for the best yield pools... This may take a moment." }
      ]);
      
      // Fetch pool data
      const poolsInfo = await getAllSuiPoolsInfo();
      setFoundPools(poolsInfo);
      
      // Sort pools by liquidity (highest first)
      const sortedPools = [...poolsInfo].sort((a, b) => {
        // Convert to numbers and handle null values
        const liquidityA = a.liquidity ? parseFloat(a.liquidity) : 0;
        const liquidityB = b.liquidity ? parseFloat(b.liquidity) : 0;
        return liquidityB - liquidityA;
      });
      
      // Format pools into a readable report
      let poolReport = "I've analyzed the available liquidity pools on SUI Network. Here are the top pools ranked by liquidity:\n\n";
      
      sortedPools.forEach((pool, index) => {
        poolReport += `**${index + 1}. ${pool.name}**\n`;
        poolReport += `- **Liquidity:** ${pool.liquidity ? '$' + parseFloat(pool.liquidity).toLocaleString() : 'N/A'}\n`;
        poolReport += `- **Fee:** ${pool.fee ? pool.fee + '%' : 'N/A'}\n`;
        poolReport += `- **Tokens:** ${pool.baseToken}/${pool.quoteToken}\n`;
        poolReport += `- **Pool ID:** ${pool.address.slice(0, 8)}...${pool.address.slice(-6)}\n`;
        
        if (isConnected) {
          poolReport += `- [Provide Liquidity](#pool-${index})\n`;
        }
        
        // Add recommendation for the top pool
        if (index === 0) {
          poolReport += `- **Recommendation:** This is currently the highest liquidity pool available.\n`;
        }
        
        poolReport += '\n';
      });
      
      if (!isConnected) {
        poolReport += "Connect your SUI wallet to provide liquidity to these pools.";
      } else {
        poolReport += "Click on 'Provide Liquidity' next to any pool to add your funds.";
      }
      
      // Add the pool report to messages
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => !msg.content.includes("Searching for the best yield pools")), 
        { role: 'assistant', content: poolReport }
      ]);
      
    } catch (error) {
      console.error('Error fetching pool data:', error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => !msg.content.includes("Searching for the best yield pools")), 
        { 
          role: 'assistant', 
          content: "I'm sorry, I encountered an error while fetching pool data. Please try again later or contact our support team if the issue persists." 
        }
      ]);
    } finally {
      setIsFindingPools(false);
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Call backend API which proxies the request to Anthropic
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
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'assistant', content: data.message }
        ]);
      } else {
        // Handle HTTP error
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'assistant', content: "I'm sorry, I encountered an issue processing your request. Please try again later." }
        ]);
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      
      // Handle network error
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: "I'm sorry, I encountered a connection error. Please check your internet connection and try again." }
        ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="deposits-container">
      <Navbar />
      <main className="main-content">
        <div className="deposit-card chat-card">
          <h2 className="card-title">AI Assistant</h2>
          
          <div className="quick-actions">
            <button 
              className="quick-action-btn" 
              onClick={findBestYieldPool}
              disabled={isFindingPools || isLoading}
            >
              {isFindingPools ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                <svg className="pool-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 10L12 7L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Find Best Yield Pool
                </>
              )}
            </button>
            
            <CustomConnectButton />
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br>')
                      .replace(/\[Provide Liquidity\]\(#pool-(\d+)\)/g, (match, index) => {
                        return `<button class="provide-lp-btn" data-pool-index="${index}">Provide Liquidity</button>`;
                      })
                  }}
                  onClick={(e) => {
                    if (e.target.className === 'provide-lp-btn') {
                      const poolIndex = parseInt(e.target.getAttribute('data-pool-index'));
                      handleProvideLP(foundPools[poolIndex]);
                    }
                  }}
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
              disabled={isLoading || isFindingPools}
            />
            <button 
              className="send-button" 
              onClick={sendMessage}
              disabled={isLoading || isFindingPools || inputValue.trim() === ''}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
      
      {/* Liquidity Provision Modal */}
      {showLpModal && selectedPool && (
        <div className="modal-overlay">
          <div className="lp-modal">
            <div className="modal-header">
              <h3>Provide Liquidity to {selectedPool.name}</h3>
              <button className="close-modal" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="pool-details">
                <p><strong>Fee:</strong> {selectedPool.fee}%</p>
                <p><strong>Current Liquidity:</strong> ${selectedPool.liquidity ? parseFloat(selectedPool.liquidity).toLocaleString() : 'N/A'}</p>
                <p><strong>Token Pair:</strong> {selectedPool.baseToken}/{selectedPool.quoteToken}</p>
              </div>
              
              <div className="input-group">
                <label htmlFor="lp-amount">Amount of {selectedPool.baseToken}</label>
                <input 
                  id="lp-amount"
                  type="number" 
                  placeholder={`Enter ${selectedPool.baseToken} amount`}
                  value={lpAmount}
                  onChange={(e) => setLpAmount(e.target.value)}
                  min="0"
                  step="0.00000001"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="sui-amount">Amount of {selectedPool.quoteToken}</label>
                <input 
                  id="sui-amount"
                  type="number" 
                  placeholder={`Enter ${selectedPool.quoteToken} amount`}
                  value={suiAmount}
                  onChange={(e) => setSuiAmount(e.target.value)}
                  min="0"
                  step="0.000000001"
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn" 
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-btn" 
                  onClick={submitLiquidity}
                  disabled={isLoading || !lpAmount || !suiAmount}
                >
                  {isLoading ? <span className="loading-spinner-small"></span> : 'Provide Liquidity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wallet Kit provider wrapper component
function Deposits() {
  return (
    <WalletKitProvider>
      <DepositsContent />
    </WalletKitProvider>
  );
}

export default Deposits;