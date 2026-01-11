import React, { useState, useEffect } from 'react';
import WalletConnect from './WalletConnect';
import CreateJob from './CreateJob';
import JobStatus from './JobStatus';
import ReleasePayment from './ReleasePayment';
import '../styles/EscrowDApp.css';

const EscrowDApp = () => {
  const [account, setAccount] = useState('');
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        setStatus('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setStatus('connected');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleJobCreated = (newJobId) => {
    setJobId(newJobId);
    setStatus('locked');
  };

  const handlePaymentReleased = () => {
    setStatus('released');
    setJobId(null);
  };

  return (
    <div className="escrow-container">
      <div className="escrow-card">
        {/* ===== Header ===== */}
        <div className="header">
          <div>
            <h1>TrustPay</h1>
            <p className="subtitle">MNEE Stablecoin Escrow for Freelancers</p>
          </div>
          <div className="wallet-icon">💰</div>
        </div>

        {/* ===== Wallet Connect ===== */}
        <WalletConnect
          account={account}
          setAccount={setAccount}
          setStatus={setStatus}
          loading={loading}
          setLoading={setLoading}
        />

        {/* ===== Wallet Status ===== */}
        {account && (
          <div className="connected-info">
            <span className="label">Connected Wallet</span>
            <span className="address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
        )}

        {account && (
          <>
            {/* ===== Create Job ===== */}
            <CreateJob
              account={account}
              jobId={jobId}
              setStatus={setStatus}
              loading={loading}
              setLoading={setLoading}
              onJobCreated={handleJobCreated}
            />

            {/* ===== Job Status ===== */}
            {status && <JobStatus status={status} />}

            {/* ===== Release Payment ===== */}
            {jobId !== null && (
              <ReleasePayment
                account={account}
                jobId={jobId}
                setStatus={setStatus}
                loading={loading}
                setLoading={setLoading}
                onPaymentReleased={handlePaymentReleased}
              />
            )}
          </>
        )}

{/* ===== Instructions ===== */}
<div className="instructions">
  <h3>How it works</h3>
  <ul className="steps-list">
    <li className={account ? 'done' : ''}>
      Connect your MetaMask wallet
    </li>

    <li className={jobId !== null ? 'done' : ''}>
      Enter freelancer address and payment amount
    </li>

    <li className={status === 'locked' || status === 'released' ? 'done' : ''}>
      Lock funds securely in escrow
    </li>

    <li className={status === 'released' ? 'done' : ''}>
      Release payment after work completion
    </li>
  </ul>
</div>

      </div>
    </div>
  );
};

export default EscrowDApp;
