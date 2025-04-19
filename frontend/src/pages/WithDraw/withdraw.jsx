import React, { useState } from 'react';
import './withdraw.css';

function Withdraw() {
  const [withdrawMethod, setWithdrawMethod] = useState('direct');
  const [withdrawAmount, setWithdrawAmount] = useState('0.02000000');

  const handleMethodChange = (event) => {
    setWithdrawMethod(event.target.value);
  };

  const handleAmountAll = () => {
    // For demonstration, assume full balance is "1.23456789"
    setWithdrawAmount('1.23456789');
  };

  const handleAmountMin = () => {
    // For demonstration, assume minimum withdrawal is "0.00500000"
    setWithdrawAmount('0.00500000');
  };

  return (
    <div className="withdraw-container">
      <aside className="sidebar">
        <div className="logo">
          Revier
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">Dashboard</li>
            <li className="nav-item active">Withdraw</li>
            <li className="nav-item">Deposits</li>
            <li className="nav-item">Buy Miner</li>
            <li className="nav-item">Settings</li>
            <li className="nav-item">Profile</li>
          </ul>
        </nav>
        <div className="logout">Log Out</div>
      </aside>
      <main className="main-content">
        <div className="withdraw-box">
          <div className="crypto-section">
            <div className="crypto-info">
              <span className="crypto-icon">BTC</span>
              <span className="crypto-balance">0.00000000</span>
            </div>
          </div>
          <div className="withdraw-form">
            <div className="withdraw-options">
              <label
                className={`radio-label ${withdrawMethod === 'faucetpay' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="withdraw-method"
                  value="faucetpay"
                  checked={withdrawMethod === 'faucetpay'}
                  onChange={handleMethodChange}
                />
                <span>FAUCETPAY (LESS FEES)</span>
              </label>
              <label
                className={`radio-label ${withdrawMethod === 'direct' ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="withdraw-method"
                  value="direct"
                  checked={withdrawMethod === 'direct'}
                  onChange={handleMethodChange}
                />
                <span>DIRECT WITHDRAWAL</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter Withdrawal Address"
              className="withdraw-address"
            />
            <div className="withdraw-amount">
              <input type="text" value={withdrawAmount} readOnly />
              <button className="amount-btn" onClick={handleAmountAll}>ALL</button>
              <button className="amount-btn" onClick={handleAmountMin}>MIN</button>
            </div>
            <div className="withdraw-summary">
              <span>Fee: 0.003 BTC</span>
              <span>You Receive: 0.017 BTC</span>
            </div>
            <button className="withdraw-btn">WITHDRAW NOW</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Withdraw;
