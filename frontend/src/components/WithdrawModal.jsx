// components/WithdrawModal.jsx
import React, { useState } from 'react';
import './Modals.css';

const WithdrawModal = ({ position, onClose, onSubmit, isLoading }) => {
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  
  const handleSubmit = () => {
    if (!confirmWithdraw) {
      return;
    }
    
    onSubmit(position);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Withdraw Liquidity from {position.poolName}</h3>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="pool-details">
            <p><strong>WBTC Amount:</strong> {position.coinAmount / 10**8} WBTC</p>
            <p><strong>SUI Amount:</strong> {position.suiAmount / 10**9} SUI</p>
            <p><strong>Fee Tier:</strong> {position.feeTier / 100}%</p>
            <p><strong>Position ID:</strong> {position.id.slice(0, 8)}...{position.id.slice(-6)}</p>
          </div>
          
          <div className="warning-message">
            <p>You are about to withdraw your entire position from this pool. This action cannot be undone.</p>
          </div>
          
          <div className="confirm-checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={confirmWithdraw}
                onChange={(e) => setConfirmWithdraw(e.target.checked)}
              />
              I understand and want to proceed with withdrawal
            </label>
          </div>
          
          <div className="modal-actions">
            <button 
              className="btn secondary" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              className="btn primary withdraw-btn" 
              onClick={handleSubmit}
              disabled={isLoading || !confirmWithdraw}
            >
              {isLoading ? <span className="loading-spinner-small"></span> : 'Withdraw Liquidity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;