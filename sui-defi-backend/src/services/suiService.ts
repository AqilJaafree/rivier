import { SuiClient } from "@mysten/sui.js/client";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sui client
const rpcUrl = process.env.SUI_RPC_URL || getFullnodeUrl("mainnet");
export const suiClient = new SuiClient({ url: rpcUrl });