import React, { useState, useEffect } from 'react';
import { MNEE_TOKEN_ADDRESS, ESCROW_CONTRACT_ADDRESS, ERC20_ABI, ESCROW_ABI } from '../config/contract-config';

const CreateJob = ({ account, jobId, setStatus, loading, setLoading, onJobCreated }) => {
  const [freelancerAddress, setFreelancerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [mneeBalance, setMNEEBalance] = useState('0');

  useEffect(() => {
    if (account) {
      checkMNEEBalance();
    }
  }, [account]);

  const checkMNEEBalance = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new window.ethers.providers.Web3Provider(window.ethereum);
      const mneeContract = new window.ethers.Contract(MNEE_TOKEN_ADDRESS, ERC20_ABI, provider);
      const balance = await mneeContract.balanceOf(account);
      setMNEEBalance(window.ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error fetching MNEE balance:', error);
      setMNEEBalance('0');
    }
  };

  const createJob = async () => {
    if (!window.ethereum || !account) {
      setStatus('Please connect wallet first');
      return;
    }

    if (!freelancerAddress || !amount) {
      setStatus('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const provider = new window.ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const mneeContract = new window.ethers.Contract(MNEE_TOKEN_ADDRESS, ERC20_ABI, signer);
      const escrowContract = new window.ethers.Contract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI, signer);
      const amountInWei = window.ethers.utils.parseEther(amount);

      // Step 1: Check MNEE balance
      const balance = await mneeContract.balanceOf(account);
      if (balance.lt(amountInWei)) {
        setStatus(`Insufficient MNEE. You have ${window.ethers.utils.formatEther(balance)} MNEE`);
        setLoading(false);
        return;
      }

      // Step 2: Approve MNEE
      setStatus('Approving MNEE tokens...');
      const approveTx = await mneeContract.approve(ESCROW_CONTRACT_ADDRESS, amountInWei);
      await approveTx.wait();
      
      // Step 3: Create job
      setStatus('Creating job...');
      const tx = await escrowContract.createJob(freelancerAddress, amountInWei);
      setStatus('Transaction pending...');
      const receipt = await tx.wait();

      // Extract jobId from event
      let newJobId;
      try {
        const event = receipt.events?.find(e => e.event === 'JobCreated');
        newJobId = event?.args?.jobId?.toNumber();
      } catch (e) {
        console.error('Error extracting jobId:', e);
      }
      
      // If event parsing fails, get from contract
      if (!newJobId) {
        newJobId = (await escrowContract.jobCounter()).toNumber();
      }
      
      onJobCreated(newJobId);
      setFreelancerAddress('');
      setAmount('');
      checkMNEEBalance();
      setStatus('Job created successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error: ' + (error.reason || error.message || 'Transaction failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      {/* MNEE Balance Display */}
      <div className="balance-display">
        <span className="label">💰 MNEE Balance:</span>
        <span className="balance">{parseFloat(mneeBalance).toFixed(2)} MNEE</span>
      </div>

      <div className="form-group">
        <label>Freelancer Address</label>
        <input
          type="text"
          value={freelancerAddress}
          onChange={(e) => setFreelancerAddress(e.target.value)}
          placeholder="0x..."
          className="input-field"
          disabled={loading || jobId !== null}
        />
      </div>

      <div className="form-group">
        <label>Amount (MNEE)</label>
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          step="0.01"
          className="input-field"
          disabled={loading || jobId !== null}
        />
      </div>

    <button
  onClick={createJob}
  disabled={loading || jobId !== null || !freelancerAddress || !amount}
  className="primary-btn"
>
  {loading ? '⏳ Processing...' : '🔒 Create Job & Lock MNEE'}
</button>

    </div>
  );
};

export default CreateJob;