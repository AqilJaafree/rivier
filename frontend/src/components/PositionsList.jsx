// components/PositionsList.jsx
import React from 'react';
import './PositionsList.css';

/**
 * Component for displaying user liquidity positions
 * @param {Object} props - Component props
 * @param {Array} props.positions - Array of user position objects
 * @param {Function} props.onWithdrawLP - Handler for withdraw liquidity button
 * @param {boolean} props.isLoading - Loading state
 */
const PositionsList = ({ positions = [], onWithdrawLP, isLoading }) => {
  if (isLoading) {
    return (
      <div className="positions-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading your positions...</p>
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="positions-list-empty">
        <p>You don't have any active liquidity positions.</p>
      </div>
    );
  }

  return (
    <div className="positions-list">
      <h3 className="positions-list-title">Your Liquidity Positions</h3>
      
      {positions.map((position, index) => (
        <div key={position.id} className="position-item">
          <div className="position-header">
            <div className="position-name">
              <h4>{position.poolName}</h4>
              <span className="position-id">ID: {position.id.slice(0, 6)}...{position.id.slice(-4)}</span>
            </div>
            <div className="position-action">
              <button
                className="withdraw-lp-btn"
                onClick={() => onWithdrawLP(position)}
              >
                Withdraw Liquidity
              </button>
            </div>
          </div>
          
          <div className="position-details">
            <div className="position-detail">
              <span className="detail-label">WBTC Amount:</span>
              <span className="detail-value">{position.coinAmount / 10**8} WBTC</span>
            </div>
            
            <div className="position-detail">
              <span className="detail-label">SUI Amount:</span>
              <span className="detail-value">{position.suiAmount / 10**9} SUI</span>
            </div>
            
            <div className="position-detail">
              <span className="detail-label">Fee Tier:</span>
              <span className="detail-value">{position.feeTier / 100}%</span>
            </div>
            
            {position.timestamp && (
              <div className="position-detail">
                <span className="detail-label">Created:</span>
                <span className="detail-value">
                  {new Date(position.timestamp).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PositionsList;