# Rivier - SUI Blockchain & AI Assistant

Rivier is a modern web application that combines the power of SUI blockchain with AI capabilities, offering users an intuitive interface to interact with blockchain functions, manage liquidity pools, and bridge tokens across networks.

## Features

- 🤖 **AI Assistant**: Intelligent chat interface to help with blockchain operations
- 🌉 **Cross-Chain Bridge**: Transfer tokens between SUI and Base Sepolia networks
- 💧 **Liquidity Pool Management**: View, provide, and withdraw from liquidity pools
- 📰 **Real-time Crypto News**: Stay updated with the latest crypto market news

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Components Guide](#components-guide)
- [Blockchain Integration](#blockchain-integration)
- [Customization](#customization)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/rivier.git
cd rivier/frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/              # Source code
│   ├── assets/       # Assets like SVGs
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── services/     # Service modules
│   ├── styles/       # Global styles
│   ├── App.jsx       # Main App component
│   ├── main.jsx      # Entry point
├── package.json      # Dependencies and scripts
├── tailwind.config.js # Tailwind configuration
├── vite.config.js    # Vite configuration
```

## Configuration

### Backend API

To connect to your backend API, modify the API URL in `src/hooks/useChatMessages.js`:

```javascript
// Change this URL to your backend API endpoint
const BACKEND_API_URL = 'http://localhost:3001/api/chat';
```

### Blockchain Networks

To configure the blockchain networks for the bridge, modify the config in `src/pages/Bridge.jsx`:

```javascript
const wormholeConfig = {
  network: 'Testnet', // Change to 'Mainnet' for production
  chains: ['Sui', 'BaseSepolia'], // Configure the chains you want to support
  rpcs: {
    Sui: 'https://fullnode.testnet.sui.io', // Update with your RPC endpoints
    BaseSepolia: 'https://sepolia.base.org'
  }
};
```

### SUI Contract Constants

Update the SUI contract constants in `src/hooks/useSuiWallet.js` to match your deployed contracts:

```javascript
// Update these with your contract addresses
const PACKAGE_ID = 'your-package-id';
const REGISTRY_ID = 'your-registry-id';
const WBTC_PACKAGE = 'your-wbtc-package-id';
```

## Components Guide

### Core Components

#### Navbar (`src/components/Navbar.jsx`)

Navigation component with wallet connection button.

To modify navigation links:

```javascript
// Add or modify navigation links here
<ul className="nav-links">
  <li>
    <Link to="/" className={isActive('/') ? 'active' : ''}>
      Home
    </Link>
  </li>
  {/* Add new links here */}
</ul>
```

#### ChatInterface (`src/components/ChatInterface.jsx`)

Chat UI for interacting with the AI assistant.

To customize the chat appearance, modify `src/components/ChatInterface.css`.

#### LiquidityModal (`src/components/LiquidityModal.jsx`)

Modal for providing liquidity to pools.

To customize validation logic:

```javascript
const handleSubmit = () => {
  // Modify validation rules here
  if (!lpAmount || !suiAmount) {
    setValidationError('Please enter both token amounts');
    return;
  }
  
  // Add additional validation as needed
  
  // Clear validation error and submit
  setValidationError('');
  onSubmit(lpAmount, suiAmount);
};
```

#### WithdrawModal (`src/components/WithdrawModal.jsx`)

Modal for withdrawing liquidity from positions.

#### PoolsList (`src/components/PoolsList.jsx`)

Component for displaying available liquidity pools.

#### PositionsList (`src/components/PositionsList.jsx`)

Component for displaying user's liquidity positions.

#### NewsBar (`src/components/NewsBar.jsx`)

Component displaying crypto news. To modify the news source API:

```javascript
// Update the news API endpoint
const response = await fetch(
  'https://your-news-api-endpoint.com',
  {
    headers: {
      'accept': 'application/json'
    }
  }
);
```

### Pages

#### HomePage (`src/pages/Home.jsx`)

Landing page with information about the application.

To update the hero section content:

```javascript
<div className="hero-content">
  <h1 className="hero-title">Your Custom Title</h1>
  <h2 className="hero-subtitle">Your Custom Subtitle</h2>
  <p className="hero-description">
    Your custom description text here.
  </p>
</div>
```

#### AiAssistant (`src/pages/AiAssistant.jsx`)

Interactive chat interface with AI assistant and liquidity pool management.

#### Bridge (`src/pages/Bridge.jsx`)

Interface for cross-chain token transfers.

#### NotFound (`src/pages/NotFound.jsx`)

404 error page.

## Blockchain Integration

### Wallet Connection

The application uses the SUI wallet kit for wallet connection. The connection logic is handled in `src/hooks/useSuiWallet.js`.

### Transaction Signing

To execute transactions on the blockchain, use the `signAndExecuteTransaction` function from the `useSuiWallet` hook:

```javascript
const { signAndExecuteTransaction } = useSuiWallet();

// Example usage
const handleTransaction = async () => {
  try {
    const result = await signAndExecuteTransaction((tx, account) => {
      // Build your transaction here
      tx.moveCall({
        target: `${PACKAGE_ID}::module::function`,
        arguments: [/* your arguments */]
      });
    });
    
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Fetching Blockchain Data

To fetch data from the blockchain, use the `suiClient` from the `useSuiWallet` hook:

```javascript
const { suiClient } = useSuiWallet();

// Example: Fetch objects owned by the user
const fetchUserObjects = async () => {
  const { data } = await suiClient.getOwnedObjects({
    owner: currentAccount.address,
    filter: {
      StructType: `${PACKAGE_ID}::module::ObjectType`
    },
    options: {
      showContent: true
    }
  });
  
  // Process data
};
```

## Customization

### Styling

The project uses a combination of custom CSS and Tailwind CSS for styling:

- Global styles are in `src/App.css` and `src/index.css`
- Component-specific styles are in `src/components/*.css` files
- Tailwind configuration is in `tailwind.config.js`

To modify the color scheme, update the CSS variables in `src/App.css`:

```css
:root {
  /* Update color variables here */
  --primary-gradient: linear-gradient(135deg, #1e8ebe, #430394);
  --secondary-gradient: linear-gradient(135deg, #667eea, #764ba2);
  /* ... */
}
```

### Theme

To change the theme of the application, modify the background gradient in `src/App.css`:

```css
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  /* Modify the background gradient here */
  background: linear-gradient(135deg, #1c1c1c, #6a0dad);
  color: #f0f0f0;
  min-height: 100vh;
  line-height: 1.6;
}
```

## Development

### Adding New Features

1. Create new components in the `src/components` directory
2. Add new pages in the `src/pages` directory
3. Update routes in `src/App.jsx` to include new pages

### API Integration

To integrate with a backend API:

1. Create a new service in `src/services` directory
2. Use fetch or axios to make API calls
3. Use React hooks to manage state and API responses

Example service:

```javascript
// src/services/apiService.js
const API_URL = 'https://your-api.com';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
```

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production build.

### Deployment Options

- **Vercel**: Easy deployment with GitHub integration
- **Netlify**: Simple deployment with continuous integration
- **AWS S3 + CloudFront**: For scalable static site hosting
- **GitHub Pages**: Free hosting for open-source projects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by the Rivier Team