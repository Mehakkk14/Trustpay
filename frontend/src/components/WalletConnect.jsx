import React from 'react';

const WalletConnect = ({ account, setAccount, setStatus, loading, setLoading }) => {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setStatus('Please install MetaMask!');
        return;
      }

      setLoading(true);
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      setAccount(accounts[0]);
      
      // Switch to Base Sepolia (Chain ID: 84532)
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x14a34' }], // 84532 in hex
        });
        setStatus('Connected to Base Sepolia!');
      } catch (switchError) {
        // Network not added, let's add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x14a34',
                chainName: 'Base Sepolia',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://sepolia.basescan.org']
              }]
            });
            setStatus('Connected to Base Sepolia!');
          } catch (addError) {
            console.error('Error adding network:', addError);
            setStatus('Please add Base Sepolia manually');
          }
        } else {
          setStatus('Please switch to Base Sepolia manually');
        }
      }
    } catch (error) {
      console.error(error);
      setStatus('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-section">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? '⏳ Connecting...' : '🦊 Connect to Base Network'}
        </button>
      ) : (
        <div className="connected-info">
          <p className="label">Connected Account:</p>
          <p className="address">{account}</p>
          <p className="network-badge">⚡ Base Network</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;