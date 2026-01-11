import React from 'react';

const JobStatus = ({ status }) => {
  if (!status) return null;

  const labelMap = {
    connected: '🟢 Wallet Connected',
    pending: '⏳ Transaction Pending...',
    locked: '🔒 Funds Locked in Escrow',
    released: '💸 Payment Released Successfully',
    error: '❌ Something went wrong',
  };

  return (
    <div className={`status ${status}`}>
      {labelMap[status] || status}
    </div>
  );
};

export default JobStatus;
