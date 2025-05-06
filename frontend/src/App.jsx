// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletKitProvider } from '@mysten/wallet-kit';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AiAssistant from './pages/AiAssistant';
import Bridge from './pages/Bridge';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <WalletKitProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Rivier. All Rights Reserved.</p>
          </footer>
        </div>
      </Router>
    </WalletKitProvider>
  );
}

export default App;