// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn primary">
            Back to Home
          </Link>
          <Link to="/ai-assistant" className="btn secondary">
            Try AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;