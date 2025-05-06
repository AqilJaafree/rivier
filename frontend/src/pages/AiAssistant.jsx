// pages/AiAssistant.jsx
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import NewsBar from '../components/NewsBar';
import PoolsList from '../components/PoolsList';
import PositionsList from '../components/PositionsList';
import LiquidityModal from '../components/LiquidityModal';
import WithdrawModal from '../components/WithdrawModal';
import { useSuiWallet } from '../hooks/useSuiWallet';
import { useChatMessages } from '../hooks/useChatMessages';
import { useLiquidityPools } from '../hooks/useLiquidityPools';
import './AiAssistant.css';

const AiAssistant = () => {
  // Custom hooks for better organization
  const { 
    isConnected, 
    currentAccount,
    signAndExecuteTransaction 
  } = useSuiWallet();
  
  const {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    sendMessage,
    addSystemMessage,
    messagesEndRef
  } = useChatMessages();
  
  const {
    pools,
    userPositions,
    isFindingPools,
    isLoadingPositions,
    findBestYieldPool,
    fetchUserPositions
  } = useLiquidityPools({ currentAccount, addSystemMessage });

  // View states
  const [showPoolsList, setShowPoolsList] = useState(false);
  const [showPositionsList, setShowPositionsList] = useState(false);
  
  // Modal states
  const [showLpModal, setShowLpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  // Toggle view components
  const togglePoolsList = () => {
    setShowPoolsList(!showPoolsList);
    if (!showPoolsList && pools.length === 0) {
      findBestYieldPool();
    }
  };
  
  const togglePositionsList = () => {
    setShowPositionsList(!showPositionsList);
    if (!showPositionsList && userPositions.length === 0 && isConnected) {
      fetchUserPositions();
    }
  };
  
  // Handle liquidity modals
  const handleProvideLP = (pool) => {
    if (!isConnected) {
      addSystemMessage("Please connect your SUI wallet first before providing liquidity.");
      return;
    }
    
    setSelectedPool(pool);
    setShowLpModal(true);
  };

  const handleWithdrawLP = (position) => {
    if (!isConnected) {
      addSystemMessage("Please connect your SUI wallet first before withdrawing liquidity.");
      return;
    }
    
    setSelectedPosition(position);
    setShowWithdrawModal(true);
  };

  const closeModals = () => {
    setShowLpModal(false);
    setShowWithdrawModal(false);
    setSelectedPosition(null);
    setSelectedPool(null);
  };

  // Handle transaction submission
  const submitLiquidity = async (lpAmount, suiAmount) => {
    if (!selectedPool) return;
    
    try {
      addSystemMessage(`Processing your liquidity provision to ${selectedPool.name}...`);
      
      // Implementation would use signAndExecuteTransaction from useSuiWallet
      
      addSystemMessage(`Successfully provided liquidity to ${selectedPool.name}!`);
      closeModals();
      
      // Refresh positions after successful transaction
      setTimeout(() => {
        fetchUserPositions();
      }, 2000);
      
    } catch (error) {
      console.error('Error providing liquidity:', error);
      addSystemMessage(`Failed to provide liquidity: ${error.message}`);
    }
  };

  const withdrawLiquidity = async () => {
    if (!selectedPosition) return;
    
    try {
      addSystemMessage(`Processing your withdrawal from ${selectedPosition.poolName}...`);
      
      // Implementation would use signAndExecuteTransaction from useSuiWallet
      
      addSystemMessage(`Successfully withdrew liquidity from ${selectedPosition.poolName}!`);
      closeModals();
      
      // Refresh positions after successful transaction
      setTimeout(() => {
        fetchUserPositions();
      }, 2000);
      
    } catch (error) {
      console.error('Error withdrawing liquidity:', error);
      addSystemMessage(`Failed to withdraw liquidity: ${error.message}`);
    }
  };

  return (
    <div className="assistant-container">
      <div className="content-wrapper">
        <div className="card chat-card">
          <h2 className="card-title">AI Assistant</h2>
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <button 
              className="btn quick-action-btn" 
              onClick={togglePoolsList}
              disabled={isFindingPools}
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
                {showPoolsList ? 'Hide Pools' : 'Show Pools'}
                </>
              )}
            </button>
            
            <button 
              className="btn quick-action-btn" 
              onClick={togglePositionsList}
              disabled={isLoadingPositions || !isConnected}
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
                {showPositionsList ? 'Hide Positions' : 'My Positions'}
                </>
              )}
            </button>
            
            <button 
              className="btn quick-action-btn"
              onClick={findBestYieldPool}
              disabled={isFindingPools || isLoading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Find Best Yield
            </button>
          </div>
          
          {/* Pool and Position Lists */}
          {showPoolsList && (
            <PoolsList 
              pools={pools}
              isConnected={isConnected}
              onProvideLP={handleProvideLP}
              isLoading={isFindingPools}
            />
          )}
          
          {showPositionsList && (
            <PositionsList 
              positions={userPositions}
              onWithdrawLP={handleWithdrawLP}
              isLoading={isLoadingPositions}
            />
          )}

          {/* Chat Interface Component */}
          <ChatInterface 
            messages={messages}
            isLoading={isLoading}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendMessage={sendMessage}
            onProvideLP={handleProvideLP}
            onWithdrawLP={handleWithdrawLP}
            pools={pools}
            positions={userPositions}
            messagesEndRef={messagesEndRef}
          />
        </div>
        
        {/* News Component */}
        <NewsBar />
      </div>
      
      {/* Modals */}
      {showLpModal && selectedPool && (
        <LiquidityModal 
          pool={selectedPool}
          onClose={closeModals}
          onSubmit={submitLiquidity}
          isLoading={isLoading}
        />
      )}

      {showWithdrawModal && selectedPosition && (
        <WithdrawModal 
          position={selectedPosition}
          onClose={closeModals}
          onSubmit={withdrawLiquidity}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AiAssistant;