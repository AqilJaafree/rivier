// pages/Bridge.jsx
import React from 'react';
import WormholeConnect from '@wormhole-foundation/wormhole-connect';
import './Bridge.css';

// Configuration for Wormhole Connect with BaseSepolia and SUI testnet
const wormholeConfig = {
  network: 'Testnet',
  chains: ['Sui', 'BaseSepolia'],
  rpcs: {
    Sui: 'https://fullnode.testnet.sui.io',
    BaseSepolia: 'https://sepolia.base.org' // Base Sepolia RPC endpoint
  },
  // You can configure specific tokens here if needed
  /* 
  tokensConfig: {
    "BaseSepolia:0xYourTokenAddressOnBaseSepolia": {
      symbol: "WBTC", 
      name: "Wrapped Bitcoin",
      decimals: 18,
      coinGeckoId: "", 
      icon: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png", 
      address: "0xYourTokenAddressOnBaseSepolia"
    }
  }
  */
};

const Bridge = () => {
  return (
    <div className="bridge-container">
      <div className="card bridge-card">
        <h2 className="card-title">Bridge Tokens</h2>
        <p className="bridge-description">
          Transfer tokens between Base Sepolia and SUI testnet networks using Wormhole.
        </p>
        
        <div className="bridge-info">
          <div className="info-item">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Cross-Chain Bridge</h3>
              <p>Securely transfer your tokens between different blockchain networks.</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h3>Safe & Secure</h3>
              <p>Powered by Wormhole, a top cross-chain messaging protocol with high security standards.</p>
            </div>
          </div>
        </div>
        
        <div className="wormhole-container">
          <WormholeConnect config={wormholeConfig} />
        </div>
        
        <div className="bridge-notice">
          <p>
            <strong>Note:</strong> This bridge uses testnet networks. Make sure you're using 
            testnet tokens for transactions. For production use, configure with mainnet 
            settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bridge;