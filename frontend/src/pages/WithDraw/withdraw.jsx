// In pages/WithDraw/withdraw.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './withdraw.css';
import WormholeConnect from '@wormhole-foundation/wormhole-connect';

// Configuration for Wormhole Connect with BaseSepolia
const wormholeConfig = {
  network: 'Testnet',
  chains: ['Sui', 'BaseSepolia'],
  rpcs: {
    Sui: 'https://fullnode.testnet.sui.io',
    BaseSepolia: 'https://sepolia.base.org' // Base Sepolia RPC endpoint
  },
  // You may want to deploy your token to BaseSepolia as well
  // If you do, you can configure it like this:
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
            <li className="nav-item active">
              <Link to="/withdraw">Bridge</Link>
            </li>
            <li className="nav-item">
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

function Withdraw() {
  return (
    <div className="withdraw-container">
      <Navbar />
      <main className="main-content">
        <div className="bridge-card">
          <h2 className="card-title">Bridge Tokens</h2>
          <p className="bridge-description">
            Transfer tokens between Base Sepolia and SUI testnet networks using Wormhole.
          </p>
          <div className="wormhole-container">
            <WormholeConnect config={wormholeConfig} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Withdraw;