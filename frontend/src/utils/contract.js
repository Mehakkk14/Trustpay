import { 
  MNEE_TOKEN_ADDRESS, 
  ESCROW_CONTRACT_ADDRESS, 
  ERC20_ABI, 
  ESCROW_ABI,
  BASE_CHAIN_ID 
} from '../config/contract-config';

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  return new window.ethers.providers.Web3Provider(window.ethereum);
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};

// Get MNEE Token contract instance
export const getMNEEContract = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  const signer = getSigner();
  return new window.ethers.Contract(MNEE_TOKEN_ADDRESS, ERC20_ABI, signer);
};

// Get Escrow contract instance
export const getEscrowContract = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  const signer = getSigner();
  return new window.ethers.Contract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI, signer);
};

// Check if connected to Base network
export const checkNetwork = async () => {
  const provider = getProvider();
  const network = await provider.getNetwork();
  return network.chainId === BASE_CHAIN_ID;
};

// Switch to Base network
export const switchToBase = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${BASE_CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (error) {
    // Chain not added yet, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${BASE_CHAIN_ID.toString(16)}`,
            chainName: 'Base',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://mainnet.base.org'],
            blockExplorerUrls: ['https://basescan.org']
          }]
        });
        return true;
      } catch (addError) {
        console.error('Error adding Base network:', addError);
        return false;
      }
    }
    console.error('Error switching network:', error);
    return false;
  }
};