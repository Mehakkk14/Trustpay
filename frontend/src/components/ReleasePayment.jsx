import React from 'react';
import { ESCROW_CONTRACT_ADDRESS, ESCROW_ABI } from '../config/contract-config';

const ReleasePayment = ({ account, jobId, setStatus, loading, setLoading, onPaymentReleased }) => {
  const releasePayment = async () => {
    if (!window.ethereum || !account) {
      setStatus('Please connect wallet first');
      return;
    }

    if (!jobId) {
      setStatus('No active job to release');
      return;
    }

    try {
      setLoading(true);
      setStatus('Releasing MNEE payment...');

      const provider = new window.ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const escrowContract = new window.ethers.Contract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI, signer);
      
      const tx = await escrowContract.releasePayment(jobId);
      setStatus('Transaction pending...');
      await tx.wait();

      setStatus('released');
      onPaymentReleased();
    } catch (error) {
      console.error(error);
      setStatus('Error: ' + (error.reason || error.message || 'Transaction failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="release-section">
      <div className="locked-status">
        <p>🔒 MNEE Locked in Escrow - Job ID: {jobId}</p>
      </div>
      
    <button
     onClick={releasePayment}
    disabled={loading}
    className="primary-btn"
    >
    {loading ? '⏳ Releasing...' : '💸 Release MNEE Payment'}
    </button>

    </div>
  );
};

export default ReleasePayment;