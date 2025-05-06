// hooks/useLiquidityPools.js
import { useState, useCallback } from 'react';
import { useSuiWallet } from './useSuiWallet';
import { getAllSuiPoolsInfo } from '../services/geckoTerminalFetcher';

export const useLiquidityPools = ({ currentAccount, addSystemMessage }) => {
  const { 
    suiClient, 
    PACKAGE_ID, 
    WBTC_PACKAGE 
  } = useSuiWallet();
  
  const [pools, setPools] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
  const [isFindingPools, setIsFindingPools] = useState(false);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  
  /**
   * Fetch the best yield pools from the SUI network
   */
  const findBestYieldPool = useCallback(async () => {
    setIsFindingPools(true);
    
    try {
      // Add system message for loading state
      addSystemMessage("Searching for the best yield pools... This may take a moment.");
      
      // Fetch pool data
      const poolsInfo = await getAllSuiPoolsInfo();
      setPools(poolsInfo);
      
      // Sort pools by liquidity (highest first)
      const sortedPools = [...poolsInfo].sort((a, b) => {
        // Convert to numbers and handle null values
        const liquidityA = a.liquidity ? parseFloat(a.liquidity) : 0;
        const liquidityB = b.liquidity ? parseFloat(b.liquidity) : 0;
        return liquidityB - liquidityA;
      });
      
      // Format pools into a readable report
      let poolReport = "I've analyzed the available liquidity pools on SUI Network. Here are the top pools ranked by liquidity:\n\n";
      
      sortedPools.forEach((pool, index) => {
        poolReport += `**${index + 1}. ${pool.name}**\n`;
        poolReport += `- **Liquidity:** ${pool.liquidity ? '$' + parseFloat(pool.liquidity).toLocaleString() : 'N/A'}\n`;
        poolReport += `- **Fee:** ${pool.fee ? pool.fee + '%' : 'N/A'}\n`;
        poolReport += `- **Tokens:** ${pool.baseToken}/${pool.quoteToken}\n`;
        poolReport += `- **Pool ID:** ${pool.address.slice(0, 8)}...${pool.address.slice(-6)}\n`;
        
        if (currentAccount) {
          poolReport += `- [Provide Liquidity](#pool-${index})\n`;
        }
        
        // Add recommendation for the top pool
        if (index === 0) {
          poolReport += `- **Recommendation:** This is currently the highest liquidity pool available.\n`;
        }
        
        poolReport += '\n';
      });
      
      if (!currentAccount) {
        poolReport += "Connect your SUI wallet to provide liquidity to these pools.";
      } else {
        poolReport += "Click on 'Provide Liquidity' next to any pool to add your funds.";
      }
      
      // Remove loading message and add the pool report
      addSystemMessage(poolReport);
      
    } catch (error) {
      console.error('Error fetching pool data:', error);
      
      // Add error message
      addSystemMessage("I'm sorry, I encountered an error while fetching pool data. Please try again later or contact our support team if the issue persists.");
    } finally {
      setIsFindingPools(false);
    }
  }, [addSystemMessage, currentAccount]);

  /**
   * Fetch user positions from the SUI blockchain
   */
  const fetchUserPositions = useCallback(async () => {
    if (!currentAccount) {
      addSystemMessage("Please connect your SUI wallet first to view your positions.");
      return;
    }

    try {
      setIsLoadingPositions(true);
      
      // Add message to indicate positions search
      addSystemMessage("Fetching your liquidity positions... This may take a moment.");

      // Fetch all objects owned by the user that have the LPToken type
      const { data: objects } = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${PACKAGE_ID}::rivier::LPToken<${WBTC_PACKAGE}::wbtc::WBTC>`
        },
        options: {
          showContent: true,
          showDisplay: true,
        }
      });

      if (!objects || objects.length === 0) {
        addSystemMessage("You don't have any active liquidity positions at the moment.");
        setIsLoadingPositions(false);
        return;
      }

      // Format positions into array of objects with relevant info
      const positions = objects.map(obj => {
        const content = obj.data?.content;
        const fields = content?.fields;
        
        return {
          id: obj.data?.objectId,
          poolAddress: fields?.pool_address,
          poolName: fields?.pool_name,
          coinAmount: fields?.coin_amount,
          suiAmount: fields?.sui_amount,
          feeTier: fields?.fee_tier,
          lpShare: fields?.lp_share,
          timestamp: fields?.timestamp,
        };
      }).filter(position => position.id); // Filter out any undefined positions

      setUserPositions(positions);

      // Format positions into a readable report
      let positionsReport = "Here are your current liquidity positions:\n\n";
      
      positions.forEach((position, index) => {
        positionsReport += `**Position ${index + 1}: ${position.poolName}**\n`;
        positionsReport += `- **WBTC Amount:** ${position.coinAmount / 10**8} WBTC\n`;
        positionsReport += `- **SUI Amount:** ${position.suiAmount / 10**9} SUI\n`;
        positionsReport += `- **Fee Tier:** ${position.feeTier / 100}%\n`;
        positionsReport += `- **ID:** ${position.id.slice(0, 8)}...${position.id.slice(-6)}\n`;
        positionsReport += `- [Withdraw Liquidity](#withdraw-${index})\n\n`;
      });
      
      // Add the positions report to messages
      addSystemMessage(positionsReport);
      
    } catch (error) {
      console.error('Error fetching user positions:', error);
      
      // Add error message
      addSystemMessage("I'm sorry, I encountered an error while fetching your positions. Please try again later.");
    } finally {
      setIsLoadingPositions(false);
    }
  }, [addSystemMessage, currentAccount, suiClient, PACKAGE_ID, WBTC_PACKAGE]);

  /**
   * Provide liquidity to a pool
   * @param {Object} pool - Pool to provide liquidity to
   * @param {number} lpAmount - Amount of LP token (WBTC)
   * @param {number} suiAmount - Amount of SUI
   * @returns {Promise<Object>} - Transaction result
   */
  const provideLiquidity = useCallback(async (pool, lpAmount, suiAmount) => {
    // Implementation would go here, using the useSuiWallet hook
  }, []);

  /**
   * Withdraw liquidity from a position
   * @param {Object} position - Position to withdraw from
   * @returns {Promise<Object>} - Transaction result
   */
  const withdrawLiquidity = useCallback(async (position) => {
    // Implementation would go here, using the useSuiWallet hook
  }, []);

  return {
    pools,
    userPositions,
    isFindingPools,
    isLoadingPositions,
    findBestYieldPool,
    fetchUserPositions,
    provideLiquidity,
    withdrawLiquidity
  };
};