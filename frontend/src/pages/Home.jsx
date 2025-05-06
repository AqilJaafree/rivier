// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Rivier</h1>
          <h2 className="hero-subtitle">Fast Blockchain. Scalable AI.</h2>
          <p className="hero-description">
            Experience the power of SUI blockchain with our AI-assisted interface and cross-chain bridge technology.
          </p>
          <div className="hero-buttons">
            <Link to="/ai-assistant" className="btn primary">Try AI Assistant</Link>
            <Link to="/bridge" className="btn secondary">Bridge Tokens</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="card feature-card">
          <div className="feature-icon ai-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.63672 5.63672L8.46472 8.46472" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5352 15.5352L18.3632 18.3632" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.63672 18.3632L8.46472 15.5352" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5352 8.46472L18.3632 5.63672" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="feature-title">AI-Powered Assistant</h3>
          <p className="feature-description">
            Our advanced AI assistant helps you navigate blockchain interactions, manage pools, and stay updated with market news.
          </p>
          <Link to="/ai-assistant" className="feature-link">Explore AI Assistant</Link>
        </div>

        <div className="card feature-card">
          <div className="feature-icon bridge-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 3H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="feature-title">Cross-Chain Bridge</h3>
          <p className="feature-description">
            Seamlessly transfer tokens between SUI and Base Sepolia networks using our secure Wormhole integration.
          </p>
          <Link to="/bridge" className="feature-link">Try Token Bridge</Link>
        </div>
      </section>

      <section className="ecosystem-section">
        <h2 className="section-title">Powering the SUI Ecosystem</h2>
        <p className="section-description">
          Rivier is built on the SUI blockchain, offering high performance and scalability for modern decentralized applications.
        </p>
        <div className="tech-stack">
          <div className="tech-item">
            <div className="tech-icon sui-icon">SUI</div>
            <span className="tech-name">SUI Network</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon wormhole-icon">WH</div>
            <span className="tech-name">Wormhole</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon ai-tech-icon">AI</div>
            <span className="tech-name">AI Assistant</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;