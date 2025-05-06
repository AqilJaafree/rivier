// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@mysten/wallet-kit';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Helper function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Rivier</Link>
        </div>
        
        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/ai-assistant" 
                className={isActive('/ai-assistant') ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                AI Assistant
              </Link>
            </li>
            <li>
              <Link 
                to="/bridge" 
                className={isActive('/bridge') ? 'active' : ''} 
                onClick={closeMobileMenu}
              >
                Bridge
              </Link>
            </li>
          </ul>
          
          <div className="wallet-button">
            <ConnectButton connectText="Connect SUI Wallet" />
          </div>
          
          {/* Close button for mobile menu */}
          <button className="close-mobile-menu" onClick={closeMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;