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
import { SuiClient } from '@mysten/sui.js/client';
import NewsBar from './NewsBar';

// SUI contract constants
const PACKAGE_ID = '0x7ed2cd934d2b46a91ade6d799ebea3ec1d9174e02594e30354b9a28f000cff9c';
const REGISTRY_ID = '0xa5cbba526777ad7a65bb7911a6915a3ec5f8dc58302b00c64a133b7749adce86';
// WBTC package constants
const WBTC_PACKAGE = '0xbebaa6c1dc50eb407da690928d43dd4fde05ad6c0b8cf5d88d69286e6b64d720';
// Initialize the client
const suiClient = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });

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
              <Link to="/withdraw">Wormhole</Link>
            </li>
            <li className="nav-item active">
              <Link to="/deposits">Agent</Link>
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
    { role: 'assistant', content: 'Hello! I\'m your Rivier Agent. How can I help you with blockchain, crypto, or any questions today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFindingPools, setIsFindingPools] = useState(false);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  const [showLpModal, setShowLpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [lpAmount, setLpAmount] = useState('');
  const [suiAmount, setSuiAmount] = useState('');
  const [foundPools, setFoundPools] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
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

  const handleWithdrawLP = (position) => {
    if (!isConnected) {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "Please connect your SUI wallet first before withdrawing liquidity." }
      ]);
      return;
    }
    
    setSelectedPosition(position);
    setShowWithdrawModal(true);
  };

  const closeModal = () => {
    setShowLpModal(false);
    setShowWithdrawModal(false);
    setLpAmount('');
    setSuiAmount('');
    setSelectedPosition(null);
  };

  const fetchUserPositions = async () => {
    if (!isConnected || !currentAccount) {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "Please connect your SUI wallet first to view your positions." }
      ]);
      return;
    }

    try {
      setIsLoadingPositions(true);
      
      // Add user message to indicate positions search
      const userMessage = { 
        role: 'user', 
        content: 'Show me my liquidity positions' 
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Loading message
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: "Fetching your liquidity positions... This may take a moment." }
      ]);

      // Fetch all objects owned by the user that have the LPToken type
      const { data: objects } = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${PACKAGE_ID}::rivier::LPToken<${WBTC_PACKAGE}::wbtc::WBTC>`
        },
        options: {
          showContent: true,
          showDisplay: true,
        }
      });

      console.log("User LP Tokens:", objects);

      if (!objects || objects.length === 0) {
        setMessages(prevMessages => [
          ...prevMessages.filter(msg => !msg.content.includes("Fetching your liquidity positions")), 
          { role: 'assistant', content: "You don't have any active liquidity positions at the moment." }
        ]);
        setIsLoadingPositions(false);
        return;
      }

      // Format positions into array of objects with relevant info
      const positions = objects.map(obj => {
        const content = obj.data?.content;
        const fields = content?.fields;
        
        return {
          id: obj.data?.objectId,
          poolAddress: fields?.pool_address,
          poolName: fields?.pool_name,
          coinAmount: fields?.coin_amount,
          suiAmount: fields?.sui_amount,
          feeTier: fields?.fee_tier,
          lpShare: fields?.lp_share,
          timestamp: fields?.timestamp,
        };
      }).filter(position => position.id); // Filter out any undefined positions

      setUserPositions(positions);

      // Format positions into a readable report
      let positionsReport = "Here are your current liquidity positions:\n\n";
      
      positions.forEach((position, index) => {
        positionsReport += `**Position ${index + 1}: ${position.poolName}**\n`;
        positionsReport += `- **WBTC Amount:** ${position.coinAmount / 10**8} WBTC\n`;
        positionsReport += `- **SUI Amount:** ${position.suiAmount / 10**9} SUI\n`;
        positionsReport += `- **Fee Tier:** ${position.feeTier / 100}%\n`;
        positionsReport += `- **ID:** ${position.id.slice(0, 8)}...${position.id.slice(-6)}\n`;
        positionsReport += `- [Withdraw Liquidity](#withdraw-${index})\n\n`;
      });
      
      // Add the positions report to messages
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => !msg.content.includes("Fetching your liquidity positions")), 
        { role: 'assistant', content: positionsReport }
      ]);
      
    } catch (error) {
      console.error('Error fetching user positions:', error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages.filter(msg => !msg.content.includes("Fetching your liquidity positions")), 
        { 
          role: 'assistant', 
          content: "I'm sorry, I encountered an error while fetching your positions. Please try again later." 
        }
      ]);
    } finally {
      setIsLoadingPositions(false);
    }
  };

  const submitLiquidity = async () => {
    if (!lpAmount || !suiAmount) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Convert amounts to proper units
      const coinAmount = Math.floor(parseFloat(lpAmount) * 10**8); // WBTC has 8 decimals
      const suiAmountMicros = Math.floor(parseFloat(suiAmount) * 10**9); // SUI has 9 decimals
      
      // Log current account to debug
      console.log("Current account:", currentAccount);
      
      if (!currentAccount || !currentAccount.address) {
        throw new Error("Wallet not properly connected. Please reconnect your wallet.");
      }
      
      // Get all WBTC coins owned by the current account
      console.log("Fetching coins for address:", currentAccount.address);
      
      const coinsResponse = await suiClient.getCoins({
        owner: currentAccount.address,
        coinType: `${WBTC_PACKAGE}::wbtc::WBTC`
      });
      
      console.log("Coins response:", coinsResponse);
      
      // Check if the response is valid
      if (!coinsResponse || !coinsResponse.data) {
        throw new Error("Failed to retrieve your WBTC tokens. Invalid response from SUI API.");
      }
      
      const ownedCoins = coinsResponse.data;
      
      if (!ownedCoins || ownedCoins.length === 0) {
        throw new Error("You don't have any WBTC tokens. Please mint some first.");
      }

      // Create a TransactionBlock
      const tx = new TransactionBlock();
      
      // Create a SUI coin for the transaction
      const [suiCoin] = tx.splitCoins(tx.gas, [tx.pure(suiAmountMicros.toString())]);
      
      // Find a WBTC coin with sufficient balance
      let wbtcCoinId = null;
      for (const coin of ownedCoins) {
        console.log("Checking coin:", coin);
        if (BigInt(coin.balance) >= BigInt(coinAmount)) {
          wbtcCoinId = coin.coinObjectId;
          break;
        }
      }
      
      if (!wbtcCoinId) {
        throw new Error(`No WBTC coin found with sufficient balance (${lpAmount} WBTC required)`);
      }
      
      console.log("Using WBTC coin:", wbtcCoinId);
      
      // Reference the WBTC coin and split the exact amount needed
      const wbtcCoin = tx.object(wbtcCoinId);
      const [splitWbtcCoin] = tx.splitCoins(wbtcCoin, [tx.pure(coinAmount.toString())]);
      
      // Call the provide_liquidity function
      tx.moveCall({
        target: `${PACKAGE_ID}::rivier::provide_liquidity`,
        typeArguments: [`${WBTC_PACKAGE}::wbtc::WBTC`],
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure(selectedPool.address),
          splitWbtcCoin,
          suiCoin
        ],
      });
      
      console.log("Transaction built, signing...");
      
      // Sign the transaction
      const signed = await signTransactionBlock({
        transactionBlock: tx,
      });
      
      console.log("Signed transaction:", signed);
      
      if (!signed) {
        throw new Error('Failed to sign transaction');
      }
      
      // Execute the transaction
      console.log("Executing transaction...");
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: signed.transactionBlockBytes,
        signature: signed.signature,
        options: {
          showEffects: true,
          showEvents: true,
        }
      });
      
      console.log("Transaction execution result:", result);
      
      if (result && result.digest) {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: `Successfully provided liquidity to ${selectedPool.name}! Transaction ID: ${result.digest}` 
          }
        ]);
      } else {
        throw new Error('Transaction execution failed - no digest returned');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error providing liquidity:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: "Failed to provide liquidity. Error: " + error.message 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawLiquidity = async () => {
    if (!selectedPosition) {
      return;
    }

    try {
      setIsLoading(true);
      
      if (!currentAccount || !currentAccount.address) {
        throw new Error("Wallet not properly connected. Please reconnect your wallet.");
      }
      
      console.log("Withdrawing from position:", selectedPosition);
      
      // Create a TransactionBlock
      const tx = new TransactionBlock();
      
      // Call the withdraw_liquidity function
      tx.moveCall({
        target: `${PACKAGE_ID}::rivier::withdraw_liquidity`,
        typeArguments: [`${WBTC_PACKAGE}::wbtc::WBTC`],
        arguments: [
          tx.object(REGISTRY_ID),
          tx.object(selectedPosition.id)
        ],
      });
      
      console.log("Withdrawal transaction built, signing...");
      
      // Sign the transaction
      const signed = await signTransactionBlock({
        transactionBlock: tx,
      });
      
      console.log("Signed withdrawal transaction:", signed);
      
      if (!signed) {
        throw new Error('Failed to sign withdrawal transaction');
      }
      
      // Execute the transaction
      console.log("Executing withdrawal transaction...");
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: signed.transactionBlockBytes,
        signature: signed.signature,
        options: {
          showEffects: true,
          showEvents: true,
        }
      });
      
      console.log("Withdrawal transaction execution result:", result);
      
      if (result && result.digest) {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            role: 'assistant', 
            content: `Successfully withdrew liquidity from ${selectedPosition.poolName}! Transaction ID: ${result.digest}` 
          }
        ]);

        // Refresh positions after withdrawal
        setTimeout(() => {
          fetchUserPositions();
        }, 2000);
      } else {
        throw new Error('Withdrawal transaction execution failed - no digest returned');
      }
      
      closeModal();
    } catch (error) {
      console.error('Error withdrawing liquidity:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          role: 'assistant', 
          content: "Failed to withdraw liquidity. Error: " + error.message 
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
      <main className="main-content-wrapper">
        <div className="main-content">
          <div className="deposit-card chat-card">
            <h2 className="card-title">Agent</h2>
            
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
              
              <button 
                className="quick-action-btn" 
                onClick={fetchUserPositions}
                disabled={isLoadingPositions || isLoading || !isConnected}
              >
                {isLoadingPositions ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                  <svg className="positions-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  My Positions
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
                        .replace(/\[Withdraw Liquidity\]\(#withdraw-(\d+)\)/g, (match, index) => {
                          return `<button class="withdraw-lp-btn" data-position-index="${index}">Withdraw Liquidity</button>`;
                        })
                    }}
                    onClick={(e) => {
                      if (e.target.className === 'provide-lp-btn') {
                        const poolIndex = parseInt(e.target.getAttribute('data-pool-index'));
                        handleProvideLP(foundPools[poolIndex]);
                      } else if (e.target.className === 'withdraw-lp-btn') {
                        const positionIndex = parseInt(e.target.getAttribute('data-position-index'));
                        handleWithdrawLP(userPositions[positionIndex]);
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
                disabled={isLoading || isFindingPools || isLoadingPositions}
              />
              <button 
                className="send-button" 
                onClick={sendMessage}
                disabled={isLoading || isFindingPools || isLoadingPositions || inputValue.trim() === ''}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <NewsBar />
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

      {/* Withdraw Liquidity Modal */}
      {showWithdrawModal && selectedPosition && (
        <div className="modal-overlay">
          <div className="lp-modal">
            <div className="modal-header">
              <h3>Withdraw Liquidity from {selectedPosition.poolName}</h3>
              <button className="close-modal" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="pool-details">
                <p><strong>WBTC Amount:</strong> {selectedPosition.coinAmount / 10**8} WBTC</p>
                <p><strong>SUI Amount:</strong> {selectedPosition.suiAmount / 10**9} SUI</p>
                <p><strong>Fee Tier:</strong> {selectedPosition.feeTier / 100}%</p>
                <p><strong>Position ID:</strong> {selectedPosition.id.slice(0, 8)}...{selectedPosition.id.slice(-6)}</p>
              </div>
              
              <div className="withdraw-message">
                <p>You are about to withdraw your entire position from this pool. This action cannot be undone.</p>
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
                  className="confirm-btn withdraw-btn" 
                  onClick={withdrawLiquidity}
                  disabled={isLoading}
                >
                  {isLoading ? <span className="loading-spinner-small"></span> : 'Withdraw Liquidity'}
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