// components/PoolsList.jsx
import React from 'react';
import './PoolsList.css';

/**
 * Component for displaying a list of liquidity pools with interactive elements
 * @param {Object} props - Component props
 * @param {Array} props.pools - Array of pool objects
 * @param {boolean} props.isConnected - Whether user's wallet is connected
 * @param {Function} props.onProvideLP - Handler for provide liquidity button
 * @param {boolean} props.isLoading - Loading state
 */
const PoolsList = ({ pools = [], isConnected, onProvideLP, isLoading }) => {
  // Sort pools by liquidity (highest first)
  const sortedPools = [...pools].sort((a, b) => {
    const liquidityA = a.liquidity ? parseFloat(a.liquidity) : 0;
    const liquidityB = b.liquidity ? parseFloat(b.liquidity) : 0;
    return liquidityB - liquidityA;
  });

  if (isLoading) {
    return (
      <div className="pools-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading pools data...</p>
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div className="pools-list-empty">
        <p>No liquidity pools available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="pools-list">
      <h3 className="pools-list-title">Available Liquidity Pools</h3>
      
      <div className="pools-list-header">
        <span className="pool-name">Pool</span>
        <span className="pool-liquidity">Liquidity</span>
        <span className="pool-fee">Fee</span>
        <span className="pool-action">Action</span>
      </div>
      
      {sortedPools.map((pool, index) => (
        <div key={pool.address} className="pool-item">
          <div className="pool-name">
            <span className="pool-tokens">{pool.baseToken}/{pool.quoteToken}</span>
            <span className="pool-id">{pool.address.slice(0, 6)}...{pool.address.slice(-4)}</span>
          </div>
          
          <div className="pool-liquidity">
            {pool.liquidity 
              ? `$${parseFloat(pool.liquidity).toLocaleString()}` 
              : 'N/A'}
          </div>
          
          <div className="pool-fee">
            {pool.fee ? `${pool.fee}%` : 'N/A'}
          </div>
          
          <div className="pool-action">
            <button
              className="provide-lp-btn"
              onClick={() => onProvideLP(pool)}
              disabled={!isConnected}
            >
              Provide Liquidity
            </button>
          </div>
        </div>
      ))}
      
      {!isConnected && (
        <div className="pools-list-footer">
          <p>Connect your SUI wallet to provide liquidity to these pools.</p>
        </div>
      )}
    </div>
  );
};

export default PoolsList;