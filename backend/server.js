// server.js - Simple Express server to proxy Anthropic API requests

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend requests
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Your Vite development server
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request body
app.use(express.json());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Proxy route for Anthropic API
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // API key should be stored in environment variables
    const API_KEY = process.env.ANTHROPIC_API_KEY;
    
    // Make request to Anthropic API
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: messages,
      system: "You are Rivier's AI assistant, specialized in blockchain, cryptocurrency, and Web3 topics. Provide helpful, accurate information about blockchain technology, cryptocurrency trading, market trends, and Web3 development. Keep responses concise and professional. If asked about Rivier's services, emphasize security, user experience, and innovative blockchain solutions."
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      }
    });
    
    // Return the response to the frontend
    res.json({ 
      message: response.data.content[0].text 
    });
    
  } catch (error) {
    console.error('Error calling Anthropic API:', error.message);
    
    // Return error response
    res.status(500).json({ 
      error: 'Failed to get response from AI service',
      details: error.message
    });
  }
});

// For React Router, serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});