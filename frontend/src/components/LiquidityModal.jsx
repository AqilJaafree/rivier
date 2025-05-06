// components/LiquidityModal.jsx
import React, { useState } from 'react';
import './Modals.css';

const LiquidityModal = ({ pool, onClose, onSubmit, isLoading }) => {
  const [lpAmount, setLpAmount] = useState('');
  const [suiAmount, setSuiAmount] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const handleSubmit = () => {
    // Validate inputs
    if (!lpAmount || !suiAmount) {
      setValidationError('Please enter both token amounts');
      return;
    }
    
    if (parseFloat(lpAmount) <= 0 || parseFloat(suiAmount) <= 0) {
      setValidationError('Token amounts must be greater than 0');
      return;
    }
    
    // Clear validation error and submit
    setValidationError('');
    onSubmit(lpAmount, suiAmount);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Provide Liquidity to {pool.name}</h3>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="pool-details">
            <p><strong>Fee:</strong> {pool.fee}%</p>
            <p><strong>Current Liquidity:</strong> ${pool.liquidity ? parseFloat(pool.liquidity).toLocaleString() : 'N/A'}</p>
            <p><strong>Token Pair:</strong> {pool.baseToken}/{pool.quoteToken}</p>
          </div>
          
          <div className="input-group">
            <label htmlFor="lp-amount">Amount of {pool.baseToken}</label>
            <input 
              id="lp-amount"
              type="number" 
              placeholder={`Enter ${pool.baseToken} amount`}
              value={lpAmount}
              onChange={(e) => setLpAmount(e.target.value)}
              min="0"
              step="0.00000001"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="sui-amount">Amount of {pool.quoteToken}</label>
            <input 
              id="sui-amount"
              type="number" 
              placeholder={`Enter ${pool.quoteToken} amount`}
              value={suiAmount}
              onChange={(e) => setSuiAmount(e.target.value)}
              min="0"
              step="0.000000001"
            />
          </div>
          
          {validationError && (
            <div className="error-message">
              {validationError}
            </div>
          )}
          
          <div className="modal-actions">
            <button 
              className="btn secondary" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              className="btn primary" 
              onClick={handleSubmit}
              disabled={isLoading || !lpAmount || !suiAmount}
            >
              {isLoading ? <span className="loading-spinner-small"></span> : 'Provide Liquidity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityModal;