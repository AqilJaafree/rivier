import express from 'express';
import { getWBTCPools, getPoolById } from './cetusService';
// You can import services for other protocols later

// Define types for pool objects
interface TokenInfo {
  type: string;
  name: string;
  decimals: number;
  isWBTC?: boolean;
}

interface PoolToken {
  tokenA: TokenInfo;
  tokenB: TokenInfo;
}

interface PoolLiquidity {
  tokenAAmount: string;
  tokenBAmount: string;
}

interface Pool {
  poolAddress: string;
  poolName: string;
  tokens: PoolToken;
  liquidity: PoolLiquidity;
  tvl: number;
  fee: number;
  tickSpacing: number;
  feeApr: number;
  protocol?: string;
}

const router = express.Router();

// Get WBTC pools from all supported protocols
router.get('/wbtc-pools', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    
    // Get pools from Cetus
    const cetusPools = await getWBTCPools(forceRefresh);
    
    // When implementing other protocols, you'll add them here
    // const turbosPools = await getTurbosPools(forceRefresh);
    // const aftermathPools = await getAftermathPools(forceRefresh);
    
    // Return pools from all protocols with source information
    const allPools = [
      ...cetusPools.map((pool: Pool) => ({ ...pool, protocol: 'Cetus' })),
      // ...turbosPools.map(pool => ({ ...pool, protocol: 'Turbos' })),
      // ...aftermathPools.map(pool => ({ ...pool, protocol: 'Aftermath' })),
    ];
    
    res.json(allPools);
  } catch (error) {
    console.error("Error fetching WBTC pools from protocols:", error);
    res.status(500).json({ error: "Failed to fetch WBTC pools" });
  }
});

// Get pool TVL rankings across protocols
router.get('/top-wbtc-pools', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Get all pools first
    const poolsResponse = await fetch('http://localhost:3000/api/defi/wbtc-pools');
    const pools = await poolsResponse.json();
    
    // Sort pools by TVL (descending)
    const sortedPools = pools.sort((a: Pool, b: Pool) => b.tvl - a.tvl).slice(0, limit);
    
    res.json(sortedPools);
  } catch (error) {
    console.error("Error fetching top WBTC pools:", error);
    res.status(500).json({ error: "Failed to fetch top WBTC pools" });
  }
});

// Compare APRs across protocols
router.get('/compare-wbtc-pools', async (req, res) => {
  try {
    // Get all pools first
    const poolsResponse = await fetch('http://localhost:3000/api/defi/wbtc-pools');
    const pools = await poolsResponse.json();
    
    // Sort pools by APR (descending)
    const sortedPools = pools.sort((a: Pool, b: Pool) => b.feeApr - a.feeApr);
    
    res.json({
      highestApr: sortedPools[0],
      lowestApr: sortedPools[sortedPools.length - 1],
      allPools: sortedPools
    });
  } catch (error) {
    console.error("Error comparing WBTC pools:", error);
    res.status(500).json({ error: "Failed to compare WBTC pools" });
  }
});

export default router;