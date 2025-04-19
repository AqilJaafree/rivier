/**
 * Simple utility to fetch data from the Gecko Terminal API
 * 
 * Example usage:
 * fetchPoolData('sui-network', '0xe0c526aa27d1729931d0051a318d795ad0299998898e4287d9da1bf095b49658')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */

// Base URL for the Gecko Terminal API
const BASE_URL = 'https://api.geckoterminal.com/api/v2';

// Pool addresses constants
const POOL_ADDRESSES = {
  WBTC_SUI_POOL_1: '0xe0c526aa27d1729931d0051a318d795ad0299998898e4287d9da1bf095b49658',
  WBTC_SUI_POOL_2: '0x0fb4ad0e4c2c2b0a45d3f7bc5585cc9cea8486a63e4ef5cb768ddd9414fbb97a',
  SUI_POOL_3: '0xd7d53e235c8a1db5e30bbde563053490db9b876ec8752b9053fee33ed845843b',
  SUI_POOL_4: '0xe71aa89df60e737f1b687f8dfbd51e2a9b35706e9e5540ce9b053bd53fcb9ec3'
};

/**
 * Fetch pool data from Gecko Terminal API
 * 
 * @param {string} network - Network name (e.g., 'sui-network')
 * @param {string} poolAddress - The pool address
 * @returns {Promise<object>} - The pool data
 */
async function fetchPoolData(network, poolAddress) {
  try {
    const response = await fetch(`${BASE_URL}/networks/${network}/pools/${poolAddress}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pool data:', error);
    throw error;
  }
}

/**
 * Fetch the first WBTC/SUI pool data (default pool)
 * 
 * @returns {Promise<object>} - WBTC/SUI pool data
 */
async function fetchWbtcSuiPool() {
  const network = 'sui-network';
  const poolAddress = POOL_ADDRESSES.WBTC_SUI_POOL_1;
  return fetchPoolData(network, poolAddress);
}

/**
 * Fetch the second WBTC/SUI 0.25% pool data
 * 
 * @returns {Promise<object>} - WBTC/SUI 0.25% pool data
 */
async function fetchWbtcSui025Pool() {
  const network = 'sui-network';
  const poolAddress = POOL_ADDRESSES.WBTC_SUI_POOL_2;
  return fetchPoolData(network, poolAddress);
}

/**
 * Fetch the third SUI pool data
 * 
 * @returns {Promise<object>} - SUI pool 3 data
 */
async function fetchSuiPool3() {
  const network = 'sui-network';
  const poolAddress = POOL_ADDRESSES.SUI_POOL_3;
  return fetchPoolData(network, poolAddress);
}

/**
 * Fetch the fourth SUI pool data
 * 
 * @returns {Promise<object>} - SUI pool 4 data
 */
async function fetchSuiPool4() {
  const network = 'sui-network';
  const poolAddress = POOL_ADDRESSES.SUI_POOL_4;
  return fetchPoolData(network, poolAddress);
}

/**
 * Fetch historical price data (OHLCV) for a pool
 * 
 * @param {string} network - Network name (e.g., 'sui-network')
 * @param {string} poolAddress - The pool address
 * @param {string} timeframe - Timeframe (e.g., '1h', '4h', '1d', '1w')
 * @returns {Promise<object>} - Historical price data
 */
async function fetchPoolOhlcv(network, poolAddress, timeframe = '1d') {
  try {
    const response = await fetch(
      `${BASE_URL}/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}`, 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pool OHLCV data:', error);
    throw error;
  }
}

/**
 * Fetch data for multiple pools simultaneously
 * 
 * @param {Array<{network: string, address: string, name: string}>} pools - Array of pool objects
 * @returns {Promise<Object>} - Object with pool names as keys and pool data as values
 */
async function fetchMultiplePools(pools) {
  try {
    const poolDataPromises = pools.map(pool => 
      fetchPoolData(pool.network, pool.address)
        .then(data => ({ name: pool.name, data }))
    );
    
    const poolsData = await Promise.all(poolDataPromises);
    
    // Convert array to object with pool names as keys
    return poolsData.reduce((acc, { name, data }) => {
      acc[name] = data;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching multiple pools:', error);
    throw error;
  }
}

/**
 * Example function to fetch all SUI pools
 * 
 * @returns {Promise<Object>} - Object containing all pool data objects
 */
async function fetchAllSuiPools() {
  return fetchMultiplePools([
    {
      name: 'WBTC_SUI_MAIN',
      network: 'sui-network',
      address: POOL_ADDRESSES.WBTC_SUI_POOL_1
    },
    {
      name: 'WBTC_SUI_025',
      network: 'sui-network',
      address: POOL_ADDRESSES.WBTC_SUI_POOL_2
    },
    {
      name: 'SUI_POOL_3',
      network: 'sui-network',
      address: POOL_ADDRESSES.SUI_POOL_3
    },
    {
      name: 'SUI_POOL_4',
      network: 'sui-network',
      address: POOL_ADDRESSES.SUI_POOL_4
    }
  ]);
}

/**
 * Extract the essential pool data (name, address, fee, liquidity)
 * 
 * @param {Object} poolData - The full pool data from the API
 * @returns {Object} - Object containing only the essential pool information
 */
function extractEssentialPoolData(poolData) {
  const pool = poolData.data;
  const attributes = pool.attributes;
  
  // Extract fee from the pool name (e.g., "wBTC / SUI 0.25%" => 0.25)
  let fee = null;
  const feeMatch = attributes.name.match(/(\d+\.\d+)%/);
  if (feeMatch && feeMatch[1]) {
    fee = parseFloat(feeMatch[1]);
  }
  
  return {
    name: attributes.name,
    address: attributes.address,
    fee: fee,
    liquidity: attributes.reserve_in_usd || null,
    baseToken: attributes.base_token_name,
    quoteToken: attributes.quote_token_name
  };
}

/**
 * Fetch just the essential pool information (name, address, fee, liquidity)
 * 
 * @param {string} network - Network name (e.g., 'sui-network')
 * @param {string} poolAddress - The pool address
 * @returns {Promise<Object>} - Essential pool information
 */
async function fetchEssentialPoolData(network, poolAddress) {
  const poolData = await fetchPoolData(network, poolAddress);
  return extractEssentialPoolData(poolData);
}

/**
 * Get essential data for the first WBTC/SUI pool
 * 
 * @returns {Promise<Object>} - Essential WBTC/SUI pool information
 */
async function getWbtcSuiPoolInfo() {
  const poolData = await fetchWbtcSuiPool();
  return extractEssentialPoolData(poolData);
}

/**
 * Get essential data for the WBTC/SUI 0.25% pool
 * 
 * @returns {Promise<Object>} - Essential WBTC/SUI 0.25% pool information
 */
async function getWbtcSui025PoolInfo() {
  const poolData = await fetchWbtcSui025Pool();
  return extractEssentialPoolData(poolData);
}

/**
 * Get essential data for SUI pool 3
 * 
 * @returns {Promise<Object>} - Essential SUI pool 3 information
 */
async function getSuiPool3Info() {
  const poolData = await fetchSuiPool3();
  return extractEssentialPoolData(poolData);
}

/**
 * Get essential data for SUI pool 4
 * 
 * @returns {Promise<Object>} - Essential SUI pool 4 information
 */
async function getSuiPool4Info() {
  const poolData = await fetchSuiPool4();
  return extractEssentialPoolData(poolData);
}

/**
 * Fetch all SUI pools and return only the essential information
 * 
 * @returns {Promise<Array<Object>>} - Array of objects with essential pool information
 */
async function getAllSuiPoolsInfo() {
  try {
    const pools = await fetchAllSuiPools();
    
    // Transform the data to just what's needed
    return Object.entries(pools).map(([name, poolData]) => ({
      name: poolData.data.attributes.name,
      address: poolData.data.attributes.address,
      // Extract fee from the pool name (e.g., "wBTC / SUI 0.25%" => 0.25)
      fee: (poolData.data.attributes.name.match(/(\d+\.\d+)%/) || [null, null])[1],
      liquidity: poolData.data.attributes.reserve_in_usd || null,
      baseToken: poolData.data.attributes.base_token_name,
      quoteToken: poolData.data.attributes.quote_token_name
    }));
  } catch (error) {
    console.error('Failed to fetch all SUI pools info:', error);
    throw error;
  }
}

/**
 * Log just the essential information (name, address, fee, liquidity) for all pools
 */
async function logEssentialPoolsInfo() {
  try {
    console.log('Fetching essential pool information...');
    const poolsInfo = await getAllSuiPoolsInfo();
    
    poolsInfo.forEach(pool => {
      console.log('\nPool Information:');
      console.log('-----------------');
      console.log(`Name: ${pool.name}`);
      console.log(`Address: ${pool.address}`);
      console.log(`Fee: ${pool.fee ? pool.fee + '%' : 'N/A'}`);
      console.log(`Liquidity: ${pool.liquidity ? '$' + pool.liquidity : 'N/A'}`);
      console.log(`Tokens: ${pool.baseToken}/${pool.quoteToken}`);
    });
    
    return poolsInfo;
  } catch (error) {
    console.error('Failed to log essential pools info:', error);
  }
}

// Export the functions to be used in other files
export {
  POOL_ADDRESSES,
  fetchPoolData,
  fetchWbtcSuiPool,
  fetchWbtcSui025Pool,
  fetchSuiPool3,
  fetchSuiPool4,
  fetchAllSuiPools,
  fetchMultiplePools,
  fetchPoolOhlcv,
  extractEssentialPoolData,
  fetchEssentialPoolData,
  getWbtcSuiPoolInfo,
  getWbtcSui025PoolInfo,
  getSuiPool3Info,
  getSuiPool4Info,
  getAllSuiPoolsInfo,
  logEssentialPoolsInfo
};