import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './deposits.css';

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
                        <li className="nav-item">
                            <Link to="/withdraw">Withdraw</Link>
                        </li>
                        <li className="nav-item active">
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

function Deposits() {
    const [copySuccess, setCopySuccess] = useState('');
    const depositAddress = '283h976qwe9ry25r817gf31f4fk17f9g';

    const handleCopy = () => {
        navigator.clipboard
            .writeText(depositAddress)
            .then(() => setCopySuccess('Copied!'))
            .catch(() => setCopySuccess('Failed to copy'));
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <div className="deposits-container">
            <Navbar />
            <main className="main-content">
                <div className="deposit-card">
                    <h2 className="card-title">Deposit Funds</h2>

                    <div className="crypto-info">
                        <div className="crypto-icon">BTC</div>
                        <div className="crypto-balance">Balance: 0.00000000</div>
                    </div>

                    <div className="qr-code">
                        {/* Replace the src with your actual QR code image path */}
                        <img src="/qr-code.png" alt="QR Code" />
                    </div>

                    <div className="deposit-address">
                        <span className="address-label">Deposit Address</span>
                        <input type="text" value={depositAddress} readOnly />
                        <button className="copy-button" onClick={handleCopy}>
                            Copy
                        </button>
                        {copySuccess && <span className="copy-feedback">{copySuccess}</span>}
                    </div>

                    <p className="instructions">
                        Scan the QR code or copy the address to deposit your BTC. Please ensure that only BTC is sent to this address.
                    </p>

                    <button className="deposit-btn">Deposit Now</button>
                </div>
            </main>
        </div>
    );
}

export default Deposits;
