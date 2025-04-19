import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './withdraw.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-part1">Revier</span>
        </div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item active">
              <Link to="/withdraw">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link to="/deposits">Deposits</Link>
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
  const [withdrawMethod, setWithdrawMethod] = useState('direct');
  const [withdrawAmount, setWithdrawAmount] = useState('0.02000000');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodChange = (event) => {
    setWithdrawMethod(event.target.value);
  };

  const handleAmountAll = () => {
    setWithdrawAmount('1.23456789');
  };

  const handleAmountMin = () => {
    setWithdrawAmount('0.00500000');
  };

  const handleWithdraw = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Withdrawal processed successfully!');
    }, 2000);
  };

  return (
    <div className="withdraw-container">
      <Navbar />
      <main className="main-content">
        <div className="withdraw-card">
          <h2 className="card-title">Withdrawal Request</h2>
          <div className="crypto-info">
            <div className="crypto-icon">BTC</div>
            <div className="crypto-balance">Balance: 0.00000000</div>
          </div>
          <div className="withdraw-form">
            <div className="withdraw-options">
              <label
                className={`option-radio ${
                  withdrawMethod === 'faucetpay' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="withdraw-method"
                  value="faucetpay"
                  checked={withdrawMethod === 'faucetpay'}
                  onChange={handleMethodChange}
                />
                FaucetPay (Less Fees)
              </label>
              <label
                className={`option-radio ${
                  withdrawMethod === 'direct' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="withdraw-method"
                  value="direct"
                  checked={withdrawMethod === 'direct'}
                  onChange={handleMethodChange}
                />
                Direct Withdrawal
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter Withdrawal Address"
              className="withdraw-address"
            />
            <div className="withdraw-amount">
              <input type="text" value={withdrawAmount} readOnly />
              <button className="amount-btn" onClick={handleAmountAll}>
                ALL
              </button>
              <button className="amount-btn" onClick={handleAmountMin}>
                MIN
              </button>
            </div>
            <div className="withdraw-summary">
              <span>Fee: 0.003 BTC</span>
              <span>You receive: 0.017 BTC</span>
            </div>
            <button
              className="withdraw-btn"
              onClick={handleWithdraw}
              disabled={isProcessing}
            >
              {isProcessing ? <div className="spinner"></div> : 'Withdraw Now'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Withdraw;
