// hooks/useSuiWallet.js
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { useEffect, useState, useCallback } from 'react';

// Initialize the SUI client
const suiClient = new SuiClient({ url: 'https://fullnode.testnet.sui.io' });

// SUI contract constants
const PACKAGE_ID = '0x7ed2cd934d2b46a91ade6d799ebea3ec1d9174e02594e30354b9a28f000cff9c';
const REGISTRY_ID = '0xa5cbba526777ad7a65bb7911a6915a3ec5f8dc58302b00c64a133b7749adce86';
const WBTC_PACKAGE = '0xbebaa6c1dc50eb407da690928d43dd4fde05ad6c0b8cf5d88d69286e6b64d720';

export const useSuiWallet = () => {
  const { isConnected, signTransactionBlock, currentAccount } = useWalletKit();
  const [isTransacting, setIsTransacting] = useState(false);
  const [error, setError] = useState(null);

  // Reset error when connection state changes
  useEffect(() => {
    setError(null);
  }, [isConnected, currentAccount]);

  /**
   * Sign and execute a transaction on the SUI blockchain
   * @param {Function} buildTransactionFn - Function that builds the transaction block
   * @returns {Promise<Object>} - Result of the transaction
   */
  const signAndExecuteTransaction = useCallback(async (buildTransactionFn) => {
    setIsTransacting(true);
    setError(null);
    
    try {
      if (!isConnected || !currentAccount) {
        throw new Error("Wallet not connected. Please connect your wallet first.");
      }
      
      // Create a TransactionBlock
      const tx = new TransactionBlock();
      
      // Let the callback function build the transaction
      await buildTransactionFn(tx, currentAccount);
      
      // Sign the transaction
      const signed = await signTransactionBlock({
        transactionBlock: tx,
      });
      
      if (!signed) {
        throw new Error('Failed to sign transaction');
      }
      
      // Execute the transaction
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: signed.transactionBlockBytes,
        signature: signed.signature,
        options: {
          showEffects: true,
          showEvents: true,
        }
      });
      
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during the transaction');
      throw err;
    } finally {
      setIsTransacting(false);
    }
  }, [isConnected, currentAccount, signTransactionBlock]);

  /**
   * Get coins owned by the current wallet
   * @param {string} coinType - Type of coin to fetch
   * @returns {Promise<Array>} - Array of coins
   */
  const getOwnedCoins = useCallback(async (coinType) => {
    if (!isConnected || !currentAccount) {
      throw new Error("Wallet not connected");
    }
    
    try {
      const coinsResponse = await suiClient.getCoins({
        owner: currentAccount.address,
        coinType: coinType
      });
      
      if (!coinsResponse || !coinsResponse.data) {
        throw new Error(`Failed to retrieve your ${coinType} tokens`);
      }
      
      return coinsResponse.data;
    } catch (err) {
      setError(err.message || `Failed to get ${coinType} coins`);
      throw err;
    }
  }, [isConnected, currentAccount]);

  return {
    isConnected,
    currentAccount,
    isTransacting,
    error,
    signAndExecuteTransaction,
    getOwnedCoins,
    suiClient,
    // Export contract constants
    PACKAGE_ID,
    REGISTRY_ID,
    WBTC_PACKAGE
  };
};