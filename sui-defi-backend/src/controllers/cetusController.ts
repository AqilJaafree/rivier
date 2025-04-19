import { Request, Response } from 'express';
import { getWBTCPools, getPoolById } from '../services/cetusService';

export const fetchWBTCPools = async (req: Request, res: Response) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const pools = await getWBTCPools(forceRefresh);
    res.json(pools);
  } catch (error) {
    console.error("Controller error fetching WBTC pools:", error);
    res.status(500).json({ error: "Failed to fetch WBTC pools" });
  }
};

export const fetchPoolById = async (req: Request, res: Response) => {
  try {
    const { poolAddress } = req.params;
    const poolData = await getPoolById(poolAddress);
    res.json(poolData);
  } catch (error) {
    console.error(`Controller error fetching pool ${req.params.poolAddress}:`, error);
    res.status(500).json({ error: "Failed to fetch pool data" });
  }
};