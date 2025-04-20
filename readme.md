# Rivier: Agentic BTCFi Yield 

## Overview

Rivier is a full-stack decentralized application designed to provide AI-assisted liquidity provision and token bridging across multiple blockchains. The platform consists of three main components:

1. **Frontend**: React-based user interface with AI assistant and Wormhole integration
2. **Backend**: Express.js server for proxying AI API requests 
3. **Smart Contract**: SUI blockchain contract for liquidity pool management

The application allows users to:
- Interact with an AI assistant for crypto and blockchain guidance
- Bridge tokens between Ethereum testnets and SUI using Wormhole
- Provide liquidity to token pools on the SUI blockchain
- Manage their liquidity positions with a user-friendly interface

## Technical Architecture

### Frontend (React/Vite)

The frontend is built with React and bundled using Vite, offering a modern and responsive user interface.

**Key Features:**
- **AI Assistant**: Conversational interface for liquidity recommendations
- **Token Bridging**: Wormhole Connect integration for cross-chain transfers
- **Wallet Integration**: Connections to both EVM wallets and SUI wallets
- **Liquidity Dashboard**: Interface for providing and managing liquidity positions

**Main Components:**
- App routing and navigation
- Deposit page with AI assistant
- Bridge page with Wormhole Connect
- Dashboard for monitoring positions

**Technologies Used:**
- React 18
- React Router 6
- @mysten/wallet-kit for SUI wallet integration
- @wormhole-foundation/wormhole-connect for token bridging
- Tailwind CSS for styling

### Backend (Express.js)

The backend provides a proxy service to communicate with the Anthropic Claude API, ensuring API keys remain secure.

**Key Features:**
- API Proxying: Secure intermediary for AI service requests
- Static File Serving: Delivers the frontend application
- CORS Support: Handles cross-origin requests from the development server

**Technologies Used:**
- Node.js
- Express.js
- Axios for API requests
- dotenv for environment variable management

### Smart Contract (SUI Move)

The smart contract is written in Move language and deployed on the SUI blockchain, handling the core liquidity provision logic.

**Key Features:**
- **Pool Registry**: Central registry for tracking available pools
- **LP Tokens**: Represents user positions in liquidity pools
- **Generic Design**: Supports various token types through generic programming
- **Event Emission**: Broadcasts liquidity events for off-chain indexing

**Contract Structure:**
- `LPToken<phantom CoinType>`: Generic token representing liquidity positions
- `PoolRegistry`: Central registry for all pools
- `PoolInfo`: Metadata about each pool
- Core functions for providing and withdrawing liquidity

## Installation and Setup

### Prerequisites
- Node.js 16+ and npm/pnpm
- SUI CLI for contract deployment
- Metamask or another Ethereum wallet
- SUI wallet

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your API key
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env

# Start the server
npm run dev
```

### Smart Contract Deployment
```bash
# Navigate to rivier directory
cd rivier

# Build the contract
sui move build

# Deploy to testnet
sui client publish --gas-budget 100000000
```

## Usage Guide

### Token Bridging
1. Navigate to the Bridge page
2. Connect your Ethereum wallet (containing WBTC on BaseSepolia)
3. Connect your SUI wallet
4. Select the amount to bridge
5. Confirm the transaction

### AI Assistant
1. Go to the AI Assistant page
2. Ask questions about crypto, blockchain, or yield optimization
3. Click "Find Best Yield Pool" to get recommendations
4. Follow the assistant's guidance for optimal liquidity provision

### Providing Liquidity
1. Bridge tokens from Ethereum to SUI using the Bridge page
2. Navigate to the AI Assistant page
3. Connect your SUI wallet
4. Choose a recommended pool
5. Enter the amount of tokens to provide
6. Confirm the transaction

## Project Structure

```
rivier/
├── backend/               # Backend server code
│   ├── server.js          # Express server entry point
│   └── package.json       # Backend dependencies
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main application component
│   └── package.json       # Frontend dependencies
└── rivier/                # SUI smart contract
    ├── sources/           # Contract source code
    │   └── rivier.move    # Main contract logic
    ├── Move.toml          # Contract dependency configuration
    └── readme.md          # Contract documentation
```

## Future Development

- **Auto-compounding**: Reinvest earned fees automatically
- **Multi-chain Support**: Expand to additional blockchain networks
- **Advanced Analytics**: Detailed performance metrics for pools
- **Impermanent Loss Protection**: Risk mitigation strategies
- **Governance**: Community control over protocol decisions
- **Mobile App**: Native mobile interface

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SUI Foundation for blockchain infrastructure
- Wormhole for cross-chain bridging technology
- Anthropic for AI capabilities