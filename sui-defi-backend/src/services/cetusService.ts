import express from 'express';
import { SuiClient } from "@mysten/sui.js/client";
import { getFullnodeUrl } from "@mysten/sui.js/client";

// Define cache mechanism
const cache = {
  wbtcPools: null as any,
  timestamp: 0
};

// Cache lifetime in milliseconds (5 minutes)
const CACHE_LIFETIME = 5 * 60 * 1000;

// Known addresses
const ADDRESSES = {
  CETUS_PACKAGE: "0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb",
  POOLS_OBJECT: "0xc090b101978bd6370def2666b4a8aaee54396cf1c31488bc4baa6e6a31a0fc2d",
  WBTC: "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN",
  SUI: "0x2::sui::SUI"
};

// Token decimals constants
const TOKEN_DECIMALS = {
  WBTC: 8,
  SUI: 9,
  DEFAULT: 8
};

// Initialize Sui Client
const suiClient = new SuiClient({
  url: getFullnodeUrl('mainnet')
});

// Get token decimals based on token type
const getTokenDecimals = (tokenType: string): number => {
  if (tokenType === ADDRESSES.WBTC) return TOKEN_DECIMALS.WBTC;
  if (tokenType === ADDRESSES.SUI) return TOKEN_DECIMALS.SUI;
  return TOKEN_DECIMALS.DEFAULT;
};

// Get a readable token name from the coin type
const getTokenName = (coinType: string | undefined): string => {
  if (!coinType) return 'UNKNOWN';
  
  const parts = coinType.split('::');
  if (parts.length > 2) {
    return parts[2]; // Return the last part of the coin type
  }
  if (coinType === ADDRESSES.SUI) return 'SUI';
  return coinType;
};

// Get all WBTC pools from Cetus using direct RPC calls
export const getWBTCPools = async (forceRefresh = false) => {
  try {
    // Check if we have valid cached data
    const currentTime = Date.now();
    if (!forceRefresh && cache.wbtcPools && (currentTime - cache.timestamp < CACHE_LIFETIME)) {
      return cache.wbtcPools;
    }

    // Try to get all pools first
    const poolsResult = [];
    
    try {
      // Get pools using direct object queries
      const poolsObject = await suiClient.getObject({
        id: ADDRESSES.POOLS_OBJECT,
        options: {
          showContent: true,
          showDisplay: true
        }
      });

      // Extract pool data
      if (poolsObject.data?.content?.dataType === 'moveObject') {
        const fields = poolsObject.data.content.fields as any;
        
        if (fields.pools && fields.pools.fields && fields.pools.fields.contents) {
          const poolContents = fields.pools.fields.contents;
          
          // Process each pool
          for (const poolData of poolContents) {
            if (poolData.fields && poolData.fields.value && poolData.fields.value.fields) {
              const pool = poolData.fields.value.fields;
              
              const coinTypeA = pool.coin_type_a || '';
              const coinTypeB = pool.coin_type_b || '';
              
              // Filter for WBTC pools only
              if (coinTypeA === ADDRESSES.WBTC || coinTypeB === ADDRESSES.WBTC) {
                const tokenAName = getTokenName(coinTypeA);
                const tokenBName = getTokenName(coinTypeB);
                
                poolsResult.push({
                  poolAddress: poolData.fields.key,
                  poolName: `${tokenAName}-${tokenBName}`,
                  tokens: {
                    tokenA: {
                      type: coinTypeA,
                      name: tokenAName,
                      decimals: getTokenDecimals(coinTypeA),
                      isWBTC: coinTypeA === ADDRESSES.WBTC
                    },
                    tokenB: {
                      type: coinTypeB,
                      name: tokenBName,
                      decimals: getTokenDecimals(coinTypeB),
                      isWBTC: coinTypeB === ADDRESSES.WBTC
                    }
                  },
                  liquidity: {
                    tokenAAmount: String(pool.coin_a || "0"),
                    tokenBAmount: String(pool.coin_b || "0"),
                  },
                  tvl: calculateTVL(pool),
                  fee: parseInt(String(pool.fee_rate || 3000)) / 10000, // Convert fee rate to percentage
                  tickSpacing: parseInt(String(pool.tick_spacing || 1)),
                  feeApr: parseInt(String(pool.fee_rate || 3000)) / 1_000_000 // Simplified APR calculation
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching pools from main object:", error);
      // Continue execution to try the fallback approach
    }
    
    // If we couldn't get pools from the main object, try a fallback with known WBTC pool addresses
    if (poolsResult.length === 0) {
      console.log("Using fallback with known WBTC pool addresses");
      
      // Hardcoded list of known WBTC pool addresses
      const knownWbtcPoolAddresses = [
        "0xe0c526aa27d1729931d0051a318d795ad0299998898e4287d9da1bf095b49658",
        // Add other known WBTC pool addresses here
      ];
      
      for (const poolAddress of knownWbtcPoolAddresses) {
        try {
          const poolData = await getPoolById(poolAddress);
          poolsResult.push(poolData);
        } catch (error) {
          console.error(`Error fetching pool ${poolAddress}:`, error);
          // Continue with the next pool
        }
      }
    }
    
    // Update cache
    cache.wbtcPools = poolsResult;
    cache.timestamp = currentTime;
    
    return poolsResult;
  } catch (error) {
    console.error("Error fetching Cetus WBTC pools:", error);
    throw error;
  }
};

// Get specific pool data
export const getPoolById = async (poolAddress: string) => {
  try {
    // Get pool using direct object queries
    const poolObject = await suiClient.getObject({
      id: poolAddress,
      options: {
        showContent: true,
        showDisplay: true
      }
    });

    // Extract pool data
    if (poolObject.data?.content?.dataType === 'moveObject') {
      const pool = poolObject.data.content.fields as any;
      
      // Check if we have a valid pool structure
      if (!pool) {
        throw new Error(`Invalid pool structure for ${poolAddress}`);
      }
      
      // Extract coin types with fallbacks
      const coinTypeA = pool.coin_type_a || pool.coinTypeA || '';
      const coinTypeB = pool.coin_type_b || pool.coinTypeB || '';
      
      const tokenAName = getTokenName(coinTypeA);
      const tokenBName = getTokenName(coinTypeB);
      
      // Extract remaining data with fallbacks
      const coinAmountA = pool.coin_a || pool.coinAmountA || '0';
      const coinAmountB = pool.coin_b || pool.coinAmountB || '0';
      const feeRate = parseInt(String(pool.fee_rate || 0)) || 3000; // Default 0.3%
      const tickSpacing = parseInt(String(pool.tick_spacing || 0)) || 1;
      
      return {
        poolAddress,
        poolName: `${tokenAName}-${tokenBName}`,
        tokens: {
          tokenA: {
            type: coinTypeA,
            name: tokenAName,
            decimals: getTokenDecimals(coinTypeA)
          },
          tokenB: {
            type: coinTypeB,
            name: tokenBName,
            decimals: getTokenDecimals(coinTypeB)
          }
        },
        liquidity: {
          tokenAAmount: String(coinAmountA),
          tokenBAmount: String(coinAmountB),
        },
        tvl: calculateTVL(pool),
        fee: feeRate / 10000, // Convert fee rate to percentage
        tickSpacing: tickSpacing,
        feeApr: feeRate / 1_000_000 // Simplified APR calculation
      };
    }
    
    throw new Error(`Pool not found: ${poolAddress}`);
  } catch (error) {
    console.error(`Error fetching pool ${poolAddress}:`, error);
    throw error;
  }
};

// Helper function to calculate TVL (simplified version)
function calculateTVL(pool: any) {
  // In a real implementation, you would fetch token prices and calculate TVL
  // For now, we're just returning a placeholder value
  return 0;
}

// Set up express router for the service
const router = express.Router();

// Route to get all WBTC pools
router.get('/wbtc-pools', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const pools = await getWBTCPools(forceRefresh);
    res.json(pools);
  } catch (error) {
    console.error("Error fetching Cetus WBTC pools:", error);
    res.status(500).json({ error: "Failed to fetch WBTC pools" });
  }
});

// Route to get specific pool data
router.get('/pool/:poolAddress', async (req, res) => {
  try {
    const { poolAddress } = req.params;
    const poolData = await getPoolById(poolAddress);
    res.json(poolData);
  } catch (error) {
    console.error(`Error fetching pool ${req.params.poolAddress}:`, error);
    res.status(500).json({ error: "Failed to fetch pool data" });
  }
});

export default router;