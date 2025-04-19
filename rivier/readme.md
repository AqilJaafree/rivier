# Rivier: BTC-Fi Yield Protocol on SUI

## Overview

Rivier is a liquidity provision protocol built on SUI blockchain that enables users to provide liquidity to WBTC/SUI pools and earn yield. The protocol integrates with Gecko Terminal API to fetch real-time pool data and recommends the best pools based on fees and liquidity.

## Features

- **Liquidity Provision**: Provide liquidity to WBTC/SUI pools with different fee tiers
- **Generic Design**: Support for any coin type, not just WBTC
- **Pool Analytics**: Integration with Gecko Terminal API for real-time pool data
- **Yield Optimization**: Recommendations for the best pools based on fees and APY
- **Simple User Interface**: Chatbot interface for easy interaction with the protocol

## Contract Details

The smart contract is a Move module deployed on SUI testnet that manages:

- Creating LP tokens for liquidity providers
- Tracking pool information (fees, liquidity, etc.)
- Processing deposits and withdrawals
- Managing pool registries

### Contract Structure

```
module rivier::rivier {
    // Generic LP Token for any coin type
    struct LPToken<phantom CoinType> has key, store { ... }
    
    // Pool Registry to track available pools
    struct PoolRegistry has key { ... }
    
    // Pool information
    struct PoolInfo has store, copy, drop { ... }
    
    // Main functions
    public entry fun provide_liquidity<CoinType>(...) { ... }
    public entry fun withdraw_liquidity<CoinType>(...) { ... }
    
    // Helper functions
    public fun get_available_pools(...) { ... }
    public fun get_pool_info(...) { ... }
}
```

## Installation & Setup

### Prerequisites

- [SUI CLI](https://docs.sui.io/build/install)
- Access to SUI testnet

### Deploy the Contract

1. Clone the repository:
```bash
git clone https://github.com/your-username/rivier.git
cd rivier
```

2. Build the contract:
```bash
sui move build
```

3. Deploy to testnet:
```bash
sui client publish --gas-budget 100000000
```

4. Save the Package ID and PoolRegistry ID from the output.

## Usage

### Provide Liquidity

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module rivier \
  --function provide_liquidity \
  --type-args <COIN_TYPE> \
  --args <REGISTRY_ID> <POOL_ADDRESS> <COIN_ID> <SUI_COIN_ID> \
  --gas-budget 10000000
```

### Withdraw Liquidity

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module rivier \
  --function withdraw_liquidity \
  --type-args <COIN_TYPE> \
  --args <REGISTRY_ID> <LP_TOKEN_ID> \
  --gas-budget 10000000
```

## Gecko Terminal Integration

The frontend fetches pool data from Gecko Terminal API to provide users with real-time information about:

- Pool liquidity
- Trading volume
- Fee tiers
- Estimated APY

This data is used to recommend the optimal pool for liquidity provision based on the user's risk preferences.

## Frontend Integration

The protocol includes a chatbot UI that allows users to:

1. View available pools with performance metrics
2. Get recommendations for the best pools
3. Provide liquidity with a single click
4. Monitor and withdraw their positions

## Development 

### Testing

Run the local tests:
```bash
sui move test
```

Test on testnet using the provided script:
```bash
./testnet_test.sh
```

### Contract Details

- **Package ID**: `0x7ed2cd934d2b46a91ade6d799ebea3ec1d9174e02594e30354b9a28f000cff9c` (testnet)
- **Registry ID**: `0xa5cbba526777ad7a65bb7911a6915a3ec5f8dc58302b00c64a133b7749adce86` (testnet)

## Architecture

The protocol consists of three main components:

1. **Smart Contract**: Handles on-chain logic for liquidity provision
2. **Data Service**: Fetches and processes data from Gecko Terminal API
3. **Chatbot UI**: Provides user interface for interacting with the protocol

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Chatbot    │<────>│  Data        │<────>│  Gecko       │
│   Interface  │      │  Service     │      │  Terminal API │
└──────┬───────┘      └──────────────┘      └──────────────┘
       │
       │
┌──────▼───────┐      ┌──────────────┐
│   SUI JS     │<────>│  Rivier      │
│   SDK        │      │  Contract    │
└──────────────┘      └──────────────┘
```

## Future Enhancements

- **Auto-compounding**: Automatically reinvest earned fees
- **Multiple Pool Support**: Diversify liquidity across multiple pools
- **Impermanent Loss Protection**: Risk mitigation strategies
- **Governance**: Community-driven protocol decisions
- **Mobile Interface**: Native mobile application

## Hackathon Notes

This project was created for the SUI Hackathon. The current implementation focuses on:

1. Core liquidity provision functionality
2. Integration with Gecko Terminal for data
3. Simple user interface through a chatbot

While the contract is functional, some advanced features like impermanent loss calculations and precise APY estimates would be implemented in a production version.

## License

MIT

## Acknowledgments

- SUI Foundation
- Gecko Terminal API
- All hackathon participants and mentors